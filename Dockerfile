FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY astro.config.mjs tsconfig.json ./
COPY src/ src/
COPY public/ public/
COPY docs/ docs/
RUN npm run build

FROM nginx:1.27-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/conf.d/security-headers.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

EXPOSE 80
