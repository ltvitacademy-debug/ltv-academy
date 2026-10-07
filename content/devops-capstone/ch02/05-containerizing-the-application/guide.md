# Containerizing the Application

You've seen what both services do. Now you'll package them as container images that are safe to run in production from the very first build — multi-stage, non-root, and tagged in a way the rest of this course's pipeline can rely on. Every Dockerfile in this lesson is the real one that ships in `services/product-catalog/Dockerfile` and `services/checkout/Dockerfile`.

## What you'll learn

- A multi-stage Dockerfile for `product-catalog` (`node:20-slim`)
- A multi-stage Dockerfile for `checkout` (`python:3.12-slim`)
- Why both run as a non-root user, and what a `.dockerignore` keeps out of the build context
- The image tagging convention this whole capstone uses: `northbridgeacr.azurecr.io/<service>:<git-sha>`

## Multi-stage Dockerfile: `product-catalog`

```dockerfile
# services/product-catalog/Dockerfile

# ---- build stage ----
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# ---- runtime stage ----
FROM node:20-slim
WORKDIR /app
RUN groupadd -r app && useradd -r -g app app
COPY --from=build --chown=app:app /app /app
USER app
EXPOSE 8080
CMD ["node", "server.js"]
```

The build stage installs dependencies and copies in the source. The runtime stage starts fresh from the same slim base image and copies over only what's needed from the build stage — no build cache, no dev dependencies, no leftover npm metadata. `USER app` means the process never runs as root inside the container, even if an attacker finds a way to execute code in it.

## Multi-stage Dockerfile: `checkout`

```dockerfile
# services/checkout/Dockerfile

# ---- build stage ----
FROM python:3.12-slim AS build
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ---- runtime stage ----
FROM python:3.12-slim
WORKDIR /app
RUN groupadd -r app && useradd -r -g app app
COPY --from=build /install /usr/local
COPY --chown=app:app . .
USER app
EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```

Same pattern as `product-catalog`: a build stage runs `pip install` into an isolated prefix, and the runtime stage copies only the installed packages and the application code, not pip's cache or wheel files. Both services end up running as the unprivileged `app` user, listening on port `8080`.

## `.dockerignore`

Without a `.dockerignore`, Docker ships your entire project directory into the build context — including things that should never end up in an image or even touch the Docker daemon.

```
# services/product-catalog/.dockerignore and services/checkout/.dockerignore
.git
.env
node_modules
__pycache__
.pytest_cache
*.md
Dockerfile
.dockerignore
```

Keeping `.env` out matters most: it's where local secrets like the PaymentPro sandbox key live (more on this in Lesson 6), and it should never be baked into an image layer where anyone with pull access to the registry could read it back out.

## Image tagging convention

Every image this capstone builds is tagged with the git SHA of the commit that produced it — never `latest`, and never a hand-picked version number at build time:

```bash
SHA=$(git rev-parse --short HEAD)

docker build -t northbridgeacr.azurecr.io/product-catalog:$SHA services/product-catalog
docker build -t northbridgeacr.azurecr.io/checkout:$SHA services/checkout

docker push northbridgeacr.azurecr.io/product-catalog:$SHA
docker push northbridgeacr.azurecr.io/checkout:$SHA
```

SHA tagging makes every image traceable back to the exact commit it came from — essential once you're debugging a rollback or writing a postmortem (Chapter 5) and need to know precisely what was running. Both images land in the one shared registry, `northbridgeacr.azurecr.io`, that the whole organization uses.

## Image size and security basics

- **Slim base images.** `node:20-slim` and `python:3.12-slim` strip out most of the OS packages a full image carries, shrinking both the attack surface and the pull time.
- **Multi-stage builds.** Compilers, build tools, and dev dependencies stay in the build stage and never reach the image that actually runs in production.
- **Non-root `USER`.** Both Dockerfiles create and switch to an `app` user before `CMD` runs, so a container compromise doesn't hand an attacker root inside the container.
- **Scanning comes next.** These images get scanned by Trivy in the CI pipeline you build in Chapter 4 — a multi-stage, non-root image gives that scan far less to flag in the first place.

## Key terms

- **Multi-stage build** — a Dockerfile with more than one `FROM`, where later stages selectively copy artifacts from earlier ones, keeping the final image lean
- **`USER app`** — switches the container's running process to a non-root, unprivileged user
- **`.dockerignore`** — excludes files (like `.env`, `.git`, `node_modules`) from the build context sent to the Docker daemon
- **SHA tagging** — tagging every image `northbridgeacr.azurecr.io/<service>:<git-sha>` so it's traceable to the exact commit that built it
