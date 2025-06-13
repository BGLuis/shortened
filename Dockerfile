FROM node:22-alpine AS desc

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM node:22-alpine AS build

WORKDIR /app
COPY --from=desc /app ./
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
COPY --from=build /app ./
CMD ["npm", "run", "start:dev"]
