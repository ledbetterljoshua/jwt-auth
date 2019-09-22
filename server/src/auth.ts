import "dotenv/config";
import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

console.log(process.env.ACCESS_TOKEN_SECRET);

export const createAccessToken = (user: User): string => {
  return sign({ userId: user.id }, ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};
export const createRefreshToken = (user: User): string => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "5m"
    }
  );
};
