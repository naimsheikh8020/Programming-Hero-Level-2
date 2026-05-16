import { pool } from "../../db";
import type { Iuser } from "./user.interface";


const creatUserIntoDB = async(payload : Iuser)=>{
  const {name, email, password, age} = payload
  const result = await pool.query(
      `
      INSERT INTO users(name, email, password, age)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [name, email, password, age]
    );
    return result;
}

const getAllUserFromDB = async()=>{
  const result = await pool.query(`
     SELECT * FROM users 
      `);
    return result
}

const getSigleUserFromDB = async(id: string)=>{
  const result = await pool.query(
      `
      SELECT * FROM users WHERE id=$1
      `,
      [id],
    );
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
  return {checkUser, result}
}


export const userService = {
  creatUserIntoDB,
  getAllUserFromDB,
  getSigleUserFromDB,
  upddatUserFromDB,
  deleteUserFromDB
}
