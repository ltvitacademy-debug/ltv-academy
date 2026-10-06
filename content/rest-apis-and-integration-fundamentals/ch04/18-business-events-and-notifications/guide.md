# Lesson 18 — Business Events and Notifications

**Chapter 4 · Integration Patterns · Lesson 18 of 19**

## What you'll learn

- What a business event is and how it differs from a scheduled, polling integration
- How business events get enabled for a specific Financials module
- How Oracle Integration Cloud subscribes to a Fusion business event
- The practical contrast between polling and event-driven integration

## Fusion announces, instead of being asked

A **business event** is a system-generated notification Fusion raises
at a specific lifecycle moment — an AP invoice being created,
approved, or validated, for example. A subscriber reacts to the event
the instant it's raised, rather than a scheduled integration
repeatedly polling Fusion and asking "has anything changed?"

## Enabling business events

Business events for a given module are not on by default. In **Setup
and Maintenance**, an **"Enable Business Events"** profile option is
set per module — for example, enabling it for Payables is what makes
Fusion begin raising events for invoices and payments in that area.

Once enabled, **Oracle Integration Cloud** subscribes to the specific
event through its **ERP Cloud adapter** — the practical mechanism most
real implementations use to actually receive and act on a Fusion
business event.

## Polling vs. event-driven, side by side

```
Polling (batch pattern):
  every 15 min -> GET /invoices?q=CreationDate>...

Event-driven:
  Fusion raises "invoice created" the instant it happens
  -> OIC reacts immediately, nothing re-checked
```

A polling integration repeatedly asks a question that's usually
answered "nothing new," wasting calls and introducing latency between
when something actually happened and when the polling schedule next
runs. An event-driven integration removes both problems: Fusion
pushes the notification the moment the triggering action occurs.
## Key terms

| Term | Meaning |
|---|---|
| Business event | A system-generated notification Fusion raises at a specific lifecycle moment |
| Enable Business Events | A per-module profile option in Setup and Maintenance that turns on event generation |
| Polling | Repeatedly calling an API on a schedule to check for changes |
| Event subscriber | A system (typically OIC) that listens for and reacts to a specific business event |

## Check yourself

A client's current integration polls Fusion every 15 minutes for newly approved invoices, and complains about the delay. Explain how switching to a business-event-driven approach would change both the delay and the number of unnecessary calls.
