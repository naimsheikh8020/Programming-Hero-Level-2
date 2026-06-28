import jwt from "jsonwebtoken";

export const createAccessToken = (userId: string, role: "user" | "admin", tokenVersion: number) => {
  const payload = {
    sub: userId,
    role: role,
    tokenVersion: tokenVersion
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "1h" });
};

export const createRefreshToken = (userId: string, role: "user" | "admin", tokenVersion: number) => {
  const payload = {
    sub: userId,
    role: role,
    tokenVersion: tokenVersion
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
};
