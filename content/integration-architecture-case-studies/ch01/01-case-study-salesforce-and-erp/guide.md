# Lesson 1 — Case Study: Salesforce and ERP

**Chapter 1 · Integration Case Studies · Lesson 1 of 14**

## What you'll learn

- How to read an integration request for what it actually needs, not just what it asks for
- Why "system of record" has to be decided per data element, not per system
- The tradeoffs between a real-time callout and a scheduled batch sync for an ERP integration
- How to defend a design decision with the business cost of getting it wrong, not just the technology

## The scenario: Meridian Fixtures

Meridian Fixtures is a mid-size manufacturer of commercial lighting. Sales reps live in Salesforce Sales Cloud: they build quotes, track opportunities, and close deals. But Meridian's actual product catalog, current inventory counts, and customer credit holds all live in an on-premises ERP system that predates the Salesforce org by a decade. Today, reps manually check the ERP's reporting screen before quoting a price, which is slow and occasionally wrong — a rep quotes a price or a ship date the ERP can no longer honor by the time the order is placed.

The ask from the sales VP sounds simple: "Just connect Salesforce to the ERP so reps always see the real numbers." An architect's job is to turn that sentence into a design with explicit scope, because "connect" is not a requirement — it's a placeholder for several different requirements with very different difficulty levels.

## System of record, decided field by field

The first real architectural decision is not a technology choice at all: it's deciding, for each piece of data involved, which system is authoritative. At Meridian, that breaks down cleanly once it's asked explicitly:

- **Product catalog and list price** — the ERP is authoritative. Salesforce should never let a rep edit it directly.
- **Current on-hand inventory** — the ERP is authoritative, and this value changes by the minute as other channels consume stock.
- **Customer credit hold status** — the ERP is authoritative and this one matters for compliance, not just convenience.
- **Opportunity, quote, and discount approval** — Salesforce is authoritative; the ERP has no opinion on a quote until it becomes a confirmed order.

Naming the system of record per field, rather than treating "the ERP" and "Salesforce" as two competing wholes, is what turns a vague integration request into something an architect can actually design against.

## Choosing the pattern: lookup vs. sync

Two of Meridian's four data elements — inventory and credit hold — change too fast and matter too much (a quoted price built on stale inventory is a real customer-facing failure) to tolerate staleness. For those, the right pattern is a **synchronous request-reply callout**: when a rep opens a quote line, Salesforce makes a real-time call out to the ERP (through a Named Credential so the endpoint and auth are centrally managed rather than hardcoded) and gets back the current number. The user waits a second for an answer that's actually correct, instead of getting an instant answer that's possibly wrong.

Product catalog and pricing, by contrast, change on the ERP's own release cadence — maybe a few times a week, not a few times a minute. Forcing every quote screen to make a live callout just to read a price list that rarely changes adds latency and ERP load for no real benefit. The better pattern here is **scheduled batch synchronization**: a nightly or hourly job (using the Bulk API for the record volumes involved) pulls catalog and price changes into Salesforce, where they're cached locally and read instantly.

This is the core lesson of the case study: **one integration request can resolve into two different patterns**, because the data behind it has two different volatility profiles. Treating "connect Salesforce to the ERP" as a single monolithic integration would have pushed Meridine toward either an unnecessarily chatty real-time design for data that barely changes, or an unacceptably stale batch design for data that changes constantly.

## What this design has to survive

A workable design also has to state what happens when the ERP is slow or unreachable during a live inventory check — reps can't be blocked from working entirely because a backend system hiccupped. Lesson 7 covers this class of failure in depth; for now, the design simply needs a stated fallback (show the last-synced inventory number with a visible "as of" timestamp, rather than failing the quote screen outright) so the review board sees that failure was considered, not ignored.

## Key terms

| Term | Meaning |
|---|---|
| System of record | The single system treated as authoritative for a specific data element, decided per field |
| Synchronous request-reply | A real-time callout where the caller waits for an immediate answer |
| Batch synchronization | A scheduled job that moves a set of changed records between systems on an interval |
| Named Credential | A Salesforce-managed reference to an external endpoint and its authentication, used instead of hardcoding a URL or secret |
| Data volatility | How frequently a given data element actually changes, which should drive pattern choice |

## Lab

Meridian's sales VP later asks for one more field: "shipping ETA," calculated by the ERP from current warehouse workload and carrier schedules, and changes several times a day. Decide, with written justification: (1) which system should be the system of record for shipping ETA, (2) whether it belongs in the real-time callout group or the batch sync group given how often it changes, and (3) one fallback behavior for when the ERP can't answer the callout in time.

## Check yourself

Can you explain, in your own words, why "connect Salesforce to the ERP" is not itself a usable requirement, and what question you'd ask to turn it into one? Can you state the rule this lesson uses to decide between a real-time callout and a batch sync for a given field?
