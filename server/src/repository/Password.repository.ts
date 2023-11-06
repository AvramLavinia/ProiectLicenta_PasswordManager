import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Password } from "../entity/Password";

//APP DATASOURCE - CONNECTION BETWEEN THE DB AND OUR APP
//GET REPOSITORY - GET THE ACTUAL TABLE
export const PasswordRepository: Repository<Password> =
  AppDataSource.getRepository(Password);
