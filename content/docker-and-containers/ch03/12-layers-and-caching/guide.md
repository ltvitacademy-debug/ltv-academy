# Layers & Caching

Lesson 11 built the catalog image once. Northbridge's engineers will build it dozens of times a day as they edit code — and most of those builds should take seconds, not the 18 seconds the very first one took. This lesson explains why, by looking at what a Dockerfile instruction actually produces: a layer.

## What you'll learn

- What a Docker layer is, and why each Dockerfile instruction creates one
- How Docker decides whether to reuse a cached layer or rebuild it
- Why changing one line invalidates every layer after it, not just that one
- Why `COPY` for dependencies belongs above `COPY` for application code

## Every instruction is a layer

```dockerfile
FROM node:20-slim      # layer 1
WORKDIR /app            # layer 2
COPY package.json package-lock.json ./   # layer 3
RUN npm install --production             # layer 4
COPY . .                                  # layer 5
EXPOSE 3000             # metadata, not a layer
CMD ["node", "server.js"]                 # metadata, not a layer
```

Each `RUN`, `COPY`, and `ADD` produces its own filesystem layer, stacked on top of the one before it. Docker caches each layer by its instruction plus its inputs — change nothing, and a rebuild just replays the cache; change something, and Docker rebuilds that layer and every layer after it.

## Cache hit vs. cache miss

```text
$ docker build -t northbridge/catalog:1.4 .
 => CACHED [2/5] WORKDIR /app
 => CACHED [3/5] COPY package.json package-lock.json ./
 => CACHED [4/5] RUN npm install --production
 => [5/5] COPY . .
 => exporting to image
```

Only `server.js` changed since the last build — `package.json` didn't. Docker reused the cached `WORKDIR`, `COPY package.json`, and `RUN npm install` layers, and only rebuilt the final `COPY . .` layer. That's the difference between a 2-second build and an 18-second one.

## One change invalidates everything after it

```text
$ docker build -t northbridge/catalog:1.4 .
 => CACHED [2/5] WORKDIR /app
 => [3/5] COPY package.json package-lock.json ./
 => [4/5] RUN npm install --production
 => [5/5] COPY . .
```

This time `package.json` changed — maybe a new dependency was added. Docker reruns `COPY package.json` because its input changed, and because layer caching is sequential, every layer after it reruns too, even `COPY . .`, which didn't change at all. The cache only protects layers *before* the first change.

## Why order the Dockerfile this way

```dockerfile
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
```

Application code (`server.js`, routes, templates) changes constantly; `package.json` changes rarely. Putting the rarely-changing `COPY`+`RUN npm install` pair first means the expensive dependency install step stays cached through almost every day-to-day code edit. Reverse the order — `COPY . .` before installing dependencies — and every single code change would force a full `npm install` to rerun, turning a 2-second build back into an 18-second one, every time.

## Key terms

- **Layer** — the filesystem diff produced by one Dockerfile instruction (`RUN`, `COPY`, `ADD`)
- **Build cache** — Docker's reuse of a previously built layer when its instruction and inputs haven't changed
- **Cache invalidation** — once one layer rebuilds, every layer stacked after it rebuilds too
- **Layer ordering** — placing rarely-changing instructions before frequently-changing ones to maximize cache hits
