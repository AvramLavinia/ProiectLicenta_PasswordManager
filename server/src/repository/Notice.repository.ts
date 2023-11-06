import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Notice } from "../entity/Notice";

//APP DATASOURCE - CONNECTION BETWEEN THE DB AND OUR APP
//GET REPOSITORY - GET THE ACTUAL TABLE
export const NoticeRepository: Repository<Notice> =
  AppDataSource.getRepository(Notice);
