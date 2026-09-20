# Script — MySQL Configuration Files and System Variables

## Segment 1 (title)

MySQL's configuration lives in a plain text file, usually named my.cnf on Linux or my.ini on Windows, plus two SQL-level commands for inspecting and changing settings at runtime.

## Segment 2 (code: my.cnf)

MySQL reads configuration files from a predictable set of locations in order, with later files able to override earlier ones. The mysqld section configures the server process itself, and the client section configures command-line client defaults. Settings here take effect on the next server restart.

## Segment 3 (code: SHOW VARIABLES)

Rather than reading the config file, query the running server directly. SHOW VARIABLES without GLOBAL returns the current session's values; SHOW GLOBAL VARIABLES always returns the server-wide value regardless of what any session has changed.

## Segment 4 (code: SET GLOBAL / SET PERSIST)

SET GLOBAL changes a setting server-wide for new connections, but doesn't persist to my.cnf automatically — restart without updating the file and it reverts. SET SESSION changes only the current connection. SET PERSIST, added in MySQL 8.0, writes the change so it survives a restart.

## Segment 5 (outro)

Knowing where the config lives and which command actually persists a change is core day-one MySQL DBA knowledge. Next up: MySQL Workbench and the command-line tools, side by side.
