# Script — MySQL Workbench and Command-Line Tools

## Segment 1 (title)

This closes out MySQL's architecture and installation chapter with the two tools you'll actually use day to day: the mysql command-line client, and MySQL Workbench, the official GUI.

## Segment 2 (code: mysql CLI)

The mysql client is what automation and scripting lean on. You can open an interactive prompt, connect to a remote host on a specific port, run a full dot-SQL script non-interactively, or use the -e flag to execute a single statement and exit — exactly what health checks and monitoring scripts use.

## Segment 3 (steps: Workbench)

MySQL Workbench does more than run queries. Its SQL editor supports autocomplete, its schema browser shows tables and foreign keys visually, its ER diagram tool can reverse-engineer a schema into a diagram, and its performance dashboard surfaces server load and InnoDB metrics without hand-writing status queries.

## Segment 4 (outro)

A working DBA uses both: the CLI for scripts, CI/CD pipelines, and quick checks; Workbench for exploring an unfamiliar schema or reviewing an ER diagram. Next up: Chapter 8 begins with MySQL Authentication and User Accounts.
