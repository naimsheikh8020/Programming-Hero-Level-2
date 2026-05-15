import express, { type Application, type Request, type Response } from "express"

const app : Application = express()
const PORT = 5000

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World")
  res.status(200).json({
    message : "express Server",
    "author": "Naim"
  })
})

app.post("/", async(req: Request, res:Response)=>{
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log("Server is running in 3000")
})