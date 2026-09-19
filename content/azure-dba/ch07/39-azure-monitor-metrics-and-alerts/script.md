# Script — Azure Monitor, Metrics & Alerts

## Segment 1 (title)

If you took Azure Fundamentals, you already know Azure Monitor exists platform-wide — the same service behind every Azure resource. What's new here is applying it specifically to a SQL database: the signals Azure SQL emits, and what a DBA actually watches day to day.

## Segment 2 (code: the metrics that matter)

Every Azure SQL database emits metrics automatically, no agent required — DTU or CPU percent, storage percent, successful and failed connections, and deadlock count. These are exactly the numbers your baseline gives context to — 80% DTU means something different on a database whose normal is 40% than one whose normal is 75%.

## Segment 3 (steps: building an alert rule)

An alert rule has three required parts. Signal — pick the metric, like DTU consumption percent. Condition — the threshold and aggregation window, like average over 80% for five minutes. Action group — what actually happens when it fires: email, SMS, a webhook into a paging tool. Skip the action group and the alert fires silently into the void.

## Segment 4 (code: the real gap)

An alert that fires because DTU crossed 90% tells you exactly one thing — that it crossed 90%. It doesn't tell you which query, which session, or whether it's one runaway report or real traffic growth. That gap is deliberate. Finding out why is the job of the DMVs and Extended Events coming up next in this chapter.

## Segment 5 (outro)

Azure Monitor tells you something needs attention. Database Watcher, next up, gives you a fleet-wide view of many databases at once — and it's genuinely one of the newer capabilities in Azure SQL worth knowing well.
