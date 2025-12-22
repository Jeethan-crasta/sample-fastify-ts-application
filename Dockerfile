FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

FROM node:20-alpine AS runner

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]