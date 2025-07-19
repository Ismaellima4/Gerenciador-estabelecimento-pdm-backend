# Build stage
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia só o package.json e instala só produção
COPY package*.json ./
RUN npm install --production

# Copia só a pasta dist do builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/src/main"]
