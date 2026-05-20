import config from "../../config/index.js";
import type { RUser } from "../../types/index.js";
import jwt from "jsonwebtoken"

export const signToken = (payload: RUser & {id:number}) =>{
  // accessToke ==> Data Access
  const accessToken = jwt.sign(payload, config.JWT_SECRET ,{
    expiresIn: "1d"
  })

  // refreshToken ==> again generate accessToken 
  const refreshToken = jwt.sign(payload, config.refresh_secret,{
    expiresIn:"7d"
  })
  return {accessToken, refreshToken}
  
}