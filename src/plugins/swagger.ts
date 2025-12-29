import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import path from "path";

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    mode: "static",
    specification: {
      path: path.join(__dirname, "../../docs/openapi.yaml"),
      baseDir: path.join(__dirname, "../../docs")
    }
  });

  await fastify.register(swaggerUI, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false
    }
  });
});
