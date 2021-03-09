"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webserver = _interopRequireDefault(require("./infrastructures/webserver"));

var _router = _interopRequireDefault(require("./infrastructures/webserver/router"));

var _mongoose = _interopRequireDefault(require("./infrastructures/database/mongoose"));

var _repository = _interopRequireDefault(require("./infrastructures/database/repository"));

var database = new _mongoose["default"]();

var models = _mongoose["default"].getModels();

var repositories = (0, _repository["default"])(models);
var router = (0, _router["default"])(repositories);
var webserver = (0, _webserver["default"])(router);

var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            webserver.start();

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

database.connect(startServer);