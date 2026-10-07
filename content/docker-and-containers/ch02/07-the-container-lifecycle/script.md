## Segment 1 (title)

Every container so far has gone straight from run to exit. A real, long-running container -- like Northbridge's catalog service -- passes through more states than that, each with its own command.

## Segment 2 (code)

docker run is really shorthand for two steps. docker create sets up the container's filesystem, config, and network without running anything yet. docker start actually launches its main process. Northbridge rarely needs that split, but it explains how a container can exist, fully configured, without ever having run.

## Segment 3 (code)

docker stop sends SIGTERM and waits up to ten seconds for a clean exit before forcing it. docker restart stops the container and starts it again -- handy after a config change. docker kill sends SIGKILL immediately, no grace period, reserved for a container that's genuinely stuck. For checkout, stop is always the default, so in-flight requests get a chance to finish.

## Segment 4 (code)

docker pause freezes every process inside the container using the host's cgroup freezer -- nothing runs, but nothing exits either. It's a debugging tool: freeze a container mid-incident to inspect it without the state changing, then unpause to resume exactly where it left off. docker inspect with a format string pulls one field out of its full JSON state, which is how monitoring scripts check health without parsing the whole blob.

## Segment 5 (steps)

So a container moves from created, to running or paused, to exited -- and docker rm deletes a stopped container for good, or docker rm dash f stops and removes it in one step.

## Segment 6 (outro)

That's the full lifecycle. Next up: publishing ports properly, passing configuration in, and reading what a container is actually doing through its logs.
