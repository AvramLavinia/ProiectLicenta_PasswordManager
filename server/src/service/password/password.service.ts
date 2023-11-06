import { Password } from "../../entity/Password";
import { PasswordRepository } from "../../repository/Password.repository";

class UserService {
  async save(object: {
    platform: string;
    email: string;
    password: string;
    userId: string;
  }) {
    return await PasswordRepository.save({ ...object, userId: object.userId });
  }

  async getAll(userId: string) {
    return await PasswordRepository.find({
      where: { user: { id: userId }, isDeleted: false },
    });
  }

  async get(id: string) {
    return await PasswordRepository.findOneBy({ id });
  }

  async update(object: {
    platform: string;
    email: string;
    password: string;
    id: string;
  }) {
    const password = await PasswordRepository.findOneBy({ id: object.id });
    return await PasswordRepository.save({ ...password, ...object });
  }

  async remove(id: string) {
    const password = await PasswordRepository.findOneBy({ id });
    return await PasswordRepository.save({ ...password, isDeleted: true });
  }
}

export default new UserService();
