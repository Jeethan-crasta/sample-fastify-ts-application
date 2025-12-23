## Request-response-life-cycle

Client  
→ Plugins  
→ Hooks  
→ Routes  
→ Controller  
→ Service  
→ (In-memory)  
→ Controller  
→ Reply  



## Project Structure

### fastify-ts-api

```text
fastify-ts-api/
├── node_modules/
│
├── src/
│   ├── modules/
│   │   └── user/
│   │       ├── user.controller.ts   # Handles HTTP request/response
│   │       ├── user.route.ts        # Route definitions
│   │       ├── user.schema.ts       # Fastify JSON schemas (validation)
│   │       ├── user.service.ts      # Business logic
│   │       └── user.types.ts        # TypeScript types & interfaces
│   │
│   ├── plugins/
│   │   └── error-handler.ts         # Global error handling plugin
│   │
│   ├── utils/
│   │   └── AppError.ts              # Custom application error class
│   │
│   ├── app.ts                       # Builds and configures Fastify instance
│   └── server.ts                    # Application entry point
│
├── .dockerignore                    # Files ignored by Docker
├── .gitignore                       # Files ignored by Git
├── docker-compose.yml               # Docker Compose configuration
├── Dockerfile                       # Docker image definition
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Dependency lock file
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation

```

## Docker API Management

### Docker start API command
```bash
docker compose up --build -d
```

### Docker stop API command
```bash
docker compose down
```

## API Documentation

**Base URL:** `http://localhost:3000/api`

### Health Check

* **Endpoint:** `GET /api/health`
* **Action:**
    ```bash
    curl -X GET http://localhost:3000/api/health
    ```
* **Success Response (200 OK):**
    ```json
    {
      "status": "ok"
    }
    ```

### Create User

* **Endpoint:** `POST /api/users`
* **Headers:** `Content-Type: application/json`
* **Action:**
    ```bash
    curl -X POST http://localhost:3000/api/users \
      -H "Content-Type: application/json" \
      -d '{
        "name": "John Doe",
        "email": "john.doe@test.com"
      }'
    ```
* **Success Response (201 Created):**
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@test.com"
    }
    ```
* **Validation Error (400 Bad Request):**
    ```json
    {
      "statusCode": 400,
      "error": "Bad Request",
      "message": "body must have required property 'email'"
    }
    ```

### Get All Users

* **Endpoint:** `GET /api/users`
* **Action:**
    ```bash
    curl -X GET http://localhost:3000/api/users
    ```
* **Success Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@test.com"
      }
    ]
    ```


