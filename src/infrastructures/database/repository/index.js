import UserRepository from "./user";
import ChatRepository from "./chat";

const Repository = (models) => {
  return {
    userRepository: new UserRepository(models.User),
    chatRepository: new ChatRepository(models.Chat),
  };
};

export default Repository;
