const BaseRepo = require("./base");
const moment = require("moment");

module.exports = class extends BaseRepo {
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
};
