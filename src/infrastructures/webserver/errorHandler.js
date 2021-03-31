import config from "../../config/env";
const isProduction = config.nodeEnv == "prod";

module.exports = (app) => {
  app.use((req, res, next) => {
    const err = new Error();
    err.message = "Not Found";
    err.name = "Not Found";
    err.status = 404;
    next(err);
  });

  if (!isProduction) {
    app.use((error, req, res, next) => {
      //   logger.error(err.stack);
      console.log(error.message);
      console.log(req.url);
      res.status(error.status || 500);
      res.json({
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    });
  } else {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    });
  }
};
