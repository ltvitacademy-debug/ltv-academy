# Ports, Environment & Logs

A container is only useful once it can be reached from outside, configured for the environment it's running in, and watched while it runs. This lesson covers the three things Northbridge's team touches every time they stand up the catalog or checkout containers: publishing ports, passing in configuration, and reading logs.

## What you'll learn

- The difference between `-p` (publish a specific port) and `-P` (publish all exposed ports)
- Passing individual variables with `-e` versus a whole file with `--env-file`
- Reading a container's output with `docker logs`, including following it live
- Why logs are the first place to look when a container misbehaves

## Publishing ports: `-p` vs. `-P`

```text
$ docker run -d --name catalog -p 8080:3000 northbridge/catalog:1.4
$ docker run -d --name checkout -P northbridge/checkout:2.1
$ docker port checkout
3000/tcp -> 0.0.0.0:55001
```

`-p 8080:3000` maps a specific host port to a specific container port — predictable, and what Northbridge uses for anything with a fixed address other services depend on. `-P` publishes every port the image's Dockerfile marked with `EXPOSE`, but to a random free host port each time — useful for quick local testing, not for anything you need to find again reliably. `docker port` shows you what got mapped.

## Passing configuration in: `-e` and `--env-file`

```text
$ docker run -d --name catalog \
    -e NODE_ENV=production \
    -e LOG_LEVEL=info \
    northbridge/catalog:1.4
```

That works for one or two variables. Northbridge's checkout service needs a dozen — database URL, payment gateway key, cache host — so instead it uses a file:

```text
# catalog.env
NODE_ENV=production
LOG_LEVEL=info
CACHE_HOST=redis.internal
```

```text
$ docker run -d --name catalog --env-file catalog.env northbridge/catalog:1.4
```

`--env-file` reads every `KEY=value` line into the container's environment at startup — one file to review and version instead of a growing pile of `-e` flags.

## Reading logs

```text
$ docker logs catalog
[2026-10-07T14:32:10] Server listening on port 3000
[2026-10-07T14:32:11] Connected to catalog-db
[2026-10-07T14:35:02] GET /api/products 200 14ms
```

```text
$ docker logs -f catalog
[2026-10-07T14:36:40] GET /api/products/4471 200 9ms
[2026-10-07T14:36:41] GET /api/products/4471/reviews 200 22ms
```

`docker logs` prints everything the container has written to stdout/stderr since it started. `-f` (follow) keeps the stream open and prints new lines as they arrive — exactly what Northbridge's on-call engineer runs the moment a container starts behaving oddly, before reaching for anything heavier.

## Key terms

- **`-p host:container`** — publishes one specific container port to a specific host port
- **`-P`** — publishes every `EXPOSE`d port to random host ports
- **`--env-file`** — loads environment variables from a file instead of repeated `-e` flags
- **`docker logs`** — prints a container's stdout/stderr output
- **`docker logs -f`** — follows the log stream live, printing new lines as they're written
