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

# ----------------
# Install dependencies
# ----------------
RUN npm ci --only=production \
  && npm cache clean --force

COPY . .

RUN npm run build

#----------------
# Run stage
#----------------
FROM node:20.1-alpine as runner

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]