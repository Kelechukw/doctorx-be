import CustomError from "../../../module/error";
import isValidId from "../../../module/isValidId";

export default class BaseRepo {
  constructor(Model) {
    this.Model = Model;
  }

  async add(data) {
    const newData = new this.Model(data);
    await newData.save();
    return newData;
  }

  update(data) {
    try {
      const id = data.id;
      if (!isValidId(id)) {
        throw CustomError.ValidationError("Invalid Id");
      }
      return this.Model.findByIdAndUpdate(
        id,
        {
          ...data,
        },
        {
          new: true,
        }
      ).exec();
    } catch (error) {
      throw error;
    }
  }

  remove(id) {
    try {
      if (!isValidId(id)) {
        throw CustomError.ValidationError("Invalid Id");
      }
      return this.Model.findByIdAndRemove(id).exec();
    } catch (error) {
      throw error;
    }
  }

  findById(id) {
    try {
      if (!isValidId(id)) {
        throw CustomError.ValidationError("Invalid Id");
      }
      return this.Model.findById(id).exec();
    } catch (error) {
      throw error;
    }
  }

  findBy(query) {
    return this.Model.findOne(query).exec();
  }

  all(query) {
    return this.Model.find(query).exec();
  }

  removeall() {
    return this.Model.deleteMany({}).exec();
  }
}
