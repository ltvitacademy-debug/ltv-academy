# Lesson 2 — Case Study: Salesforce and a Financial System

**Chapter 1 · Integration Case Studies · Lesson 2 of 14**

## What you'll learn

- Why financial integrations demand a different risk posture than most other integrations
- What idempotency means in practice, and why a financial integration can't work without it
- How event-driven integration (publish-subscribe) differs from the request-reply pattern from Lesson 1
- How to design for "exactly-once effect" when the underlying delivery can only guarantee "at-least-once"

## The scenario: Harborline Capital

Harborline Capital is a commercial lender. Loan officers manage the entire sales process — origination, underwriting handoff, approval — in Salesforce. Once a loan is approved and funded, the loan's full lifecycle (payment schedule, interest accrual, balance, delinquency status) is tracked in a separate core lending/ledger system that long predates Salesforce and that Finance will not let anyone bypass, for good reason: it's the system their auditors trust.

Loan officers want to see current balance and payment status without leaving Salesforce. That makes this case study look like Lesson 1's ERP case study at first glance — read-only data living in another system — but the stakes are different in a way that changes the design.

## Why "close enough" isn't good enough here

In the Meridian ERP case study, a slightly stale inventory number was an inconvenience with a cheap fallback (show the last-synced value with a timestamp). At Harborline, a loan officer looking at a wrong balance isn't an inconvenience — it's a compliance and customer-trust problem. A design that's "usually right" is not an acceptable design for financial data. This doesn't mean every field needs sub-second real-time accuracy; it means the integration has to be explicit and defensible about exactly how current its data is, and that gap has to be small enough and well-understood enough that Finance will sign off on it.

## Choosing publish-subscribe over polling

Rather than Salesforce polling the ledger system on a schedule (which either wastes calls when nothing changed, or misses changes between polls), the better pattern here is **event-driven integration using Platform Events**: the ledger system publishes an event whenever a loan's balance or status changes, and a Salesforce subscriber updates the loan record accordingly. This is a fundamentally different shape than Lesson 1's request-reply callout — nobody is waiting on an answer; the ledger system announces changes and Salesforce reacts to them as they arrive. It also means Salesforce's loan records are always driven by the ledger's own change history, not by Salesforce's polling schedule.

## The idempotency problem

Event-driven systems have a near-universal guarantee: **at-least-once delivery**. A network blip, a subscriber restart, or a retry after a timeout can cause the same event to be delivered and processed more than once. For most data this is a minor annoyance. For a financial balance update, processing the same "payment of $500 received" event twice could double-count the payment in a derived field — a real, auditable error.

The fix is **idempotency**: designing the event handler so that processing the same event twice produces the same end state as processing it once. In practice, this means the event carries a unique transaction identifier from the ledger system, and the Salesforce-side handler checks whether that identifier has already been applied before updating anything. The handler isn't trying to prevent duplicate delivery (that's not fully preventable); it's making duplicate delivery harmless. "At-least-once delivery, exactly-once effect" is the standard way architects describe this combination, and it's the single most important property of any financial integration design.

## What a review board will ask

A reviewer looking at this design will specifically probe: what happens if the Salesforce subscriber is down for an hour and a backlog of events builds up (Platform Events retain a limited replay window, so the subscriber needs a resume strategy using the stored replay ID, not an assumption that nothing is ever missed); and what the reconciliation process is for catching the rare case where an event was silently lost. Lesson 8 covers the security side of this same case study; Lesson 9 covers how to write this reasoning down so a reviewer can evaluate it without re-deriving it live.

## Key terms

| Term | Meaning |
|---|---|
| Event-driven integration | A pattern where one system publishes events as changes happen, and subscribers react asynchronously |
| Platform Events | Salesforce's native publish-subscribe mechanism for custom event messages |
| At-least-once delivery | A delivery guarantee that a message will arrive one or more times, never zero, but duplicates are possible |
| Idempotency | Designing a handler so that processing the same message multiple times has the same effect as processing it once |
| Replay ID | A durable marker a subscriber uses to resume consuming events from where it left off |

## Lab

Harborline's Finance team asks for one more event type: a "loan charged off" event, marking a loan as a permanent loss, which must never be applied twice and must never be silently missed. Write a short design note: (1) what idempotency key the handler should check before acting, (2) what should happen if the same charge-off event somehow arrives twice, and (3) what reconciliation check you'd run periodically to catch an event that was never delivered at all.

## Check yourself

Can you explain why "at-least-once delivery, exactly-once effect" is the standard that financial integrations need, and how idempotency achieves it without the delivery mechanism itself guaranteeing exactly-once? Can you contrast this case study's publish-subscribe design against Lesson 1's request-reply design, and name the property of the data in each case that drove the choice?
