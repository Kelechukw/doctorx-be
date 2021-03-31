const socketio = require("socket.io");
import {
  joinRoom,
  getUser,
  getUsersInWaitingRoom,
  leaveRoom,
  formatMessage,
} from "./room";

const webSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", ({ name, userId, room, isRoom }, callback) => {
      console.log("new socket connect");

      const { error, user, isNew } = joinRoom({
        id: userId,
        name,
        room,
      });

      if (error) return callback(error);

      socket.join(user.room);

      if (isRoom && isNew) {
        socket.emit(
          "message",
          formatMessage({
            user: "admin",
            text: `welcome ${user.name}, a doctor will join the chat soon.`,
          })
        );

        socket.broadcast.to(user.room).emit(
          "message",
          formatMessage({
            user: "admin",
            text: `doctor ${user.name}, joined the chat`,
          })
        );
      }

      io.emit("roomData", {
        users: getUsersInWaitingRoom(),
      });

      socket.on("disconnect", () => {});
      // if (user) {
      //   io.to(user.room).emit("message", {
      //     user: "Admin",
      //     text: `${user.name} has left.`,
      //   });
      //   io.to(user.room).emit("roomData", {
      //     room: user.room,
      //     users: getUsersInRoom(user.room),
      //   });
      // }
      callback();
    });

    socket.on("sendMessage", ({ message, room, userId }, callback) => {
      const user = getUser(userId);

      io.to(room).emit(
        "message",
        formatMessage({ user: user.name, text: message })
      );

      callback();
    });

    // socket.on("disconnect", () => {
    //   console.log("disconnect");

    //   const user = leaveRoom(socket.id);

    //   io.emit("roomData", {
    //     users: getUsersInWaitingRoom(),
    //   });
    // });

    socket.on("getRoom", () => {
      io.emit("roomData", {
        users: getUsersInWaitingRoom(),
      });
    });
  });
};

export default webSocket;
