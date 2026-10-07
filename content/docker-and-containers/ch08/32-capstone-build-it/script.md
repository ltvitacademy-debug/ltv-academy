## Segment 1 (title)

Lesson thirty-one was the brief. This is the build -- real Dockerfiles for catalog and checkout, a complete compose.yaml tying in the database, and docker compose up to bring the whole thing to life.

## Segment 2 (code)

The catalog Dockerfile is the multi-stage pattern from Chapter Three, with the non-root user from Chapter Seven added on top. A build stage installs dependencies and copies the app in; the runtime stage starts fresh, creates a catalog user, copies in only what the build stage produced, and switches to that user before the container ever starts listening on port three thousand.

## Segment 3 (steps)

Checkout's Dockerfile is the identical shape -- same multi-stage split, same non-root pattern, just its own user and its own application code. That's the point of teaching the pattern once: every service in this stack follows it, instead of each Dockerfile reinventing how to run safely.

## Segment 4 (code)

The compose.yaml is where it actually becomes one application. catalog-db gets a named volume so its data survives a restart, plus a health check. checkout declares depends_on catalog-db with condition service_healthy, so it won't start taking traffic before the database actually reports ready -- not just started, genuinely ready. All three sit on the same user-defined network, so checkout reaches catalog-db by name, not by IP address.

## Segment 5 (code)

docker compose up dash d brings up all three. docker compose ps shows catalog, catalog-db, and checkout, and once the health check passes, catalog and catalog-db report healthy. A curl against the checkout endpoint returns a real confirmed order instead of a connection refused, and docker compose logs shows checkout actually talking to the database behind it.

## Segment 6 (outro)

Everything from chapters two through seven is now one working, hardened, multi-service application. Lesson thirty-three closes out the capstone -- and this course -- with how to write this project up for a portfolio and an interview.
