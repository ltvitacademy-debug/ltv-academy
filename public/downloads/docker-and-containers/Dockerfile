# ---------------------------------------------------------------------------
# Multi-stage Dockerfile template -- Northbridge Retail's `checkout` service
# (Node.js API). Pattern taught in Chapter 3 (Multi-Stage Builds) and
# hardened per Chapter 7 (Resource Limits, Non-Root & Basic Hardening).
#
# Swap the npm/node specifics for your own stack -- the SHAPE of this file
# (separate build stage -> slim runtime stage -> non-root user -> HEALTHCHECK)
# is the part that's reusable.
# ---------------------------------------------------------------------------

# ---- build stage -----------------------------------------------------------
# Full Node toolchain lives only here. None of this rides into the final
# image -- see the runtime stage's COPY --from=build below.
FROM node:20 AS build
WORKDIR /app

# Copy manifest files first so `npm ci` is its own cached layer (Chapter 3,
# Lesson 12: Layers & Caching). Changing application code later won't bust
# this layer unless package*.json itself changes.
COPY package.json package-lock.json ./
RUN npm ci

# Now copy the rest of the source and build. If you only need to run tests
# in CI rather than ship a build artifact, this is also where `RUN npm test`
# would go before the build step.
COPY . .
RUN npm run build

# ---- runtime stage ----------------------------------------------------------
# Fresh, minimal base. The build stage's full node:20 image, dev
# dependencies, and unbuilt TypeScript source are all left behind.
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies in THIS stage -- the build stage's
# node_modules (which includes devDependencies like the TypeScript compiler
# and test runner) never gets copied in.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Pull only the compiled output out of the build stage. Nothing else from
# that stage -- not its node_modules, not its source tree -- makes it here.
COPY --from=build /app/dist ./dist

# Chapter 7, Lesson 29: run as the non-root `node` user the official Node
# image already provides. --chown matters -- without it these files are
# still owned by root and `node` can't read them.
COPY --chown=node:node --from=build /app/dist ./dist
USER node

EXPOSE 4000

# Chapter 6, Lesson 25: tell Docker (and Compose's `depends_on:
# condition: service_healthy`) how to tell if this container is actually
# serving traffic, not just running.
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/healthz', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/server.js"]
