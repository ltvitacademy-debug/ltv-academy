# Dockerfile Basics

Every image Northbridge has pulled so far — `node`, `ubuntu`, `hello-world` — was built by someone else. This lesson writes the first one themselves: a Dockerfile that packages the product-catalog application's own code into an image anyone can run with a single `docker run`, no local Node install required.

## What you'll learn

- The five instructions that make up almost every basic Dockerfile: `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`
- Why instruction order matters, beyond just readability
- How to actually build an image from a Dockerfile with `docker build -t`
- How to run and verify the image you just built

## The Dockerfile

Northbridge's product-catalog service is a small Node app. Here's the Dockerfile that packages it:

```dockerfile
FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

Reading it top to bottom:

- **`FROM node:20-slim`** — start from an official Node 20 image, the slim variant, as the base layer
- **`WORKDIR /app`** — every instruction after this runs from `/app` inside the image; it's created if it doesn't exist
- **`COPY package.json package-lock.json ./`** — copies just the dependency manifests first, not the whole codebase yet
- **`RUN npm install --production`** — installs dependencies as a build step, baked into the image
- **`COPY . .`** — now copies the rest of the application code in
- **`EXPOSE 3000`** — documents that the container listens on port 3000 (informational — it doesn't publish anything by itself)
- **`CMD ["node", "server.js"]`** — the command that runs when a container starts from this image

## Why `COPY package.json` happens before `COPY . .`

It would work to just run `COPY . .` once and then `RUN npm install`. Splitting it in two, dependency files first, is deliberate — the next lesson covers exactly why it matters for build speed, but the short version: changing application code shouldn't force a full dependency reinstall every time.

## Building the image

```text
$ docker build -t northbridge/catalog:1.4 .
[+] Building 18.3s
 => [1/5] FROM docker.io/library/node:20-slim
 => [2/5] WORKDIR /app
 => [3/5] COPY package.json package-lock.json ./
 => [4/5] RUN npm install --production
 => [5/5] COPY . .
 => exporting to image
 => naming to docker.io/northbridge/catalog:1.4
```

`-t northbridge/catalog:1.4` tags the resulting image with a name and version. The `.` at the end is the **build context** — the directory Docker reads the Dockerfile and `COPY` sources from, in this case the current directory.

## Running what you built

```text
$ docker run -d --name catalog -p 8080:3000 northbridge/catalog:1.4
$ curl localhost:8080/api/products
[{"id": 1, "name": "Canvas Tote Bag", "price": 24.00}, ...]
```

Same `docker run` flags from Lesson 6 — only now the image is one Northbridge built, not one they pulled.

## Key terms

- **`FROM`** — sets the base image a Dockerfile builds on top of
- **`WORKDIR`** — sets the working directory for all following instructions
- **`COPY`** — copies files from the build context into the image
- **`RUN`** — executes a command during the build, baking its result into a new layer
- **`CMD`** — the default command a container runs when started from the image
- **Build context** — the directory Docker reads the Dockerfile and COPY sources from
