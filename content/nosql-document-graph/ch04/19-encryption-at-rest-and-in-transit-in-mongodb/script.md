# Script — Encryption at Rest & in Transit in MongoDB

## Segment 1 (title)

Authentication and RBAC control who can connect and what they can do. Encryption protects the data itself, both on disk and across the network, and MongoDB draws a real licensing line between the two.

## Segment 2 (code: at rest, Enterprise/Atlas)

Encryption at rest means the data files themselves are encrypted on disk, implemented as the Encrypted Storage Engine — a WiredTiger option using AES-256. This is genuinely an Enterprise or Atlas feature, not available in Community Server. On Atlas, it's handled automatically as part of the managed service.

## Segment 3 (code: in transit, Community)

Encryption in transit protects data moving between client and server, and unlike at-rest encryption, TLS is available in Community Server for free. tlsMode requireTLS rejects any connection that isn't encrypted at all — the setting you actually want in production, comparable to Force Encryption on SQL Server.

## Segment 4 (steps: the licensing split)

In transit, TLS, available in Community, no upgrade required. At rest, the Encrypted Storage Engine, requires Enterprise or Atlas — a real reason compliance requirements push an organization off Community Server.

## Segment 5 (outro)

Encryption protects data that's already reachable by an authenticated, authorized connection. Next up: auditing and a real hardening checklist for taking MongoDB into production.
