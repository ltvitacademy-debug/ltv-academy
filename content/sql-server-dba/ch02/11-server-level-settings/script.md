# Script — Server-Level Settings

## Segment 1 (title)

SQL Server runs a lightweight background trace, on by default from the moment the instance starts. It's genuinely useful for after-the-fact diagnosis without needing to have set up any monitoring in advance.

## Segment 2 (code: Always running, ask it anything)

The default trace captures auto-growth and auto-shrink events, database and object creation and deletion, and security-related events. Query sys.traces to find it, then sys.fn_trace_gettable to read it — its overhead is deliberately minimal, so there's rarely a good reason to turn it off.

## Segment 3 (steps: Keeping the error log usable)

A new error log file is created every restart by default, so a server that rarely restarts can end up with one unwieldy log. You can limit how many historical files are retained, and sp_cycle_errorlog starts a fresh log on demand without restarting the instance.

## Segment 4 (steps: Other server-wide options)

A few other options shape broader server behavior: user connections defaults to resource-limited only, network packet size is a narrow workload-specific tweak, and priority boost is a deprecated option that used to risk starving the OS.

## Segment 5 (outro)

Next up: collations — why a mismatch between databases causes real query errors, not just a sorting quirk.
