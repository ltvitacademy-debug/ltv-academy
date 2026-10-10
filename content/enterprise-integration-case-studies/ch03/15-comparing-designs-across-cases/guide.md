# Lesson 15 — Comparing Designs Across Cases

**Chapter 3 · Review and Defense · Lesson 15 of 20**

## What you'll learn

- How to build a single comparison matrix across all five of Doverfield's integration case studies
- Which criteria actually distinguish one integration design from another
- Why the same criteria, applied consistently, explain choices that look inconsistent at a glance
- How this comparison skill maps directly onto what a real architecture review board asks for

## Why compare designs side by side at all

Chapters 1 and 2 covered Doverfield's five integrations one at a time, each with its own scenario and its own reasoning. A review board — whether a real CTA-style panel or a hiring manager evaluating an architect candidate — rarely wants five separate stories. It wants to know whether the candidate applied one consistent decision process across all five, or got five different, disconnected answers by accident. Building an explicit comparison matrix is how an architect demonstrates the first rather than the second.

## A comparison matrix across all five cases

| Case | Data volume | Latency tolerance | Primary risk if this integration fails | Pattern chosen |
|---|---|---|---|---|
| CRM + ERP (order creation) | Moderate, one order per closed deal | Seconds to minutes acceptable | Order never reaches fulfillment | Event-driven (Platform Events) |
| CRM + Data Warehouse | High, full object history | Hours acceptable (daily refresh) | Stale or incomplete reporting, not a live-transaction risk | Incremental extract + CDC for key objects |
| CRM + Identity Provider | Low, one assertion per login | Must be near-instant | User locked out of Salesforce entirely | SAML federation, synchronous by nature |
| CRM + Customer Portal | Low per request, many concurrent external users | Must be near-instant for page loads | Wrong customer sees another customer's data (severe) | Private OWD + sharing sets |
| CRM + External APIs (shipping) | Low, one lookup per quote | Needs fast but tolerates graceful fallback | Rep sees no rate or a stale-but-labeled estimate | Async Apex + Named Credential + fallback |

## What the matrix actually reveals

Laid out this way, a pattern emerges that wasn't obvious case by case: **the pattern choice tracks the "primary risk if this integration fails" column far more tightly than it tracks data volume**. The identity-provider case has the lowest data volume of all five, yet it's the one case where failure is the most immediately disruptive to a single user (total lockout), which is exactly why it's built as a real-time, synchronous flow rather than something tolerant of delay. The data-warehouse case has the highest volume, but its failure mode — a dashboard being a few hours stale — is tolerable in a way none of the other four are, which is why it's the one case comfortable with a multi-hour freshness window. Volume alone would have suggested very different priorities than risk-of-failure did; a design process that only asked "how much data" and skipped "what happens if this breaks" would have reached worse answers for at least two of these five cases.

## Why this maps onto a real review board

A review board probing an architecture candidate rarely accepts "I chose event-driven here and synchronous there" without asking why the choice differs between cases that look superficially similar. The comparison matrix is the artifact that answers that question before it's even asked: it shows the same three or four criteria (volume, latency tolerance, failure risk) applied consistently across every case, with the pattern choice following transparently from those criteria rather than looking like five separate, ad hoc decisions. Lessons 17-19 pick this up directly — presenting a design and defending it against objections both lean on having exactly this kind of matrix ready, not built on the spot under questioning.

## Key terms

| Term | Meaning |
|---|---|
| Comparison matrix | A table applying the same criteria consistently across multiple designs to make the decision process visible |
| Latency tolerance | How much delay a given data flow can absorb before it causes a real problem |
| Failure risk | What specifically goes wrong, and how severely, if a given integration stops working |

## Lab

Add a sixth row to this lesson's matrix for the legal-compliance integration from Lesson 8's Lab (notified within one business day of a contract-termination status change). Fill in data volume, latency tolerance, and primary failure risk for that case, and state which existing pattern from the other five rows it most resembles — justified by which criteria actually match, not by which case studies feel similar on the surface.

## Check yourself

Can you explain, using this lesson's matrix, why the identity-provider case and the data-warehouse case ended up with opposite latency-tolerance answers despite data volume pointing the opposite way? Can you state why a review board cares more about consistent criteria across cases than about any single case's answer in isolation?
