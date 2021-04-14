import user from "../../infrastructures/database/repository/user";

const getAllConversation = ({ chatRepository, userRepository }) => async ({
  userId,
}) => {
  try {
    const conversations = await chatRepository.getAllConversation(userId);

    const resultObj = {};

    for (let i = 0; i < conversations.length; i++) {
      let doc = {
        ...conversations[i],
      };
      const {
        _id: { from, to },
      } = doc;
      const docId = [from, to].sort().join("-");

      if (resultObj[docId]) {
        const prevDocTime = resultObj[docId].timestamp;
        const docTime = doc.timestamp;

        if (new Date(docTime).getTime() > new Date(prevDocTime).getTime()) {
          let _conversationWith = [from, to].find(
            (a) => String(a) !== String(userId)
          );

          const conversationWith = await userRepository.findById(
            _conversationWith
          );

          doc = {
            id: docId,
            message: doc.message,
            conversationWith: `${conversationWith.firstName} ${conversationWith.lastName}`,
            timestamp: doc.timestamp,
          };

          resultObj[docId] = doc;
        }
      } else {
        let _conversationWith = [from, to].find(
          (a) => String(a) !== String(userId)
        );

        let conversationWith = {};
        if (_conversationWith)
          conversationWith = await userRepository.findById(_conversationWith);

        doc = {
          id: docId,
          message: doc.message,
          conversationWith: `${conversationWith.firstName} ${conversationWith.lastName}`,
          timestamp: doc.timestamp,
        };

        resultObj[docId] = doc;
      }
    }

    return {
      message: "Conversation fetched successfully",
      data: Object.values(resultObj),
    };
  } catch (error) {
    throw error;
  }
};

export default getAllConversation;
