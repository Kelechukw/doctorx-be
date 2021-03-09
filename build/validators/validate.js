"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _error = _interopRequireDefault(require("../module/error"));

var validate = function validate(schema, data) {
  try {
    var _schema$validate = schema.validate(data),
        value = _schema$validate.value,
        error = _schema$validate.error;

    if (error) {
      throw error;
    }

    return value;
  } catch (error) {
    var err = error.message;
    throw _error["default"].ValidationError(err);
  }
};

var _default = validate;
exports["default"] = _default;