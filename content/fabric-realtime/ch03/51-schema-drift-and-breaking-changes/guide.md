# Lesson 51 — Schema Drift and Breaking Changes

**Chapter 3 · Production Data Engineering · Lesson 51 of 70**

## What you'll learn

- Not every schema change is breaking — the real distinction
- Versioning a contract deliberately, instead of editing it in place
- A deprecation window — the practical way to make a breaking change safely
- Where automated detection (Lesson 39) and a contract (Lesson 50) meet

## Not every change is breaking

```
Non-breaking:  adding a new optional field (TipAmount)
Non-breaking:  adding a new value to an existing enum
Breaking:      renaming FareAmount -> TotalFare
Breaking:      changing FareAmount from decimal to string
Breaking:      making a previously optional field required
```

A consumer reading specific fields by name, in a specific type, is
unaffected by a new field it never asked for — that's why adding
one is safe. Anything that changes what a consumer is *already*
relying on is breaking, full stop, regardless of how small the
change looks to the person making it.

## Versioning instead of editing in place

```yaml
# trip-events-contract-v2.yaml
schema:
  TripId: { type: string, required: true }
  TotalFare: { type: decimal, required: true }   # renamed from FareAmount
  FareAmount: { type: decimal, required: true, deprecated: true }  # kept during transition
```

Lesson 50's contract shouldn't be edited in place for a breaking
change — a new version exists alongside the old one, and both are
emitted for a transition period. This is the same principle as
Databricks & Delta Lake's schema evolution concepts, applied here at
the contract level instead of the table level: change is normal,
but it has to be announced and staged, not silently substituted.

## The deprecation window, in practice

```
Week 1:  v2 contract published; both FareAmount and TotalFare emitted
Week 2-4: consumers migrate to TotalFare at their own pace
Week 5:   FareAmount removed; v1 contract retired
```

A deprecation window gives every consumer — the dashboard, the
Activator rule, anything downstream — time to update on its own
schedule, instead of everything breaking simultaneously the moment
the producer ships a change. The length of the window is a judgment
call, not a fixed rule: it depends on how many consumers exist and
how quickly they can realistically move.

## Where detection and contracts meet

Lesson 39's real-time schema drift check catches an *unannounced*
change as it happens — the failure mode a contract exists to
prevent. Lesson 50's contract is the agreement; this lesson's
versioning and deprecation window is *how* that agreement gets to
change without becoming exactly the kind of surprise Lesson 39 was
built to catch.

## Key terms

| Term | Meaning |
|---|---|
| Breaking change | Anything altering what a consumer is already relying on |
| Contract versioning | A new version alongside the old, not an in-place edit |
| Deprecation window | A transition period where both old and new forms are emitted |

## Check yourself

You're ready for Lesson 52 when you can explain, without looking: why
is adding a new optional field considered non-breaking, while making
an existing optional field required is breaking?
