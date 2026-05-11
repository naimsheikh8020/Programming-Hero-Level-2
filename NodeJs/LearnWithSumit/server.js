const http = require("http");

const sever = http.createServer((req, res)=>{
    res.setHeader("Content-Type", "text/html")
    res.write("<h2>Hello World</h2>");
    res.end(); 
})


sever.listen(5000,()=>{
    console.log("Server is running on port 5000");
})
