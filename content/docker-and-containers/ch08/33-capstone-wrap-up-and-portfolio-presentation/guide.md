# Capstone: Wrap-Up & Portfolio Presentation

The stack is built, hardened, and running. What's left isn't technical — it's making sure a hiring manager or an interviewer actually sees what you did. This lesson covers writing the capstone up for a portfolio and a resume, the talking points it earns you in an interview, and where the Docker & Containers course hands off from here.

## What you'll learn

- How to recap the capstone as a short list of concrete accomplishments, not just "I used Docker"
- How to structure a GitHub README so the project speaks for itself
- How to turn the project into a resume bullet that says something specific
- The talking points an interviewer is likely to probe, and how to answer them
- What the next course in the DevOps Engineer path builds on top of everything you just did

## What you built

Say it plainly, because this is exactly what goes in a README and a resume line:

- Two multi-stage, non-root Dockerfiles — `catalog` and `checkout` — each shipping only a runtime image, never the build toolchain
- A `compose.yaml` orchestrating three services — `catalog`, `checkout`, and `catalog-db` — on a user-defined network, with a named volume so the database survives a restart
- Health checks and restart policies on every service, so dependencies wait for each other to be genuinely ready, not just started
- Resource limits on every service, so no single container can starve the host
- Configuration through a `.env` file that's never committed, with both images tagged with a real version and pushed to a registry

## Writing the GitHub README

A README is where this project actually gets seen — most reviewers read the README before they read a line of code. Structure it like this:

1. **One sentence at the top** — what this is and who it's for: "A Compose-orchestrated e-commerce stack (product catalog, checkout, Postgres) built to demonstrate production Docker practices."
2. **The architecture** — list the three services and how they talk to each other; a simple diagram or even just the `compose.yaml` service names and their connections is enough.
3. **How to run it** — the exact commands, assuming nothing: `git clone`, `cp .env.example .env`, `docker compose up -d`.
4. **What it demonstrates** — multi-stage builds, non-root containers, health checks, resource limits, environment-based secrets. Name the concepts explicitly; don't make the reviewer infer them from the code.
5. **A real screenshot or terminal capture** — `docker compose ps` showing everything healthy is more convincing than any amount of description.

## A resume bullet that actually says something

Compare these two:

- Weak: *"Used Docker to containerize an application."*
- Specific: *"Containerized a 3-service e-commerce application (Node.js product catalog, checkout service, Postgres) with Docker Compose, implementing health checks, non-root containers, resource limits, and registry-pushed, version-tagged images."*

The second version names the actual services, the actual tooling, and the actual hardening decisions. Anyone who knows Docker reads that and immediately knows what you can do — and anyone who doesn't can still tell it's specific and real.

## Talking points for the interview

Expect to be asked *why*, not just *what*. Have real answers ready:

- **"Why multi-stage builds?"** — Smaller images, and a smaller attack surface: the build toolchain (compilers, dev dependencies) never ships in the image that actually runs.
- **"Why non-root containers?"** — If a process inside the container is ever compromised, it still can't act as root on the host or escalate as easily inside the container.
- **"Why health checks, not just restart policies?"** — A container that's started isn't the same as a container that's ready. Health checks let dependent services wait for the real thing.
- **"What would you change given more time?"** — A strong answer, not a weak one: add a CI pipeline that builds and pushes the images automatically, or move from `mem_limit`/`cpus` toward the resource `requests`/`limits` Kubernetes would use at scale. Naming a real next step shows judgment, not just that you followed the rubric.

## What's next: Kubernetes Orchestration

Everything hardened by hand in this capstone — health checks, restart policies, resource limits, multiple containers working together as one application — is exactly what Kubernetes formalizes, at the scale of a whole cluster instead of one host. Compose coordinates containers on one machine; Kubernetes coordinates them across many, with its own versions of nearly every concept from this course: pods instead of containers, Services instead of Compose networking, and resource requests/limits instead of `mem_limit`/`cpus`.

That's where **Kubernetes Orchestration**, the next course in the DevOps Engineer path, picks up.

## Key terms

- **Portfolio project** — a working, documented piece of real work that demonstrates specific skills to someone evaluating you
- **README** — the entry point to a code repository; the first (and sometimes only) thing a reviewer reads
- **Talking point** — a prepared, specific answer to a "why did you do it this way" question about your own work
- **Kubernetes** — the orchestration system that extends this course's concepts — multi-container coordination, health, resource limits — from a single host to a cluster
