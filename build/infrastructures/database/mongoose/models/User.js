"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var userRoles = ["user", "doctor"];
var userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number
  },
  role: {
    type: String,
    "enum": userRoles,
    "default": "user"
  },
  password: {
    type: String,
    required: true
  },
  //  exam of interest
  regExam: {
    examId: {
      type: Schema.Types.ObjectId,
      "default": null
    },
    subjectCombination: {
      type: Array,
      "default": []
    }
  }
}, {
  versionKey: false,
  timestamps: true
});

var userModel = _mongoose["default"].model("User", userSchema);

module.exports = userModel;