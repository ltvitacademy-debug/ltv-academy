# Lesson 5 — Case Study: CRM + External APIs

**Chapter 1 · Enterprise Integration Case Studies · Lesson 5 of 20**

## What you'll learn

- How Named Credentials and External Credentials keep callout authentication out of Apex code
- The real governor limits that bound how many external calls a single transaction can make
- Why a synchronous callout inside a trigger context is a specific, well-known design mistake
- How async Apex patterns let Salesforce call out to third parties without that risk

## The scenario: Doverfield needs live shipping rates

Doverfield wants its Quote screen to show a live shipping cost from a third-party carrier's rate API the moment a rep adds a shipping address, rather than a flat estimate. That means Apex code calling out to an external REST API in real time — which immediately raises two separate questions: how does Apex authenticate to that API without hardcoding a secret, and what happens to Doverfield's Salesforce transaction while it waits for the carrier to respond.

## Keeping credentials out of code

A **Named Credential** defines the callout's target endpoint URL and required authentication in one reusable, admin-managed record, so an Apex callout refers to the named credential rather than embedding a URL and an API key or OAuth token directly in code. Salesforce's newer **External Credentials** split the authentication details out even further from the endpoint definition, and current documentation recommends starting new integrations on that newer model rather than the legacy named-credential-only approach, which is being phased toward retirement. Either way, the principle is the same: a secret used to call the carrier's API lives in a protected setup record that admins manage and rotate, never in Apex source that every developer with code access can read.

## The governor limits that actually bound this design

Apex enforces specific execution governors on callouts, and Doverfield's architecture has to be designed within them, not discover them in production:

- A single transaction can make **up to 100 callouts** (HTTP requests or web service calls) in total.
- All callouts in that same transaction share a **combined 120-second** cumulative timeout budget.
- The whole Apex transaction still has to finish within its overall execution time limit, and time spent waiting on a callout counts against that wall-clock transaction, even though it isn't counted as CPU time.

None of these numbers are exotic edge cases for Doverfield's shipping-rate lookup — a single rate check is one callout, comfortably inside the 100-callout ceiling. The numbers matter more as the design gets ambitious: if someone later wants to call the carrier API once per line item on a 40-line quote, in a loop, inside one transaction, that's a design that needs rethinking (batching the lines into one request, or moving the lookup off the synchronous save path) long before it hits the ceiling, not after.

## Why synchronous callouts don't belong in triggers

Apex explicitly disallows a synchronous callout from inside a trigger, and the broader architecture lesson underneath that specific restriction is more important than the rule itself: triggers run as part of a DML transaction, and a callout that blocks waiting on a third party's response inside that transaction creates exactly the kind of coupling that makes a slow or unreachable external system capable of stalling or failing Salesforce's own save. A well-known category of real-world incident is a surge of synchronous callouts to a slow external system queuing up and locking Salesforce transaction threads, degrading the org for everyone — not just the users triggering the integration.

The fix is to move the callout out of the synchronous save path using asynchronous Apex — a Queueable class enqueued from the trigger (or from a Platform Event handler, as in Lesson 1's pattern) performs the callout after the record save has already committed, so a slow or failing carrier API can never block or fail the quote save itself.

## Key terms

| Term | Meaning |
|---|---|
| Named Credential | An admin-managed record defining a callout's endpoint and authentication, kept out of Apex code |
| External Credential | The newer, more granular model splitting authentication details from endpoint definition, recommended for new work |
| Callout limit | The maximum of 100 callouts per Apex transaction |
| Cumulative callout timeout | The shared 120-second timeout budget across all callouts in one transaction |
| Queueable Apex | An asynchronous Apex pattern used to move a callout off the synchronous save path |

## Lab

A Doverfield developer proposes looping over every line item on a quote and calling the carrier's rate API once per line, synchronously, directly inside the Quote Line Item's `before update` trigger. Identify every specific problem with this design — the trigger-callout restriction, the 100-callout and 120-second limits as the quote grows, and the transaction-stalling risk — and propose a redesign that avoids all three.

## Check yourself

Can you state, from memory, the two specific callout governor limits covered in this lesson and what each one actually bounds? Can you explain, in your own words, why Apex disallows a synchronous callout from inside a trigger, beyond just "it's a rule"?
