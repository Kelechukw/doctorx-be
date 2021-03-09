"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _error = _interopRequireDefault(require("../../../module/error"));

// from a role collection maybe
var adminRoles = ["admin", "superadmin"];

var isAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var userRole;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userRole = req.user.role;

            if (!adminRoles.includes(userRole)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", next());

          case 4:
            throw _error["default"].ForbiddenError("Unauthorized, only admins can access this functionality");

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function isAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isAdmin;
exports["default"] = _default;