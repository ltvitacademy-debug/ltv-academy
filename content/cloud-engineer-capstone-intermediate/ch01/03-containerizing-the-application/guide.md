# Lesson 3 — Containerizing the Application

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 3 of 16**

## What you'll learn

- Why containerizing the storefront app comes before any Terraform or pipeline work
- A real multi-stage Dockerfile for the app, including why single-stage would be the wrong call here
- A `.dockerignore` scoped to this specific Node.js codebase
- How Theo tests the image locally, before it touches any infrastructure at all

## Why this has to happen first

Right now, Driftwood's storefront app runs the way it did at the end of the Beginner project:
started directly on the Azure VM's OS by a systemd service, with Node.js and its dependencies
installed straight onto that machine. That's exactly the kind of setup Casey objects to — it only
runs correctly because of whatever got installed on that one VM, in whatever order.

Lesson 4's Terraform provisions an AKS cluster, and Lesson 5's pipeline builds and deploys an
image — but neither of those can do anything until there's an image to deploy. Containerizing the
app is the dependency everything else in this project sits on top of.

## A multi-stage Dockerfile for the storefront app

The app is a Node.js/Express service. A single-stage build would ship the full build toolchain —
dev dependencies, a bundler, test runners — inside the production image. A multi-stage build
keeps the build tools in one disposable stage and ships only the result:

```dockerfile
# Stage 1: install everything, including devDependencies, and build
FROM node:20.17.0-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: install only production dependencies, copy built output
FROM node:20.17.0-slim AS runtime
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/server.js"]
```

`build` runs the full `npm ci`, including the dev dependencies needed to compile the app's
TypeScript into `dist/`. `runtime` resolves its own production-only dependency tree from scratch
and pulls in nothing from `build` except the compiled `dist/` folder — the compiler, the test
runner, and the npm cache never exist in the shipped image at all.

## `.dockerignore` for this codebase

```
.dockerignore
---------------
.git
node_modules
npm-debug.log
Dockerfile
.dockerignore
dist
*.md
.env
```

Without this, the build context would include a stale local `dist/` or a developer's `.env` file,
either of which could silently poison a build — or, worse, get copied into an image by an
accidental `COPY . .` and ship a secret nobody meant to ship.

## Building and testing locally

Before Terraform or the pipeline exist, Theo proves the image works the same way the VM did:

```bash
docker build -t driftwood-storefront:local .
docker run -p 8080:8080 driftwood-storefront:local
curl http://localhost:8080/healthz
```

A clean `200 OK` from `/healthz` is the bar for this lesson — nothing about AKS, Terraform, or the
pipeline matters yet if the container itself doesn't run the app correctly.

## Key terms

| Term | Meaning |
|---|---|
| Multi-stage build | A Dockerfile with more than one `FROM`, separating build tools from the shipped runtime image |
| `COPY --from=build` | Pulls specific built artifacts out of an earlier stage without carrying over that stage's other layers |
| Build context | Everything in the build directory sent to the Docker daemon; trimmed with `.dockerignore` |
| Smoke test | A minimal check (like hitting `/healthz`) that the running container actually works |

## Lab

Write the two-stage Dockerfile above from memory, then deliberately break the instruction order —
move `COPY . .` before `COPY package.json package-lock.json ./` — and predict what happens to the
build cache on the next source-code-only change.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what exactly does `runtime` in
this Dockerfile end up containing, and why does it run its own `npm ci --omit=dev` instead of
copying `node_modules` from `build`?
