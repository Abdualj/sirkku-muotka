# syntax=docker/dockerfile:1

ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION}

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Install dependencies first so this layer is cached when only source changes.
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Run as a non-root user.
USER node

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
