"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _joi = _interopRequireDefault(require("joi"));

var _validate = _interopRequireDefault(require("./validate"));

var userValidator = /*#__PURE__*/function () {
  function userValidator() {
    (0, _classCallCheck2["default"])(this, userValidator);
  }

  (0, _createClass2["default"])(userValidator, null, [{
    key: "validateSignup",
    value: function validateSignup(data) {
      var schema = _joi["default"].object().keys({
        lastName: _joi["default"].string().required(),
        firstName: _joi["default"].string().required(),
        phoneNumber: _joi["default"].number().required(),
        email: _joi["default"].string().email(),
        password: _joi["default"].string().required(),
        role: _joi["default"].string().valid("user", "doctor").required().error(new Error("Role should be either 'user' or 'doctor'"))
      });

      return (0, _validate["default"])(schema, data);
    }
  }, {
    key: "validateSignin",
    value: function validateSignin(data) {
      var schema = _joi["default"].object().keys({
        email: _joi["default"].string().email().required(),
        password: _joi["default"].string().required()
      });

      return (0, _validate["default"])(schema, data);
    }
  }]);
  return userValidator;
}();

var _default = userValidator;
exports["default"] = _default;