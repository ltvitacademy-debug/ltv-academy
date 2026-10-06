# Lesson 15 — Integration Patterns Overview

**Chapter 4 · Integration Patterns · Lesson 15 of 19**

## What you'll learn

- The three broad integration patterns: batch/bulk, real-time REST, event-driven
- Four questions that determine which pattern fits a given integration requirement
- How the same data (AP invoices) can be moved through any of the three patterns, depending on scenario
- Where this course's REST focus fits relative to the other patterns

## Three broad patterns

| Pattern | What it is |
|---|---|
| **Batch / bulk** | Large volumes of data moved on a schedule (this catalog's FBDI and ADFdi course covers this in depth) |
| **Real-time REST** | Individual records handled as they happen — the focus of this course |
| **Event-driven** | Fusion announces that something happened; a subscriber reacts, rather than polling |

None of these is universally "better" — each fits different
requirements, and a real implementation typically uses more than one.

## Four questions that decide the pattern

1. **Volume** — ten records a day, or a hundred thousand?
2. **Latency** — does the downstream system need this within seconds,
   or is an overnight batch acceptable?
3. **Direction** — is data moving *into* Fusion, or *out of* it?
4. **Frequency** — a one-time event (a migration) or an ongoing,
   recurring feed?

## The same data, three different answers

```
10,000 legacy invoices, once, at go-live:
  -> batch/bulk (FBDI)

One invoice created by a vendor portal, now:
  -> real-time REST (this course)

"Notify finance the moment an invoice posts":
  -> event-driven (covered later in this chapter)
```

All three scenarios involve the same underlying resource — AP invoices
— but the volume, latency, and frequency requirements point to three
different integration patterns.
## Key terms

| Term | Meaning |
|---|---|
| Batch/bulk integration | Moving large volumes of data on a schedule, e.g. via FBDI |
| Real-time REST integration | Handling individual records as they happen, via REST calls |
| Event-driven integration | A subscriber reacting to Fusion announcing something happened |
| Latency requirement | How quickly a downstream system needs to see a change |

## Check yourself

A client needs 50,000 historical journal entries loaded once during go-live, and also wants finance notified in real time whenever a large journal posts afterward. Which integration pattern fits each requirement, and why are they different?
