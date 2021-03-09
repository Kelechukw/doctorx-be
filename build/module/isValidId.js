"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var ObjectId = _mongoose["default"].Types.ObjectId;

var isValidId = function isValidId(id) {
  try {
    var objId = ObjectId(id);
    return String(objId) == String(id);
  } catch (error) {
    return false;
  }
};

var _default = isValidId;
exports["default"] = _default;