import response from "../../module/response";

const userContoller = (userUseCase) => ({
  createUser: async (req, res, next) => {
    try {
      const userData = req.body;

      const user = await userUseCase.createUser(userData);
      return response.success(res, user, 201);
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const data = req.body;

      const user = await userUseCase.loginUser(data);
      return response.success(res, user, 200);
    } catch (error) {
      next(error);
    }
  },
});

export default userContoller;
