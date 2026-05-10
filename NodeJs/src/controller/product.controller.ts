import type { IncomingMessage, ServerResponse } from "node:http";

export const productController = (req: IncomingMessage, res: ServerResponse )=>{
    const url = req.url;    
    const method = req.method;
    if(url === "/products" && method === "GET"){
        const products = [
            { id: 1, name: "Product 1", price: 10 },
            { id: 2, name: "Product 2", price: 20 },
            { id: 3, name: "Product 3", price: 30 },
        ];
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ message: "Products retrieved successfully", "data": products }));
    }
    
}