import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Password } from "./entity/Password";
import { Notice } from "./entity/Notice";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "DESKTOP-GG4E521\\MSSQLSERVER", //-- Lavinia
  port: 1433,
  username: "sa",
  password: "@Password123",
  database: "PasswordManager",
  synchronize: true,
  logging: true,
  options: {
    trustServerCertificate: true,
  },
  entities: [User, Password, Notice],
});
