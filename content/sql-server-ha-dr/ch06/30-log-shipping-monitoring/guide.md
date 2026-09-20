# Log Shipping Monitoring

The last lesson established that log shipping's secondary is realistically minutes behind
the primary by design. That's an acceptable tradeoff — but only if someone actually knows
how many minutes behind it is at any given moment. Log shipping ships with real, built-in
monitoring infrastructure specifically for this, and this lesson covers how to actually use
it, rather than just hoping the three jobs keep running.

## What you'll learn

- Where log shipping's real monitoring data actually lives, in `msdb`
- What the built-in log shipping alert job does
- How to check "how far behind are we" against a real threshold

## The monitoring tables live in `msdb`

When log shipping is configured, SQL Server maintains history and status tables inside the
`msdb` system database — the same database that holds SQL Server Agent job history and
backup history. The most directly useful views for monitoring are:

- **`msdb.dbo.log_shipping_monitor_primary`** — tracks the primary side: when the last log
  backup ran, and the backup threshold configured for it.
- **`msdb.dbo.log_shipping_monitor_secondary`** — tracks the secondary side: when the last
  file was copied and restored, and the configured thresholds for both.

These tables are what the log shipping configuration wizard's monitoring options actually
populate, and they're queryable directly for anyone who wants a fast, scriptable check
rather than opening the GUI.

## The built-in alert job

Log shipping configuration includes an option to create a dedicated SQL Server Agent
**alert job** — commonly seen as `LSAlert_<servername>` — that runs on a schedule and
specifically checks the monitoring tables against the configured thresholds. If the backup,
copy, or restore step hasn't happened recently enough relative to its threshold, the alert
job raises an alert (which can be wired to Database Mail, exactly like the standard SQL
Server Agent alerting covered in backup automation earlier in this course). This is the
actual mechanism that turns "log shipping fell behind" from something discovered during an
incident into something surfaced proactively.

## The real question: how far behind are we, against what threshold?

The single most useful monitoring check is comparing the **last restored log's timestamp**
on the secondary against the current time, and comparing that gap against the
**restore threshold** configured for the job (a number of minutes past which the situation
is considered a problem). This is exactly what the alert job automates, but it's also
something worth being able to check manually: a secondary that's twenty minutes behind
during normal operation might be completely fine, or might be a sign the copy job silently
stopped running — the threshold, not a gut feeling, is what should decide which.

## Key terms

| Term | Meaning |
|---|---|
| `msdb.dbo.log_shipping_monitor_primary` | Tracks the primary's last backup time and backup threshold |
| `msdb.dbo.log_shipping_monitor_secondary` | Tracks the secondary's last copy/restore times and thresholds |
| Alert job (`LSAlert_...`) | Scheduled job that checks monitoring tables against thresholds and raises alerts |
| Restore threshold | The configured number of minutes past which a stale restore is treated as a problem |

## Check yourself

A log shipping secondary's last restored log is 45 minutes old, and the configured restore
threshold is 30 minutes. According to what this lesson covers, what should be happening
right now, and where would you look first to find out why?
