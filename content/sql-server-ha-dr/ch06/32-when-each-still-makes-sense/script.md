# Script — When Each Still Makes Sense

## Segment 1 (title)

This closes the chapter with the honest, practical question underneath everything since Chapter 3: given that Availability Groups are the modern default, when does it actually make sense to reach for log shipping or mirroring instead?

## Segment 2 (code: log shipping's real, current use case)

Log shipping's core properties — simple, schedule-based jobs, no need for low-latency networking — are still genuinely useful for a simple offsite reporting or disaster-recovery copy, especially across long distances where synchronous replication would be impractical. If a few minutes of staleness is genuinely fine, that's not a legacy leftover, it's the right tool.

## Segment 3 (steps: the honest verdict, side by side)

Log shipping still has a real "choose it" scenario today. Mirroring doesn't — it only has a "found it, plan to migrate it" scenario, since Availability Groups are the mature, invested-in replacement. AGs remain the modern default for most new HA/DR requirements, and the landing point mirroring should move toward.

## Segment 4 (outro)

That's the honest framing for this whole chapter. Next up, Chapter Seven begins: an overview of SQL Server's real replication types.
