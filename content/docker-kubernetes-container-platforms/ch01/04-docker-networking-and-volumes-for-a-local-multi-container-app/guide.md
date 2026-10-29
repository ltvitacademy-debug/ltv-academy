# Lesson 4 — Docker Networking and Volumes for a Local Multi-Container App

**Chapter 1 · Docker for Platform Engineers · Lesson 4 of 4**

## What you'll learn

- Why the default `bridge` network can't resolve containers by name,
  and what a **user-defined bridge network** gives you instead
- How to wire two containers together with `docker network create`
  and `--network`, using container names as real DNS hostnames
- The difference between a **named volume** and a **bind mount**, and
  when each one is the right tool
- How `docker-compose.yml` expresses both of these declaratively for
  a real multi-container app, instead of a sequence of CLI commands

Chapter 1 has gone image-first so far: layers, Dockerfiles, multi-
stage builds. A real application is rarely one container, though —
it's an API container talking to a database container, maybe a cache
container too. This lesson covers the two pieces that make that
actually work: containers finding each other over the network, and
data surviving a container restart.

## The default bridge network doesn't do DNS

Every container gets attached to a network at startup. If you don't
specify one, Docker attaches it to the default `bridge` network — and
that network's containers can reach each other by IP address, but
**not** by container name. Start a Postgres container and an app
container both on the default bridge, and the app container has no
way to resolve a hostname like `db` to Postgres's IP; you'd have to
hardcode an IP address that can change on every restart.

## User-defined bridge networks add real DNS

Create your own network instead, and Docker runs an embedded DNS
server for it automatically:

```
docker network create app-net
```

```
docker run -d --name db --network app-net \
  -e POSTGRES_PASSWORD=devpassword \
  postgres:16

docker run -d --name api --network app-net \
  -e DATABASE_URL=postgres://postgres:devpassword@db:5432/postgres \
  my-api:latest
```

Both containers are attached to `app-net` with `--network app-net`.
Because it's a user-defined network, the `api` container can resolve
the hostname `db` — literally the other container's `--name` — to its
current internal IP, automatically, no configuration beyond the name
itself. That `DATABASE_URL` works precisely because `db` isn't an IP
address being hardcoded anywhere; it's a DNS name Docker resolves for
you, which keeps working even if the containers restart and come back
up with different internal IPs.

## Named volumes vs. bind mounts

Lesson 1 covered why a container's writable layer disappears the
moment you `docker rm` it: Postgres's actual database files can't live
there. Docker gives you two ways to keep data outside that writable
layer, and they solve different problems.

A **named volume** is storage that Docker itself manages, with a name
instead of a host path:

```
docker volume create pgdata

docker run -d --name db --network app-net \
  -e POSTGRES_PASSWORD=devpassword \
  -v pgdata:/var/lib/postgresql/data \
  postgres:16
```

`-v pgdata:/var/lib/postgresql/data` mounts the named volume `pgdata`
at that path inside the container. Docker controls where it actually
lives on the host; you don't need to know or care, and `docker volume
rm pgdata` is the explicit, deliberate way to destroy it — removing
the container itself never touches it.

A **bind mount** instead maps a specific path on the host filesystem
directly into the container:

```
docker run -d --name web --network app-net \
  -v /home/dev/project/src:/app/src \
  my-dev-image:latest
```

Here, `/home/dev/project/src` on the host is the real source of
truth, and the container sees live edits immediately — exactly what
you want for local development, where you're editing code on the host
and want the running container to pick it up without a rebuild. Use a
named volume for data a container owns and manages, like a database's
files. Use a bind mount for a host-owned path you want the container
to see directly, like your working source tree during development.

## Expressing this declaratively with Docker Compose

Running two containers by hand with matching `--network` and `-v`
flags works, but it's exactly the kind of repeated-by-hand setup
Terraform taught you to distrust. `docker-compose.yml` describes the
same multi-container app declaratively:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: devpassword
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://postgres:devpassword@db:5432/postgres
    depends_on:
      - db
    ports:
      - "8080:8080"

volumes:
  pgdata:
```

`docker compose up` creates a user-defined network for this project
automatically — every service here can already resolve the others by
their service name, `db` and `api`, with no explicit `networks:`
block required for this simple case. The top-level `volumes: pgdata:`
declares the named volume once, and `api`'s `depends_on: [db]`
controls start order (though not readiness — an app still needs its
own retry logic for a database that's started but not yet accepting
connections). `ports: ["8080:8080"]` is the one piece that crosses out
of the container network entirely, mapping the host's port 8080 to
the container's port 8080 so something outside Docker can reach `api`.

## Key terms

| Term | Meaning |
|---|---|
| User-defined bridge network | A Docker network you create explicitly; unlike the default bridge, it runs embedded DNS so containers resolve each other by `--name` |
| Named volume | Storage Docker manages under a name, not a host path; survives `docker rm` and is removed only with `docker volume rm` |
| Bind mount | A direct mapping of a host filesystem path into a container; the host path is the source of truth |
| `depends_on` | Controls container start order in Compose; does not wait for the dependency to be ready to accept connections |

## Check yourself

You've finished Chapter 1 when you can explain, without looking: why
can't two containers on the default `bridge` network resolve each
other by name, and what's the real difference between reaching for a
named volume versus a bind mount for a given piece of data?
