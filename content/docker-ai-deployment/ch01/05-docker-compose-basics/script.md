# Script — Docker Compose, Basics

## Segment 1 (title)

A real AI app is rarely one container. It's an API service plus something it depends on — a vector database, a cache, a queue. Docker Compose replaces a wall of docker run commands with one file and one command.

## Segment 2 (code: compose.yaml)

Each entry under services becomes one container. One service can build from a Dockerfile, like the api here; another can just pull a published image, like redis. depends_on tells Compose which one has to start first.

## Segment 3 (code: the four commands)

docker compose up, detached, builds what's needed and starts every service in dependency order. docker compose ps lists this project's containers. docker compose logs, with a service name, streams just that one. And docker compose down tears every one of them back down, by name, in a single command.

## Segment 4 (screenshot: Containers view)

And here's the part worth being clear on: Compose is a convenience layer, not a different kind of container. Every service it starts lands in the exact same Containers view as one you started by hand with docker run — Docker Desktop doesn't tell the difference.

## Segment 5 (screenshot: sidebar)

docker logs, docker exec, docker stop from Lesson 4 — none of that goes away. Compose just saves you from typing a long docker run command for every service, up front.

## Segment 6 (outro)

One file, four commands, and ordinary containers underneath. Next up: where those images actually come from before a service pulls one.
