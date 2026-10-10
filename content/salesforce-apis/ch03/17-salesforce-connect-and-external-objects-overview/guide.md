# Lesson 17 — Salesforce Connect and External Objects Overview

**Chapter 3 · Limits and Practice · Lesson 17 of 22**

## What you'll learn

- What Salesforce Connect does differently from every API covered so far: no data copy
- External objects, the `__x` suffix, and how they behave like standard/custom objects
- The two ways Salesforce Connect reaches an external system: OData adapters and custom Apex connectors
- Why this is a genuinely different integration pattern, not just another API

## Every API so far has moved a copy of the data

REST, SOAP, Bulk, and Composite all share one assumption: when you create, update, or query a record, that record's data actually lives inside Salesforce. Even a "real-time" REST call is reading or writing Salesforce's own stored copy. **Salesforce Connect** breaks that assumption: it lets Salesforce display and interact with data that lives in an **external system**, without ever copying or storing it in Salesforce at all. Every time a user (or an API client) views that data, Salesforce makes a live callout to the external system to fetch it, on demand.

## External objects

The way this shows up inside Salesforce is as an **external object** — visually and functionally similar to a standard or custom object (it can appear in list views, reports, and even be referenced in SOQL), but backed by live callouts instead of stored rows. External objects are identified by a **`__x`** suffix on their API name (parallel to `__c` for custom objects), e.g. `Legacy_Order__x`.

```http
GET /services/data/v61.0/query/?q=SELECT+ExternalId,Name+FROM+Legacy_Order__x+WHERE+Name='ORD-4471'
Authorization: Bearer 00D...xyz
```

Running a SOQL query against an external object looks identical to querying a normal object — but behind the scenes, Salesforce is making a real-time callout to the external system to answer it, rather than reading from its own database.

## How the connection is actually made: two options

Salesforce Connect reaches the external system through one of two mechanisms:

- **OData adapter** — a point-and-click, no-code configuration for any external system that exposes an **OData**-compliant endpoint (a widely used REST-based protocol standard for exposing queryable data). If the external system already speaks OData, this is the fastest path.
- **Custom Apex connector** — when the external system doesn't speak OData, a developer implements the **Salesforce Connect Apex Connector Framework**, writing Apex code that translates Salesforce's requests (query, search, etc.) into whatever the external system's own API actually expects, and translates its responses back into the shape Salesforce Connect needs.

## Why this matters as a distinct pattern

Every integration pattern earlier in this course assumes you're willing to store a copy of the data in Salesforce (even if that copy gets kept in sync). Salesforce Connect is for the opposite case: data that should stay the system of record somewhere else — because it's too large to duplicate, changes too fast to keep two copies in sync, or simply shouldn't be copied for compliance reasons — but still needs to be visible and usable inside Salesforce's UI and reports.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce Connect | The feature that displays/queries external-system data live, without copying it into Salesforce |
| External object | An object backed by live callouts instead of stored rows, identified by a `__x` suffix |
| OData adapter | A point-and-click Salesforce Connect configuration for any OData-compliant external endpoint |
| Apex Connector Framework | The custom-code path for connecting a non-OData external system to Salesforce Connect |

## Lab

A company has a 50-terabyte legacy order-management system that cannot be copied into Salesforce for cost and compliance reasons, but sales reps need to see a customer's order history while working a Salesforce Opportunity. Write a short scenario analysis: why does this favor Salesforce Connect over, say, a nightly Bulk API 2.0 sync, and which of the two connection mechanisms (OData adapter vs. custom Apex connector) you'd investigate first, and why.

## Check yourself

Can you explain the one fundamental way Salesforce Connect differs from every other API in this course, in terms of where the data actually lives? Can you name the `__x` suffix's purpose and the two mechanisms Salesforce Connect uses to reach an external system?