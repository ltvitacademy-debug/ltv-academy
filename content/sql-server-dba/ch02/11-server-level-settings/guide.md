# Server-Level Settings

## What you'll learn

- The default trace — what it captures, and why it's on by default
- Error log settings: what gets logged, and how to control log file retention
- Additional `sp_configure` options that shape overall server behavior

## The default trace

SQL Server runs a lightweight background trace, on by default, from the moment the instance
starts — the **default trace**. It captures a fixed set of server-level events: database file
auto-growth and auto-shrink events, database creation/deletion, object creation/deletion (DDL),
and some security-related events like role membership changes. You query it with
`sys.fn_trace_gettable()` pointed at the current trace file path, which you find via:

```sql
SELECT * FROM sys.traces WHERE is_default = 1;
```

The default trace is genuinely useful for after-the-fact diagnosis — "when did this database
last auto-grow, and by how much" is a question the default trace answers without you having
needed to set up any monitoring in advance. It's controlled by the `default trace enabled`
`sp_configure` option, and there's rarely a good reason to turn it off; its overhead is
deliberately minimal.

## Error log settings

The SQL Server error log records startup messages, error conditions, and (depending on what's
enabled) informational messages like successful logins, failed logins, and backup completions.
A new error log file is created every time the instance restarts, by default, which means on a
server that restarts rarely, a single error log file can grow very large and unwieldy to search.

Two practical controls:

- **Limit the number of retained error log files** — in SQL Server Management Studio, under the
  server's Properties → Advanced page (or via the registry/`sp_configure`-adjacent settings
  depending on version), you can cap how many historical error log files SQL Server keeps
  before recycling the oldest.
- **Cycle the error log on demand** — `EXEC sp_cycle_errorlog;` closes the current error log
  file and starts a new one, without restarting the instance. This is genuinely useful on a
  server that stays up for months: schedule it periodically (via an Agent job) so any single
  log file stays a manageable size to search through during troubleshooting.

## Additional server-behavior options

A handful of other `sp_configure` options shape broad server behavior beyond what earlier
lessons covered:

- **`user connections`** — the maximum number of simultaneous user connections the instance
  will accept; default `0` means limited only by available resources, which is appropriate for
  almost every real server (there's rarely a reason to cap this artificially low).
- **`network packet size`** — the default size, in bytes, of the network packets used for
  communication (default 4096); occasionally tuned up for workloads moving very large result
  sets, though this is a narrow, workload-specific tweak, not a routine change.
- **`priority boost`** — a legacy option (removed/deprecated in current versions) that used to
  raise the scheduling priority of SQL Server's process; it's a useful historical example of an
  option that seemed like a good idea but was actively discouraged by Microsoft even while it
  existed, because it could starve the OS and other processes.

## Why server-level settings deserve their own review pass

Individually, none of these settings makes headline production incidents. Collectively, they're
the difference between a server a DBA can quickly diagnose (clean error logs, a queryable
default trace) and one where every investigation starts with "let me first find where the
relevant log even is."

## Key terms

| Term | Meaning |
|---|---|
| Default trace | Always-on lightweight trace capturing auto-growth, DDL, and security events |
| `sp_cycle_errorlog` | Closes the current error log and starts a new one without restarting the instance |
| `user connections` | Max simultaneous connections the instance accepts; 0 means resource-limited only |
| `priority boost` | Deprecated legacy option that raised SQL Server's OS scheduling priority |

## Check yourself

A DBA wants to know exactly when a specific database's data file last auto-grew, without having
set up any monitoring in advance. Which built-in SQL Server feature answers this, and how would
they query it?
