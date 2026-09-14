# Lesson 75 — Project 3 Kickoff: An End-to-End Streaming Fraud Detector

**Chapter 4 · Added Projects — Capstones · Lesson 75 of 81**

## What you'll learn

- The scenario: a real-time transaction stream that needs sub-second
  fraud scoring
- Why this is a Kappa-architecture problem, not a Lambda one
- How to scope it with the same back-of-the-envelope estimation from
  Lesson 3
- What the serving layer has to guarantee before any scoring logic matters

## The scenario

Project 3 is a payments platform's fraud detector: every card transaction
arrives as an event, and each one needs a fraud score back **before the
transaction is approved** — a latency budget measured in hundreds of
milliseconds, not minutes. There's no overnight batch job that can help
here; by the time a nightly job would run, the fraudulent transaction has
already been approved.

```
Requirement                        Non-functional shape (Lesson 2)
------------------------------------------------------------------
Score every transaction            Throughput: peak transactions/sec
Score before approval               Latency: p99 under ~300ms
Never miss a transaction            Delivery: no silent drops
Never score the same one twice      Idempotency: exactly-once effect
```

That last row matters as much as the first three — Lesson 77 builds the
actual alerting logic, but the requirement that shapes the whole design
starts here at kickoff.

## Why Kappa, not Lambda

Lesson 6 and Lesson 7 laid out the choice: Lambda when the speed layer's
approximate answer and the batch layer's exact answer genuinely need
different logic; Kappa when one streaming codepath can correctly serve
both live and historical needs. A fraud detector has no batch layer to
begin with — there's no "exact, slower" version of a fraud score that
would ever replace the real-time one after the fact. Every transaction
gets scored once, by one pipeline, live. If the scoring logic changes,
that's Kappa's reprocessing case: replay historical transactions through
the *updated* pipeline to backtest it, using the same durable, replayable
event log the live path already depends on — not a separate batch
re-implementation of the scoring rule.

## Scoping it with back-of-the-envelope numbers

Lesson 3's estimation habit applies directly before any architecture gets
drawn:

```
Assume: a mid-size card processor
  ~2,000 transactions/sec at peak     -> throughput floor
  p99 scoring latency budget: 300ms   -> rules out any batch step
  Retention: 90 days of raw events    -> Kappa's replay requirement (L7)
```

These three numbers alone rule out entire classes of design before a
single tool gets chosen: 300ms rules out anything with a batch stage in
the critical path, and needing 90 days of replayable history is exactly
the "durably replayable source" Kappa depends on.

## What the serving layer must guarantee

Lesson 15's serving-layer design applies here in its sharpest form: the
system that returns "approve" or "flag" has to answer in that 300ms
budget, every time, under peak load — a slow serving layer isn't a
performance nitpick here, it's a fraud detector that approves transactions
it should have flagged. That constraint is what Lessons 76–77 build
against.

## Key terms

| Term | Meaning |
|---|---|
| Latency budget | The hard time limit a fraud score has to be returned in — here, sub-second |
| Kappa fit | No separate batch layer exists or is needed; one streaming pipeline scores everything, live |
| Replay for backtesting | Kappa's reprocessing case, applied to testing a *changed* scoring rule against history |

## Check yourself

You're ready for Lesson 76 when you can explain, without looking: why is
a fraud detector a clean fit for Kappa architecture specifically, rather
than Lambda?
