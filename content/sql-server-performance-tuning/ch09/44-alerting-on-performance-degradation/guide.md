# Alerting on Performance Degradation

The last lesson built a monitoring baseline — a growing history table full of wait stats,
Page Life Expectancy readings, and batch requests/sec, captured on a schedule. A history table
is only useful if something actually looks at it. Nobody wants to run a query every morning
just to check whether last night went fine. This lesson covers turning that stored history into
an actual warning system: something that tells you when a metric has moved outside its normal
range, without you having to go looking for it.

## What you'll learn

- The two real mechanisms SQL Server gives you for performance-related alerting
- Why a fixed threshold ("PLE below 300") is a starting point, not the whole answer
- How to compare a live metric against your own baseline history instead of a guessed number

## SQL Server Agent performance condition alerts

SQL Server Agent supports **alerts** tied directly to a specific PerfMon-style counter, created
with `sp_add_alert` (or through SSMS's Alerts node under SQL Server Agent). A performance
condition alert names an object, a counter, and optionally an instance — for example,
`SQLServer:Buffer Manager`, `Page life expectancy` — along with a comparison (`falls below`,
`rises above`, `becomes equal to`) and a value. When that condition is true, the Agent fires the
alert, which is tied to a **notification**: an **operator** (`sp_add_operator`) gets emailed via
Database Mail, or a job runs automatically as a response.

This mechanism is simple and built in, but its threshold is fixed and global — "PLE below 300"
might be a real problem on one server and completely normal on another with a smaller buffer
pool. It's a reasonable first alert to configure, not a complete alerting strategy on its own.

## Comparing against your own baseline instead of a guessed number

A more precise approach uses the history table from the last lesson directly: a scheduled Agent
job runs a query that computes a recent average (or a similar window from the same hour on
previous days) from `dba.PerfBaseline`, compares it against the current reading, and raises an
alert only when the deviation is large enough to matter — not any time a number ticks up a
little. That comparison job can notify the same way: call `sp_notify_operator` from
`msdb.dbo`, or use `sp_send_dbmail` directly, so a real person gets a message instead of the
degradation just sitting quietly in a table nobody reads.

Severity-based error alerts work the same underlying way for a different kind of problem: an
alert defined against error severities 19–25 (fatal errors, resource problems) catches things a
performance-counter alert wouldn't — this lesson's focus is specifically the performance side,
not correctness errors.

## Alerting on the right thing, at the right sensitivity

An alert that fires constantly gets ignored; an alert that never fires might as well not exist.
Both the fixed-threshold Agent alert and the baseline-comparison job need a sensitivity that
reflects real variance — comparing against a range built from actual history (the point of the
previous lesson) produces a far more meaningful trigger than an arbitrary round number picked
without ever having looked at what "normal" actually is on that specific server.

## Key terms

| Term | Meaning |
|---|---|
| Performance condition alert | A SQL Server Agent alert tied to a specific PerfMon-style counter crossing a threshold |
| Operator | A named notification recipient (`sp_add_operator`), typically emailed via Database Mail |
| Baseline-comparison alert | A scheduled job that compares a current reading against stored history and alerts only on meaningful deviation |
| Alert fatigue | The result of a threshold set too sensitively — real alerts get ignored because most of them are noise |

## Check yourself

Why is comparing a live metric against your own stored baseline history generally more useful
than a single fixed threshold like "alert if Page Life Expectancy falls below 300" applied the
same way to every server?
