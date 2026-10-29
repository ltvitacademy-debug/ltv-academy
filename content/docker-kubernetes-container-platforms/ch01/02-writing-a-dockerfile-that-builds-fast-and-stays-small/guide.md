# Lesson 2 — Writing a Dockerfile That Builds Fast and Stays Small

**Chapter 1 · Docker for Platform Engineers · Lesson 2 of 4**

## What you'll learn

- Why instruction order in a Dockerfile determines how much of the
  build cache survives from one build to the next
- How to use `.dockerignore` to keep build context — and accidental
  cache invalidation — under control
- Why combining related `RUN` commands into one layer, and cleaning
  up in that same layer, actually shrinks the final image
- How to choose and pin a base image deliberately instead of
  defaulting to the largest tag available

Lesson 1 established the mechanics: every `RUN`, `COPY`, and `ADD`
produces one cached layer, and each layer is a diff relative to the
one before it. This lesson is about using that mechanic on purpose.

## Build context and `.dockerignore`

Before Docker executes a single instruction, it packages everything in
your build directory — the **build context** — and sends it to the
Docker daemon. If that directory contains a `node_modules/` folder, a
`.git/` history, or build artifacts from a previous run, all of it
gets sent, even if your Dockerfile never references it. A
`.dockerignore` file, same syntax as `.gitignore`, keeps that context
lean:

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
```

This isn't just about transfer speed. A smaller, more deliberate build
context means a stray file changing between builds — a log file, a
local `.env` — can't accidentally invalidate a `COPY . .` layer's
cache when nothing that actually matters changed.

## Order instructions from least to most frequently changing

Docker caches each layer and reuses it on the next build **as long as
the instruction and its inputs are unchanged**. The moment one
instruction's cache misses, every instruction after it has to rerun,
because each layer is built on top of the one before. That makes
instruction order a direct lever on build speed: put what changes
rarely near the top, and what changes on every commit near the bottom.

A classic Node.js example gets this wrong by default:

```dockerfile
# Slow: invalidates the npm install layer on every source change
FROM node:20-slim
WORKDIR /app
COPY . .
RUN npm ci --omit=dev
CMD ["node", "server.js"]
```

Here, `COPY . .` copies your source code — which changes constantly —
*before* `npm ci`. Every single code change invalidates that `COPY`
layer, which invalidates `npm ci` right after it, so dependencies get
reinstalled from scratch on every build even though `package.json`
didn't change. Reordering fixes it:

```dockerfile
# Fast: npm ci only reruns when package.json/package-lock.json change
FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "server.js"]
```

Now `npm ci` only reruns when `package.json` or `package-lock.json`
actually change. Editing `server.js` invalidates the final `COPY . .`
layer, but the (usually much slower) dependency install layer above it
stays cached. The same principle applies to any ecosystem — `pip
install -r requirements.txt` before copying application code, `go mod
download` before copying `.go` files, and so on.

## Combine related `RUN` instructions, and clean up in the same layer

Because each `RUN` is a layer, and layers are cumulative, cleanup
performed in a *later* `RUN` doesn't remove the bytes a prior `RUN`
already wrote — those bytes are still sitting in the earlier,
already-committed layer, same as the deleted-file case from Lesson 1.

```dockerfile
# Wrong: apt's package lists survive in an earlier layer regardless
RUN apt-get update && apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*
```

```dockerfile
# Right: install and cleanup happen inside the same layer
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
```

Chaining with `&&` inside a single `RUN` means the cleanup happens
before that layer is committed, so the apt cache never gets baked into
the image at all. `--no-install-recommends` trims transitive packages
you likely don't need in a container, which has no desktop, no
documentation viewer, and no interactive shell session to serve.

## Choose a deliberate, pinned base image

`node:20` and `node:20-slim` and `node:20-alpine` are not
interchangeable defaults — they're different base images with
different trade-offs. The full `node:20` image bundles a complete
Debian userland with build tools and documentation; `-slim` strips
most of that down; `-alpine` swaps glibc for musl and drops to a
minimal Alpine Linux base, which is smaller still but occasionally
surfaces subtle compatibility issues with native Node modules compiled
against glibc. Pick the smallest tag that actually builds and runs
your application correctly, and pin it specifically:

```dockerfile
FROM node:20.17.0-slim
```

Pinning to a specific version — not just `node:20`, let alone the
unqualified `node:latest` — means a rebuild six months from now
produces the same base layer, not whatever the tag happens to point to
by then. `docker scout` or any image-scanning tool you already use
can tell you whether that pinned base has a newer patch release
available when it's time to review it.

## Key terms

| Term | Meaning |
|---|---|
| Build context | Everything in the build directory sent to the Docker daemon before any instruction runs; trimmed with `.dockerignore` |
| Cache invalidation | Once one instruction's cache misses, every layer after it rebuilds too, since each is a diff on top of the last |
| `.dockerignore` | `.gitignore`-style file excluding paths from the build context so they can't bloat it or trigger false cache misses |
| Layer-local cleanup | Removing temporary files inside the same `RUN` that created them, so the bytes never get committed to a layer at all |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does moving `COPY package.json package-lock.json ./` before `RUN npm
ci` speed up rebuilds, and why doesn't a `rm -rf` in a later `RUN`
shrink an image if the files it deletes were created in an earlier
`RUN`?
