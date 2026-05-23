import bcrypt from "bcrypt";
import pool from "../../config/db.js";
import jwt from "jsonwebtoken";
import type { signupUserPayload } from "../../types/auth.type.js";
export const signupUser = async (payload: signupUserPayload) => {
  const { name, email, password, role } = payload;

  if (!name || !email || !password || !role) {
    throw {
      statusCode: 400,
      message: "All fields are required",
      errors: "Missing fields",
    };
  }

  // check existing user
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  if (existingUser.rows.length > 0) {
    throw {
      statusCode: 409,
      message: "User already exists",
      errors: "Duplicate email",
    };
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user
  const result = await pool.query(
    `
      INSERT INTO users (
        name,
        email,
        password,
        role
      )
      VALUES ($1, $2, $3, $4)

      RETURNING
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    `,
    [name, email, hashedPassword, role],
  );

  return result.rows[0];
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw {
      statusCode: 400,
      message: "Email and password required",
      errors: "Missing credentials",
    };
  }
  const result = await pool.query(
    `
      SELECT *
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw {
      statusCode: 404,
      message: "User not found",
      errors: "Invalid email",
    };
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw {
      statusCode: 401,
      message: "Invalid credentials",
      errors: "Password incorrect",
    };
  }
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      role: user.role,
    },

    process.env.JWT_SECRET as string,

    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};
