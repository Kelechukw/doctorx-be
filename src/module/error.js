export default class CustomError {
  static ValidationError(msg) {
    const err = new Error(msg);
    err.status = 400;
    err.name = "Validation Error";
    return err;
  }
  // static ValidationError(msg) {
  //   const err = new Error(msg);
  //   err.status = 400;
  //   err.name = "Bad Request Error";
  //   return err;
  // }
  static AuthorizationError(msg) {
    const err = new Error(msg);
    err.status = 401;
    err.name = "Authorization Error";
    return err;
  }
  static ForbiddenError(msg) {
    const err = new Error(msg);
    err.status = 403;
    err.name = "Forbidden Error";
    return err;
  }
  static NotFoundError(msg) {
    const err = new Error(msg);
    err.status = 404;
    err.name = "Not Found";
    return err;
  }

  static ConflictError(msg) {
    const err = new Error(msg);
    err.status = 409;
    err.name = "Conflict Error";
    return err;
  }
}
