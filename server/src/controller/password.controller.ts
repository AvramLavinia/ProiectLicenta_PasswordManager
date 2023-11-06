import { Router, Request, Response } from "express";

import AccessMiddleware from "../middleware/access.middleware";

import {
  CreatePasswordModel,
  UpdatePasswordModel,
} from "./models/password.model";

import passwordService from "../service/password/password.service";
import JwtTokenService from "../auth/jwt/jwt.access";

const router = Router({ strict: true, caseSensitive: true }).use(
  AccessMiddleware
);

router.get("/getAll", async (req: Request, res: Response, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const passwords = await passwordService.getAll(payload.sub);

  res.status(200).send(passwords);
});

router.post("/save", async (req: Request, res: Response, next) => {
  const body: CreatePasswordModel = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  console.log(payload);

  const userSaved = await passwordService.save({
    ...body,
    userId: payload.sub,
  });

  res.status(200).send(userSaved);
});

router.post("/update", async (req: Request, res: Response, next) => {
  const body: UpdatePasswordModel = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const userSaved = await passwordService.update({
    ...body,
  });

  res.status(200).send(userSaved);
});

router.post("/delete", async (req: Request, res: Response, next) => {
  const body: { id: string } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const userSaved = await passwordService.remove(body.id);

  res.status(200).send(userSaved);
});

export default router;
