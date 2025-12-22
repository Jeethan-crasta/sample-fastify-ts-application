import Fastify from "fastify";
import errorHandler from "./plugins/error-handler";
import userRoutes from "./modules/user/user.route";

export async function buildApp() {
    const app = Fastify({logger: true});

    await app.register(errorHandler);
    await app.register(userRoutes, {prefix: "/api"});

    return app;
    
}