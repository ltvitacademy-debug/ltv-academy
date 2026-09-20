# Project — Standing Up Oracle, MySQL & PostgreSQL Side by Side

Day one at Harborline Retail Group: before you can secure, back up, or tune anything, you need all
three platforms running and configured for the job each one actually does. This lesson applies
Chapter 2's Oracle architecture, Chapter 7's MySQL architecture, and Chapter 12's PostgreSQL
architecture to stand up `ora-fin01`, `mysql-web01`, and `pg-analytics01` in your Docker lab from
Lesson 5 — not identically, but each configured for its own role.

## What you'll learn

- How to bring up all three platforms as containers in your Docker lab, using the names from Lesson 91
- Why the finance, storefront, and analytics roles call for different configuration choices on each platform
- The first commands you'd actually run against each system once it's up
- What "standing up a database" means differently on each of the three platforms

## Oracle: FINPRD on ora-fin01

The finance system is small in data volume but cannot lose a transaction, so the instance is
configured for recoverability from the start. In your lab, the `harborline-oracle` container runs
a single-instance Oracle Database with SID `FINPRD` — remember from Chapter 2 that the instance
(the SGA plus background processes) and the database (the physical datafiles) are separate things
even though, for a non-RAC instance like this one, they share the same name.

Once the instance is up, the listener needs to be running so anything outside the container can
connect — Chapter 2 covered `listener.ora` and the default port 1521. You'd confirm it with:

```
lsnrctl status
```

Then connect with SQL*Plus and put the database in `ARCHIVELOG` mode, which Chapter 4 will lean on
for RMAN backups later in this project:

```
sqlplus sys/password@FINPRD as sysdba
SELECT log_mode FROM v$database;
```

The finance schema, owned by `FINAPP`, lives in its own tablespace — `FIN_DATA` — rather than the
default `USERS` tablespace, which keeps its datafiles and growth separate from anything else in
the instance.

## MySQL: storefront on mysql-web01

The storefront is a transactional web application — many small, concurrent reads and writes,
customers checking out at the same time. That workload is exactly what Chapter 7 and 8's InnoDB
storage engine is built for: row-level locking and crash recovery, versus MyISAM's table-level
locking. Every table in the `storefront` schema uses InnoDB, no exceptions.

In your lab, the `harborline-mysql` container runs MySQL 8.0. Configuration lives in
`/etc/mysql/my.cnf` under the `[mysqld]` section — this is where `innodb_buffer_pool_size` and
other engine settings from Chapter 10 will eventually get tuned. After the container is up:

```
mysql -h mysql-web01 -u root -p
SHOW DATABASES;
CREATE DATABASE storefront;
```

Chapter 7's MySQL Workbench and command-line tools both work against this instance the same way
they would against any MySQL server — the storefront isn't special-cased, it's an ordinary
transactional MySQL database doing exactly the job MySQL is good at.

## PostgreSQL: analytics on pg-analytics01

The analytics platform has a different job: fewer, heavier queries over larger historical data,
refreshed nightly rather than updated constantly by customers. Chapter 12 covered PostgreSQL's
process-per-connection architecture and its two core config files — `postgresql.conf` for engine
settings and `pg_hba.conf` for host-based authentication rules.

In your lab, the `harborline-postgres` container runs PostgreSQL 16. After it's up:

```
psql -h pg-analytics01 -U postgres
CREATE DATABASE analytics;
\c analytics
CREATE SCHEMA reporting;
```

Because this is an analytics workload, it's worth enabling the `pg_stat_statements` extension now,
from Chapter 12's extension ecosystem, so Lesson 94's performance work has real query statistics to
look at later:

```
CREATE EXTENSION pg_stat_statements;
```

## Key terms

| Term | Meaning |
|---|---|
| SID | Oracle's instance identifier — `FINPRD` in this project |
| ARCHIVELOG mode | An Oracle mode that retains redo logs after they're recycled, required for RMAN point-in-time recovery |
| InnoDB | MySQL's transactional storage engine, chosen for the storefront's OLTP workload |
| pg_hba.conf | PostgreSQL's host-based authentication configuration file |

## Check yourself

For each of the three containers you'd bring up in this lab, name one configuration decision that
follows directly from the role that database plays at Harborline, not a default you'd apply
everywhere.
