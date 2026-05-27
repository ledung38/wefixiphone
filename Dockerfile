# Stage 1: Build
FROM node:23.6.1-alpine AS builder
WORKDIR /app

# Copy package.json & lock file
COPY package*.json ./

# Cài cả dev + prod dependencies để build
RUN yarn install

# Copy source code
COPY . .

# Build project
RUN yarn build

# Stage 2: Run (production)
FROM node:23.6.1-alpine AS runner
WORKDIR /app

# Copy build output + public folder + package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Cài production dependencies
RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]
