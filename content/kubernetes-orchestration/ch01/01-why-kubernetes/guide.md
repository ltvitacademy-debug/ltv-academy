# Why Kubernetes

Northbridge Retail's product-catalog and checkout services already run in Docker containers — that part of the modernization is done. The problem is everything *around* the containers: which of a dozen VMs should run a given container, what happens when one crashes at 2 a.m. during a flash sale, and how a new container version gets rolled out without taking checkout offline. This lesson explains why "just run more containers" stops working past a handful of them, and what Kubernetes actually is.

## What you'll learn

- The specific operational problems that show up once you have more than a few containers running in production
- What Kubernetes is, in one sentence, and what it is not
- The declarative model Kubernetes uses instead of manual, step-by-step automation
- Where Kubernetes fits relative to Docker, which Northbridge already uses

## The problem: containers don't run themselves

Northbridge's checkout service runs as a container. One container, one host, started with `docker run`, is easy. The trouble starts at scale:

- **Placement** — with product-catalog, checkout, and a dozen supporting services spread across 15 VMs, which VM has spare CPU and memory for the next container? Someone has to track that by hand, or write a script that tracks it.
- **Failure** — a VM reboots for a security patch, or a container crashes because of a memory leak. Something has to notice and restart it, on a healthy host, without a human watching a dashboard at midnight.
- **Scaling** — Black Friday traffic needs ten times the normal number of checkout containers for six hours, then back down. Doing that with a shell script that SSHes into VMs doesn't hold up under pressure.
- **Rollouts** — a new checkout image needs to replace the old one, service by service, without a moment where zero checkout containers are reachable.
- **Discovery** — product-catalog needs to find and talk to checkout, and that target keeps moving as containers are replaced. Hardcoding an IP address breaks the first time a container restarts somewhere else.

None of these problems are about Docker itself. Docker runs *one* container correctly. Nothing about Docker tells you *which host*, *how many copies*, or *what to do when one dies*. That's the gap Kubernetes fills.

## What Kubernetes actually is

Kubernetes (often abbreviated **K8s** — "K," 8 letters, "s") is a **container orchestrator**: a system that takes a fleet of machines and runs containers across them according to rules you specify, continuously working to keep reality matching those rules. You don't tell Kubernetes the steps to take — you tell it the end state you want, and it figures out and keeps re-figuring out how to get there.

That's a meaningful distinction from a deployment script. A script that runs `docker run checkout-service` three times is a one-shot action — if a container dies five minutes later, the script doesn't know or care. Kubernetes is told "checkout-service: 3 replicas, always," and it keeps checking that promise against reality, forever, restarting and rescheduling containers whenever reality drifts from the declared state.

## The declarative model, in one comparison

| Imperative (what a script does) | Declarative (what Kubernetes does) |
|---|---|
| "Run this container on host A, now." | "I want 3 copies of this container running, always." |
| Nothing happens if a container later dies. | Kubernetes notices and starts a replacement. |
| You write new steps for every new scenario. | You describe desired state once; Kubernetes reconciles toward it continuously. |

This declarative loop — compare desired state to actual state, take action to close the gap, repeat — is the single idea underneath almost everything else in this course: Deployments, Services, autoscalers, and self-healing all come from this same loop running continuously in the background.

## Where Kubernetes fits next to Docker

Kubernetes doesn't replace Docker's job of building and running a single container — it sits a layer above it, deciding *where* and *how many* of each container to run across a whole cluster of machines, and reacting automatically when something changes. Northbridge's existing container images don't change at all to run on Kubernetes; what changes is everything about placement, scaling, healing, and networking around them, which is exactly what the rest of this course builds up, chapter by chapter.

## Key terms

- **Container orchestrator** — a system that schedules, runs, and manages containers across a fleet of machines according to declared rules
- **Kubernetes (K8s)** — the open-source container orchestrator this course teaches; abbreviated K8s for the 8 letters between "K" and "s"
- **Declarative model** — describing the desired end state and letting the system continuously reconcile reality to match it, instead of scripting manual steps
- **Reconciliation loop** — the continuous process of comparing desired state to actual state and acting to close any gap
