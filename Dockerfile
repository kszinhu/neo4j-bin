#----------------
# Build stage
#----------------
FROM node:20.1-alpine as builder

# ----------------
# Install system dependencies
# ----------------
RUN apk add --no-cache --virtual git

WORKDIR /usr/src/app

COPY package*.json ./
COPY src/core/database/migrations ./prisma/
COPY src/core/database/schema.prisma ./prisma/

# ----------------
# Install dependencies
# ----------------
RUN npm ci --only=production \
  && npm cache clean --force

# ----------------
# Generate prisma client
# ----------------
RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .

RUN npm run build

#----------------
# Run stage
#----------------
FROM node:20.1-alpine as runner

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app .

CMD ["npm", "run", "start:migrate:prod"]