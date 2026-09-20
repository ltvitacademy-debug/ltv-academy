# ETL & Data Migration Tools for Cross-Platform Moves

This lesson closes Chapter 17, and with it, the cross-platform migration chapter as a whole.
The last five lessons covered how to assess a project and the schema- and syntax-level
differences between SQL Server and each target platform. This lesson covers the last
practical piece: the real tools used to actually move the data.

## What you'll learn

- Why native export/import tools, already covered per platform, are still the migration
  workhorse for schema and bulk data
- The real category of dedicated cross-platform migration tools, and honest examples
- Why continuous replication matters for minimizing cutover downtime

## Native tools: still the foundation

Every platform-specific chapter in this course already covered each platform's own
export/import tooling, and those tools remain central to a real migration, not just to
day-to-day operations:

- **SQL Server**: `bcp` for bulk data export/import, the SQL Server Import and Export
  Wizard, and SSIS packages for anything that needs transformation logic along the way.
- **Oracle**: Data Pump (`expdp`/`impdp`) for full schema and data export/import, which is
  the standard way to move an entire Oracle schema in or out.
- **MySQL**: `mysqldump` for logical backups and data export, and `mysqlpump` as its
  newer, parallelized counterpart.
- **PostgreSQL**: `pg_dump`/`pg_restore` for logical backup and restore, and `COPY` for
  fast bulk data loading.

These tools are excellent at getting data *out* of the source platform in a portable form,
but none of them natively transform SQL Server's schema into Oracle's, MySQL's, or
PostgreSQL's schema on the way — that conversion is a separate step, which is exactly the
gap dedicated migration tools are built to fill.

## Dedicated cross-platform migration tools: a real category

Beyond native per-platform tools, there's a real category of tools built specifically to
move data *and* handle schema conversion *between different database platforms*, not just
in and out of one:

- **AWS Database Migration Service (DMS)** — a managed service for migrating databases into
  or within AWS, supporting both a one-time full load and ongoing change data capture (CDC)
  for minimal-downtime cutovers. It's commonly paired with the **AWS Schema Conversion
  Tool (SCT)**, which handles the schema and code translation piece (procedures, functions,
  views) that DMS itself doesn't.
- **Azure Database Migration Service (DMS)** — Microsoft's equivalent managed service for
  migrating databases into Azure targets, again supporting both offline and online
  (minimal-downtime) migration modes.
- **Vendor- and community-built converters for specific platform pairs** — tools like
  **Ora2Pg**, an open-source tool purpose-built for Oracle-to-PostgreSQL schema and data
  conversion, exist because a specific, common migration path is worth dedicated tooling.
  It's honestly worth noting the direction can run the other way too: Microsoft's own **SQL
  Server Migration Assistant (SSMA)** exists to bring Oracle, MySQL, and other databases
  *into* SQL Server — a reminder that "migration tooling" isn't a one-way street, and it's
  worth double-checking which direction a given tool is actually built for before relying on
  it.

## Why continuous replication matters for cutover

A one-time full data load works fine for a small database with an acceptable maintenance
window, but a large, actively-used production database usually can't tolerate the downtime a
full export-transform-load cycle requires. This is exactly why tools like AWS DMS and Azure
Database Migration Service support **change data capture (CDC)**-based ongoing replication:
after the initial full load completes, the source database keeps running and taking live
traffic while the migration tool continuously replicates new changes to the target. Cutover
then becomes a short final step — pause writes on the source, let the last few changes
replicate, and switch the application to the target — measured in minutes instead of the
hours or days a full reload would take. Recognizing which category a given tool falls into —
one-time load only, versus one-time load plus ongoing CDC — is itself part of a realistic
migration assessment, tying directly back to the timeline discipline from Lesson 85.

## Key terms

| Term | Meaning |
|---|---|
| Schema conversion tool | Software that translates table, procedure, and function definitions between platforms |
| Change data capture (CDC) | Continuously replicating ongoing changes from source to target after an initial load |
| Cutover | The final switch of production traffic from the source platform to the target |
| Managed migration service | A cloud provider's hosted tool for moving databases, e.g. AWS DMS or Azure DMS |

## Check yourself

Why does a large, actively-used production database usually need a CDC-capable migration
tool rather than a one-time export/import, and how does that change what cutover looks
like?

## Chapter complete — what's next

Chapter 17 is done: you've assessed a migration project honestly, learned the real key
differences moving to Oracle, PostgreSQL, and MySQL, built a data-type mapping reference
across all four platforms, and covered the real tools that move the data. Chapter 18 is the
course's capstone — starting with Lesson 91, "Project Introduction: You're the Cross-Platform
DBA," where everything from this course comes together in one project.
