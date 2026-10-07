## Segment 1 (title)

Logs tell you what a container already did. Sometimes you need to get inside it while it's still running. This lesson covers what Northbridge's engineers reach for when logs alone aren't enough.

## Segment 2 (code)

docker exec runs a new process inside an already-running container -- it doesn't replace the main process, it adds a second one alongside it. Dash i t gives the same interactive-terminal combination from Lesson Five, so sh behaves like a normal shell. Exiting that shell doesn't stop the container, because the Node server is still running as the main process.

## Segment 3 (code)

docker cp moves files between the host and a container's filesystem in either direction, no shell required. Northbridge's engineers use it to pull a config file out for review, or push a one-off patched file in during an incident -- never a permanent fix, but a fast way to test a theory.

## Segment 4 (code)

docker stats streams live CPU, memory, and network figures. Eighty-four percent CPU and memory nearly maxed out turns "the catalog container feels slow" into "it's almost out of memory" -- a concrete lead instead of a vague symptom.

## Segment 5 (steps)

So a real debugging pass goes in order: logs first for recent errors, stats next to check for CPU or memory starvation, then a shell with exec to check files and processes directly, and inspect last to confirm config and mounts. Least invasive to most.

## Segment 6 (outro)

That's exec and debugging. Next up: cleaning up all the stopped containers, dangling images, and unused volumes that pile up along the way.
