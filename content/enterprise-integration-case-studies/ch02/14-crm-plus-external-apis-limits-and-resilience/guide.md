# Lesson 14 — CRM + External APIs: Limits and Resilience

**Chapter 2 · Deep Dives · Lesson 14 of 20**

## What you'll learn

- How to choose among Future, Queueable, and Batch Apex for moving a callout off the synchronous path
- What a circuit breaker pattern is and why it protects Salesforce from a persistently failing external API
- Why a timeout needs an explicit fallback behavior, not just a shorter wait
- How Lesson 5's single-callout case generalizes into a resilience framework for any external API dependency

## Going deeper than Lesson 5's callout limits

Lesson 5 covered the hard limits on Apex callouts — 100 per transaction, a shared 120-second cumulative timeout — and the specific rule against synchronous callouts inside triggers. This lesson goes into the resilience patterns that sit on top of those limits: not just "how many callouts can I make," but "what happens when the external API is slow, flaky, or down, and how do I keep that from becoming Salesforce's problem."

## Choosing among async Apex patterns

Lesson 5 recommended moving a callout off the synchronous save path using async Apex, but "async Apex" isn't one tool — the right choice depends on the shape of the work:

- **Future methods** handle a simple, independent callout with no need to chain into further async work afterward. Doverfield's early carrier-rate-lookup refactor (Lesson 5's Lab) fits this: fire the callout, handle the response, done.
- **Queueable Apex** supports chaining one job into another and accepting more complex input than a Future method's primitive-only parameters allow — useful when the callout's result needs to trigger a second, dependent async step.
- **Batch Apex** fits processing a large number of records through a callout-driven process in controlled-size chunks, relevant if Doverfield ever needs to run a shipping-rate recalculation across thousands of existing open quotes rather than one quote at a time.

Doverfield's actual landscape uses more than one of these for different jobs — the day-to-day shipping-rate lookup stays a Future method, while a planned bulk-requote initiative is designed around Batch Apex specifically because of the volume involved.

## The circuit breaker pattern

A circuit breaker protects Salesforce from repeatedly trying (and failing) against an external API that's persistently down. The pattern tracks recent failure history for a given external dependency; once failures cross a threshold, the circuit "opens" and further calls to that dependency are short-circuited immediately — failing fast with a known fallback response instead of spending a full timeout window on a call that's very likely to fail anyway. After a cooldown period, the circuit allows a limited number of test calls through; if those succeed, it closes again and normal calls resume. Doverfield's carrier-rate integration benefits from this directly: during Lesson 7's ERP-outage-adjacent incidents, a circuit breaker on the shipping-rate callout would mean reps immediately see "rate lookup temporarily unavailable, using last known estimate" instead of each rep's quote screen separately waiting out a full timeout against a carrier API that's clearly not responding.

## A timeout needs a fallback, not just a number

Setting a callout's timeout shorter doesn't, by itself, make a design resilient — it just fails faster. The actual resilience question is what happens *after* the timeout: does the Quote screen show an error with no path forward, or does it gracefully fall back to a cached rate, a flat estimate, or a manual-entry option while flagging that the live rate couldn't be fetched? Doverfield's design treats "what's the fallback behavior when this callout times out or fails" as a required design answer for every external dependency, not an edge case to handle later if it comes up.

## Key terms

| Term | Meaning |
|---|---|
| Future method | A simple async Apex pattern for an independent callout with primitive-only parameters |
| Queueable Apex | An async Apex pattern supporting chained jobs and more complex input than Future methods |
| Batch Apex | An async Apex pattern for processing large record volumes through a callout-driven process in chunks |
| Circuit breaker | A pattern that fails fast against a persistently failing dependency instead of repeatedly waiting out full timeouts |
| Fallback behavior | The defined, graceful response when a callout times out or fails, as opposed to an undefined error state |

## Lab

Doverfield's planned bulk-requote initiative needs to call the carrier's rate API once for each of roughly 5,000 open quotes, overnight, without exceeding any single transaction's callout limits. Using this lesson's three async Apex options, recommend which one fits, explain specifically why Future methods or plain Queueable chaining would be a poor fit for this volume, and describe what fallback behavior the job should have for any individual quote whose callout fails or times out.

## Check yourself

Can you match each of Future, Queueable, and Batch Apex to the specific situation in this lesson that calls for it? Can you explain, in your own words, why a circuit breaker is different from simply lowering a timeout value?
