import { Repository } from "typeorm";
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

    //APP DATASOURCE - CONNECTION BETWEEN THE DB AND OUR APP
    //GET REPOSITORY - GET THE ACTUAL TABLE 
export const UserRepository : Repository<User> = AppDataSource.getRepository(User);


