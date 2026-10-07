# Pulling & Running Images

Chapter 1 ended with `docker run -it ubuntu bash` — enough to prove Docker works. Now we start treating images the way Northbridge Retail actually will: specific versions, pulled deliberately, started with the flags a real service needs. This lesson covers `docker pull` on its own, what a tag really points to, and the `docker run` flags you'll use on nearly every container you start from here on.

## What you'll learn

- How `docker pull` works separately from `docker run`, and why that separation matters
- The difference between a tag (`node:20`) and a digest (`node@sha256:...`)
- The four flags that show up in almost every real `docker run`: `-d`, `--name`, `-p`, `-e`
- Where to actually find images on Docker Hub, and what to check before trusting one

## `docker pull` on its own

`docker run` pulls an image automatically if it's missing, but you can pull without running anything:

```text
$ docker pull node:20
20: Pulling from library/node
a480a1164ff9: Pull complete
236b2fecb8f0: Pull complete
Digest: sha256:3e3c76c0b65447a1aa20e18d70d23b31d6bd5f7f3bec0e05a4b1e6f9a7e9a1c0
Status: Downloaded newer image for node:20
docker.io/library/node:20
```

Northbridge's platform team pulls images ahead of time on CI runners precisely so that the first real `docker run` of a deploy doesn't stall waiting on a download.

## Tags vs. digests

`node:20` is a **tag** — a human-friendly label that can move. Docker Hub can repoint `node:20` to a newer build tomorrow, and your next pull gets different bytes under the same name. A **digest** is the opposite: a SHA-256 hash of the exact image content, and it never changes.

```text
$ docker pull node@sha256:3e3c76c0b65447a1aa20e18d70d23b31d6bd5f7f3bec0e05a4b1e6f9a7e9a1c0
sha256:3e3c76c0b65447a1aa20e18d70d23b31d6bd5f7f3bec0e05a4b1e6f9a7e9a1c0: Pulling from library/node
Status: Downloaded newer image for node@sha256:3e3c76c0b65447a1aa20e18d70d23b31d6bd5f7f3bec0e05a4b1e6f9a7e9a1c0
```

For local development, Northbridge engineers use tags like `node:20` — easy to read, close enough. For production deploys of the checkout service, their pipeline pins the exact digest, so a `node:20` repoint on Docker Hub can never silently change what's running in production.

## `docker run` flags you'll use constantly

Running Northbridge's product-catalog container for real, instead of just poking around interactively:

```text
$ docker run -d --name catalog -p 8080:3000 -e NODE_ENV=production northbridge/catalog:1.4
7f2c9e1a8b3d4f5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f
```

- `-d` (detached) — runs the container in the background and hands you back the shell
- `--name catalog` — gives it a memorable name instead of a random one, so later commands can target it by name
- `-p 8080:3000` — maps host port 8080 to the container's port 3000, so the app is reachable at `localhost:8080`
- `-e NODE_ENV=production` — sets an environment variable inside the container

## Finding images on Docker Hub

Before pulling a third-party image, check it on [hub.docker.com](https://hub.docker.com): does it carry an **Official Image** or **Verified Publisher** badge, when was it last updated, and does the tag list include the specific version you need rather than just `latest`? Northbridge's base images (`node`, `nginx`, `postgres`) are all official images for exactly this reason — a known, maintained source beats an unverified upload with the same name.

## Key terms

- **`docker pull`** — downloads an image without creating or starting a container from it
- **Tag** — a movable, human-readable label for an image (`node:20`)
- **Digest** — the fixed SHA-256 hash of an image's exact content, which never changes
- **`-d`** — runs the container detached, in the background
- **`-p host:container`** — publishes a container port to a port on the host
