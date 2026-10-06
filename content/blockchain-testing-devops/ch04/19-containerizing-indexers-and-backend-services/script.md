# Script — Containerizing Indexers & Backend Services

## Segment 1 (title)

A frontend is mostly static files. An indexer is the opposite -- a long-running process that watches the chain, rebuilds its own database, and has to stay up continuously. That difference changes how you host it.

## Segment 2 (screenshot: Docker Desktop containers)

A container platform shows exactly what's running, right now -- which image, which port, how long it's been up. An indexer that's silently crash-looping doesn't show up as "deployed successfully" the way a static build does; it shows up here, or it doesn't show up at all.

## Segment 3 (screenshot: Docker Hub)

Don't hand-build a base image from memory. Pull a specific, pinned, published image -- the same reproducibility argument Chapter 1 made for pinning a Solidity compiler version applies just as much to the container your indexer runs in.

## Segment 4 (screenshot: Docker Scout)

An unscanned base image can ship known vulnerabilities straight into production. Scanning it before it ships is the container-world equivalent of running Slither before merge -- Chapter 2, Lesson 10 -- catching a known class of problem automatically.

## Segment 5 (code: minimal Dockerfile)

Pin the base image version, lock dependencies with npm ci instead of npm install, copy only what's needed, and run as a non-root user. None of this is exotic -- it's the same discipline as pinning a compiler version, just applied to the box the code runs in.

## Segment 6 (outro)

A containerized indexer still needs an RPC URL, a database connection string, maybe an API key -- none of which belong baked into the image. Lesson 20 covers exactly where those values should actually live.
