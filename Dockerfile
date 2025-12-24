# -------- Build stage --------

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm ci

COPY src ./src

RUN npm run build

# -------- Runtime stage --------

FROM node:20-alpine AS runner

WORKDIR /app

# Install only production dependencies by omitting dev dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy only compiled output
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
