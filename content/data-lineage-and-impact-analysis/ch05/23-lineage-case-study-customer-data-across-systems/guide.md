# Lesson 23 — Lineage Case Study: Customer Data Across Systems

**Chapter 5 · Applied Lineage · Lesson 23 of 25**

## What you'll learn

- A second full case study, this time tracing a single customer concept across three separate systems instead of one pipeline
- Why cross-system lineage is harder than single-pipeline lineage, and what makes it harder specifically
- How a missing upstream/downstream map (Lesson 12) turns a duplicate-records problem into a multi-week investigation
- How the fix is a documentation and ownership change, not just a technical patch

## The scenario (fictional, illustrative)

**Caldwell & Finch Insurance**, a fictional mid-sized insurance company, is used here purely as a realistic composite scenario — not a real company, and not based on any specific real company's data or events.

## Problem

The marketing team sends a renewal email campaign and gets dozens of complaints: many customers received the same email two or three times. Separately, the customer-count metric reported to leadership has quietly crept up for six straight months, even though the sales team swears new customer growth has been flat. Both symptoms turn out to share one root cause.

## Trace

Unlike Lesson 22's single pipeline, this problem spans three separate source systems, each with its own idea of what a "customer" is:

1. **CRM** — creates a customer record when a sales agent first logs a prospect, keyed by an internal `CRM_ID`
2. **Policy Administration System** — creates a *separate* customer record when a policy is actually issued, keyed by a `PolicyHolderID`, because policies can legally be issued to someone the CRM never tracked (a referral, a walk-in)
3. **Support Ticketing System** — creates yet another customer record on first support contact, keyed by email address alone, with no link back to either `CRM_ID` or `PolicyHolderID`

Each system's lineage is fine *within itself* — the problem only appears when a downstream "unified customer view" tries to merge all three. The merge logic matches records by email address, but the CRM and Policy Administration records sometimes store slightly different email formatting for the same real person (`J.Smith@email.com` vs `j.smith@email.com` vs an old personal address that was never updated), so the same real customer gets counted as two or three separate rows in the unified view — each with its own send list entry, which is exactly why the renewal campaign fired multiple times.

## Impact

Tracing upstream and downstream from the unified customer view (Lesson 12) shows it feeds four consumers: the marketing send-list export, the leadership customer-count metric, a churn-rate calculation, and a compliance mailing-address report. All four have been quietly wrong in the same direction for as long as the matching bug existed — which is why the customer count crept up even without real growth: the same people were slowly accumulating more duplicate variants over time as they updated their email in only one of the three systems.

## Fix

The technical fix — standardizing email capitalization and whitespace before matching — closes the immediate gap, but the case study's real fix is structural: the three systems never had an agreed **source of record** for which system's customer identifier is authoritative, so the merge logic was built on email address, the one field all three happened to share, rather than on a deliberate matching key. The lasting fix assigns the CRM's `CRM_ID` as the authoritative customer identifier, requires both the Policy Administration and Support systems to capture and store it going forward, and documents that cross-system lineage explicitly — rather than relying on an informal, best-effort email match that silently drifted wrong.

## Key terms

| Term | Meaning |
|---|---|
| Source of record | The single system designated as authoritative for a given identifier or concept, when multiple systems hold a version of it |
| Matching key | The field or combination of fields used to identify that two records from different systems refer to the same real-world entity |

## Lab

List three systems in your own work or a personal project that each independently track some version of "the same thing" (customers, products, tasks — anything). Identify what field, if any, is currently used to match records across them, and whether that field was deliberately chosen as a matching key or just happened to be the one field all three systems shared.

## Check yourself

Can you explain why this problem was harder to trace than Lesson 22's revenue-report bug, specifically because it spanned three systems instead of one pipeline — and why the lasting fix was a matching-key decision, not just a formatting patch?
