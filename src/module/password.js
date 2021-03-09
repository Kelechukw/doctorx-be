import bcrypt from "bcryptjs";

export default class password {
  static hashPassword(password) {
    try {
      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      return hash;
    } catch (error) {
      throw error;
    }
  }

  static compareHash(hash, password) {
    try {
      return bcrypt.compareSync(password, hash);
    } catch (error) {
      throw error;
    }
  }
}
