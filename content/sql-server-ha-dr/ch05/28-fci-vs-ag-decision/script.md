# Script — FCI vs. AG: Which One?

## Segment 1 (title)

Chapter four was a deep dive into Availability Groups; this chapter has been a deep dive into Failover Cluster Instances. This is the honest comparison neither chapter gave on its own — including the answer many real deployments actually land on.

## Segment 2 (code: what each one actually protects against)

An FCI protects against a node failure, but the shared storage itself is a single point of failure — if the SAN goes down, every node loses access at once. An AG protects at the database level with independent storage per replica, so a storage failure on the primary doesn't touch the secondary at all — but that independence brings more edition and licensing considerations.

## Segment 3 (steps: the honest real-world answer)

Because they protect against different failure modes, a common real pattern is combining them: run an FCI within each site for cheap node-level protection, then build an Availability Group between FCIs at different sites for storage and site-level protection. That's a deliberate layered design, not an indecision.

## Segment 4 (outro)

This closes out failover clustering. Next up: log shipping — an older, simpler technology that's still legitimately in use, starting with how it's actually set up.
