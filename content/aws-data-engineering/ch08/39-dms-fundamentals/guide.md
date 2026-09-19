# DMS Fundamentals

Every AWS data platform eventually has to ingest data from somewhere that isn't AWS-native —
an on-prem SQL Server, an Oracle database, a self-managed MySQL instance. AWS Database
Migration Service (DMS) is the purpose-built service for moving that data in, whether it's a
one-time cutover or an ongoing sync. This lesson covers the architecture; Lessons 40 and 41
walk through actually running a migration and keeping it live with CDC.

## What you'll learn

- What DMS is and the core architecture: replication instance, source endpoint, target endpoint
- Homogeneous vs. heterogeneous migrations
- Why heterogeneous migrations need the Schema Conversion Tool (SCT)
- Where DMS fits relative to Glue and DataSync

## The core architecture

A DMS migration has three pieces:

- **Replication instance** — a managed EC2 instance that actually runs the migration/replication
  process. You choose its instance class based on the size and number of tables being migrated;
  it's the compute DMS uses to read from source and write to target.
- **Source endpoint** — connection details and credentials for where the data is coming from:
  an on-premises database (via VPN or Direct Connect into your VPC), an RDS instance, or a
  self-managed database on EC2.
- **Target endpoint** — connection details for where the data is going: RDS, Redshift, S3, or
  another supported target.

A **migration task**, which Lesson 40 covers in detail, ties a source endpoint and a target
endpoint together on a given replication instance and defines what actually gets migrated.

```text
[ Source DB ] --(replication instance reads)--> DMS --(writes)--> [ Target DB / S3 ]
   on-prem SQL Server,                 EC2-based                    RDS, Redshift,
   RDS, self-managed EC2              compute layer                 S3, etc.
```

## Homogeneous vs. heterogeneous migrations

- **Homogeneous** migrations move data between the same database engine — SQL Server to SQL
  Server, PostgreSQL to PostgreSQL (e.g., migrating an on-prem SQL Server to RDS for SQL
  Server). Schema and data types map directly; DMS handles this natively.
- **Heterogeneous** migrations move data between different engines — Oracle to PostgreSQL, or
  SQL Server to Aurora MySQL. Data types, stored procedures, and schema constructs don't map
  1:1 between engines, so heterogeneous migrations typically start with the **AWS Schema
  Conversion Tool (SCT)**, a separate tool that analyzes the source schema, converts what it
  can automatically, and flags what needs manual rework before DMS handles the actual data
  movement.

For loading operational data straight into S3 for analytics — a common data-engineering use
case rather than a database-to-database cutover — the "schema conversion" question mostly
disappears, since you're landing flat files or Parquet, not another relational schema.

## Key terms

| Term | Meaning |
|---|---|
| Replication instance | The managed EC2-based compute that runs a DMS migration/replication task |
| Source endpoint | Connection details for where data is migrated from |
| Target endpoint | Connection details for where data is migrated to |
| Homogeneous migration | Migration between the same database engine on both ends |
| Heterogeneous migration | Migration between different database engines, usually requiring SCT |
| Schema Conversion Tool (SCT) | Separate AWS tool that converts schema/code for heterogeneous migrations |

## Check yourself

You need to migrate an on-prem Oracle database to Amazon Aurora PostgreSQL. Is this a
homogeneous or heterogeneous migration, and what additional tool will you likely need before
DMS moves any data?
