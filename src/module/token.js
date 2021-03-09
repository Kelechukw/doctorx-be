import jwt from "jsonwebtoken";
import config from "../config/env";

class Token {
  static genToken(data) {
    try {
      return jwt.sign(data, config.JWTSecret);
    } catch (error) {
      throw error;
    }
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, config.JWTSecret);
    } catch (error) {
      throw error;
    }
  }
}

export default Token;
