import { createServer, IncomingMessage, Server } from "node:http";
import { routHandler } from "./routes/route";

const server: Server  = createServer((req : IncomingMessage, res)=>
{
    routHandler(req, res);
    
})

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
})