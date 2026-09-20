# Script — MySQL Router & Read/Write Splitting

## Segment 1 (title)

An InnoDB Cluster automatically elects a new primary when the old one fails, but an application connected to the old primary doesn't automatically know that. MySQL Router closes that gap — it sits between applications and the cluster and always knows the current topology.

## Segment 2 (code: provisioning Router)

Router is lightweight and stateless. It's provisioned with mysqlrouter --bootstrap pointed at any cluster member, which reads the cluster's metadata and writes Router's own configuration — the DBA never hand-tracks which member is currently primary.

## Segment 3 (steps: default connection-level ports)

Out of the box, Router exposes separate ports: 6446 for classic-protocol read-write traffic, always routed to the current primary, and 6447 for read-only traffic, round-robined across available replicas. 6448 and 6449 provide the same split for the X Protocol.

## Segment 4 (steps: statement-aware splitting)

That two-port model is connection-level splitting. More recent MySQL Router releases add statement-aware read/write splitting within a single connection, sending reads to a replica and writes to the primary automatically, while respecting transaction consistency.

## Segment 5 (outro)

Reads scale out, writes always land on the one current primary, and the application never tracks cluster membership itself. Next up: MySQL migration and upgrade strategies, closing out the MySQL section of the course.
