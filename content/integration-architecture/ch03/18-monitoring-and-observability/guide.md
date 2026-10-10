# Lesson 18 — Monitoring and Observability

**Chapter 3 · Reliability and Operations · Lesson 18 of 28**

## What you'll learn

- The difference between monitoring and observability, and why they answer different questions
- The specific signals an integration needs visibility into: volume, latency, error rate, and queue/backlog depth
- Salesforce's relevant native tooling at a conceptual level: Event Monitoring and debug/platform logs
- Why "it's not throwing an error" is not the same as "it's healthy"

## Monitoring tells you something is wrong; observability tells you why

**Monitoring** is watching a defined set of signals and alerting when one crosses a threshold — an integration's error rate exceeds 5%, a batch job didn't finish by its expected time, a queue depth is climbing. Monitoring answers "is something wrong right now?" **Observability** is the broader, deeper capability to actually understand *why* something is wrong once monitoring has flagged it — having enough logged detail, tracing, and context available to diagnose a specific failing transaction, not just know that failures are happening in aggregate. An org can have excellent monitoring (it knows immediately when an integration's error rate spikes) and terrible observability (once alerted, nobody can actually figure out which specific records failed or why), and the second half of that gap is just as damaging as not monitoring at all — an alert that can't be diagnosed just tells you to be anxious, not what to fix.

## The signals that actually matter for an integration

- **Volume.** How many requests, records, or events is this integration processing per unit time, and is that volume consistent with what's expected? A sudden drop to zero volume is often a more urgent signal than a spike in errors — it can mean the integration has silently stopped running altogether, which is the silent data loss failure mode from Lesson 2 at the level of an entire integration rather than one record.
- **Latency.** How long is a request or batch actually taking, end to end? Latency creeping upward over weeks, even without any outright failures yet, is often the earliest warning sign of a volume or capacity problem that will eventually become an outright failure.
- **Error rate.** What fraction of attempts are failing, and is that rate stable, trending up, or spiking? A low, stable baseline error rate is often normal (a small fraction of records always fail validation for legitimate data-quality reasons); a sudden spike usually indicates something changed — a new deployment, an API version change on the other end, an expired credential.
- **Queue or backlog depth.** For asynchronous and event-driven integrations specifically, is the number of unprocessed messages growing, shrinking, or stable? A backlog that only grows means consumers aren't keeping up with producers, and it will eventually hit a retention limit (recall Platform Events' retention window from Lesson 7) and start losing messages if nothing intervenes.

## Salesforce's native tooling, conceptually

Salesforce provides **Event Monitoring**, which captures detailed event log files covering API usage, login activity, and other platform events, giving visibility into exactly which integration users or connected apps are generating what volume of API traffic — useful for diagnosing which specific integration is responsible for hitting a shared API limit, or for spotting an integration user whose traffic pattern changed unexpectedly. Standard debug logs and the platform's own setup audit trail provide narrower, more immediate visibility into specific Apex execution and configuration changes, useful for diagnosing a specific failing transaction once an alert has already pointed toward it. An architect's job isn't to memorize every field these tools expose, but to know that this native tooling exists and what category of question each one is actually built to answer, so a design doesn't rely entirely on home-grown logging for visibility an existing platform capability already provides.

## "No errors" is not the same as "healthy"

A specific trap this lesson warns against: treating the absence of thrown errors as proof an integration is healthy. An integration that silently stopped running, one that's succeeding but taking ten times longer than it used to, and one with a backlog quietly growing every day are all, from an error-count perspective, showing zero errors — and all three are actually unhealthy. Real monitoring has to track volume, latency, and backlog explicitly, specifically because error rate alone misses exactly these failure modes.

## Key terms

| Term | Meaning |
|---|---|
| Monitoring | Watching defined signals and alerting when they cross a threshold |
| Observability | The deeper capability to understand why something is wrong once monitoring has flagged it |
| Queue/backlog depth | The number of unprocessed messages waiting in an asynchronous or event-driven integration |
| Event Monitoring | Salesforce's native feature capturing detailed event log files covering API usage and login activity |

## Lab

An integration team only alerts on error rate, and their nightly batch sync has quietly stopped running for the past four days due to an expired credential, with zero errors logged because the job simply never starts. Using this lesson's four signal categories, explain why error-rate-only monitoring missed this, and design a monitoring check (naming which signal it watches) that would have caught the problem on day one instead of day four.

## Check yourself

Can you explain, in your own words, the difference between monitoring and observability? Can you name all four signal categories this lesson identifies as mattering for an integration, and give one example of a failure that error-rate monitoring alone would miss?
