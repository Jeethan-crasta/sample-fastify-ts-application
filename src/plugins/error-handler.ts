import type { FastifyPluginAsync } from "fastify";
import { AppError } from "../utils/AppError";

const errorHandler: FastifyPluginAsync = async (app) => {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message
      });
    }

    app.log.error(error);

    reply.status(500).send({
      message: "Internal Server Error"
    });
  });
};

export default errorHandler;
