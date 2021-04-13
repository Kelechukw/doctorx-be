import { Router } from "express";
import controller from "../../../controllers/Chat";

const chatRouter = (repositories) => {
  const chatController = controller(repositories);
  const router = Router();

  router.get("/getallconversation", chatController.getAllConversations);
  router.get("/getmsgs/:conversationId", chatController.getAllMsgs);

  return router;
};

export default chatRouter;
