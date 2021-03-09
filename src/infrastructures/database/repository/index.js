import UserRepository from "./user";

const Repository = (models) => {
  return {
    userRepository: new UserRepository(models.User),
  };
};

export default Repository;
