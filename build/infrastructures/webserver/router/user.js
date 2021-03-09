"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("../../../controllers/User"));

var userRouter = function userRouter(repositories) {
  var userController = (0, _User["default"])(repositories);
  var router = (0, _express.Router)();
  router.post("/signup", userController.createUser);
  router.post("/login", userController.loginUser);
  return router;
};

var _default = userRouter;
exports["default"] = _default;