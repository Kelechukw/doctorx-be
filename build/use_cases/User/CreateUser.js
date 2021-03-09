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

var createUser = function createUser(_ref) {
  var userRepository = _ref.userRepository;
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userData) {
      var data, exist, user, tokenData, token;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              data = _user["default"].validateSignup(userData);
              _context.next = 4;
              return userRepository.findByEmail(data.email);

            case 4:
              exist = _context.sent;

              if (!exist) {
                _context.next = 7;
                break;
              }

              throw _error["default"].ConflictError("A user is registered with this email");

            case 7:
              data.password = _password["default"].hashPassword(data.password);
              _context.next = 10;
              return userRepository.add(data);

            case 10:
              user = _context.sent;
              tokenData = {
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
              };
              token = _token["default"].genToken(tokenData);
              return _context.abrupt("return", {
                message: "Signup successful",
                data: _objectSpread(_objectSpread({}, tokenData), {}, {
                  token: token
                })
              });

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var _default = createUser;
exports["default"] = _default;