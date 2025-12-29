import Fastify from "fastify";
import errorHandler from "./plugins/error-handler";
import userRoutes from "./modules/user/user.route";
import dbPlugin from "./plugins/db";
import swaggerPlugin from "./plugins/swagger";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(errorHandler);
  app.register(dbPlugin);
  app.register(swaggerPlugin);
  app.register(userRoutes, { prefix: "/api" });

  return app;
}