const getAllMsgs = ({ chatRepository }) => async (conversationId) => {
  try {
    const conversations = await chatRepository.getAllMsgs(conversationId);

    return {
      message: "Messages fetched successfully",
      data: conversations,
    };
  } catch (error) {
    throw error;
  }
};

export default getAllMsgs;
