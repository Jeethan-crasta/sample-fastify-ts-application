import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserService } from "../../service/user.service";
import { AppError } from "../../utils/AppError";
import type { Pool } from "pg";
import type { FastifyBaseLogger } from "fastify";
import * as webhook from "../../utils/userCreatedWebhook";

// mock webhook
vi.mock("../../utils/userCreatedWebhook", () => ({
  callUserCreatedWebhook: vi.fn(),
}));

describe("UserService (unit)", () => {
  let dbMock: Pick<Pool, "query">;
  let loggerMock: FastifyBaseLogger;
  let service: UserService;

  beforeEach(() => {
    dbMock = {
      query: vi.fn(),
    } as any;

    loggerMock = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
      trace: vi.fn(),
      fatal: vi.fn(),
      child: vi.fn().mockReturnThis(),
    } as any;

    service = new UserService(dbMock as Pool, loggerMock);
  });

  it("creates a user successfully and triggers webhook", async () => {
    (dbMock.query as any).mockResolvedValue({
      rows: [{ id: 1, name: "John", email: "john@test.com" }],
    });

    const result = await service.createUser({
      name: "John",
      email: "john@test.com",
    });

    expect(result).toEqual({
      id: 1,
      name: "John",
      email: "john@test.com",
    });

    expect(dbMock.query).toHaveBeenCalledOnce();
    expect(webhook.callUserCreatedWebhook).toHaveBeenCalledOnce();
    expect(webhook.callUserCreatedWebhook).toHaveBeenCalledWith(loggerMock);
  });

  it("throws 409 error if user already exists", async () => {
    (dbMock.query as any).mockRejectedValue({
      code: "23505",
    });

    await expect(
      service.createUser({
        name: "John",
        email: "john@test.com",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      service.createUser({
        name: "John",
        email: "john@test.com",
      })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  it("throws 500 error on unknown DB error", async () => {
    (dbMock.query as any).mockRejectedValue(new Error("db down"));

    await expect(
      service.createUser({
        name: "John",
        email: "john@test.com",
      })
    ).rejects.toMatchObject({ statusCode: 500 });
  });

  it("returns users with pagination", async () => {
    (dbMock.query as any).mockResolvedValue({
      rows: [
        { id: 1, name: "John", email: "john@test.com" },
        { id: 2, name: "Jane", email: "jane@test.com" },
      ],
    });

    const users = await service.getUsers(10, 0);

    expect(users).toHaveLength(2);
    expect(dbMock.query).toHaveBeenCalledOnce();
  });

  it("caps pagination values correctly", async () => {
    (dbMock.query as any).mockResolvedValue({ rows: [] });

    await service.getUsers(1000, -10);

    expect(dbMock.query).toHaveBeenCalledWith(
      expect.any(String),
      [100, 0]
    );
  });
});
