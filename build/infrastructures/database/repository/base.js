"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _error = _interopRequireDefault(require("../../../module/error"));

var _isValidId = _interopRequireDefault(require("../../../module/isValidId"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BaseRepo = /*#__PURE__*/function () {
  function BaseRepo(Model) {
    (0, _classCallCheck2["default"])(this, BaseRepo);
    this.Model = Model;
  }

  (0, _createClass2["default"])(BaseRepo, [{
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var newData;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                newData = new this.Model(data);
                _context.next = 3;
                return newData.save();

              case 3:
                return _context.abrupt("return", newData);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "update",
    value: function update(data) {
      try {
        var id = data.id;

        if (!(0, _isValidId["default"])(id)) {
          throw _error["default"].ValidationError("Invalid Id");
        }

        return this.Model.findByIdAndUpdate(id, _objectSpread({}, data), {
          "new": true
        }).exec();
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: "remove",
    value: function remove(id) {
      try {
        if (!(0, _isValidId["default"])(id)) {
          throw _error["default"].ValidationError("Invalid Id");
        }

        return this.Model.findByIdAndRemove(id).exec();
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: "findById",
    value: function findById(id) {
      try {
        if (!(0, _isValidId["default"])(id)) {
          throw _error["default"].ValidationError("Invalid Id");
        }

        return this.Model.findById(id).exec();
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: "findBy",
    value: function findBy(query) {
      return this.Model.findOne(query).exec();
    }
  }, {
    key: "all",
    value: function all(query) {
      return this.Model.find(query).exec();
    }
  }, {
    key: "removeall",
    value: function removeall() {
      return this.Model.deleteMany({}).exec();
    }
  }]);
  return BaseRepo;
}();

exports["default"] = BaseRepo;