import socketio from "socket.io";
import {
  joinRoom,
  getUsersInWaitingRoom,
  leaveRoom,
  formatMessage,
  getUserInRoom,
  getRoom,
  getUser,
} from "./room";
import publishToQueue from "../queue/publisher";

const webSocket = (server, repositories) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on(
      "join",
      async ({ name, userId, room, userRole, isRoom }, callback) => {
        console.log("new socket connect");
        const { error, user, isNew } = await joinRoom({
          id: userId,
          name,
          roomId: room,
          userRole,
          socketId: socket.id,
        });

        if (error) return callback(error);

        socket.join(room);

        if (isRoom) {
          const usersInRoom = await getRoom(room);
          const to = usersInRoom.find((user) => user.id !== userId);
          const text =
            user.userRole === "doctor"
              ? `Welcome ${user.name} to a chat with ${to.name}`
              : `welcome ${user.name}, a doctor will join the chat soon.`;
          socket.emit(
            "message",
            formatMessage({
              type: "text",
              user: "admin",
              text,
            })
          );
        }

        socket.broadcast.to(room).emit(
          "message",
          formatMessage({
            user: "admin",
            type: "text",
            text: `${user.userRole === "doctor" ? "Dcotor" : ""} ${
              user.name
            }, joined the chat`,
          })
        );

        const userInWatingRoom = await getUsersInWaitingRoom();

        io.emit("roomData", {
          users: userInWatingRoom,
        });

        callback();
      }
    );

    socket.on("disconnect", async () => {
      const user = await getUser(socket.id);
      if (!user) return;
      io.to(user.roomId).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
        type: "text",
      });
      socket.leave(user.roomId);
      await leaveRoom(socket.id);

      const userInWaitingRoom = await getUsersInWaitingRoom();

      io.emit("roomData", {
        users: userInWaitingRoom,
      });
    });

    socket.on(
      "sendMessage",
      async ({ message, room, userId, type }, callback) => {
        const user = await getUser(socket.id);

        const usersInRoom = await getRoom(room);

        const to = usersInRoom.find((user) => user.id !== userId);

        io.to(room).emit(
          "message",
          formatMessage({ user: user.name, type, text: message })
        );

        if (to) {
          const msgToQ = {
            conversationId: [String(to.id), String(userId)].sort().join("-"),
            from: userId,
            to: to.id,
            type,
            message,
          };
          // publishToQueue(msgToQ);
          await repositories.chatRepository.add(msgToQ);
        }

        callback();
      }
    );

    socket.on("getRoom", async () => {
      const userInWaitingRoom = await getUsersInWaitingRoom();

      io.emit("roomData", {
        users: userInWaitingRoom,
      });
    });
  });
};

export default webSocket;
