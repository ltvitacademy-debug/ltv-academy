# Why Containers

Welcome to Docker & Containers, and to Chapter 1: Container Fundamentals. Before you run a single command, it's worth answering the question every new hire eventually asks: why do we even need containers? Throughout this course we'll follow a fictional mid-size e-commerce retailer, **Northbridge Retail**, as its engineering team modernizes how it builds and ships its product-catalog and checkout applications. This lesson covers the problem containers were invented to solve.

## What you'll learn

- The "it works on my machine" problem, and why it keeps happening
- What a container actually packages together
- Why containers stay lightweight compared to running a separate OS per app
- How this plays out for a real team like Northbridge Retail's

## The problem: environments never quite match

Picture a developer on Northbridge Retail's team building the product-catalog service. It runs perfectly on their laptop. They push it to a test server, and it breaks — the test server has a slightly different version of Node.js installed, or is missing a system library the laptop happened to have. This is the classic **"it works on my machine"** problem, and before containers became standard, teams fought it in a few recurring ways:

- **Environment drift** — a developer's laptop, the test server, and production rarely have identical OS patches, language runtimes, and installed libraries.
- **Dependency conflicts** — two applications on the same host can require different, incompatible versions of the same library.
- **Slow onboarding** — a new engineer can lose a day or more just getting their machine configured to match everyone else's.
- **Expensive isolation** — the traditional fix, a separate virtual machine per application, works but is heavy: each VM boots its own full operating system.

## What a container actually is

A **container** packages an application together with everything it needs to run — its code, its runtime (like Node.js or Python), its libraries, and its configuration — into a single, self-contained unit called an **image**. That image runs identically wherever it's started, because it's the exact same bits every time: the developer's laptop, a CI pipeline, and production all run the same image.

```text
Container = code + runtime + libraries + config
            packaged once, run identically everywhere
```

Containers get this consistency without the overhead of a full virtual machine, because they don't boot their own operating system. Instead, every container on a host shares that host's OS kernel, and each one gets an isolated view of the filesystem, network, and processes — a topic we'll go deep on in Lesson 3 when we cover namespaces and cgroups. For now, the short version: isolation without duplication.

## Why this matters at Northbridge Retail

Northbridge Retail's engineering team runs two separate applications side by side on the same servers:

| Service | Runtime | Dependency tree |
|---|---|---|
| Product-catalog | Node.js | one set of npm packages |
| Checkout | Python | a completely different set of packages |

Running both directly on one host risks one service's dependencies colliding with the other's — or worse, a library upgrade for checkout silently breaking the catalog service. Running each service in its own container means neither one ever touches the other's dependencies. Both can be built, deployed, scaled, and updated independently, and the image that passed testing is the exact image that runs in production.

## Key terms

- **Container** — a running instance of an image; an isolated process (or group of processes) that shares the host's OS kernel
- **Image** — the packaged application: code, runtime, libraries, and configuration, bundled together and never changed once built
- **"It works on my machine"** — the environment-mismatch problem containers are designed to eliminate
- **Isolation without duplication** — containers isolate apps from each other without each one needing its own full operating system
