import moment from "moment";

const rooms = {};
const users = {};

exports.joinRoom = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!name || !room) return { error: "Username and room are required." };

  if (!rooms[room]) {
    rooms[room] = [];
  }

  const userExist = rooms[room].find((user) => user.id == id);
  if (userExist) return { user: userExist, isNew: false };

  if (rooms[room].length == 2)
    return { error: "Sorry cant join, a doctor is already in session" };

  const user = { id, name, room };
  users[id] = user;

  rooms[room].push(user);

  return { user, isNew: true };
};

exports.leaveRoom = (id) => {
  const user = users[id];
  const _rooms = {
    ...rooms,
  };
  rooms[user.room] = _rooms[user.room].filter((user) => user.id !== id);
  return user;
};

exports.getUser = (id) => users[id];

exports.getUsersInWaitingRoom = () => {
  let waitingRoom = [];

  for (let room in rooms) {
    const users = rooms[room];
    if (users.length === 1) {
      waitingRoom.push(users[0]);
    }
  }
  return waitingRoom;
};

exports.formatMessage = (message) => ({
  ...message,
  date: moment().format("llll"),
});
