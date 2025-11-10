# Multi-stage Dockerfile for Next.js 15 + Prisma (MySQL)
# Uses Debian-based images to avoid OpenSSL issues on Alpine.

# 1) Builder: install deps (incl. dev), generate prisma client, and build next
FROM node:20-bookworm-slim AS builder
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
# Enable pnpm via corepack
RUN corepack enable && apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Only copy package files first for better layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN pnpm prisma generate

# Copy the rest of the app and build
COPY . .
RUN pnpm build

# 2) Runner: minimal production image using Next.js standalone output
FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000
WORKDIR /app

# Copy the standalone server (includes node_modules with production deps) and static assets
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Prisma schema is not required at runtime, but include for safety if code references it
COPY --from=builder /app/prisma ./prisma

# Healthcheck (basic TCP on PORT)
HEALTHCHECK --interval=30s --timeout=5s --retries=5 CMD node -e "require('net').connect(process.env.PORT, '127.0.0.1').on('connect', () => { console.log('ok'); process.exit(0) }).on('error', () => process.exit(1))"

EXPOSE 3000
CMD ["node", "server.js"]

# 3) Migrator: a small target to run prisma migrate deploy against external DB
FROM builder AS migrator
# Reuse builder with dev deps + prisma CLI installed
# Entrypoint will be defined in compose using: pnpm prisma migrate deploy
