import { createServer, IncomingMessage, Server } from "node:http";

const server: Server  = createServer((req : IncomingMessage, res)=>
{
    // console.log(req.url);
    // console.log(req.method);
    const url = req.url;    
    const method = req.method;
    if(url === "/" && method === "GET"){
     
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ message: "This is root route" }));
    }
    else if (url?.startsWith("/products")) {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ message: "This is Product route" }));
    }
    else{
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ error: "Route not found" }));
    }
})

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
})