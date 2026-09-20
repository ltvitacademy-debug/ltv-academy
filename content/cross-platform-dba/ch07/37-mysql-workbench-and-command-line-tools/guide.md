# MySQL Workbench and Command-Line Tools

This closes out MySQL's architecture and installation chapter with the two tools you'll actually
use day to day: the `mysql` command-line client, and MySQL Workbench, the official GUI. A SQL
Server DBA already knows this split from `sqlcmd` versus SQL Server Management Studio, and an
Oracle DBA knows it from `sqlplus` versus SQL Developer — MySQL's version of the same pattern.

## What you'll learn

- The `mysql` command-line client: connecting, running scripts, common flags
- What MySQL Workbench actually provides beyond a query window
- When to reach for the CLI versus the GUI as a working DBA
- Other bundled command-line utilities worth knowing by name

## The mysql command-line client

`mysql` is the client every MySQL install ships with, and it's the tool automation and scripting
lean on:

```bash
mysql -u root -p
mysql -u appuser -p -h db.internal.example.com -P 3306 shop
mysql -u root -p shop < setup_schema.sql
mysql -u root -p -e "SHOW DATABASES;"
```

The first form opens an interactive prompt against the local server. The second connects to a
remote host on a specific port and selects the `shop` database immediately. The third runs a
`.sql` script file non-interactively — the standard way to apply a schema change from a CI/CD
pipeline or a deployment script. The fourth, `-e`, executes a single statement and exits, which is
what health checks and monitoring scripts typically use instead of opening a full session.

## MySQL Workbench: the official GUI

MySQL Workbench is Oracle's (the company, not the database — Oracle Corporation owns MySQL)
official graphical client, and it does more than run queries. Its SQL Editor supports syntax
highlighting, autocomplete, and query execution against a saved connection profile. Its schema
browser lets you inspect tables, columns, indexes, and foreign keys visually rather than through
`DESCRIBE` and `SHOW CREATE TABLE`. It includes an ER diagram tool that can reverse-engineer an
existing database into a visual entity-relationship diagram, or forward-engineer a diagram into
`CREATE TABLE` statements — genuinely useful for understanding an unfamiliar schema quickly. It
also has a Performance Dashboard that surfaces server load, connection counts, and InnoDB metrics
without hand-writing `SHOW ENGINE INNODB STATUS` queries, plus a built-in data export/import
wizard as a GUI alternative to `mysqldump`.

## CLI or GUI: a working DBA uses both

The CLI is what you reach for over SSH with no GUI available, inside a script or cron job,
in CI/CD pipelines applying migrations, and for quick one-line checks. Workbench is what you
reach for when exploring an unfamiliar schema, building or reviewing an ER diagram, visually
comparing two schemas before a migration, or when a teammate without deep SQL fluency needs a
guided interface. Neither replaces the other — production automation should never depend on
Workbench being open, and deep exploratory schema work is genuinely faster with a visual tool.

## Other bundled utilities worth knowing

A few other command-line tools ship alongside `mysql` and come up constantly in real DBA work:
`mysqldump` for logical backups (its own full lesson is coming in Chapter 9), `mysqladmin` for
quick administrative commands like `mysqladmin status` or `mysqladmin ping`, and
`mysqlcheck` for checking, repairing, and optimizing tables — most relevant for MyISAM tables,
since InnoDB rarely needs it.

## Key terms

| Term | Meaning |
|---|---|
| `mysql` | The standard command-line client for connecting to and querying a MySQL server |
| MySQL Workbench | Oracle's official GUI client: SQL editor, schema browser, ER diagrams, performance dashboard |
| `-e` flag | Runs a single SQL statement non-interactively and exits — used in scripts and health checks |
| `mysqladmin` | CLI utility for quick administrative commands like status checks and pings |
| `mysqlcheck` | CLI utility for checking, repairing, and optimizing tables (mainly relevant to MyISAM) |

## Check yourself

A deployment pipeline needs to apply a schema migration file automatically with no human present.
Which tool from this lesson is the right one for that job, and why would the alternative be a bad
fit?
