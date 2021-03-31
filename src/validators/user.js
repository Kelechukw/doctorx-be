import Joi from "joi";
import validate from "./validate";

class userValidator {
  static validateSignup(data) {
    const schema = Joi.object().keys({
      lastName: Joi.string().required(),
      firstName: Joi.string().required(),
      phoneNumber: Joi.number().required(),
      email: Joi.string().email(),
      genotype: Joi.string().required(),
      bloodGroup: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string()
        .valid("user", "doctor")
        .required()
        .error(new Error("Role should be either 'user' or 'doctor'")),
    });
    return validate(schema, data);
  }

  static validateSignin(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return validate(schema, data);
  }
}

export default userValidator;
