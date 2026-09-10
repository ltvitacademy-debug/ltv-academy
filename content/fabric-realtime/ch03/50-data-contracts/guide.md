# Lesson 50 — Data Contracts

**Chapter 3 · Production Data Engineering · Lesson 50 of 70**

## What you'll learn

- The producer/consumer problem a data contract solves
- What a contract actually specifies, beyond just a schema
- Enforcing a contract in CI, not just documenting it
- Where this sits relative to Lesson 48's schema tests

## The problem: producers and consumers drift apart

The NYC Taxi vendor system that produces `RawTripEvents` and the
dashboard, Activator rules, and downstream reports that consume it
are usually owned by different people, on different schedules.
Nothing technical stops the producer from renaming a field or
changing a type — Lesson 39 already covered detecting schema drift
after it happens. A **data contract** is the step before that:
an explicit, agreed-upon specification that makes an unannounced
breaking change a violation, not just a surprise someone eventually
notices.

## What a contract actually specifies

```yaml
# trip-events-contract.yaml
schema:
  TripId: { type: string, required: true }
  FareAmount: { type: decimal, required: true, min: 0 }
  EventTime: { type: timestamp, required: true }
semantics:
  FareAmount: "Total fare in USD, including tip"
sla:
  freshness: "events must arrive within 5 minutes of EventTime"
  availability: "99.9% of events successfully ingested"
```

Lesson 48's schema tests check structure — columns and types. A
contract goes further, specifying **semantics** (what `FareAmount`
actually means, not just its type) and **SLAs** (how fresh, how
reliable) — the parts of an agreement a schema alone can't capture,
but that a consumer still depends on being true.

## Enforcing it in CI, not just writing it down

A contract that's only a document in a wiki gets stale the moment
someone forgets to update it. Wiring the contract's schema section
into Lesson 45's CI/CD Test stage — failing the build if a producer's
change violates it — turns the contract from a promise people are
supposed to remember into a promise the pipeline itself can't break
without a visible, blocked failure.

## Where this sits relative to schema tests

Schema tests (Lesson 48) verify a pipeline's *own* output against
what it's *supposed* to produce. A data contract is the thing that
defines what "supposed to" even means, agreed on by both sides ahead
of time, and versioned so a deliberate breaking change (Lesson 51)
is a documented, negotiated event instead of an accident discovered
downstream.

## Key terms

| Term | Meaning |
|---|---|
| Data contract | An explicit, agreed schema + semantics + SLA between a producer and consumer |
| Semantics | What a field actually means, beyond its type |
| CI-enforced contract | A contract check that blocks a build, not just documentation |

## Check yourself

You're ready for Lesson 51 when you can explain, without looking: why
does a data contract need to specify semantics and SLAs, when a
schema test already checks columns and types?
