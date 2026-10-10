# Lesson 15 — Data Warehouse and External API Integration

**Chapter 3 · Integration and Platform Architecture · Lesson 15 of 33**

## What you'll learn

- Why Snowflake, not Salesforce, answers LTV Global's cross-system reporting questions
- How Salesforce, Meridian, and LedgerPoint each feed Snowflake on their own cadence
- LTV Global's three external APIs and the integration mechanism each one uses
- Why Named Credentials and External Services keep external API logic out of scattered, hard-to-maintain Apex

## Snowflake answers the question no single system can

Lesson 8 named the specific gap Snowflake exists to fill: no single system of record — not Salesforce, not Meridian, not LedgerPoint — can answer a question that spans all three, like "total parts revenue by region, reconciled against actual collected payment." Each system can answer its own slice, but none owns the full picture. LTV Global's existing Snowflake warehouse (Lesson 4) becomes the one place that picture gets assembled, fed by extracts from all three transactional systems rather than trying to force one of them to do analytics it was never built for.

## How each system feeds Snowflake

- **Salesforce** feeds Snowflake through a **nightly Bulk API extraction** of Account, Opportunity, Case, Equipment Asset, and Parts Order data — Bulk API specifically because a full or incremental extract of LTV Global's record volumes is exactly the large, asynchronous job type Bulk API is designed for, as opposed to issuing that volume of calls through a synchronous API meant for smaller, real-time operations.
- **Meridian ERP** feeds Snowflake with its own nightly extract of product, inventory, and order-fulfillment data, run independently of the Salesforce-Meridian order-sync integration from Lesson 14 — Snowflake doesn't need Salesforce to relay Meridian's data; it pulls from Meridian directly.
- **LedgerPoint** feeds Snowflake from the same nightly batch files already being generated for the Lesson 14 reconciliation process, reused rather than duplicated — a second, separate LedgerPoint export job would mean maintaining two batch processes against a fragile legacy system when one already exists.

This gives LTV Global's data team exactly one unified place — Snowflake — to build the cross-system reports the business drivers in Lesson 3 identified as missing today, without any single operational system taking on a reporting burden it wasn't designed for.

## Three external APIs, three integration mechanisms

LTV Global's design uses three external, non-legacy APIs, each wired in through the mechanism that fits its actual usage pattern:

| External API | Used by | Mechanism | Why |
|---|---|---|---|
| Parts-pricing/catalog API | Dealer portal (Lesson 16) | Named Credential + External Services | Dealers need live, current pricing at the moment of browsing; External Services exposes the external API's schema to declarative tools (Flow) without hand-written Apex for every field |
| Shipping-carrier tracking API | Field Service and the customer portal | Named Credential, Apex callout | Tracking status is pulled on demand when a case or order is viewed, not needed as a standing declarative schema |
| Credit/financing-check API | Equipment Financing | Named Credential, Apex callout, restricted by the same profile-based field-level security from Lesson 11 | The most sensitive external integration; result fields inherit the same access restrictions as the credit-score fields they populate |

Every one of these uses a **Named Credential** rather than hard-coded endpoint URLs or credentials buried in Apex — centralizing authentication details means a credential rotation or endpoint change is a configuration update, not a code deployment, and it keeps secrets out of version control entirely.

## Why this matters beyond "it works"

The parts-pricing API's choice to use External Services specifically (rather than custom Apex, like the other two) reflects a real trade-off: External Services is the right tool when an external API's schema is stable and a declarative tool like Flow needs to call it directly, but it's not automatically the best choice for every callout — the shipping-carrier and credit-check APIs use plain Apex callouts instead, because their usage patterns (on-demand lookups buried inside existing Apex-driven processes) don't benefit from a declarative schema the way the dealer portal's pricing lookups do. Picking the same mechanism for every external API regardless of fit would be the kind of inconsistency Chapter 6's board would ask about directly.

## Key terms

| Term | Meaning |
|---|---|
| Bulk API | Salesforce's API designed for large, asynchronous data volumes, used here for the nightly Snowflake extract |
| External Services | A feature exposing an external API's schema to declarative tools like Flow, without custom Apex |
| Named Credential | A Salesforce feature centralizing authentication details for an external endpoint |

## Lab

A board member asks why the parts-pricing API uses External Services while the credit-check API uses plain Apex callouts, suspecting an inconsistency. Using this lesson's reasoning, write a three-sentence answer defending the difference as a deliberate fit-to-use-case decision rather than an inconsistency.

## Check yourself

Can you explain, from memory, why Snowflake is fed directly by Meridian and LedgerPoint rather than having Salesforce relay their data? Can you name LTV Global's three external APIs and the integration mechanism each one uses, and justify why each mechanism fits that specific API's usage pattern?
