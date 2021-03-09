"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var Repository = function Repository(models) {
  return {
    userRepository: new _user["default"](models.User)
  };
};

var _default = Repository;
exports["default"] = _default;