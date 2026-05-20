import dotenv from "dotenv";
import { env } from "node:process";

dotenv.config({quiet: true})

const config = {
  port: env.PORT as string,
  database_url : env.database_url as string,
  node_env : env.node_env as string,
}

export default config;