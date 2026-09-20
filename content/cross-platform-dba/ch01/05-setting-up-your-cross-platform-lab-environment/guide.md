# Setting Up Your Cross-Platform Lab Environment

Everything from Chapter 2 onward asks you to actually run Oracle, MySQL, and PostgreSQL —
not just read about them. This lesson sets up the lab those chapters build on: one Docker
container per platform, running side by side on your own machine.

## What you'll learn

- Why containers, not bare-metal installs, are the practical lab setup for this course
- Where each platform's official image actually comes from — and why Oracle is different
- The setup flow you'll repeat, with variations, in Chapters 2, 7, and 12
- What isolates each container so all three platforms can coexist without conflict

## Why a container per platform, not three installs on one machine

Installing three full database engines directly on your operating system is the old way to
build a lab, and it's a genuinely bad one: each installer touches services, registry entries
or system libraries, and startup configuration in ways that are hard to fully undo. Get Oracle's
listener fighting for a port with something else, or a leftover MySQL service auto-starting
after you thought you removed it, and you're debugging your lab instead of learning the
platform.

A Docker container sidesteps all of that. Each platform runs in its own isolated process with
its own filesystem, its own network port mapping, and its own lifecycle — start it, stop it,
delete it, rebuild it from the image in minutes. This isn't a simplification made just for this
course; running database engines in containers for dev and test environments is standard
practice at a large number of real companies today, precisely because it's disposable and
repeatable in a way a bare-metal install isn't.

## Where each platform's image actually comes from

MySQL and PostgreSQL are the easy cases. Both publish official images directly on Docker Hub —
`mysql` and `postgres` — maintained by their respective communities/vendors, versioned by major
release (`mysql:8`, `postgres:16`), and ready to run with a single `docker pull`.

Oracle is structurally different, and it's worth understanding why now rather than being
surprised by it in Chapter 2. Oracle's licensing model means its database images aren't on the
public Docker Hub. Oracle Database Free (the current free edition, the successor to what used
to be called Express Edition / XE) is distributed through Oracle Container Registry
(`container-registry.oracle.com`), which requires a free Oracle account and clicking through a
license agreement before you're allowed to pull the image. It's an extra step, not a harder one
— and it's the same account/license gate you'd hit installing Oracle software in a real job.

## The setup flow you'll repeat all course

The shape of the setup is identical across all three platforms, even though the image source
differs:

1. **Install Docker** — Docker Desktop on Windows/Mac, or Docker Engine on Linux.
2. **Pull the image** — `docker pull mysql:8`, `docker pull postgres:16`, or the Oracle
   Database Free image from Oracle Container Registry.
3. **Run the container** — with a password set via environment variable, a port mapped to your
   machine, and a named volume so the database files persist across restarts.
4. **Connect and verify** — using that platform's native client (SQL*Plus for Oracle, the
   `mysql` client, `psql` for PostgreSQL) to confirm the engine is actually up.

You'll do exactly this — with platform-specific detail — when Chapter 2 installs Oracle,
Chapter 7 installs MySQL, and Chapter 12 installs PostgreSQL. This lesson is the only place
that flow gets explained once, generically, instead of three times.

## Key terms

| Term | Meaning |
|---|---|
| Docker image | A read-only template (e.g. `postgres:16`) that a container is created from |
| Docker container | A running instance of an image — an isolated process with its own filesystem and network |
| Docker volume | Persistent storage attached to a container, so data survives a container restart or rebuild |
| Oracle Container Registry | Oracle's own image registry (`container-registry.oracle.com`), separate from Docker Hub, gated by account + license acceptance |

## Check yourself

Why is a disposable, container-per-platform lab a more practical choice for a course covering
three database engines than installing all three directly on your host operating system — and
why does pulling the Oracle image involve an extra step that MySQL and PostgreSQL don't?
