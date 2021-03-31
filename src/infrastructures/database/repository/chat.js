import BaseRepo from "./base";
import isValidId from "../../../module/isValidId";
import CustomError from "../../../module/error";
import moment from "moment";

export default class extends BaseRepo {
  constructor(Model) {
    super(Model);
    this.Model = Model;
  }
}
