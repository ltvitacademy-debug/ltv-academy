# Instance Configuration

## What you'll learn

- `sp_configure` as the general mechanism behind most instance-level settings
- "Show advanced options" and why most options are hidden by default
- Real, commonly-tuned options beyond the post-install checklist: remote query timeout, fill factor

## sp_configure — the general mechanism

Lesson 9 covered a handful of specific settings worth changing after install. This lesson steps
back to the mechanism itself: `sp_configure` is the stored procedure that reads and writes most
server-level configuration options, and it's worth understanding as a system, not just a list
of individual settings to memorize.

Run it with no parameters to list current values:

```sql
EXEC sp_configure;
```

To change a value, run it with the option name and new value, then `RECONFIGURE` to apply:

```sql
EXEC sp_configure 'option name', value;
RECONFIGURE;
```

Some options take effect immediately; others (like max degree of parallelism) only affect new
query plans going forward, and a few require an instance restart to take effect at all — the
`config_value` vs. `run_value` columns in `sp_configure`'s own output tell you whether a pending
change has actually been applied yet.

## Show advanced options

By default, `sp_configure` only lists a handful of "basic" options — most of the roughly 70
server-level options are hidden until you turn on advanced visibility:

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
```

This doesn't change any server behavior by itself — it only controls what the *next*
`sp_configure` call with no parameters displays. Microsoft hides advanced options by default
specifically because most of them (things like `min server memory`, `max degree of
parallelism`, or `affinity mask`) can hurt performance if changed without understanding the
tradeoff, and the visibility gate is a small speed bump against changing them casually.

## Remote query timeout

`remote query timeout` sets how many seconds a query against a remote data source (most
commonly through a linked server) will wait before timing out — default is 600 seconds (10
minutes). A value of 0 means wait indefinitely, which is rarely what you want on a production
server, since a hung remote call can then tie up local resources indefinitely too. Some
environments intentionally shorten this so a failing linked-server dependency fails fast instead
of hanging a caller for ten minutes.

## Fill factor

`fill factor` controls how full SQL Server packs each index page when building or rebuilding an
index — expressed as a percentage. The default, `0`, effectively means 100%: pages are packed
completely full. A lower fill factor (say, 80) leaves free space on each page deliberately, which
reduces page splits from future `INSERT`/`UPDATE` activity on that index — at the cost of the
index taking more disk space and more pages to scan for the same data, since more of each page
is empty. This is a classic write-heavy-vs-read-heavy tradeoff, and it's most relevant for
indexes with a lot of random-key inserts (like a GUID primary key) that would otherwise cause
constant page splits at 100% fill.

## Setting these correctly

Both options can be set instance-wide via `sp_configure`, but fill factor specifically can also
be overridden per-index when creating or rebuilding it (`WITH (FILLFACTOR = 80)`), which is
usually the better approach than changing the instance-wide default — most indexes don't need a
non-default fill factor, only the specific ones suffering page splits do.

## Key terms

| Term | Meaning |
|---|---|
| `sp_configure` | System stored procedure to view and change server-level configuration options |
| `RECONFIGURE` | Applies a pending `sp_configure` change |
| `show advanced options` | Controls whether advanced server options are listed by `sp_configure` with no parameters |
| Fill factor | Percentage-full target for index pages; lower values reduce page splits on write-heavy indexes |

## Check yourself

A linked-server query to a flaky remote system occasionally hangs for the full default timeout
and blocks a report from completing. Which `sp_configure` option would you look at, and what
would you consider changing it to?
