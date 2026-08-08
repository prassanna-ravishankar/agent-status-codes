FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS build

WORKDIR /app

COPY pyproject.toml uv.lock zensical.toml ./
RUN uv sync --frozen --no-cache

COPY docs/ docs/
RUN uv run zensical build --clean --strict

FROM nginx:1.27-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/security-headers.conf /etc/nginx/conf.d/security-headers.conf
COPY --from=build /app/site/ /usr/share/nginx/html/

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

EXPOSE 80
