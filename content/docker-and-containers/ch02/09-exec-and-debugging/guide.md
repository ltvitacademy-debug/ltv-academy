# Exec & Debugging

Logs tell you what a container already did. Sometimes you need to get inside it while it's still running — to poke at the filesystem, check a config file, or watch resource usage climb in real time. This lesson covers the tools Northbridge's engineers reach for when the catalog container is misbehaving and `docker logs` alone isn't enough.

## What you'll learn

- How to get a shell inside a running container with `docker exec -it`
- How to copy files in and out of a container with `docker cp`
- How to watch live CPU, memory, and network usage with `docker stats`
- A realistic debugging pass on a Northbridge container, start to finish

## Getting a shell: `docker exec -it`

```text
$ docker exec -it catalog sh
/app # ls
server.js  package.json  node_modules  config/
/app # cat config/current.json
{"cacheHost": "redis.internal", "logLevel": "info"}
/app # exit
```

`docker exec` runs a new process inside an already-running container — it doesn't replace the container's main process, it adds a second one alongside it. `-it` gives you the same interactive-terminal combination from Lesson 5, so `sh` (or `bash`, if the image has it) behaves like a normal shell. Exiting that shell doesn't stop the container, because the main process — the Node server — is still running.

## Copying files with `docker cp`

```text
$ docker cp catalog:/app/config/current.json ./current.json
$ docker cp ./patched-config.json catalog:/app/config/current.json
```

`docker cp` moves files between the host and a container's filesystem in either direction, without needing a shell at all. Northbridge's engineers use it to pull a config file out for review, or push a one-off patched file in during an incident — never a permanent fix, but a fast way to test a theory before it goes into the image properly.

## Watching resource usage: `docker stats`

```text
$ docker stats catalog
CONTAINER ID   NAME      CPU %    MEM USAGE / LIMIT    NET I/O
7f2c9e1a8b3d   catalog   84.2%    412MiB / 512MiB       1.2MB / 340kB
```

`docker stats` streams live CPU, memory, and network figures for one or more containers. That 84% CPU and near-maxed memory is exactly the kind of reading that turns "the catalog container feels slow" into "the catalog container is almost out of memory" — a concrete lead instead of a vague symptom.

## A debugging pass, start to finish

1. `docker logs -f catalog` — any errors in the recent output?
2. `docker stats catalog` — is it starved for CPU or memory?
3. `docker exec -it catalog sh` — check config files and running processes directly
4. `docker inspect catalog` — confirm the environment variables and mounts are what you expect

That order — logs, then stats, then a shell, then inspect — moves from least to most invasive, and it's the sequence Northbridge's on-call runbook actually specifies.

## Key terms

- **`docker exec -it`** — runs an interactive shell as a second process inside a running container
- **`docker cp`** — copies files between the host and a container's filesystem
- **`docker stats`** — streams live CPU, memory, and network usage for running containers
- **`docker inspect`** — full JSON configuration and state, useful as a final cross-check
