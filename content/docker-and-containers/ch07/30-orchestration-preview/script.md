## Segment 1 (title)

Everything in this course has run on one host. That's been enough for every example, including Northbridge's full compose.yaml stack. But one host means one point of failure, and a hard ceiling on capacity.

## Segment 2 (code)

Compose's entire model assumes one machine -- the shared network, named volumes, depends_on, all scoped to containers on that host. There's no docker compose flag that spreads catalog, api, and db across a second server, or notices when the host itself goes down.

## Segment 3 (steps)

An orchestrator adds three things Compose can't. Scheduling, deciding which of many hosts runs each container. Self-healing, rescheduling a crashed container or a dead host automatically. And cluster-wide discovery -- reaching many copies of a service through one stable name, across hosts instead of within just one.

## Segment 4 (code)

Two names for this. Docker Swarm is Docker's own built-in orchestrator, simple but less used in production. Kubernetes is the industry standard -- same core ideas, its own YAML shapes, and a much bigger ecosystem. Either way, nothing about the containers themselves changes -- just who decides where they run.

## Segment 5 (outro)

That's Docker and Containers, start to finish -- images, Compose, and now production concerns. Next up: taking these same containers from one host to a real managed cluster, in Kubernetes Container Orchestration.
