import response from "../../module/response";

const userContoller = (chatUsecases) => ({
  getAllConversations: async (req, res, next) => {
    try {
      const userData = {
        userId: req.user._id,
      };

      const conversation = await chatUsecases.getAllConversations(userData);
      return response.success(res, conversation, 201);
    } catch (error) {
      next(error);
    }
  },
});

export default userContoller;
