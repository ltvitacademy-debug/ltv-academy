# Script — Editions & Versions

## Segment 1 (title)

Editions and versions are two different questions that people conflate. Version is when — 2016, 2019, 2022. Edition is how much — Enterprise, Standard, Developer, Express, Web — the same version licensed and feature-capped differently.

## Segment 2 (code: Two different questions)

SELECT @@VERSION and SERVERPROPERTY of Edition tell you both facts about a running instance, and that's the first thing to check in any triage — you can run SQL Server 2022 Standard or 2022 Enterprise, and they support very different workloads.

## Segment 3 (steps: The real editions)

Enterprise has the full feature set — no hard memory cap, table partitioning, Online Index Rebuild. Standard runs most real-world production but caps Engine memory and lacks those Enterprise-only features. Developer is functionally Enterprise, free, but dev-and-test only. Express is free and production-legal but hard-capped.

## Segment 4 (outro)

A script built and tested on a Developer-edition laptop can quietly fail on a production Standard-edition server that lacks the feature it depends on. Next up: system databases in depth, including the hidden resourcedb.
