# Project — Securing & Backing Up All Three Platforms

All three databases are up. Now they need to be secured with accounts that can only do what
they're supposed to do, and backed up in a way that would actually survive an incident. This
lesson applies Chapter 3 and 4's Oracle security and RMAN backups, Chapter 8 and 9's MySQL
security and backup tooling, and Chapter 13 and 14's PostgreSQL roles and backup tooling to
Harborline's three real databases.

## What you'll learn

- A least-privilege account on each platform, scoped to what that application actually needs
- A concrete, runnable backup command for each platform, and why that specific tool fits that job
- Why the three backup strategies look different even though the goal — a restorable copy — is the same
- The backup schedule you'd actually hand to Harborline's IT director

## Oracle: FINPRD security and RMAN

The finance application shouldn't connect as `SYS` or even as the schema owner `FINAPP` directly.
Chapter 3 covered roles and profiles for exactly this. A dedicated role limits what the
application account can touch:

```
CREATE ROLE fin_app_role;
GRANT SELECT, INSERT, UPDATE ON finapp.gl_journal_lines TO fin_app_role;
GRANT SELECT, INSERT, UPDATE ON finapp.ap_invoices TO fin_app_role;
CREATE USER fin_app IDENTIFIED BY "…" PROFILE fin_app_profile;
GRANT fin_app_role TO fin_app;
```

The `fin_app_profile`, also from Chapter 3, enforces password expiration and failed-login lockout —
appropriate for a system that closes the company's books.

For backup, Chapter 4's RMAN is the obvious choice: it backs up at the Oracle block level, knows
about the ARCHIVELOG mode configured in Lesson 92, and supports incrementals.

```
rman target /
CONFIGURE RETENTION POLICY TO RECOVERY WINDOW OF 14 DAYS;
BACKUP DATABASE PLUS ARCHIVELOG;          -- Sunday, full
BACKUP INCREMENTAL LEVEL 1 DATABASE;      -- weeknights
```

## MySQL: storefront security and backup

The storefront's application account should only reach the `storefront` schema, from one expected
host range, using MySQL 8's role support from Chapter 8:

```
CREATE ROLE storefront_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON storefront.* TO storefront_role;
CREATE USER 'storefront_app'@'10.20.%' IDENTIFIED BY '…';
GRANT storefront_role TO 'storefront_app'@'10.20.%';
```

The storefront needs two kinds of backup. Chapter 9's `mysqldump` gives a nightly logical backup —
simple, portable, fine for the schema's size:

```
mysqldump -h mysql-web01 --single-transaction storefront > storefront_$(date +%F).sql
```

But a logical dump alone means losing up to a day of orders if the server fails mid-afternoon.
Chapter 9's Percona XtraBackup takes a hot physical backup without locking the tables customers are
actively checking out against, and — combined with the binary log Chapter 9 also covered — supports
point-in-time recovery to the minute of a failure, not just the last midnight dump.

## PostgreSQL: analytics security and backup

The BI team only reads from analytics, so a read-only role is enough for most accounts, per
Chapter 13:

```
CREATE ROLE bi_readonly LOGIN PASSWORD '…';
GRANT USAGE ON SCHEMA reporting TO bi_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA reporting TO bi_readonly;
```

The nightly ETL job that loads `sales_fact` gets its own narrower `reporting_app` role with
`INSERT`/`UPDATE` on that table only — not the broad `bi_readonly` grant, and not superuser.

For backup, Chapter 14 covered two tools with different jobs: `pg_dump` for a fast logical backup
of the `analytics` database, useful before risky schema changes, and `pg_basebackup` plus WAL
archiving for a real physical backup that supports point-in-time recovery — appropriate here
because even an analytics platform that's rebuilt nightly still holds ad hoc reports nobody wants
to lose:

```
pg_dump -h pg-analytics01 -Fc analytics > analytics_$(date +%F).dump
pg_basebackup -h pg-analytics01 -D /backup/base -Fp -Xs -P
```

## The backup schedule across all three

| Platform | Logical backup | Physical / PITR backup |
|---|---|---|
| Oracle (FINPRD) | Data Pump export before major changes | RMAN full weekly + incremental nightly, ARCHIVELOG always on |
| MySQL (storefront) | mysqldump nightly | XtraBackup weekly + binary logs continuously |
| PostgreSQL (analytics) | pg_dump before schema changes | pg_basebackup weekly + WAL archiving continuously |

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting an account only the access it needs for its specific job, nothing broader |
| RMAN | Oracle's Recovery Manager, used for block-level physical backups |
| XtraBackup | Percona's tool for hot physical backups of MySQL/InnoDB |
| WAL archiving | PostgreSQL's mechanism for retaining write-ahead logs to enable point-in-time recovery |

## Check yourself

For each of the three platforms, name the specific backup tool used for point-in-time recovery,
and explain in one sentence why a nightly logical dump alone wouldn't be enough for Harborline.
