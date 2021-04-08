const UserRepository = require("./user");
const ChatRepository = require("./chat");

const Repository = (models) => {
  return {
    userRepository: new UserRepository(models.User),
    chatRepository: new ChatRepository(models.Chat),
  };
};

module.exports = Repository;
