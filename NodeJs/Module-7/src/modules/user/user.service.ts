import { pool } from "../../db";
import type { Iuser } from "./user.interface";
import bcrypt from "bcryptjs"
 
const creatUserIntoDB = async(payload : Iuser)=>{
  const {name, email, password, age} = payload

  const hashPasssword = await bcrypt.hash(password,10);


  const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, hashPasssword, age]
    );
    delete result.rows[0].password;
    return result;
}

const getAllUserFromDB = async()=>{
  const result = await pool.query(`
     SELECT * FROM users 
      `);
    delete result.rows[0].password;
    return result
}

const getSigleUserFromDB = async(id: string)=>{
  const result = await pool.query(
      `
      SELECT * FROM users WHERE id=$1
      `,
      [id],
    );
    delete result.rows[0].password;
    return result
}

const upddatUserFromDB = async(id: string, payload: Iuser)=>{
  const {name, email, password, age} = payload
  const checkUser = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
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
    delete result.rows[0].password;
    return {checkUser, result} 
}

const deleteUserFromDB = async(id: string)=>{
  const checkUser = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
  const result = await pool.query(
      `DELETE FROM users WHERE id = $1`,
      [id]
    );
  delete result.rows[0].password;
  return {checkUser, result}
}


export const userService = {
  creatUserIntoDB,
  getAllUserFromDB,
  getSigleUserFromDB,
  upddatUserFromDB,
  deleteUserFromDB
}
