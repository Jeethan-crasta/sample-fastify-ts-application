## 🏗️ Request-response-life-cycle

Client  
→ Plugins  
→ Hooks  
→ Routes  
→ Controller  
→ Service  
→ (Database / In-memory)  
→ Controller  
→ Reply  

---

## 🧱 Project Structure

# fastify-ts-api

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

### ▶️ Start the API
```bash
docker compose up --build

docker compose down


docker compose build --no-cache
docker compose up

```


