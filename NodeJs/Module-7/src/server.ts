import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";

const app: Application = express();
const PORT = config.port;

app.use(express.json());
app.use(express.text());

const pool = new Pool({
  connectionString: config.connection_string,
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE  IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,
      
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
  // res.send("Hello World")
  res.status(200).json({
    message: "express Server",
    author: "Naim",
  });
});

app.post("/api/user", async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, password, age]
    );

    res.status(201).json({
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

app.get('/api/users', async(req: Request, res: Response)=>{
  try{
    const result = await pool.query(`
     SELECT * FROM users 
      `)
      res.status(200).json({
        success: true,
        message: "User retrived successfully!",
        data: result.rows
      })
  } 
  catch(error: any){
    res.status(500).json({
        success: false,
        message: error.message,
        error: error
      })
  }
})


app.get('/api/users/:id', async(req: Request, res: Response)=>{
  const {id} = req.params;
  try {
    const result = await pool.query(`
      SELECT * FROM users WHERE id=$1
      `, [id]);

    if(result.rows.length === 0){
      res.status(404).json({
      success: false,
      message: "User not found",
      data: {}
    })
    }
    else{
      res.status(200).json({
      success: true,
      message: "Get Singel User",
      data : result.rows[0]
    })
    }
    
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})


app.patch("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, age } = req.body;

  try {

    const checkUser = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );

    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        age = COALESCE($4, age),
        updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `,
      [name, email, password, age, id]
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

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const checkUser = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );

    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await pool.query(
      `DELETE FROM users WHERE id = $1`,
      [id]
    );

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


app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
