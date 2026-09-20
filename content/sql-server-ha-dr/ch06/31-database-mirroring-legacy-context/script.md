# Script — Database Mirroring, in Legacy Context

## Segment 1 (title)

This is a technology you're unlikely to be asked to deploy new, but reasonably likely to encounter on an inherited system. Being honest about that status, rather than pretending it's irrelevant or teaching it as a live recommendation, is the point of this lesson.

## Segment 2 (code: Microsoft's real, current position)

Database mirroring has been marked deprecated by Microsoft for a considerable time, with Availability Groups positioned as its direct replacement. Nothing here is a recommendation to deploy mirroring on a new system — but a meaningful number of production systems built years ago are still running it, unmigrated.

## Segment 3 (steps: the real mechanism)

Mirroring works between exactly two instances, at the single-database level. The principal actively serves the database. The mirror continuously receives and applies log records, kept in a restoring state, not queryable. An optional witness — a third instance — can enable automatic failover between them; without one, failover has to be initiated manually.

## Segment 4 (outro)

This principal/mirror/witness structure is recognizably the ancestor of the primary-replica model Availability Groups later generalized. Next up: honest guidance on when log shipping, mirroring, or AGs actually make sense today.
