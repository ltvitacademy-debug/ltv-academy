# The Container Lifecycle

So far every container we've started has gone straight from `docker run` to doing its job to exiting. Real containers — like Northbridge's catalog service, which needs to stay up for days — pass through more states than that, and you need separate commands for each transition. This lesson walks through the full lifecycle: create, start, stop, restart, pause, unpause, kill, and remove.

## What you'll learn

- The difference between `docker create` and `docker start` — and why `docker run` is really both at once
- How to stop a container gracefully vs. kill it immediately
- What pausing a container actually does, and when restart is the right tool
- How to read a container's full state with `docker inspect`

## Create vs. start vs. run

`docker run` is shorthand for two separate steps:

```text
$ docker create --name catalog northbridge/catalog:1.4
a3f8e9c1b2d4...
$ docker start catalog
catalog
```

`docker create` sets up the container — filesystem, config, network — without running anything yet. `docker start` actually launches its main process. Northbridge rarely needs this split in practice, but it explains why a container can exist, fully configured, without ever having run.

## Stopping, restarting, and killing

```text
$ docker stop catalog
catalog
$ docker restart catalog
catalog
$ docker kill catalog
catalog
```

- `docker stop` sends `SIGTERM`, waits up to 10 seconds for the process to exit cleanly, then forces it with `SIGKILL` if it hasn't
- `docker restart` stops the container, then starts it again — useful after an environment variable or config change picked up on startup
- `docker kill` sends `SIGKILL` immediately, no grace period — reserved for a container that's genuinely stuck

For Northbridge's checkout service, `docker stop` is the default choice: the app gets a chance to finish in-flight requests before it goes down.

## Pause and unpause

```text
$ docker pause catalog
catalog
$ docker unpause catalog
catalog
```

`pause` freezes every process inside the container using the host's cgroup freezer — nothing runs, but nothing exits either, and no memory is released. It's a debugging tool: freeze a container mid-incident to inspect it without the state changing further, then unpause to let it continue exactly where it left off.

## Checking state with `docker inspect`

```text
$ docker inspect --format='{{.State.Status}}' catalog
running
$ docker inspect --format='{{.State.StartedAt}}' catalog
2026-10-07T14:32:09.441Z
```

`docker inspect` returns a full JSON dump of a container's configuration and state — the `--format` flag with a Go template pulls out just the field you need, which is how Northbridge's monitoring scripts check container health without parsing the whole blob.

## Removing containers

A stopped container still exists on disk until you remove it:

```text
$ docker rm catalog
catalog
$ docker rm -f catalog     # stop (if running) and remove in one step
```

## Key terms

- **`docker create`** — configures a container without starting it
- **`docker stop`** — sends SIGTERM, then SIGKILL after a grace period
- **`docker kill`** — sends SIGKILL immediately, no grace period
- **`docker pause`/`unpause`** — freezes and resumes every process in a container
- **`docker inspect`** — returns full JSON configuration and state for a container
