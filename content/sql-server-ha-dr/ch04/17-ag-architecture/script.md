# Script — Availability Group Architecture

## Segment 1 (title)

Chapter 3 established when an Availability Group is the right technology. This chapter goes deep on the technology itself, starting with its actual moving parts — because "AG" is several components working together, not one thing.

## Segment 2 (steps: the real components)

Underneath, on Windows, an AG runs on top of a Windows Server Failover Cluster — that's what handles quorum and actually triggers failover, not SQL Server itself. Every AG has one primary replica taking read/write traffic, and one or more secondaries receiving log records over the network, on their own independent storage.

## Segment 3 (code: what every replica has to satisfy)

Every replica needs to be in the same WSFC on Windows. Databases must be in FULL recovery model — SIMPLE simply doesn't work with AGs. And mixing Standard and Enterprise Edition replicas constrains the whole AG down to Basic AG behavior, even on the Enterprise nodes.

## Segment 4 (outro)

When a client connects to the listener, it always resolves to whichever replica is primary right now — that's what makes failover invisible to the application. Next up: actually creating an Availability Group with real T-SQL.
