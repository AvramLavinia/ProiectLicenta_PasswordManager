import { Router, Request, Response } from "express";

import AccessMiddleware from "../middleware/access.middleware";
import userService from "../service/user/user.service";
import { CreateUserModel, UpdateUserModel } from "./models/user.models";

const router = Router({ strict: true, caseSensitive: true }).use(
  AccessMiddleware
);

router.post("/save", async (req: Request, res: Response, next) => {
  try {
    const body: CreateUserModel = req.body;

    const userSaved = await userService.save({ ...body, auth2token: null });

    res.status(200).send(userSaved);
  } catch (error) {
    return res.status(500);
  }
});

router.post("/update", async (req: Request, res: Response, next) => {
  try {
    const body: UpdateUserModel = req.body;

    const userFind = await userService.getByEmail(body.email);

    if (!userFind) return res.status(404).send({ message: "User not found" });
    const userSaved = await userService.save({ ...userFind, name: body.name });

    res.status(200).send(userSaved);
  } catch (error) {
    return res.status(500);
  }
});

export default router;
