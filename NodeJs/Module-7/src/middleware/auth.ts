import {  type NextFunction, type Request, type Response } from "express";


const auth = ()=>
{
  return async (req:Request, res: Response, next: NextFunction)=>{
  console.log("This is Proteced Route");
  const token = req.headers.authorization
  if(!token){
    res.status(401).json({
      success: false,
      message: "Unauthorized Access!!"
    })
  }
  next()
} 
}

export default auth