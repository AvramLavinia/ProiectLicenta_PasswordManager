import { Router, Request, Response } from "express";

import AccessMiddleware from "../middleware/access.middleware";

import JwtTokenService from "../auth/jwt/jwt.access";
import noticeService from "../service/notice/notice.service";

const router = Router({ strict: true, caseSensitive: true }).use(
  AccessMiddleware
);

router.get("/getAll", async (req: Request, res: Response, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const passwords = await noticeService.getAll(payload.sub);

  res.status(200).send(passwords);
});

router.post("/save", async (req: Request, res: Response, next) => {
  const body: { description: string } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const noticeSaved = await noticeService.save({
    description: body.description,
    userId: payload.sub,
  });

  res.status(200).send(noticeSaved);
});

router.post("/delete", async (req: Request, res: Response, next) => {
  const body: { id: string } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const noticeSaved = await noticeService.remove(body.id);

  res.status(200).send(noticeSaved);
});

export default router;
