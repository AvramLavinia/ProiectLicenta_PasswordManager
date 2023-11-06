import jwtAccess from "../auth/jwt/jwt.access";

export default function AccessMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(403).send({ message: "Unauthorized" });

  const verify = jwtAccess.verifyJwtAccessToken(token);

  if (typeof verify === "boolean") {
    return res.status(403).send({ message: "Unauthorized" });
  }
  next();
}
