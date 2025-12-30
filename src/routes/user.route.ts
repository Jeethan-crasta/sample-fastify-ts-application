import type { FastifyPluginAsync } from "fastify";
import { UserController } from "../controller/user.controller";
import { createUserSchema } from "../schemas/user.schema";
import { CreateUserBody } from "../types/user.types";
import { UserService } from "../service/user.service";

const userRoutes: FastifyPluginAsync = async (app) => {
  const userService = new UserService(app.db,app.log);
  const controller = new UserController(userService);

  app.post<{ Body: CreateUserBody }>("/users",{schema: createUserSchema},controller.create.bind(controller));
  app.get("/users", controller.list.bind(controller));
  
  app.get("/health", async () => ({ status: "ok" }));

};

export default userRoutes;
