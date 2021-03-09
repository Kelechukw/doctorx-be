"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var CustomError = /*#__PURE__*/function () {
  function CustomError() {
    (0, _classCallCheck2["default"])(this, CustomError);
  }

  (0, _createClass2["default"])(CustomError, null, [{
    key: "ValidationError",
    value: function ValidationError(msg) {
      var err = new Error(msg);
      err.status = 400;
      err.name = "Validation Error";
      return err;
    } // static ValidationError(msg) {
    //   const err = new Error(msg);
    //   err.status = 400;
    //   err.name = "Bad Request Error";
    //   return err;
    // }

  }, {
    key: "AuthorizationError",
    value: function AuthorizationError(msg) {
      var err = new Error(msg);
      err.status = 401;
      err.name = "Authorization Error";
      return err;
    }
  }, {
    key: "ForbiddenError",
    value: function ForbiddenError(msg) {
      var err = new Error(msg);
      err.status = 403;
      err.name = "Forbidden Error";
      return err;
    }
  }, {
    key: "NotFoundError",
    value: function NotFoundError(msg) {
      var err = new Error(msg);
      err.status = 404;
      err.name = "Not Found";
      return err;
    }
  }, {
    key: "ConflictError",
    value: function ConflictError(msg) {
      var err = new Error(msg);
      err.status = 409;
      err.name = "Conflict Error";
      return err;
    }
  }]);
  return CustomError;
}();

exports["default"] = CustomError;