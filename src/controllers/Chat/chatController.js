import response from "../../module/response";

const userContoller = (chatUsecases) => ({
  getAllConversations: async (req, res, next) => {
    try {
      const userData = {
        userId: req.user._id,
      };

      const conversation = await chatUsecases.getAllConversations(userData);
      return response.success(res, conversation, 200);
    } catch (error) {
      next(error);
    }
  },

  getAllMsgs: async (req, res, next) => {
    try {
      const { conversationId } = req.params;

      const conversations = await chatUsecases.getAllMsgs(conversationId);
      return response.success(res, conversations, 200);
    } catch (error) {
      next(error);
    }
  },
});

export default userContoller;
