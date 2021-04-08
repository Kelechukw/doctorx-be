import { Router } from "express";
import controller from "../../../controllers/Chat";

const chatRouter = (repositories) => {
  const chatController = controller(repositories);
  const router = Router();

  router.post("/getallconversation", chatController.getAllConversations);

  return router;
};

export default chatRouter;