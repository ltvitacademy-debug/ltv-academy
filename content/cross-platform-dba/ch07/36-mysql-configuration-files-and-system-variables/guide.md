# MySQL Configuration Files and System Variables

SQL Server configuration lives mostly in `sp_configure` and instance-level GUI dialogs; Oracle's
lives in `spfile`/`pfile` parameter files and `ALTER SYSTEM`. MySQL's equivalent is a plain text
configuration file — usually named `my.cnf` on Linux or `my.ini` on Windows — plus two SQL-level
commands for inspecting and changing settings at runtime. Knowing where the file lives, how MySQL
reads it, and the difference between a session-scoped and global-scoped variable change is core
day-one MySQL DBA knowledge.

## What you'll learn

- The structure and typical location of `my.cnf`/`my.ini`
- How MySQL reads configuration files in a defined precedence order
- `SHOW VARIABLES` for inspecting current settings
- `SET GLOBAL` and `SET SESSION` for changing them at runtime, and their real difference

## The configuration file: my.cnf / my.ini

On Linux, MySQL reads configuration from a predictable set of locations, in order, with later
files able to override earlier ones: `/etc/my.cnf`, `/etc/mysql/my.cnf`, and
`~/.my.cnf` for per-user overrides. On Windows, the equivalent file is `my.ini`, typically inside
the MySQL install directory. The file is organized into named sections using square brackets,
where `[mysqld]` configures the server process itself and `[client]` configures command-line
client defaults:

```ini
[mysqld]
port = 3306
datadir = /var/lib/mysql
innodb_buffer_pool_size = 4G
max_connections = 200
bind-address = 127.0.0.1

[client]
port = 3306
socket = /var/run/mysqld/mysqld.sock
```

Settings here take effect on the next server restart — `innodb_buffer_pool_size` above is a
classic example of a setting most DBAs would rather tune once in the file than repeatedly through
a session command, since it governs how much RAM InnoDB dedicates to caching data and indexes.

## Inspecting settings at runtime: SHOW VARIABLES

Rather than reading the config file to know what's actually active, query the running server
directly:

```sql
SHOW VARIABLES LIKE 'max_connections';
SHOW VARIABLES LIKE 'innodb%';
SHOW GLOBAL VARIABLES LIKE 'sql_mode';
```

`SHOW VARIABLES` without `GLOBAL` returns the session's current values, which for most variables
start as a copy of the global value but can diverge if a session changes its own setting.
`SHOW GLOBAL VARIABLES` always returns the server-wide value regardless of what any individual
session has changed.

## Changing settings at runtime: SET GLOBAL vs. SET SESSION

Many — though not all — MySQL system variables can be changed without a restart:

```sql
SET GLOBAL max_connections = 500;
SET SESSION sql_mode = 'STRICT_TRANS_TABLES';
```

`SET GLOBAL` changes the setting for the whole server going forward and for any new connections,
but does not retroactively change sessions that are already connected and already have their own
session copy of that variable. `SET SESSION` (or simply `SET`) changes the value only for the
current connection and disappears when that connection closes. Critically, a `SET GLOBAL` change
is **not** persisted to `my.cnf` automatically — restart the server without also updating the
config file, and the change reverts to whatever the file says. Since MySQL 8.0, `SET PERSIST` can
write certain global variables directly into a `mysqld-auto.cnf` file so they survive a restart
without hand-editing `my.cnf`.

```sql
SET PERSIST max_connections = 500;
```

## Key terms

| Term | Meaning |
|---|---|
| `my.cnf` / `my.ini` | MySQL's plain-text configuration file (Linux / Windows), organized into `[mysqld]`, `[client]`, etc. sections |
| `[mysqld]` | Config file section for server-process settings |
| `SHOW VARIABLES` | Inspects current session-scoped variable values; `SHOW GLOBAL VARIABLES` shows server-wide values |
| `SET GLOBAL` | Changes a variable server-wide for new connections, without persisting to the config file |
| `SET PERSIST` | MySQL 8.0+ command that changes a global variable and writes it to `mysqld-auto.cnf` so it survives a restart |

## Check yourself

You run `SET GLOBAL innodb_buffer_pool_size = 8G;` on a live server and confirm the change with
`SHOW GLOBAL VARIABLES`. A week later the server restarts for an OS patch and the setting is back
to 4G. What went wrong, and which command would have prevented it?
