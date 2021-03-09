import userValidator from "../../validators/user";
import password from "../../module/password";
import Token from "../../module/token";
import CustomError from "../../module/error";

const loginUser = ({ userRepository }) => async (userData) => {
  try {
    const data = userValidator.validateSignin(userData);

    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw CustomError.AuthorizationError("User isn't registered");
    }

    if (!password.compareHash(user.password, data.password)) {
      throw CustomError.AuthorizationError("Invalid email or password");
    }

    const tokenData = {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = Token.genToken(tokenData);

    return {
      message: "Login successful",
      data: { ...tokenData, token },
    };
  } catch (error) {
    throw error;
  }
};

export default loginUser;
