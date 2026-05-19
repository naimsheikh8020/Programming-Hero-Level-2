import type { Response } from "express";


export function sendResponse<T>(res:Response, {message, data, error}:{message:unknown, data?:T, error?:boolean}, status=200):void{
  res.status(200).json({
    success: error ? false : true,
    message : message,
    data : error ? undefined : data,
  })
}