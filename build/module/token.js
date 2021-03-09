"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../config/env"));

var Token = /*#__PURE__*/function () {
  function Token() {
    (0, _classCallCheck2["default"])(this, Token);
  }

  (0, _createClass2["default"])(Token, null, [{
    key: "genToken",
    value: function genToken(data) {
      try {
        return _jsonwebtoken["default"].sign(data, _env["default"].JWTSecret);
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      try {
        return _jsonwebtoken["default"].verify(token, _env["default"].JWTSecret);
      } catch (error) {
        throw error;
      }
    }
  }]);
  return Token;
}();

var _default = Token;
exports["default"] = _default;