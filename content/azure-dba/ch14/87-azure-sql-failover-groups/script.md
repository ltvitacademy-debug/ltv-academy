# Script — Azure SQL Failover Groups

## Segment 1 (title)

Geo-replication replicates data, but leaves a real problem unsolved: how does the application know which region is currently primary? A failover group sits above geo-replication and adds a stable listener endpoint — one DNS name Azure always points at the current primary.

## Segment 2 (code: geo-replication vs failover group)

Geo-replication alone means the client has to know the actual server name, updated by hand after a manual failover. A failover group adds a single stable endpoint the app always connects to, plus an optional automatic failover policy on top of the same replication underneath.

## Segment 3 (steps: automatic failover policy)

Failover can be manual, same control as plain geo-replication, or automatic based on a policy with a grace period — how long to wait before triggering, so a brief network blip doesn't cause an unnecessary failover.

## Segment 4 (code: creating a failover group)

Creating one is a PowerShell or CLI operation, not T-SQL, since a failover group is a server-level Azure resource. Once it's created, the application connects to one stable name — never the individual server names — and Azure keeps it pointed at whichever server is primary.

## Segment 5 (outro)

That's the genuine difference: geo-replication moves the data, a failover group also moves where the application points. Next up: log shipping — an older mechanism, still real, still used in hybrid on-prem-to-Azure scenarios.
