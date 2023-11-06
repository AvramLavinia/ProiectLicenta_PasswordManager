import { NoticeRepository } from "./../../repository/Notice.repository";

class NoticeService {
  async save(object: { description: string; userId: string }) {
    return await NoticeRepository.save({ ...object, userId: object.userId });
  }

  async getAll(userId: string) {
    return await NoticeRepository.find({
      where: { user: { id: userId }, isDeleted: false },
    });
  }

  async get(id: string) {
    return await NoticeRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const password = await NoticeRepository.findOneBy({ id });
    return await NoticeRepository.save({ ...password, isDeleted: true });
  }
}

export default new NoticeService();
