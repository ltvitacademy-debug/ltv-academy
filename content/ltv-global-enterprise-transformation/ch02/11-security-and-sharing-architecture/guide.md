# Lesson 11 — Security and Sharing Architecture

**Chapter 2 · Core Architecture · Lesson 11 of 33**

## What you'll learn

- LTV Global's organization-wide default and role hierarchy strategy across three regions and four business units
- How dealers see only their own customers' data without ever entering the internal role hierarchy
- Where Shield Platform Encryption and field-level security protect LTV Global's most sensitive data
- How this design satisfies EMEA's GDPR obligations without requiring a separate org (resolving Lesson 7's open question)

## Starting from Private

LTV Global sets **Private** as the organization-wide default (OWD) on Account, Equipment Asset, Case, and Parts Order. Private is the conservative, default-deny starting point this scenario's complexity demands: with four business units, three regions, thousands of dealers, and millions of end customers, a more permissive default would require clawing back visibility after the fact across an enormous surface area, instead of deliberately opening it up only where a real business need exists. Every visibility exception from here is a deliberate grant, not an accident of a permissive default.

## Role hierarchy: region over business unit

LTV Global's internal role hierarchy is structured **region first, then business unit** — a VP of Equipment Sales (North America) sits above the NA sales reps, parallel to (not above or below) a VP of Parts & Aftermarket (NA), with both regional branches rolling up to a small set of global executive roles. This mirrors how LTV Global's real stakeholders (Lesson 3) actually relate to each other and ensures that a regional leader can see everything in their region across business units — matching the vision's unified-customer-view commitment — without accidentally granting a business-unit leader visibility into every region's data by default.

## Sharing rules for the exceptions

On top of the role hierarchy, two sharing rules handle the cases a pure hierarchy can't: a **criteria-based sharing rule** grants read-only Account and Equipment Asset access to a small global key-accounts team, for the handful of dealer groups that operate across multiple regions and need one team tracking them regardless of role hierarchy. A second sharing rule extends Case visibility to a cross-functional "Global Escalations" queue used when a service issue needs to be seen outside its originating region's normal hierarchy. Both are narrow, named exceptions — not a general loosening of the Private default.

## Dealers and end customers: sharing sets, not role hierarchy

Dealers and end customers access their own data through the Experience Cloud portal (Lesson 16), and they are never placed in the internal role hierarchy at all — a dealer should never be one role-hierarchy step away from seeing another dealer's customers. Instead, **sharing sets** grant each external user access only to records matching their own account relationship (their own Account's Equipment Assets, Parts Orders, and Cases), which is exactly the mechanism this catalog's sharing-and-visibility-architecture course describes for exposing records to community/portal users without involving the internal hierarchy at all. This is a deliberate, separate visibility track from the internal model, not a weaker version of it.

## Protecting the most sensitive data

Equipment Financing's data is the most regulated at LTV Global: credit-check results and financing terms. Two controls apply specifically there: **Shield Platform Encryption** on fields holding sensitive identifiers used in the credit-check process, protecting that data at rest beyond what standard field-level security alone provides; and **field-level security** restricting the credit-score and financing-terms fields so that only Equipment Financing profiles can see them at all — a sales rep in Equipment Manufacturing & Sales, even one with full Account access through the role hierarchy, cannot see a customer's credit score, because field-level security is evaluated independently of object-level and record-level access.

## Resolving the GDPR question from Lesson 7

Lesson 7 left open how EMEA's GDPR obligations get satisfied without a separate org. The answer is here: Private OWD plus a region-first role hierarchy already limits EMEA personal data's default visibility to EMEA roles; field-level security and Shield Platform Encryption give additional protection to the most sensitive fields regardless of region; and (Lesson 17 will add) Salesforce's own data-residency handling addresses where EU personal data physically resides. No single mechanism does this alone — it's the combination that makes the single-org decision defensible.

## Key terms

| Term | Meaning |
|---|---|
| Organization-wide default (OWD) | The baseline record-level access for an object before any sharing rule or hierarchy grants more |
| Criteria-based sharing rule | A sharing rule that grants access based on a record's field values rather than its owner |
| Sharing set | The mechanism granting external/portal users access to records based on their own account relationship |
| Shield Platform Encryption | Salesforce's encryption-at-rest feature for protecting especially sensitive field data |
| Field-level security | Access control evaluated per field, independent of object- and record-level access |

## Lab

A Field Service manager in North America asks why they can't see a dealer's financing terms even though they can see that same dealer's full Account and Equipment Asset history. Using this lesson's reasoning, write a two- or three-sentence explanation of exactly which control is responsible for that specific restriction, and why it's independent of the Account-level access the manager already has.

## Check yourself

Can you explain, in your own words, why LTV Global starts from a Private OWD rather than a more permissive default, given this scenario's scale? Can you state the specific combination of controls (not just one) that lets this design satisfy EMEA's GDPR obligations without a separate org?
