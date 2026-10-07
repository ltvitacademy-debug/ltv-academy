## Segment 1 (title)

Chapters two through seven taught images, Dockerfiles, multi-stage builds, registries, volumes, networking, Compose, and production hardening one piece at a time. This capstone puts every piece together into a single real submission -- Northbridge Retail's full multi-service application, containerized end to end.

## Segment 2 (steps)

Northbridge's catalog and checkout services have been running informally so far -- a pulled image here, a manual docker run there. The assignment turns that into three real services. Catalog is the product-catalog service from Chapter Three. Checkout talks to catalog and to the database. And catalog-db is a Postgres database, with its data living in a named volume so a container restart doesn't quietly erase it. A single compose.yaml wires all three together on a user-defined bridge network instead of Docker's default one.

## Segment 3 (steps)

Every line on the rubric maps to a chapter you've already finished, so none of this is new material. Multi-stage Dockerfiles for catalog and checkout, each running as a non-root user. Health checks and restart policies on every service, so checkout can't start taking traffic before catalog-db actually reports healthy. Resource limits, so one runaway container can't starve the host. And configuration through a dot-env file that's covered by gitignore and never committed, with both images tagged with a real version and pushed to a registry.

## Segment 4 (code)

That's the skeleton you're filling in for real -- three named services, a network, and a volume, with every comment below replaced by actual configuration. Done means docker compose up dash d brings up all three services from a clean checkout of the repo, docker compose ps shows every one of them healthy, and hitting the checkout service's endpoint returns a real response instead of a connection error.

## Segment 5 (outro)

This lesson is the brief. Lesson thirty-two is the work -- real Dockerfiles, a complete compose.yaml, and actually running docker compose up to see it all come together.
