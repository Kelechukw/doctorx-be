import BaseRepo from "./base";
import isValidId from "../../../module/isValidId";
import CustomError from "../../../module/error";
import moment from "moment";

export default class extends BaseRepo {
  constructor(Model) {
    super(Model);
    this.Model = Model;
  }

  findByEmail(email) {
    return this.Model.findOne({ email }).exec();
  }

  getAllUsers() {
    return this.all({
      // role: "user",
    });
  }

  getNewUsers() {
    return this.all({
      createdAt: {
        $gte: moment().subtract(1, "month").toDate(),
        $lte: new Date(),
      },
    });
  }

  getUsersByExam(examId) {
    try {
      if (!isValidId(examId)) {
        throw CustomError.ValidationError("Invalid Exam Id");
      }
      return this.all({
        "regExam.examId": examId,
      });
    } catch (error) {
      throw error;
    }
  }
  setExamOfInterest(data) {
    return this.Model.findByIdAndUpdate(data.id, {
      regExam: {
        examId: data.examId,
        subjectCombination: data.subjectCombination,
      },
    });
  }
}
