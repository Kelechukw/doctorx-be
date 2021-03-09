"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../validators/user"));

var _password = _interopRequireDefault(require("../../module/password"));

var _token = _interopRequireDefault(require("../../module/token"));

var _error = _interopRequireDefault(require("../../module/error"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var loginUser = function loginUser(_ref) {
  var userRepository = _ref.userRepository;
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userData) {
      var data, user, tokenData, token;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              data = _user["default"].validateSignin(userData);
              _context.next = 4;
              return userRepository.findByEmail(data.email);

            case 4:
              user = _context.sent;

              if (user) {
                _context.next = 7;
                break;
              }

              throw _error["default"].AuthorizationError("User isn't registered");

            case 7:
              if (_password["default"].compareHash(user.password, data.password)) {
                _context.next = 9;
                break;
              }

              throw _error["default"].AuthorizationError("Invalid email or password");

            case 9:
              tokenData = {
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
              };
              token = _token["default"].genToken(tokenData);
              return _context.abrupt("return", {
                message: "Login successful",
                data: _objectSpread(_objectSpread({}, tokenData), {}, {
                  token: token
                })
              });

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var _default = loginUser;
exports["default"] = _default;