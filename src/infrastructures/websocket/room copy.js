import moment from "moment";
import redis from "../redis/";

const rooms = {};
const users = {};

const cache = redis.connect();
cache.set("rooms", JSON.stringify({})


exports.joinRoom = ({ id, name, room, userRole }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  userRole = userRole.trim().toLowerCase();

  if (!name || !room) return { error: "Username and room are required." };

const room = caches.get(room)
let _room = []

  if (!rooms[room]) {
    rooms[room] = [];
  }

  const userExist = rooms[room].find((user) => user.id == id);
  if (userExist) return { user: userExist, isNew: false };

  if (rooms[room].length == 2)
    return { error: "Sorry cant join, a doctor is already in session" };

  const user = { id, name, room, userRole };
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

export const getUser = (id) => users[id];
export const getUserInRoom = (room) => rooms[room];
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
