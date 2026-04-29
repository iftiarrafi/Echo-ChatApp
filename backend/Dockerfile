# ── Stage 1: Builder ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package.json package-lock.json ./

# Install ALL dependencies (including devDependencies)
RUN npm ci

# ── Stage 2: Production ──────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Copy only the package manifests and install production deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy application source from builder context
COPY . .


EXPOSE 3001

CMD ["node", "index.js"]

