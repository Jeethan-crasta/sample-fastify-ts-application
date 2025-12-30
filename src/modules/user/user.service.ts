import type { CreateUserInput, User } from "./user.types";
import { AppError } from "../../utils/AppError";
import { Pool } from "pg";
import type { FastifyBaseLogger } from "fastify";
import { callUserCreatedWebhook } from "../../utils/userCreatedWebhook";

export class UserService {
  constructor(
    private readonly db: Pool,
    private readonly logger: FastifyBaseLogger
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    try {
      const { rows } = await this.db.query<User>(
        `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING id, name, email
        `,
        [data.name, data.email]
      );

      const user = rows[0];

      // webhook call
      callUserCreatedWebhook(this.logger);

      return user;

    } catch (error: unknown) {
      if ((error as any)?.code === "23505") {
        throw new AppError("User already exists", 409);
      }
      throw new AppError("Failed to create user", 500);
    }
  }

  async getUsers(limit = 20, offset = 0): Promise<User[]> {
    limit = Math.min(Math.max(limit, 1), 100);
    offset = Math.max(offset, 0);
    
    try {
      const { rows } = await this.db.query<User>(
        `
        SELECT id, name, email
        FROM users
        ORDER BY id
        LIMIT $1 OFFSET $2
        `,
        [limit, offset]
      );

      return rows;
    } catch {
      throw new AppError("Failed to fetch users", 500);
    }
  }
}