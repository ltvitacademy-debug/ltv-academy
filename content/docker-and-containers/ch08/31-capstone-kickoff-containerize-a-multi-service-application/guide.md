# Capstone Kickoff: Containerize a Multi-Service Application

Chapters 2 through 7 taught images, Dockerfiles, multi-stage builds, registries, volumes, networking, Compose, and production hardening one piece at a time, each against a slice of Northbridge Retail's product-catalog and checkout services. This capstone puts every piece together: you're containerizing Northbridge's real multi-service application — product-catalog, checkout, and the database behind them — as a single Compose-orchestrated stack, built and reviewed the way a real production pull request would be.

## What you'll learn

- The full scope of the capstone assignment, as a rubric you can check off item by item
- Why this project is scoped as three services and one `compose.yaml`, not one giant container
- What "production-ready," not just "it runs," means for a Docker submission
- How this capstone maps directly onto chapters 2-7, so nothing here is new material

## The assignment

Northbridge Retail's product-catalog service and checkout service have been running informally — a pulled image here, a manual `docker run` there. Your job is to turn that into something a real team could hand off: three services, wired together with Compose, hardened the way Chapter 7 taught, and pushed to a registry the way Chapter 4 taught.

Three pieces, no more:

- **`catalog`** — the product-catalog service (the Node app from Chapter 3)
- **`checkout`** — the checkout service, which talks to `catalog` and to the database
- **`catalog-db`** — a Postgres database, with its data in a named volume so it survives a container restart

## The rubric

Each item maps to a specific chapter you've already completed — this capstone is assembly, not new concepts:

- **A Dockerfile for `catalog` and one for `checkout`**, each a multi-stage build (Chapter 3, Lesson 14) that ships only the runtime, not the build toolchain
- **A `compose.yaml`** wiring all three services together on a user-defined bridge network (Chapter 5, Lesson 21) instead of Docker's default bridge
- **A named volume** for `catalog-db`'s data directory (Chapter 5, Lesson 19), so `docker compose down` doesn't silently erase the database
- **Health checks and restart policies** on every service (Chapter 6, Lesson 25) — `checkout` shouldn't start taking traffic before `catalog-db` is actually ready
- **Resource limits** on every service (Chapter 7, Lesson 27), so one runaway container can't starve the host
- **Non-root users** in both Dockerfiles (Chapter 7, Lesson 29) — no service runs as root inside its container
- **Environment configuration via `.env`**, never committed to the repo (Chapter 6, Lesson 26) — database credentials live in a `.env` file covered by `.gitignore`, not hardcoded in `compose.yaml`
- **Both images pushed to a registry** (Chapter 4, Lesson 16), tagged with a real version, not just `latest`

## What "done" looks like

`docker compose up -d` brings up all three services from a clean checkout of the repo (minus the `.env` file, which never gets committed). `docker compose ps` shows all three healthy. Hitting the checkout service's endpoint returns a real response, and `docker compose logs` shows catalog, checkout, and the database actually talking to each other — not three containers that happen to be running in isolation.

Lesson 32 builds this rubric into real files, end to end. This lesson is the brief; that one is the work.

## Key terms

- **Capstone** — a final project that assembles previously-taught pieces into one working submission, rather than teaching something new
- **Rubric** — the explicit checklist a submission is graded against
- **Compose-orchestrated application** — multiple services, defined in one `compose.yaml`, brought up and down together
- **Production-ready (for this course's purposes)** — hardened, health-checked, resource-limited, and non-root — not just "it runs on my machine"
