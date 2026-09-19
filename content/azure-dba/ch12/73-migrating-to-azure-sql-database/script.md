# Script — Migrating SQL Server to Azure SQL Database

## Segment 1 (title)

Azure SQL Database is a single database, not an instance, and that shapes exactly what doesn't come with it: no cross-database queries across servers, no SQL Server Agent as a full scheduler, no linked servers. These are the feature parity gaps from Lesson 71 — the database migrates fine, but these capabilities don't travel with it.

## Segment 2 (steps: compatibility considerations)

If assessment turned up a hard dependency on any of these, Azure SQL Database may be the wrong target. Managed Instance exists partly because of gaps like these. Here's the fact that trips up DBAs coming from on-prem: Azure SQL Database does not support native RESTORE DATABASE FROM URL — that's a Managed Instance capability, not a singleton database one.

## Segment 3 (code: the real path)

The real path is a BACPAC — a portable package of schema and data, imported through az sql db import. It's the offline path from last lesson: export, upload, import, verify, then cut traffic over. For a large database, or the online path, Database Migration Service handles continuous sync instead of a single export and import.

## Segment 4 (outro)

The mechanism differs between BACPAC and DMS; the outcome — schema and data landing safely in Azure SQL Database — is the same job. Next up: migrating to Managed Instance, where native backup and restore actually is the real path.
