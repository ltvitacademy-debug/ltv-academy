# Lesson 3 — Multi-Stage Builds: Separating Build Tools from the Runtime Image

**Chapter 1 · Docker for Platform Engineers · Lesson 3 of 4**

## What you'll learn

- Why a single-stage Dockerfile for a compiled language ships the
  entire toolchain it was built with, not just the result
- How to write a **multi-stage build**: multiple `FROM` instructions
  in one Dockerfile, each starting a named, independent stage
- How `COPY --from=<stage>` pulls only specific built artifacts
  forward into the final image, leaving everything else behind
- How this applies even to interpreted languages like Node, where the
  "build tools" being discarded are dev dependencies and source maps,
  not a compiler

Lesson 2 made a Dockerfile fast to rebuild. This lesson makes the
image it produces small and safe to ship — by making sure the only
things that end up in the final layer stack are the things the running
application actually needs at runtime.

## The problem: one stage, one bloated image

Consider a Go service compiled with the full Go toolchain:

```dockerfile
# Single-stage: ships the entire Go toolchain in the final image
FROM golang:1.23
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o server .
CMD ["./server"]
```

This builds correctly, but `golang:1.23` is a full build environment —
the compiler, the standard library source, build caches, and a
complete Debian userland — sitting underneath a final binary that
doesn't need any of it to run. Every one of those layers is still
part of the shipped image, because nothing in a single-stage build
ever removes them. You've compiled a 10MB binary and shipped it
wrapped in a gigabyte of tooling it will never call again.

## Multiple `FROM` instructions, one Dockerfile

A multi-stage build solves this by giving each phase of the build its
own stage, each with its own `FROM`, inside one Dockerfile:

```dockerfile
# Stage 1: build, using the full toolchain
FROM golang:1.23 AS build
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server .

# Stage 2: runtime, starting completely fresh
FROM gcr.io/distroless/static-debian12
COPY --from=build /app/server /server
ENTRYPOINT ["/server"]
```

`FROM golang:1.23 AS build` names that stage `build` — any name
works, it's just a label you reference later. The second `FROM`
starts an entirely new, unrelated base image; none of the first
stage's layers carry over automatically. `COPY --from=build
/app/server /server` is the one line doing the real work: it reaches
back into the `build` stage's filesystem and copies out exactly one
file — the compiled binary — into the new, otherwise-empty runtime
image. Everything else from the `build` stage — the Go compiler, the
module cache, the source files — simply never exists in the final
image, because the final image was never built from that stage's
layers in the first place.

`docker build` still runs every stage (unless you target one directly
with `--target`), but only the final `FROM` in the file determines
what `docker build -t myapp .` actually tags and ships. You can also
name an earlier stage as a build target for debugging:

```
docker build --target build -t myapp:debug-build-stage .
```

## This isn't just for compiled languages

The same pattern pays off for Node.js, where there's no compiler
involved but there are still artifacts you don't want in the final
image — `devDependencies` (test runners, bundlers, type checkers),
build output you only need in intermediate form, and the npm cache
itself:

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
CMD ["node", "dist/server.js"]
```

The `build` stage runs the full `npm ci` — including dev dependencies
like a TypeScript compiler or bundler — because it needs them to
produce `dist/`. The `runtime` stage installs only production
dependencies from scratch and copies in just the `dist/` folder from
`build`. Note that `runtime` still runs its own `npm ci --omit=dev`
rather than copying `node_modules` from `build` — mixing dev and
production installs between stages is a common source of subtly
broken runtime images, so each stage resolves its own dependency tree
for the environment it actually represents.

## Picking a minimal runtime base

Once the build artifact is the only thing that has to carry forward,
you're free to choose the smallest, most locked-down runtime base
that can actually run it — `distroless` images (no shell, no package
manager, nothing but the language runtime or, for a static binary,
nothing at all) or an `-alpine`/`-slim` variant, independent of
whatever the build stage required. That decoupling — build
environment and runtime environment no longer have to be the same
image — is the entire point of the pattern, and it's also a real
security improvement: a runtime image with no shell and no package
manager gives an attacker who gets code execution inside the container
far less to work with.

## Key terms

| Term | Meaning |
|---|---|
| Multi-stage build | A Dockerfile with more than one `FROM`, where each stage is an independent build phase with its own base image |
| `AS <name>` | Names a stage so a later stage can reference it, e.g. `FROM golang:1.23 AS build` |
| `COPY --from=<stage>` | Copies specific files out of a named earlier stage's filesystem, without carrying over any of that stage's other layers |
| Distroless image | A minimal runtime base with no shell, package manager, or OS userland beyond what the application needs to run |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: in a
multi-stage Dockerfile, why don't the `build` stage's layers
automatically end up in the final image, and what exactly does `COPY
--from=build` carry forward?
