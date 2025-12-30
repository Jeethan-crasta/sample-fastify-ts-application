import {
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
  expect
} from "vitest";
import { buildApp } from "../../app";

describe("POST /users → GET /users", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  beforeEach(async () => {
    await app.db.query("TRUNCATE TABLE users RESTART IDENTITY");
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("creates a user and returns it in the users list", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/api/users",
      payload: {
        name: "Test User",
        email: "test.user@example.com"
      }
    });

    expect(createResponse.statusCode).toBe(201);

    const listResponse = await app.inject({
      method: "GET",
      url: "/api/users"
    });

    expect(listResponse.statusCode).toBe(200);

    const users = JSON.parse(listResponse.body);

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Test User",
          email: "test.user@example.com"
        })
      ])
    );
  });
});
