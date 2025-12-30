import type { FastifyPluginAsync } from "fastify";
import { UserController } from "./user.controller";
import { createUserSchema } from "./user.schema";
import { CreateUserBody } from "./user.types";
import { UserService } from "./user.service";

const userRoutes: FastifyPluginAsync = async (app) => {
  const userService = new UserService(app.db,app.log);
  const controller = new UserController(userService);

  app.post<{ Body: CreateUserBody }>("/users",{schema: createUserSchema},controller.create.bind(controller));
  app.get("/users", controller.list.bind(controller));
  
  app.get("/health", async () => ({ status: "ok" }));

};

export default userRoutes;
