"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CreateUser = _interopRequireDefault(require("./CreateUser"));

var _LoginUser = _interopRequireDefault(require("./LoginUser"));

var userUseCase = function userUseCase(repositories) {
  return {
    createUser: (0, _CreateUser["default"])(repositories),
    loginUser: (0, _LoginUser["default"])(repositories)
  };
};

var _default = userUseCase;
exports["default"] = _default;