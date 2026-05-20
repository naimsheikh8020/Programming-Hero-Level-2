import { sql } from "../../db/index.js";
import type { RUser } from "../../types/index.js";
import bcrypt from "bcrypt";

class AuthService {
  async createUser(user: RUser & { password: string }) {
    
    const { name, email, password, age, role } = user;

    const hash = await bcrypt.hash(password, 10);

    const res = await sql`
      INSERT INTO users (name, email, passwordHash, age, role)
      VALUES (
        ${name},
        ${email},
        ${hash},
        ${age},
        COALESCE(${role}, 'user')
      )
      RETURNING id, name, age, role
    `;

    return res[0];
  }
}

export default new AuthService()