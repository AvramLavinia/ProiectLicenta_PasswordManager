import { Router, Request, Response } from "express";

import userService from "../service/user/user.service";
import JwtTokenService from "../auth/jwt/jwt.access";
import sendgridService from "../service/sendgrid/sendgrid.service";

import {
  Auth2Model,
  ForgotPasswordModel,
  LoginModel,
} from "./models/auth.models";
import { CreateUserModel } from "./models/user.models";

require("dotenv").config();

const CryptoJS = require("crypto-js");
const router = Router({ caseSensitive: true });

router.post("/refresh", async (req: Request, res: Response, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  const verifyToken = await JwtTokenService.verifyJwtAccessToken(token);

  if (!verifyToken) return res.sendStatus(403);

  console.log(verifyToken);

  const user = await userService.get(verifyToken.sub); // BY ID
  if (!user)
    return res
      .status(300)
      .send({ message: "User not found from refresh request." });

  const accessToken = await JwtTokenService.generateJwtAccessToken({
    sub: user.id,
    email: user.email,
  });

  return res.status(200).send({
    id: user.id,
    email: user.email,
    name: user.name,
    accessToken,
  });
});

router.post("/login", async (req: Request, res: Response, next) => {
  const body: LoginModel = req.body;

  const user = await userService.getByEmail(body.email);

  if (!user) {
    return res.status(300).send({ message: "User not exist." });
  }

  const decryptPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.ENCRYPT_PASSWORD
  );
  const originalText = decryptPassword.toString(CryptoJS.enc.Utf8);

  if (originalText !== body.password)
    return res.status(300).send({ message: "Incorect credentials." });

  const accessToken = await JwtTokenService.generateJwtAccessToken({
    sub: user.id,
    email: user.email,
  });

  const auth2token = Math.floor(Math.random() * Date.now())
    .toString(36)
    .slice(0, 6);

  await userService.save({ ...user, auth2token });
  //Send email for 2 factor auth
  await sendgridService.sendAuth2Email({ emailTo: user.email, auth2token });

  return res.status(200).send({
    id: user.id,
    email: user.email,
    name: user.name,
    accessToken,
  });
});

router.post("/register", async (req: Request, res: Response, next) => {
  const body: CreateUserModel = req.body;

  const user = await userService.getByEmail(body.email);

  if (user) return res.status(300).send({ message: "User already exist!" });

  const encryptPassword = CryptoJS.AES.encrypt(
    body.password,
    process.env.ENCRYPT_PASSWORD
  ).toString();

  const userSaved = await userService.save({
    ...body,
    password: encryptPassword,
    auth2token: null,
  });

  await sendgridService.sendWelcomeEmail({ emailTo: body.email });

  const accessToken = await JwtTokenService.generateJwtAccessToken({
    sub: userSaved.id,
    email: userSaved.email,
  });

  return res.status(200).send({
    id: userSaved.id,
    email: userSaved.email,
    name: userSaved.name,
    accessToken,
  });
});

router.post("/auth2", async (req: Request, res: Response, next) => {
  const body: Auth2Model = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const user = await userService.get(payload.sub); // BY ID
  if (!user) return res.status(300).send({ message: "User not found." });

  if (user.auth2token !== body.auth2token) {
    return res.status(401).send({ message: "Invalid token" });
  }

  const accessToken = await JwtTokenService.generateJwtAccessToken({
    sub: user.id,
    email: user.email,
  });

  return res.status(200).send({
    id: user.id,
    email: user.email,
    name: user.name,
    accessToken,
  });
});

router.post(
  "/sendForgotPasswordEmail",
  async (req: Request, res: Response, next) => {
    const body: { email: string } = req.body;

    const user = await userService.getByEmail(body.email); // BY ID
    if (!user) return res.status(300).send({ message: "User not found." });

    const token = await JwtTokenService.generateJwtAccessToken({
      sub: user.id,
      email: user.email,
    });

    await sendgridService.sendForgotPasswordEmail({
      emailTo: body.email,
      token,
    });
    return res
      .status(200)
      .send(`Forgot password email send with success to ${body.email}`);
  }
);

router.post("/forgotPassword", async (req: Request, res: Response, next) => {
  const body: ForgotPasswordModel = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);

  const payload = await JwtTokenService.verifyJwtAccessToken(token);
  if (!payload) return res.status(401).send({ message: "Unauthorized" });

  const user = await userService.get(payload.sub); // BY ID
  if (!user) return res.status(300).send({ message: "User not found." });

  const encryptPassword = CryptoJS.AES.encrypt(
    body.password,
    process.env.ENCRYPT_PASSWORD
  ).toString();

  const userSaved = await userService.save({
    ...user,
    password: encryptPassword,
  });
  const accessToken = await JwtTokenService.generateJwtAccessToken({
    sub: userSaved.id,
    email: userSaved.email,
  });

  return res.status(200).send({
    id: userSaved.id,
    email: userSaved.email,
    name: userSaved.name,
    accessToken,
  });
});

export default router;
