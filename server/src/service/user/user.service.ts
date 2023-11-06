import { UserRepository } from "../../repository/User.repository";

class UserService {
  async save(object: {
    name: string;
    email: string;
    password: string;
    auth2token: string;
  }) {
    return await UserRepository.save(object);
  }

  async get(id: string) {
    return await UserRepository.findOneBy({ id });
  }

  async getByEmail(email: string) {
    return await UserRepository.findOneBy({ email });
  }
}

export default new UserService();
