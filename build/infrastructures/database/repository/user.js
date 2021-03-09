"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _base = _interopRequireDefault(require("./base"));

var _isValidId = _interopRequireDefault(require("../../../module/isValidId"));

var _error = _interopRequireDefault(require("../../../module/error"));

var _moment = _interopRequireDefault(require("moment"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _default = /*#__PURE__*/function (_BaseRepo) {
  (0, _inherits2["default"])(_default, _BaseRepo);

  var _super = _createSuper(_default);

  function _default(Model) {
    var _this;

    (0, _classCallCheck2["default"])(this, _default);
    _this = _super.call(this, Model);
    _this.Model = Model;
    return _this;
  }

  (0, _createClass2["default"])(_default, [{
    key: "findByEmail",
    value: function findByEmail(email) {
      return this.Model.findOne({
        email: email
      }).exec();
    }
  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      return this.all({// role: "user",
      });
    }
  }, {
    key: "getNewUsers",
    value: function getNewUsers() {
      return this.all({
        createdAt: {
          $gte: (0, _moment["default"])().subtract(1, "month").toDate(),
          $lte: new Date()
        }
      });
    }
  }, {
    key: "getUsersByExam",
    value: function getUsersByExam(examId) {
      try {
        if (!(0, _isValidId["default"])(examId)) {
          throw _error["default"].ValidationError("Invalid Exam Id");
        }

        return this.all({
          "regExam.examId": examId
        });
      } catch (error) {
        throw error;
      }
    }
  }, {
    key: "setExamOfInterest",
    value: function setExamOfInterest(data) {
      return this.Model.findByIdAndUpdate(data.id, {
        regExam: {
          examId: data.examId,
          subjectCombination: data.subjectCombination
        }
      });
    }
  }]);
  return _default;
}(_base["default"]);

exports["default"] = _default;