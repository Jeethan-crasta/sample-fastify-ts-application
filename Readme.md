
# sample-fastify-ts-application

This directory contains sample fastify application.

## Request-response-life-cycle


Client  
→ Plugins  
→ Hooks  
→ Routes  
→ Controller  
→ Service  
→ Database(containerized PostgreSQL)  
→ Controller  
→ Reply 
 



## Project Structure

### fastify-ts-api

```text
fastify-ts-api/
├── db/
│   └── init.sql                    # Database initialization
│
├── src/
│   ├── controller/
│   │   └── user.controller.ts      # HTTP request/response handling
│   │
│   ├── routes/
│   │   └── user.route.ts           # Route definitions
│   │
│   ├── schemas/
│   │   └── user.schema.ts          # Fastify JSON schemas
│   │
│   ├── service/
│   │   └── user.service.ts         # Business logic
│   │
│   ├── types/
│   │   ├── fastify.d.ts            # Fastify type augmentation
│   │   └── user.types.ts           # Domain types & interfaces
│   │
│   ├── plugins/
│   │   ├── db.ts                   # PostgreSQL plugin
│   │   ├── error-handler.ts        # Global error handler
│   │   └── swagger.ts              # Swagger / OpenAPI plugin
│   │
│   ├── utils/
│   │   ├── AppError.ts              # Custom application error
│   │   └── userCreatedWebhook.ts    # Webhook utility
│   │
│   ├── docs/
│   │   └── openapi.yaml             # OpenAPI 3.0.3 specification
│   │
│   ├── tests/
│   │   ├── unit/                    # Unit tests (mocked deps)
│   │   └── integration/             # Integration tests (real DB + HTTP)
│   │
│   ├── app.ts                       # Fastify app builder
│   └── server.ts                    # Application entry point
│
├── docker-compose.yml               # Production Docker Compose
├── docker-compose.test.yml          # Test Docker Compose
├── Dockerfile                       # Multi-stage Dockerfile
├── vitest.config.ts                 # Vitest configuration
├── package.json
├── tsconfig.json
└── README.md

```

## Docker API Management

### Start API (Production)
```bash
docker compose up --build -d
```

### Docker stop API command
```bash
docker compose down
```

# Application Testing

### Unit Tests

```bash
npm run test:unit
```

### Integration Tests

```bash
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
```
### Test Scripts

```bash
"scripts": {
  "test": "vitest",
  "test:unit": "vitest run src/tests/unit",
  "test:integration": "vitest run src/tests/integration"
}
```

## API Documentation

### OpenAPI Specification
openapi documentation version used is **OpenAPI 3.0.3**.

- **OpenAPI YAML file:**  [openapi.yaml](https://github.com/Jeethan-crasta/sample-fastify-ts-application/blob/main/src/docs/openapi.yaml)

- **Swagger UI:**  
  http://localhost:3000/docs

> The Swagger UI is only enabled in dev environments.

---

## Application Schemas

- **Schemas:** [schemas](https://github.com/Jeethan-crasta/sample-fastify-ts-application/tree/main/src/schemas)


