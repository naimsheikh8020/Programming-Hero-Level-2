import { sql } from "../../db/index.js";
import type { RUser, User } from "../../types/index.js";
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
  async validateUser(email: string, password: string) {
  const res = await sql`
    SELECT id, name, email, passwordhash, age, role
    FROM users
    WHERE email = ${email}
  `;

  if (!res.length) {
    return null;
  }

  const { passwordhash, ...user } = res[0] as any;

  const isValid = await bcrypt.compare(password, passwordhash);

  return isValid ? user : null;
}
}

export default new AuthService();
