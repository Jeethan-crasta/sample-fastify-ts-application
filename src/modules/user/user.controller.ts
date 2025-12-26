import type { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";


export class UserController {
  constructor(private userService: UserService) {}
  async create(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const user = await this.userService.createUser(request.body as any);
    reply.status(201).send(user);
  }

  async list(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const users = await this.userService.getUsers();
    reply.send(users);
  }
}
