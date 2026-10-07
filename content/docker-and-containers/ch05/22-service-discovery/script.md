## Segment 1 (title)

catalog and catalog-db already prove the pattern: same user-defined network, resolve each other by name. This lesson applies it to Northbridge's other service -- wiring checkout to its own database, checkout-db, the same way.

## Segment 2 (code)

Same shape as catalog-db from the last lesson: a named volume for persistence, a user-defined network for DNS, this time scoped to checkout's own services -- northbridge-checkout-net, separate from catalog's network.

## Segment 3 (code)

Here's where it actually matters: checkout's config file. DATABASE_URL points at checkout-db colon 5432 -- not an IP address, not localhost, the container's actual name. That's the one line that makes this whole lesson work.

## Segment 4 (code)

Start checkout on that same network with dash dash env-file, and check the logs: connected to checkout-db colon 5432. Nothing in checkout's configuration or code ever needed that database's IP address -- Docker's embedded DNS resolved the name the moment the app asked for it.

## Segment 5 (steps)

That's the whole pattern: both containers on a shared user-defined network, the app's config pointing at a container name instead of an address, and no IP anywhere that a restart could quietly break.

## Segment 6 (outro)

That's Chapter 5 -- data that survives restarts, and containers that find each other by name instead of a fragile IP. Chapter 6 picks up every docker run, dash v, dash dash network, and dash dash env-file flag used so far and writes them down in one file instead: Docker Compose.
