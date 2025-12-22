import type { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  async create(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const user = await userService.createUser(request.body as any);
    reply.status(201).send(user);
  }

  async list(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const users = await userService.getUsers();
    reply.send(users);
  }
}
