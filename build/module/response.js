"use strict";

module.exports = {
  success: function success(res, _ref) {
    var message = _ref.message,
        data = _ref.data;
    var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    return res.status(status).json({
      success: true,
      message: message,
      data: data
    });
  },
  error: function error(res, _ref2) {
    var message = _ref2.message,
        data = _ref2.data;
    var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
    return res.status(status).json({
      success: false,
      message: message,
      data: data
    });
  }
};