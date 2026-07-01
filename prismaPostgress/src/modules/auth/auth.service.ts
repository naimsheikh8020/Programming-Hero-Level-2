import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  // const accessToken = jwt.sign({ jwtPayload }, config.jwt_access_screct, {
  //   expiresIn: config.jwt_access_expires_in!,
  // } as SignOptions);

  const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_screct, config.jwt_access_expires_in as SignOptions);


  const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_screct, config.jwt_refresh_expires_in as SignOptions);

  return { accessToken, refreshToken };
};

export const authService = {
  loginUser,
};
