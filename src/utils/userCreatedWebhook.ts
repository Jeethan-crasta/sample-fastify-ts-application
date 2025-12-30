import { request } from "undici";
import type { FastifyBaseLogger } from "fastify";

export async function callUserCreatedWebhook(
  logger: FastifyBaseLogger
) {
  try {
    await request("https://example.com", { method: "GET" });
  } catch (error) {
    logger.warn(
      { err: error },
      "User-created webhook call failed"
    );
  }
}
