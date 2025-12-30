import { FastifySchema } from "fastify";

export const createUserSchema: FastifySchema = {
  body: {
  type: "object",
  required: ["name", "email"],
  additionalProperties: false,
  properties: {
    name: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" }
  }
},
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        email: { type: "string" }
      }
    }
  }
};
