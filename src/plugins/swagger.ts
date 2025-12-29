import fp from "fastify-plugin";
import path from "path";

export default fp(async (fastify) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const swagger = await import("@fastify/swagger");
  const swaggerUI = await import("@fastify/swagger-ui");

  const docsDir = path.resolve(process.cwd(), "src/docs");

  await fastify.register(swagger, {
    mode: "static",
    specification: {
      path: path.join(docsDir, "openapi.yaml"),
      baseDir: docsDir
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
