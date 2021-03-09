import createUser from "./CreateUser";
import loginUser from "./LoginUser";

const userUseCase = (repositories) => ({
  createUser: createUser(repositories),
  loginUser: loginUser(repositories),
});

export default userUseCase;
