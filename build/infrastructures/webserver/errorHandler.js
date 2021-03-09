"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _env = _interopRequireDefault(require("../../config/env"));

var isProduction = _env["default"].nodeEnv == "prod";

module.exports = function (app) {
  app.use(function (req, res, next) {
    var err = new Error();
    err.message = "Not Found";
    err.name = "Not Found";
    err.status = 404;
    next(err);
  });

  if (!isProduction) {
    app.use(function (error, req, res, next) {
      //   logger.error(err.stack);
      console.log(error);
      res.status(error.status || 500);
      res.json({
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    });
  } else {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        error: {
          name: err.name,
          message: err.message
        }
      });
    });
  }
};