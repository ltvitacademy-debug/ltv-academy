# Script — Project 1: Production Hardening

## Segment 1 (title)

Production-ready doesn't mean "runs once successfully" — it means surviving the failure modes that eventually show up: malformed events, transient errors, a briefly unavailable table.

## Segment 2 (code: failure modes and handlers)

A malformed event gets rejected to a dead-letter table. A duplicate redelivery gets absorbed silently by the idempotent merge already built into ingestion. A missing export file alerts instead of silently skipping a store.

## Segment 3 (code: retries and idempotency together)

Idempotent MERGE is what makes "just retry it" a safe recovery strategy instead of a data-corruption risk — a retry after a transient failure produces the same result either way.

## Segment 4 (code: observability and the SLO)

Logs, metrics, and traces map onto this pipeline directly, with dead-letter growth as the metric worth watching most. The alert threshold fires well before the SLO would actually breach — an early warning, not a postmortem.

## Segment 5 (outro)

A pipeline that survives its own failure modes and tells you before it breaks an SLA. Next up: wrapping up Project 1 with an honest retrospective.
