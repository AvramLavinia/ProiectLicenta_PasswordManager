import jwt from "jsonwebtoken";

const jwtConstants = {
  secret: "SecretKey",
  expiresIn: "100000000000s",
};

class JwtTokenService {
  async generateJwtAccessToken(object: { sub: string; email: string }) {
    return jwt.sign(object, jwtConstants.secret, {
      expiresIn: jwtConstants.expiresIn,
    });
  }

  async verifyJwtAccessToken(token: string) {
    try {
      const payload = await jwt.verify(token, jwtConstants.secret as string);

      if (typeof payload === "string") {
        return false;
      }
      return payload;
    } catch (error) {
      return false;
    }
  }
}

export default new JwtTokenService();
