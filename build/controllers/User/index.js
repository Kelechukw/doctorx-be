"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _userController = _interopRequireDefault(require("./userController"));

var _User = _interopRequireDefault(require("../../use_cases/User"));

module.exports = function (repositories) {
  var useCases = (0, _User["default"])(repositories);
  var controllers = (0, _userController["default"])(useCases);
  return controllers;
};