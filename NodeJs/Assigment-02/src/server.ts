import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import pool from "./config/db.js";
import createUsersTable from "./db/userTable.js";
import createIssuesTable from "./db/issueTable.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {

  try {
    console.log("Database connected");


    // create tables
    await createUsersTable();

    await createIssuesTable();


    // server start
    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  } catch (error) {

    console.log(
      "Server Error",
      error
    );

  }

};

startServer();