# Lesson 15 — Choosing Events vs. APIs vs. Batch

**Chapter 3 · Applying Events · Lesson 15 of 16**

## What you'll learn

- A decision framework for choosing between synchronous APIs, events, and scheduled batch processing
- The questions that actually distinguish these three options in a real architecture review
- Why "event-driven" isn't automatically the modern or correct choice
- Worked examples showing each option being the right answer
- How to defend an integration-style choice to a technical architect reviewer

## Three tools, not a hierarchy

By this point in the course it would be easy to walk away thinking "events are the advanced, correct choice and APIs/batch are what you settle for when you don't know better." That's wrong, and a real architecture review will treat it as a red flag. Synchronous request-response APIs (what you already know from Salesforce Integration Development), events (this course), and scheduled batch processing are three genuinely different tools suited to different situations — not three tiers of sophistication.

## The questions that actually decide it

**Does the caller need an immediate answer to continue?** If a user is sitting in front of a screen waiting for a real-time validation result ("is this address deliverable?"), a synchronous API call is the right tool — an event-driven design would force you to build a polling or callback mechanism just to recreate the synchronous experience the user actually needs.

**Does the fact matter to more than one independent consumer, right when it happens?** If one thing happening needs to notify several unrelated systems without any of them blocking each other or the publisher, that's the shape events solve well — Lesson 8's fan-out — and forcing it into a synchronous call means either calling each consumer in sequence (slow, and fragile if one is down) or building your own event bus by hand.

**Does the work need to happen on a schedule, independent of any specific trigering moment?** "Recalculate every customer's loyalty tier every night" isn't a reaction to a specific event — it's work that needs to happen regardless of what did or didn't happen that day. That's **scheduled batch processing** (Salesforce's Batch Apex / Scheduled Apex), not an event at all; there's no single "thing that happened" to publish an event about.

**Can the consumer tolerate some delay, and does the producer need to avoid blocking on the consumer's availability?** If yes to both, events fit well. If the producer genuinely needs to know the outcome before proceeding, a synchronous API (or a Flow waiting for a result) fits better, even if it means accepting the coupling.

**Is this truly one thing that happened, or is it actually a bulk, periodic operation disguised as "events"?** Publishing ten thousand events because a nightly data load touched ten thousand records is usually a sign the real requirement is a batch job, not an event stream — events model discrete, individually-meaningful facts, not bulk data movement.

## Worked examples, each a different right answer

- **A checkout page needs to confirm a shipping address is valid before letting the customer submit the order.** Synchronous API callout — the user is waiting, and there's exactly one caller who needs exactly one answer right now.
- **An order being marked "Shipped" should notify a dashboard, an email service, and an external logistics partner — independently, without any of the three blocking the Order save.** Platform event with fan-out — Lesson 8's textbook case.
- **Every account with no activity in 90 days should be flagged for a win-back campaign, calculated once a night.** Scheduled Batch Apex — this isn't a reaction to a specific event; it's periodic, bulk work with no single triggering fact.
- **A partner ERP system needs to know whenever a Product's price changes, whatever the cause (UI, Data Loader, API).** Change Data Capture — this is exactly what CDC is for: a raw field change on an object, regardless of what caused it.

## Defending the choice in a review

A Technical Architect-style review will expect you to justify an integration-style choice on these terms, not on "events are more modern." The strongest answer names which of the five questions above drove the decision, and acknowledges what the chosen approach gives up — a synchronous API gives up decoupling; an event gives up immediate confirmation; batch gives up real-time responsiveness. A design that can't articulate what it gave up usually hasn't actually thought through the trade-off.

## Key terms

| Term | Meaning |
|---|---|
| Synchronous API | A request-response call where the caller needs and waits for a direct answer |
| Scheduled batch processing | Work that runs on a schedule, independent of any single triggering event (Salesforce's Batch/Scheduled Apex) |
| Decision framework | The set of questions this lesson uses to choose between API, event, and batch for a given requirement |

## Lab

For each of these four requirements, state which of the three approaches (synchronous API, platform event/CDC, or scheduled batch) you'd choose, and justify it using one of the five questions from this lesson: (1) a loyalty-points balance must be shown to a customer the instant they load their account page; (2) a compliance report needs to recalculate risk scores for every open case once a week; (3) three unrelated internal systems all need to react independently the moment a contract is signed; (4) an external partner needs to be told whenever a specific custom object's status field changes, regardless of what process changed it.

## Check yourself

Why is "publishing ten thousand events for one nightly data load" usually a sign that the real requirement is a batch job, not an event stream? Can you name, from memory, the five questions this lesson uses to choose between API, event, and batch?
