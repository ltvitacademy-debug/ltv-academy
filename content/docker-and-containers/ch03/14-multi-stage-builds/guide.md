# Multi-Stage Builds

Northbridge's product-catalog frontend is a React app — written in TypeScript, bundled by a build tool, and ultimately served as a handful of static files. Everything up to "static files" only matters during the build. Shipping all of it anyway — TypeScript compiler, bundler, `node_modules` full of dev dependencies — bloats the image with tools the running container will never touch. Multi-stage builds solve exactly this.

## What you'll learn

- Why a single-stage build for a compiled or bundled app carries dead weight into production
- How `FROM ... AS <name>` names a build stage
- How `COPY --from=<stage>` pulls specific files out of an earlier stage, nothing else
- How this pattern shrinks Northbridge's catalog frontend image dramatically

## The problem with one stage

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build          # produces /app/dist, static HTML/JS/CSS
CMD ["npx", "serve", "dist"]
```

This works, but the final image carries the full `node:20` base, every dev dependency, the TypeScript compiler, and the unbuilt source — none of which the running app needs once `dist/` exists. That's hundreds of megabytes of tooling riding along with a handful of static files.

## Two stages: build, then runtime

```dockerfile
# ---- build stage ----
FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- runtime stage ----
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

`FROM node:20 AS build` names the first stage `build` — it has the full Node toolchain and produces `/app/dist`. The second `FROM` starts a completely fresh image, based on a minimal `nginx` instead of `node` at all. `COPY --from=build /app/dist /usr/share/nginx/html` reaches back into the `build` stage and copies out only the compiled output — nothing else from that stage makes it into the final image.

## Building and checking the result

```text
$ docker build -t northbridge/catalog-frontend:1.0 .
$ docker images northbridge/catalog-frontend
REPOSITORY                     TAG   IMAGE ID       SIZE
northbridge/catalog-frontend   1.0   4a7f8c9d1e2b   48.2MB
```

Compare that to what the single-stage version would have produced — easily 900MB+ with the full Node toolchain included. The build stage still existed, still ran `npm install` and `npm run build`, but none of its weight carries into the image that actually ships.

## Key terms

- **Build stage** — a `FROM ... AS <name>` block that exists only to produce artifacts, discarded from the final image
- **Runtime stage** — the final `FROM` block, which becomes the actual shipped image
- **`COPY --from=<stage>`** — copies specific files from an earlier named stage into the current one
- **Multi-stage build** — using more than one `FROM` in a single Dockerfile to separate build tools from what ships
