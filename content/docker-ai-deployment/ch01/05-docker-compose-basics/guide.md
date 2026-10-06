# Lesson 5 — Docker Compose, Basics

**Chapter 1 · Docker Fundamentals · Lesson 5 of 25**

## What you'll learn

- The problem Compose solves: running more than one container together,
  without a wall of `docker run` commands
- The shape of a `compose.yaml` file: `services`, `build` or `image`,
  `ports`, `environment`, `depends_on`
- The four commands that cover almost all day-to-day Compose use
- That every container Compose starts is still an ordinary container,
  visible the same way the ones from Lesson 4 were

## The problem: more than one container

A real AI app is rarely a single container. A typical setup is an API
service, plus something it depends on — a vector database, a cache, a
queue. Starting each one by hand means remembering a growing pile of
`docker run` flags, in the right order, every time. **Docker Compose**
replaces that with one file and one command: describe every container as
a **service**, and start them all together.

```yaml
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - LOG_LEVEL=info
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

Two services, one file. `api` builds from the Dockerfile in the current
directory (Lesson 3); `redis` just pulls a published image — `build` and
`image` are the two ways a service can get its container. `depends_on`
tells Compose to start `redis` before `api` tries to start.

## The commands that matter

```
docker compose up -d       # build (if needed) and start every service
docker compose ps          # list this project's containers and their status
docker compose logs -f api # stream logs from one service by name
docker compose down        # stop and remove every container Compose started
```

`docker compose up` replaces running `docker build` and `docker run`
separately for every service — Compose reads the file, figures out what
needs building, and starts everything in dependency order. `docker
compose down` is the cleanup: it removes every container the file
describes, by name, in one command.

## Still just containers, underneath

Compose is a convenience layer, not a different kind of container.
Every service it starts shows up exactly where any other container does —
Docker Desktop doesn't distinguish a Compose-started container from one
you `docker run` by hand:

![Docker Desktop's Containers view, listing several running containers side by side — the same view a container started by `docker compose up` lands in, no different from one started with `docker run`.](/courses/docker-ai-deployment/ch01/05-docker-compose-basics/desktop-containers-view.png)

That matters in practice: `docker logs`, `docker exec`, and `docker stop`
from Lesson 4 all still work on a Compose-started container by its name —
Compose doesn't take those tools away, it just saves you from typing a
long `docker run` command for each service up front.

![Docker Desktop's left sidebar — Containers, Images, Volumes, Builds — the same navigation manages every container on the machine, whether it was started by Compose or by hand.](/courses/docker-ai-deployment/ch01/05-docker-compose-basics/desktop-builds-view-sidebar.png)

## Key terms

| Term | Meaning |
|---|---|
| `compose.yaml` | The file describing every service (container) in a multi-container app |
| Service | One entry under `services:` — becomes one container when Compose runs |
| `build` vs. `image` | A service either builds from a local Dockerfile or pulls a published image |
| `depends_on` | Controls start order between services |
| `docker compose up -d` | Builds (if needed) and starts every service, detached |
| `docker compose down` | Stops and removes every container the file describes |

## Check yourself

You're ready for Lesson 6 when you can explain: in the two-service
`compose.yaml` above, if you run `docker compose up -d` and then want to
read only the `api` service's logs — not `redis`'s — what exact command
do you run, and why does `depends_on` guarantee `redis` is already up by
the time `api`'s container starts?
