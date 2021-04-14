import moment from "moment";
import user from "../database/repository/user";
import redis from "../redis/";

const cache = redis.connect();

export const getRoom = async (roomId) => {
  let room = await cache.smembers(roomId);
  return room ? room.map((d) => JSON.parse(d)) : [];
};

export const joinRoom = async ({
  id,
  name,
  roomId,
  isRoom,
  userRole,
  socketId,
}) => {
  name = name.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();
  userRole = userRole.trim().toLowerCase();

  if (!name || !roomId) return { error: "Username and room are required." };

  let room = await getRoom(roomId);

  const user = { id, name, roomId, userRole, isRoom };
  // Save user data to cache
  await cache.hmset(socketId, user);

  const userExist = room.find((user) => user.id == id);
  if (userExist) return { user: userExist, isNew: false };

  if (room.length == 2)
    return { error: "Sorry cant join, a doctor is already in session" };

  // Add user to room
  await cache.sadd(roomId, JSON.stringify(user));

  //Save room key
  await cache.rpush("room", roomId);

  return { user, isNew: true };
};

exports.leaveRoom = async (socketId) => {
  const user = await getUser(socketId);
  const stringUser = JSON.stringify(user);
  await cache.srem(user.roomId, stringUser);
};

export const getUser = async (socketId) => {
  return cache.hgetall(socketId);
};

exports.getUsersInWaitingRoom = async () => {
  const roomKeys = await cache.lrange("room", 0, -1);
  let rooms = {};

  for (let i = 0; i < roomKeys.length; i++) {
    const roomData = await cache.smembers(roomKeys[i]);
    rooms[roomKeys[i]] = roomData;
  }

  let waitingRoom = [];

  for (let room in rooms) {
    const users = rooms[room];
    if (users.length === 1) {
      const user = JSON.parse(users[0]);
      if (user.userRole === "doctor" || user.isRoom === false) continue;
      waitingRoom.push(JSON.parse(users[0]));
    }
  }
  return waitingRoom;
};

exports.formatMessage = (message) => ({
  ...message,
  date: moment().format("llll"),
});
