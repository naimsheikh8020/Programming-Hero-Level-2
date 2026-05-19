import app from "./app.js"
import config from "./config/index.js"
import { init } from "./db/index.js"



const main= async ()=>{
  init()
  app.listen(config.port,()=>{
    console.log(`Server is running ${config.port}`)
  })
}

main()