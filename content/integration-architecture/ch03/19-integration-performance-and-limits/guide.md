# Lesson 19 — Integration Performance and Limits

**Chapter 3 · Reliability and Operations · Lesson 19 of 28**

## What you'll learn

- Why Salesforce's governor limits exist specifically because Salesforce is a shared, multi-tenant platform
- The specific limits an integration architect designs around: callout limits, API request limits, and concurrent long-running request limits
- Why limits should be designed around deliberately, not discovered accidentally in production
- The difference between a limit that fails a transaction outright and one that only degrades performance

## Why Salesforce has limits other platforms don't

Salesforce's **governor limits** exist because Salesforce is a multi-tenant platform: thousands of different organizations' code and integrations run on shared infrastructure, and without hard caps, one org's runaway process (an infinite loop, an unbounded recursive trigger, an integration making unlimited callouts) could degrade performance for every other org sharing that infrastructure. This is a fundamentally different constraint than designing for a dedicated, single-tenant server an organization fully controls — on Salesforce, the platform enforces limits specifically so that no single customer can monopolize shared resources, and an architect designs integrations with this reality as a first-class constraint, not an inconvenience to work around after the fact.

## The limits an integration architect designs around

Several categories of limit recur specifically in integration design, and this course has already introduced the core ones in context:

- **Apex callout limits** (Lesson 6): a maximum of 100 callouts per transaction, with cumulative callout time capped at 120 seconds across the whole transaction. These bound how many synchronous outbound calls a single Apex transaction can realistically make, which is exactly why high-volume, per-record synchronous integration doesn't scale and points toward Bulk API or asynchronous patterns instead (Lesson 13).
- **API request limits.** Salesforce enforces a limit on the total number of API calls an org can make in a rolling 24-hour period, shared across every integration, every connected app, and every user making API calls against that org — not a per-integration allowance, but an org-wide pool. An architect designing a new integration has to ask not just "will this work" but "how much of the org's shared API allocation will this consume, and what else is drawing from that same pool." The exact daily allocation depends on the org's edition and licenses, so, as with this course's other specific numeric claims, check the org's actual current limit (visible in Salesforce Setup, under System Overview or API usage, and in the API response headers themselves) rather than assuming a number.
- **Concurrent long-running request limits.** Salesforce caps how many requests that each run longer than roughly five seconds of total execution time can run concurrently for a given org, to prevent a flood of slow requests from starving the shared infrastructure of capacity needed by everyone else's fast, ordinary transactions.

## Design around limits, don't discover them in production

The discipline this lesson asks for is designing against these constraints deliberately, during architecture, rather than treating a `LimitException` in production as the first time anyone considered them. In practice, this means: calculating expected API call volume for a new integration against the org's actual current allocation before building it, choosing Bulk API or an asynchronous pattern for a flow whose expected volume would blow through callout or API limits if built synchronously and per-record, and building monitoring (Lesson 18) specifically for API usage trending toward the org's shared ceiling, so a growing integration landscape is caught approaching a limit weeks before it actually hits one.

## Hard failure vs. degraded performance

It's worth distinguishing two different ways a limit can bite. Some limits fail a specific transaction outright and immediately once crossed — exceeding the 100-callout-per-transaction cap throws a governor limit exception on that transaction, right then. Others degrade shared performance gradually as usage approaches a ceiling, without a single hard failure pinpointing the moment things went wrong — a growing number of concurrent long-running requests can slow down unrelated transactions across the org well before any individual request technically fails. An architect reviewing performance has to watch for both kinds of signal, not just wait for an exception to appear in a log.

## Key terms

| Term | Meaning |
|---|---|
| Governor limit | A hard cap Salesforce enforces because it's a multi-tenant platform sharing infrastructure across many orgs |
| API request limit | The total number of API calls an org can make in a rolling 24-hour period, shared across all integrations and users |
| Concurrent long-running request limit | A cap on how many requests exceeding roughly five seconds of execution time can run at once for an org |

## Lab

A growing company's Salesforce org currently has six separate integrations, each making periodic REST API calls throughout the business day, and a new seventh integration is proposed that would add a synchronous, per-record callout for every incoming web form submission (expected to be a few thousand per day). Using this lesson's framework, describe how you'd evaluate whether the new integration is safe to add against the org's shared API allocation, and name which alternative pattern from earlier chapters you'd consider if the volume estimate turns out to be too high for a synchronous, per-record design.

## Check yourself

Can you explain why Salesforce's governor limits exist, specifically tying the explanation to multi-tenancy, in your own words? Can you name the three limit categories this lesson covers and, for each, where you would go to check the org's actual current value rather than assuming one?
