# Lesson 19 — Containerizing Indexers & Backend Services

**Chapter 4 · Hosting the Off-Chain Stack · Lesson 19 of 29**

## What you'll learn

- Why indexers and backend services need different hosting than a mostly-static frontend
- How a container platform makes "is it actually running?" a visible, checkable fact
- Why pulling a pinned, published base image beats hand-building one
- Why scanning an image for known vulnerabilities belongs in the same habit as running Slither

## A different shape of problem

Lesson 18 covered hosting a dApp's frontend -- mostly static assets and a few serverless functions, built once and served from a CDN. An indexer is the opposite shape of problem: it's a long-running process that watches the chain block by block, rebuilds its own database as events arrive, and has to stay continuously up, not just reachable. The same is true of most backend services behind a dApp -- a relayer, a keeper bot, an API serving decoded chain data. None of them are "done" once deployed; they're running, or they've silently stopped.

## Seeing what's actually running

![Docker Desktop's Containers view, listing running and stopped containers with their image, ports, CPU, and uptime.](/courses/blockchain-testing-devops/ch04/19-containerizing-indexers-and-backend-services/docker-desktop-dashboard.png)

That's exactly the problem containerization solves well: a container platform shows what's actually running right now -- which image, which port, how long it's been up, how much CPU and memory it's using. An indexer that's crash-looping doesn't quietly disappear the way a bad static deploy would show up as a build failure; it shows up here as a container that keeps restarting, or it doesn't show up at all. That visibility is the whole point.

## Starting from a known base

![Docker Hub's image browser, showing published, versioned container images available to pull.](/courses/blockchain-testing-devops/ch04/19-containerizing-indexers-and-backend-services/docker-hub-hero.png)

Chapter 1 made the case for pinning a Solidity compiler version -- an unpinned compiler means "it worked on my machine" isn't reproducible. The exact same argument applies to a container's base image: pull a specific, published, versioned image (`node:20-slim`, not a loose `node:latest` that changes under you) instead of hand-assembling one from memory. Docker Hub's catalog of published images is the reproducibility layer for the box the code runs in.

## Scanning before it ships

![Docker Scout's repository health view, showing vulnerability counts, policy checks, and a health score for a container image.](/courses/blockchain-testing-devops/ch04/19-containerizing-indexers-and-backend-services/docker-scout-hero.png)

A pinned base image still isn't automatically safe -- it can ship with known, published CVEs in its own dependencies. Scanning an image before it goes to production is the container-world equivalent of running Slither in CI (Chapter 2, Lesson 10): an automated check that catches a known class of problem before a human has to notice it by hand.

## A minimal, disciplined Dockerfile

```
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
CMD ["node", "index.js"]
```

Four habits worth calling out: a pinned base image tag, `npm ci` instead of `npm install` (installs exactly what the lockfile says, nothing drifted), copying only what's needed into the image, and running as a non-root `node` user instead of root. None of this is exotic Docker knowledge -- it's the same discipline Chapter 1 and 2 already built around compiler versions and CI gates, just applied to the container itself.

## Key terms

| Term | Meaning |
|---|---|
| Base image | The starting container image a Dockerfile builds on top of -- pin it to a specific version, don't float on `latest` |
| Image scanning | Automatically checking a container image's dependencies against known vulnerability databases before it ships |
| Non-root user | Running a container's process as an unprivileged user instead of root, limiting what a compromised process can do |

## Check yourself

You're ready for Lesson 20 when you can explain: why does an indexer need different hosting discipline than a static frontend, and what does pinning a base image version have in common with pinning a Solidity compiler version?
