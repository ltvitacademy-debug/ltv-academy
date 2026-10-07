# Orchestration Preview

Everything so far -- `docker run`, Dockerfiles, Compose -- runs on one host. That's been enough for every example in this course, including Northbridge's full `compose.yaml` stack from Chapter 6. But one host means one point of failure, and one ceiling on how many containers it can physically hold. This closing lesson looks at why that matters and what comes next.

## What you'll learn

- Why `docker compose up` is fundamentally a single-host tool
- What an orchestrator actually adds on top of what Compose already does
- The two names you'll keep hearing: Docker Swarm and Kubernetes
- What the next course in this path covers

## Why Compose stops at one host

Compose's entire model -- the shared default network from Lesson 24, named volumes, `depends_on` -- assumes every service lives on the same machine. If Northbridge's traffic outgrows what one host's CPU and memory (Chapter 7's resource limits) can absorb, there's no `docker compose` flag that spreads `catalog`, `api`, and `db` across a second or third server. Compose was never designed to decide *which* host runs *which* container, or to notice when a host itself dies and reschedule its containers elsewhere.

## What an orchestrator adds

```text
Scheduling     -- decides which of many hosts runs each container,
                  based on available CPU/memory across the cluster
Self-healing   -- notices a crashed container or a dead host and
                  reschedules it automatically -- taking the health
                  checks from Lesson 25 further than one host can
Cluster-wide   -- run many copies of api spread across several
discovery         machines, and still reach any of them through one
                  stable name, the same way Compose's service names
                  work today -- just across hosts instead of within one
```

## Two names you'll keep hearing

```text
Docker Swarm    -- Docker's own built-in orchestrator. docker swarm init
                    turns a compose.yaml's deploy: block (the same block
                    Lesson 27 used for resource limits) into a real
                    multi-host deployment. Simple, but far less adopted
                    in production than the alternative below.

Kubernetes (k8s) -- the industry-standard orchestrator. Same core ideas
                    as Swarm -- scheduling, self-healing, scaling -- but
                    with its own YAML shapes (Pods, Deployments, Services)
                    and a much larger ecosystem. What most production
                    teams actually run at scale.
```

Nothing in this course's Dockerfiles or images changes for either one -- an orchestrator schedules and manages the same containers you've already been building. What changes is who decides where they run, and what happens automatically when something fails.

## Key terms

- **Orchestrator** -- a system that schedules and manages containers across multiple hosts
- **Scheduling** -- deciding which host runs which container
- **Self-healing** -- automatically restarting or rescheduling failed containers or hosts
- **Docker Swarm** -- Docker's own built-in, Compose-adjacent orchestrator
- **Kubernetes (k8s)** -- the industry-standard container orchestrator
