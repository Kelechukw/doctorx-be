import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

const isValidId = (id) => {
  try {
    const objId = ObjectId(id);
    return String(objId) == String(id);
  } catch (error) {
    return false;
  }
};

export default isValidId;
