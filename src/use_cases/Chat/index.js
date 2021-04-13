import getAllConversation from "./getAllConversation";
import getAllMsgs from "./getAllmessages";

export default (repositories) => ({
  getAllConversations: getAllConversation(repositories),
  getAllMsgs: getAllMsgs(repositories),
});
