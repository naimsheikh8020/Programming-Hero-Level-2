import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config/index.js";

const app: Application = express();

app.use(express.json());
const PORT = config.port;

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE  IF NOT EXISTS Students(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20) NOT NULL,
      email VARCHAR(20) UNIQUE NOT NULL,
      course VARCHAR(20) NOT NULL,
       age INT NOT NULL CHECK(age > 0),
      
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("Data base Connect successfully");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from Express!");
});

app.post("/api/students", async (req: Request, res: Response) => {
  try {
    const { name, email, course, age } = req.body;
    const result = await pool.query(
      `
      INSERT INTO students (name, email, course, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, course, age],
    );

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/students", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM students;
      `);
    res.status(200).json({
      success: true,
      message: "All the students retrive successfuly",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/api/students/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT * FROM students WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student Not Found",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Student retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.patch("/api/students/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, course, age } = req.body;
  try {
    const checkUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
        data: {},
      });
    }
    const result = await pool.query(
      `
      UPDATE students
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        course = COALESCE($3, course),
        age = COALESCE($4, age),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *`,
      [name, email, course, age, id],
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/api/students/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const checkUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);
    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
        data: {},
      });
    }
    await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
