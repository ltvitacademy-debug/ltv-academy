# Resource Limits

Without limits, one runaway container -- a memory leak in Northbridge's `api`, or a batch job pegging the CPU -- can starve every other container sharing that host. Docker lets you cap what a container can use, both from the CLI and in `compose.yaml`.

## What you'll learn

- How `--memory` and `--cpus` cap a single container from the CLI
- How `deploy.resources.limits` sets the same caps in compose.yaml
- The difference between a hard `limit` and a soft `reservation`
- Why limits matter once multiple containers share one host

## Limiting a single container from the CLI

```bash
docker run -d \
  --memory="512m" \
  --cpus="0.5" \
  northbridge/storefront-api:2.1
```

`--memory="512m"` is a hard cap -- if the container tries to exceed it, the kernel's out-of-memory killer terminates the offending process, and the container typically exits with code `137`. `--cpus="0.5"` caps CPU usage to half of one core; the container can still burst briefly, but its average usage is throttled to that fraction.

## Limits in compose.yaml

```yaml
services:
  api:
    image: northbridge/storefront-api:2.1
    deploy:
      resources:
        limits:
          cpus: "0.50"
          memory: 512M
        reservations:
          cpus: "0.25"
          memory: 256M
```

`limits` is the hard ceiling -- `api` can never use more than 0.5 CPUs or 512 MB. `reservations` is a softer promise: Docker tries to guarantee at least that much (0.25 CPUs, 256 MB) is available to the service. Reservations matter most once you're scheduling across a cluster (the subject of Lesson 30's preview) -- on a single host running `docker compose up`, the `limits` block is what actually caps `api`'s resource usage.

## Why limits matter in production

```text
Contain a leak        -- a memory leak in one container can't take down
                          every other container on the same host
Prevent noisy neighbors -- one CPU-hungry batch job can't starve the
                          storefront's checkout API of CPU time
Plan capacity           -- knowing each container's ceiling tells you
                          exactly how many will fit on one host
```

Northbridge sets `--memory="512m"` on `api` specifically because of a real incident: an unbounded memory leak in an earlier release slowly consumed the whole host's RAM overnight, taking `catalog` and `db` down with it. A limit turns "the whole host dies" into "one container gets OOM-killed and restarts" -- which is exactly why Lesson 25's restart policies and this lesson's limits are meant to work together.

## Key terms

- **`--memory`** -- hard memory cap; exceeding it gets the container OOM-killed
- **`--cpus`** -- fractional CPU cap, e.g. `0.5` for half a core
- **`deploy.resources.limits`** -- compose.yaml's hard cap on CPU and memory
- **`deploy.resources.reservations`** -- a softer, guaranteed minimum
- **Exit code 137** -- the common signature of a container killed for exceeding its memory limit
