import type { FastifyPluginAsync, FastifyError } from "fastify";
import { AppError } from "../utils/AppError";

const errorHandler: FastifyPluginAsync = async (app) => {
  app.setErrorHandler(
    (error: FastifyError, _request, reply) => {

      // 1️⃣ Validation errors (AJV)
      if (error.validation) {
        return reply.status(400).send({
          error: "Bad Request",
          message: "Validation error",
          details: error.validation,
        });
      }

      // 2️⃣ Application errors
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({
          error: "Application Error",
          message: error.message,
        });
      }

      // 3️⃣ Unknown / system errors
      app.log.error(error);

      return reply.status(500).send({
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }
  );
};

export default errorHandler;
