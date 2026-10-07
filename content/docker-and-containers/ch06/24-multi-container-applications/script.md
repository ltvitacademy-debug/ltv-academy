## Segment 1 (title)

One service was lesson twenty-three. Northbridge's real storefront needs three: a web front end, an api, and a db -- all in one compose.yaml, started with one command.

## Segment 2 (code)

Web depends on api, and api depends on db. Notice api's environment sets DB_HOST to just the word "db", not an IP address -- that works because Compose puts every service in the file on one shared network, and each one is reachable by its service name.

## Segment 3 (code)

docker compose up dash d starts all three in the order depends_on describes -- db first, then api, then web. Four things created: one network, three containers.

## Segment 4 (steps)

Three things worth noticing. Service discovery, where api reaches db just by name. depends_on, which only guarantees start order. And the db-data volume, which keeps Postgres's actual data safe independent of the container itself.

## Segment 5 (outro)

Here's the catch: depends_on starts db before api, but Postgres might still be initializing when api tries to connect. Start order isn't the same as ready. That exact gap is what health checks and restart policies close, next.
