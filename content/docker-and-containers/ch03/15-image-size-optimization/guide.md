# Image Size Optimization

Multi-stage builds handle the biggest win. This closing lesson of Chapter 3 covers the smaller, still-worthwhile habits Northbridge applies to every image after that: choosing a smaller base, keeping unnecessary files out of the build context, and combining instructions to avoid extra layers.

## What you'll learn

- How much base-image choice alone affects final size: full vs. slim vs. alpine
- What `.dockerignore` does and why it matters even for `COPY . .`
- How combining `RUN` instructions avoids leaving stale layers behind
- How to actually measure what's taking up space with `docker image ls` and `docker history`

## Base image choice

```text
$ docker images
REPOSITORY   TAG          SIZE
node         20           1.1GB
node         20-slim      230MB
node         20-alpine    140MB
```

`node:20` includes a full Debian userland with build tools and libraries most apps never touch. `node:20-slim` strips most of that out. `node:20-alpine` goes further, built on musl-based Alpine Linux instead of Debian — smallest of the three, though occasionally worth checking for native-module compatibility before switching production images to it.

## `.dockerignore`

```text
# .dockerignore
node_modules
.git
*.log
.env
dist
```

Without a `.dockerignore`, `COPY . .` sends everything in the build context to the Docker daemon — including a possibly huge local `node_modules`, the entire `.git` history, and stray log files — even if the Dockerfile only ends up using a fraction of it. A `.dockerignore` keeps those out of the build context entirely, which both shrinks the image and speeds up the build by not even sending that data over.

## Combining `RUN` instructions

```dockerfile
# Three layers, and the apt cache lingers in the second one
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*
```

```dockerfile
# One layer, cache cleaned up within the same layer it was created in
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*
```

Each `RUN` is its own layer, and a layer keeps everything written during it — including a cache you delete in a *later* instruction. Deleting the apt cache in a separate `RUN` doesn't shrink the image; the cache is already permanently baked into the earlier layer. Chaining the install and cleanup into one `RUN` means the cache never outlives the layer it was created in.

## Measuring what you actually built

```text
$ docker image ls northbridge/catalog
REPOSITORY            TAG   SIZE
northbridge/catalog    1.4   187MB

$ docker history northbridge/catalog:1.4
IMAGE          CREATED BY                         SIZE
a3f8e9c1b2d4   CMD ["node" "server.js"]            0B
<missing>      COPY . .                           42MB
<missing>      RUN npm install --production        98MB
<missing>      COPY package.json ./                4kB
```

`docker history` breaks a built image down layer by layer, in size order — exactly where to look when an image is bigger than expected and you need to find which instruction is responsible.

## Key terms

- **`-slim` / `-alpine` base images** — smaller variants of a base image with fewer preinstalled tools and libraries
- **`.dockerignore`** — excludes files from the build context so `COPY` can't pull them in and the daemon never receives them
- **Layer-scoped cleanup** — deleting temporary files in the same `RUN` that created them, not a later one
- **`docker history`** — shows an image's layers and their individual sizes
