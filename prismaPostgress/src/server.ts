import app from "./app";
import { prisma } from "./lib/prisma";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
async function main(){
  try{
    await prisma.$connect();
    console.log("Database connected successfully");
    app.listen(PORT,()=>{
      console.log(`Server is running on port ${PORT}`);
    });
  }
  catch(err){
    console.error("error starting server:", err);
    await prisma.$disconnect();
    process.exit(1)
  }
}

main()
