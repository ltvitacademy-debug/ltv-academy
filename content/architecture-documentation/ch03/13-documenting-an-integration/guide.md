# Lesson 13 — Documenting an Integration

**Chapter 3 · Practice · Lesson 13 of 17**

## What you'll learn

- The standard sections of a complete integration design document
- How to document integration pattern choice, auth, data mapping, and error handling together as one coherent story
- When to include a sequence diagram vs. when a context-diagram-level description is enough
- A full worked example documenting a real-time Salesforce-to-external-system integration

## Why integrations get their own documentation section

Lesson 7 listed "integration design" as one section of an SDD. Integrations deserve more than a passing mention because they're where a solution's risk concentrates: an integration is the one place a Salesforce architect's design depends on a system they don't fully control, can't fully test in isolation, and whose failure modes often only show up in production. A vague integration section — "Salesforce talks to the ERP system" — leaves exactly the detail unaddressed that tends to cause the real incidents.

## The standard sections of an integration design document

| Section | What it covers |
|---|---|
| Pattern | Which integration pattern is used — request-reply (synchronous call and wait), fire-and-forget (asynchronous, no response expected), batch (scheduled bulk transfer), or event-driven (Platform Events or similar, publish/subscribe) |
| Direction | Inbound (external system → Salesforce), outbound (Salesforce → external system), or bidirectional |
| Endpoints and authentication | What's being called, and how access is authenticated — OAuth, a Named Credential, a certificate, an API key — without putting actual secret values in the document |
| Data mapping | Which Salesforce fields map to which external fields, and any transformation applied in between |
| Error handling | What happens on failure — retry policy, dead-letter logging, who gets alerted, and how a failed record gets reprocessed or manually resolved |
| Volume and frequency | How much data moves and how often — real-time per-record, nightly batch, hourly, etc. — since this materially affects which pattern is even viable |

## Pattern choice drives everything else

The pattern isn't just the first row of the table — it's the decision everything else in the document depends on. A **request-reply** pattern (the calling system waits synchronously for a response) needs documentation of timeout behavior and what the caller does if no response arrives in time. A **fire-and-forget** pattern (the publisher doesn't wait) needs documentation of how the publisher would ever find out something downstream failed, since by design it isn't waiting for an answer. A **batch** pattern needs documentation of what happens to a batch that partially succeeds — are the successful records committed while the failures get flagged, or does the whole batch roll back? An **event-driven** pattern built on Platform Events needs documentation of subscriber behavior if a subscriber is down when an event publishes, since events aren't held indefinitely for an offline subscriber the same way a queued message might be in some messaging systems. None of these questions has a universally correct answer — the right answer depends on the business tolerance for data loss, delay, and manual intervention — but an integration document that doesn't ask the question at all is incomplete regardless of which pattern was chosen.

## When to add a sequence diagram

A table describing pattern, direction, and error handling is often enough for a straightforward batch sync. A **sequence diagram** (Lesson 5) earns its place specifically when the order and timing of calls is complex enough that prose alone would be ambiguous or easy to misread — multiple synchronous and asynchronous steps interacting, a retry loop, or a multi-system chain where it matters exactly which system acts first. The test is practical: if two different readers could reasonably draw two different pictures of "what happens, in what order" from the prose description alone, that's the signal a sequence diagram is needed to remove the ambiguity.

## A worked example

**Scenario:** Salesforce needs to check real-time product availability from an external inventory system before letting a sales rep add a line item to an Opportunity.

- **Pattern:** Request-reply (synchronous).
- **Direction:** Outbound call from Salesforce, inbound response.
- **Endpoints and authentication:** Apex callout to the inventory system's REST endpoint, authenticated via a Named Credential holding an OAuth 2.0 client credentials flow — the actual client secret is stored in the Named Credential, never in code or in this document.
- **Data mapping:** Salesforce `Product2.ProductCode` maps to the inventory system's `sku` field; the response's `available_quantity` maps to a Salesforce `Available_Stock__c` field on the line item, refreshed at call time (not stored permanently, since it would go stale immediately).
- **Error handling:** If the callout times out or returns an error, the UI shows "Stock check unavailable — please verify manually" rather than blocking the rep from proceeding; the failure is logged to a custom `Integration_Error_Log__c` object with the raw error for later review, but a transient inventory-check failure is not treated as severe enough to need a page/alert.
- **Volume and frequency:** Expected at roughly 200 calls per business hour at current sales volume, well within the external system's documented rate limit.

Because this scenario is a single synchronous call-and-response with a straightforward fallback, prose and the table above are enough — a sequence diagram would add little beyond what the error-handling row already states clearly.

## Key terms

| Term | Meaning |
|---|---|
| Integration pattern | The general shape of an integration: request-reply, fire-and-forget, batch, or event-driven |
| Named Credential | A Salesforce feature storing an external endpoint's URL and authentication details separately from code, so secrets aren't hardcoded or exposed in documentation |
| Dead-letter logging | Recording a failed integration message somewhere reviewable, rather than silently dropping it |

## Lab

Document this integration using the six standard sections: a nightly batch job exports all Closed Won Opportunities from the previous day to a CSV, which an external billing system picks up from a shared SFTP location every morning at 6am and imports to create invoices. Decide and justify a reasonable error-handling approach for what happens if the SFTP upload itself fails (not just if individual rows fail import on the billing side), and state whether this scenario needs a sequence diagram, giving your reasoning either way.

## Check yourself

Can you name the six standard sections of an integration design document? Can you explain why the pattern choice (request-reply, fire-and-forget, batch, event-driven) drives what the error-handling section even needs to address? Can you state the practical test this lesson gives for deciding whether a sequence diagram is needed versus a prose/table description being enough?
