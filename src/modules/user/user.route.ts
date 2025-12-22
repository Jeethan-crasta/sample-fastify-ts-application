import type { FastifyPluginAsync } from "fastify";
import { UserController } from "./user.controller";
import { createUserSchema } from "./user.schema";
import { CreateUserBody } from "./user.types";


const controller = new UserController();

const userRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: CreateUserBody }>("/users",{schema: createUserSchema},controller.create);
  app.get("/users", controller.list);
  app.get("/health", async () => ({ status: "ok" }));

};

export default userRoutes;
