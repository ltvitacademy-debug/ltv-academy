# Trigger Type Decision Guide

From Chapter 6.

## Choosing a trigger type

| | Schedule | Tumbling Window | Event-Based |
|---|---|---|---|
| Backfill | Not supported | Supported (automatic) | Not applicable |
| Reliability | "Fire and forget" | No gaps, guaranteed | Reacts to real events |
| Retry | Not supported | Built-in `retryPolicy` | Depends on setup |
| Concurrency limit | Not supported | 1-50, explicit (`maxConcurrency`) | Not applicable |
| Pipeline relationship | Many-to-many | One-to-one | Many-to-many |
| On failure | Doesn't reflect in trigger | Trigger run reflects pipeline failure | Depends on setup |

**Use Schedule** for "run this around a certain time," where gaps or
the occasional fire-and-forget miss aren't critical.

**Use Tumbling Window** when you need reliable, gap-free, retryable
time-series processing — especially if you need automatic backfill
of historical windows.

**Use Event-Based** when the actual trigger condition is "a specific
thing happened" (a file arrived, a blob was created) rather than a
guessed clock time — this is the better match whenever the real
requirement is described in terms of an event, not a schedule.

## Is a tumbling window trigger actually stuck, or just throttled?

Before assuming a backfill is broken, do the arithmetic:

```
Total windows = backfill range / interval
Rough time = total windows / maxConcurrency * avg pipeline duration
```

Then check the trigger's window-level status, not just the aggregate
backlog:

- **Healthy throttling**: windows transitioning Waiting → Running →
  Succeeded in sequence, exactly `maxConcurrency` running at once.
- **Genuine stall**: a specific window stuck in repeated
  `Failed` → retry cycles, holding a concurrency slot and blocking
  everything queued behind it.

**Don't raise `maxConcurrency` as a reflexive fix** — a low value is
often a deliberate safeguard against overwhelming a downstream
system. Confirm which situation you're actually looking at first.
