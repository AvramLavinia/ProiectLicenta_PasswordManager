import { AppDataSource } from "./data-source";
import { Express, Request, Response, Router } from "express";

//Controllers
import UserRouter from "./controller/user.controller";
import AuthRouter from "./controller/auth.controller";
import PasswordRouter from "./controller/password.controller";
import NoticeRouter from "./controller/notice.controller";

import cors = require("cors");

const express = require("express");
const app: Express = express();
app.use(express.json());
app.use(cors<Request>());

//importul
AppDataSource.initialize()
  .then(async () => {
    console.log("Connection with database successfully");
  })
  .catch((error) => console.log(error));

//Use the controllers
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/password", PasswordRouter);
app.use("/notice", NoticeRouter);

// App Info
app.get("/", (req: Request, res: Response) => {
  res.send("Server works properly.");
});
app.listen(3001, () => {
  console.log("Listen on port 3001");
});

export default app;
