# Exec & Debugging

Logs tell you what a container already did. Sometimes you need to get inside it while it's still running — to poke at the filesystem, check a config file, or watch resource usage climb in real time. This lesson covers the tools Northbridge's engineers reach for when the catalog container is misbehaving and `docker logs` alone isn't enough.

## What you'll learn

- How to get a shell inside a running container with `docker exec -it`
- How to copy files in and out of a container with `docker cp`
- How to watch live CPU, memory, and network usage with `docker stats`
- A realistic debugging pass on a Northbridge container, start to finish
- A full worked scenario: a container that works on a laptop and fails in production

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

## Troubleshooting scenario: "it works on my machine"

The most frustrating version of a container bug is the one that doesn't reproduce locally at
all. This scenario applies the exact four-step debugging pass above to that specific situation.

**Problem description.** `catalog` runs correctly on every developer's laptop via
`docker compose up`. The same image, deployed to production, returns `500 Internal Server Error`
on every request that reads product images.

**Available evidence.**

```text
$ docker logs catalog --tail 20
Error: ENOENT: no such file or directory, open '/app/uploads/product-4821.jpg'
    at Object.openSync (node:fs:...)

$ docker stats catalog
CONTAINER ID   NAME      CPU %    MEM USAGE / LIMIT    NET I/O
9a3f1c2b7e4d   catalog   3.1%     88MiB / 512MiB        420kB / 12kB
```

CPU and memory are both healthy — `docker stats` already rules out the resource-starvation
explanation that's often the first guess for a vague "it's broken in prod" report.

**Diagnostic questions.**

- The error names a specific missing file path. Does that path exist inside the container at
  all, or does it exist but isn't actually the file being served?
- What's structurally different between a developer's `docker compose up` and how production
  actually runs this same image?
- Is `/app/uploads` something the image itself contains, or something meant to be supplied from
  outside the container?

**Expected investigation sequence.**

```text
# Step 1 -- logs already named a missing file -- confirm it from inside
# the container itself, not by assumption
$ docker exec -it catalog sh
/app # ls uploads/
/app # ls -la uploads/
total 0
drwxr-xr-x 2 node node 4096 uploads/
# the directory exists -- and it's completely empty

# Step 2 -- compare against local, where the same image works:
$ docker compose exec catalog sh -c "ls uploads/ | wc -l"
412
# locally, uploads/ has 412 files. In production, zero.

# Step 3 -- check what's actually supplying that directory in each
# environment
$ docker inspect catalog --format '{{json .Mounts}}'
[]
# production: no mounts at all -- uploads/ is just whatever's baked
# into the image, which is empty
```

**Correct resolution.** The local Compose file mounts a host directory of sample product images
into `/app/uploads` as a bind mount for development convenience — something `docker-compose.yml`
does but the production Kubernetes manifest never replicated, because `/app/uploads` was assumed
to be "just part of the image" by whoever wrote the production deploy config. In production, the
directory is empty because nothing actually populates it. The real fix is giving production its
own equivalent volume (a mounted persistent volume or object storage, not a bind mount to a
developer's laptop) — not patching the image itself, which was never the broken part.

**Why this failure happens, and why "same image, different result" is the actual clue.** The
instinct when something works locally and fails in prod is to suspect the image is somehow
different between environments — but `docker inspect`'s empty `Mounts` array proves the image is
identical; what differs is what's attached *around* it. Local developer convenience (bind-mounting
sample data) quietly became a hidden dependency the image itself doesn't actually satisfy on its
own — the image was never truly self-contained, it just looked that way because every local run
happened to have the same external directory sitting next to it.

**Prevention.** Treat anything a local Compose file mounts into a container as a real
dependency to replicate in every other environment's deploy config, not an implementation detail
that stays local — an explicit comment in `docker-compose.yml` noting "production equivalent:
<name of the PVC/bucket>" would have made this translation step impossible to forget.

## Key terms

- **`docker exec -it`** — runs an interactive shell as a second process inside a running container
- **`docker cp`** — copies files between the host and a container's filesystem
- **`docker stats`** — streams live CPU, memory, and network usage for running containers
- **`docker inspect`** — full JSON configuration and state, useful as a final cross-check
- **Hidden bind-mount dependency** — data or config a container actually depends on that's supplied by a local development mount, not by the image itself, and silently missing anywhere that mount isn't replicated
