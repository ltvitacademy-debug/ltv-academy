# Lesson 4 — Building & Running Containers

**Chapter 1 · Docker Fundamentals · Lesson 4 of 25**

## What you'll learn

- The `docker build` command: turning the Dockerfile from Lesson 3 into
  an actual image, and what the `-t` tag is for
- The `docker run` flags that matter every time: `-d`, `-p`, `-e`, `-v`,
  `--name`, `--rm`
- How to inspect and manage a container once it's running: `docker ps`,
  `docker logs`, `docker exec`, `docker stop`
- Reading a build's output line by line, and knowing what "using cache"
  actually means

## Building the image

`docker build` reads a Dockerfile and produces an image. The `-t` flag
gives that image a name (and optionally a version tag):

```
docker build -t my-ai-app:1.0 .
```

That trailing `.` is the **build context** — the directory Docker sends to
the build, which is why `COPY . .` (Lesson 3) can find your files. Each
line of output corresponds to one instruction; `CACHED` next to a step
means Docker reused a previous layer instead of re-running it (exactly the
build-cache behavior Lesson 3 covered).

## Running the container

`docker run` starts a container from that image. A handful of flags cover
almost every real use:

```
docker run -d --name ai-app -p 8000:8000 \
  -e LOG_LEVEL=debug \
  -v $(pwd)/data:/app/data \
  my-ai-app:1.0
```

- `-d` — detached: run in the background, return your terminal immediately
- `--name ai-app` — a human-readable name instead of a random one
- `-p 8000:8000` — publish `host:container` — this is what actually opens
  the port `EXPOSE` only documented
- `-e LOG_LEVEL=debug` — set an environment variable (Lesson 9 covers
  secrets specifically)
- `-v $(pwd)/data:/app/data` — mount a host folder into the container, so
  files outside it survive a restart

## Checking on what's running

```
docker ps                    # list running containers
docker logs -f ai-app        # stream a container's stdout/stderr
docker exec -it ai-app sh    # open a shell inside a running container
docker stop ai-app           # stop it (SIGTERM, then SIGKILL after a grace period)
```

`docker exec` is the fastest way to answer "is the file actually there?"
or "what does this environment variable actually resolve to?" without
rebuilding anything — you're asking the running container directly.

## `--rm`: for containers you don't need to keep

```
docker run --rm -it my-ai-app:1.0 python -c "import torch; print(torch.__version__)"
```

`--rm` deletes the container the moment it exits, instead of leaving a
stopped container around. Reach for it on short, disposable runs — like
checking a package version — where there's nothing in that container
worth keeping once it finishes.

## Key terms

| Term | Meaning |
|---|---|
| Build context | The directory sent to `docker build` — what `COPY` can see |
| `-t` | Tags the built image with a name and version |
| `-d` | Runs the container detached, in the background |
| `-p host:container` | Publishes a port — opens it, unlike `EXPOSE` |
| `-v host:container` | Mounts a host folder into the container's filesystem |
| `docker exec` | Runs a command inside an already-running container |

## Check yourself

You're ready for Lesson 5 when you can explain: you run `docker run -p
8000:8000 my-ai-app`, then from another terminal run `docker logs
<container-id>` and see nothing. What are the two most likely reasons the
logs appear empty, and which `docker run` flag would you add to confirm
the container is even still running?
