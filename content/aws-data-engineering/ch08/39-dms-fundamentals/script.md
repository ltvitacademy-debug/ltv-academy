# Script — DMS Fundamentals

## Segment 1 (title)

Every AWS data platform eventually has to ingest data from somewhere that isn't AWS-native. AWS Database Migration Service is the purpose-built tool for moving that data in, whether it's a one-time cutover or an ongoing sync.

## Segment 2 (code: the core architecture)

A DMS migration has three pieces. The replication instance is a managed EC2 instance that does the actual work of reading and writing. The source endpoint holds connection details for where data comes from. The target endpoint holds connection details for where it's going — RDS, Redshift, S3, or another supported target.

## Segment 3 (steps: homogeneous vs. heterogeneous)

Homogeneous migrations move data between the same database engine, like SQL Server to SQL Server — schema maps directly and DMS handles it natively. Heterogeneous migrations, like Oracle to PostgreSQL, need the AWS Schema Conversion Tool first, since data types and schema constructs don't map one to one between engines.

## Segment 4 (steps: what a migration needs)

Every migration task ties together a replication instance, a source endpoint, and a target endpoint, and defines exactly what gets migrated between them.

## Segment 5 (outro)

DMS architecture down. Next up: actually running a full-load migration, from a real source endpoint to a real target.
