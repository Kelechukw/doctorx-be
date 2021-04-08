import getAllConversation from "./getAllConversation";

export default (repositories) => ({
  getAllConversations: getAllConversation(repositories),
});
