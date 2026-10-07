# Script — Online vs. Offline Features

## Segment 1 (title)

Last lesson said a feature store gets two things out of one definition: historical values for training, and a fast live value for serving. This lesson gets concrete about how those two paths actually differ — the storage each one uses, how fast each needs to be, and how one config file sets up both.

## Segment 2 (steps)

The offline store holds the full historical record of a feature — every value, for every entity, at every point in time — used to build training sets. It's built on technology for scanning large volumes of history, like a data warehouse or a Parquet data lake, and seconds-to-minutes latency is fine since nobody's waiting on it live. The online store holds only the latest value per entity, queried on every live prediction request, so it has to answer in single-digit milliseconds. That shape — fast, one key, no history — is exactly what key-value stores like Redis or DynamoDB are built for.

## Segment 3 (code)

A single Feast project declares both stores in one YAML file — here, a file-based offline store and a Redis online store. Notice this is configuration, not feature logic. The same feature view from the last lesson works unchanged against either store, so swapping the offline store to a warehouse or the online store to DynamoDB is a config change, not a rewrite.

## Segment 4 (steps)

The online store doesn't populate itself — a step called materialization copies the latest values from the offline store into the online store on a schedule. In Feast that's the materialize-incremental command, which picks up only what's changed since the last run instead of recomputing everything. If a feature needs to reflect something that happened seconds ago, scheduled materialization usually isn't fast enough, and teams add a streaming path instead — one of the architecture options the next lesson covers.

## Segment 5 (outro)

Offline and online stores aren't just slow and fast versions of the same thing — different technology, different access patterns, bridged by materialization. Up next, lesson seven: the architecture patterns that tie both stores and the materialization pipeline together into one working system.
