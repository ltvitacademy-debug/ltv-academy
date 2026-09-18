# Lesson 7 — Consumer Basics

**Chapter 2 · Producing & Consuming · Lesson 7 of 30**

## What you'll learn

- The real shape of the `poll()` loop, and what actually happens inside it
- What `auto.offset.reset` controls, and when `earliest` vs. `latest` matters
- The difference between auto-committing offsets and committing manually
- Why the commit choice is really a choice about what happens after a crash

## The poll loop, in full

Lesson 3 showed the basic shape. Here's what's actually happening on
each iteration:

```python
consumer.subscribe(["orders"])
while True:
    records = consumer.poll(timeout=1.0)   # wait up to 1s for events
    for record in records:
        handle(record.key(), record.value())
    consumer.commit()                       # mark these as processed
```

`poll()` isn't just "check for one event" — it returns a batch of
whatever's available (up to `max.poll.records`), and the loop
processes that whole batch before asking again. The `timeout` is how
long to wait if nothing's available yet before returning an empty
batch, not a hard limit on processing time.

## `auto.offset.reset`: what happens with no prior position

The first time a consumer group (Lesson 8) starts reading a topic —
or if its previously committed offset has aged out of retention —
Kafka needs to know where to start. That's `auto.offset.reset`:

```
auto.offset.reset=earliest   Start from the very beginning of the
                              partition's retained history.

auto.offset.reset=latest     Start from whatever's written from
                              now on — skip everything already there.
```

`earliest` fits anything where missing historical events matters (a
backfill, an analytics pipeline that needs the full picture).
`latest` fits anything where only "what's happening now" matters (a
live alerting system that doesn't care about last week's events).
This setting only matters when there's no committed offset to resume
from — once a consumer has committed a position, it always resumes
from there, regardless of this setting.

## Auto-commit vs. manual commit: what actually gets protected

By default, most Kafka clients can auto-commit offsets on a timer
(`enable.auto.commit=true`), which is convenient but has a real gap:
if the consumer crashes after auto-committing but before finishing
`handle()` for the last batch, that batch is lost — the committed
offset says "already processed" even though it wasn't.

```python
# Manual commit: only commit after handle() actually succeeds
consumer.subscribe(["orders"])
while True:
    records = consumer.poll(timeout=1.0)
    for record in records:
        handle(record.key(), record.value())  # do the real work first
    consumer.commit()                           # then, and only then, commit
```

Committing manually, after processing genuinely succeeds, closes that
gap — at the cost of writing that commit call yourself instead of
letting the client handle it on a timer. Lesson 9 connects this
directly to delivery semantics: this manual-commit-after-processing
pattern is exactly what "at-least-once" delivery looks like in
practice.

## Why this choice is really about crash behavior

Every one of these settings only matters at the moment something
goes wrong — a consumer restarts, crashes mid-batch, or a group
member is replaced. The poll loop looks the same either way in the
happy path; the settings decide what a crash actually costs you.

## Key terms

| Term | Meaning |
|---|---|
| `poll()` | The call a consumer makes in a loop to fetch a batch of new records |
| `auto.offset.reset` | Where to start reading when there's no prior committed offset (`earliest` or `latest`) |
| Auto-commit | The client commits offsets on a timer, regardless of whether processing finished |
| Manual commit | The application commits offsets itself, only after processing genuinely succeeds |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
can auto-commit lose a batch of work if the consumer crashes at the
wrong moment, and how does committing manually after `handle()`
close that gap?
