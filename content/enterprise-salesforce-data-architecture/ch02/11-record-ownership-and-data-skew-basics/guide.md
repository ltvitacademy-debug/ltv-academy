# Lesson 11 — Record Ownership and Data Skew Basics

**Chapter 2 · Data Storage and Scale · Lesson 11 of 26**

## What you'll learn

- What "data skew" means in a Salesforce org, and the general volume threshold where it starts to matter
- The three distinct skew patterns — account/parent-child, ownership, and lookup — and how they differ
- Why skew problems are about record *locking* and *sharing recalculation*, not raw storage
- The standard mitigation pattern for each type, and why "just don't do that" isn't always possible

## Skew is about concentration, not total volume

A million-record object isn't automatically a problem. **Data skew** is what happens when a large number of those records concentrate around a single parent, a single owner, or a single lookup target, rather than spreading out. Salesforce's own large-data-volume guidance treats more than 10,000 child records associated with the same parent record as the point where skew-related problems typically start to show up. Below that concentration, most orgs never notice; above it, record locking and sharing recalculation both get measurably more expensive, and the org can start seeing lock-contention errors that have nothing to do with how much total data exists.

## Three patterns, three different causes

**Account (parent-child) data skew** happens when an enormous number of child records — commonly Contacts or Opportunities — sit under one parent Account. The classic real-world cause is a "catch-all" or "Unassigned" Account that integration users or sloppy data entry dump records into by default, rather than taking the time to match them to the correct parent. The cost shows up two ways: updating many children of the same account in parallel means repeatedly locking that one parent record, so concurrent updates start failing when a lock is already held; and changing that account's owner can require re-checking and adjusting sharing on every one of its children, plus recalculating the role hierarchy's sharing implications — a cost that scales with how many children exist.

**Ownership skew** is the same concentration problem applied to record ownership instead of parentage: a huge number of records across an object, all owned by a single user or queue — again, often a generic "Unassigned" or integration-user account. Changing the owner of a heavily-skewed record set, or deleting a skewed owner's user record, is one of the most expensive operations in the platform, because sharing has to be stripped from the old owner, from every role above them in the hierarchy, and from anyone else who reached those records through a sharing rule. The standard mitigation, when the skew genuinely can't be avoided, is to give the skewed owner **no role** in the role hierarchy at all — that removes them, and their entire record set, from role-based sharing calculations entirely.

**Lookup skew** is the least visible of the three. It happens when a very large number of records across (potentially) any object point at the same single record through a lookup field — not necessarily a parent-child or ownership relationship, just a plain lookup. Because Salesforce locks the target of a lookup field on every insert or update that references it, a lookup field pointed heavily at one record becomes a lock-contention bottleneck under concurrent load. It's the hardest of the three to detect in advance, because there's no dedicated tool that flags it — it typically surfaces only when custom automation and high record volume collide, producing lock exceptions that look unrelated to the actual cause until someone traces the failing updates back to a shared lookup target.

## Why the mitigation is the same shape every time

Notice that all three mitigations point the same direction: **reduce concentration, or remove the concentrated record from the mechanisms that make concentration expensive.** Spread child records across enough real parent accounts that none crosses the threshold. Keep a necessarily-skewed owner (an integration user, a shared queue) out of the role hierarchy so ownership changes don't cascade through sharing rules. Be deliberate about which lookup targets could realistically accumulate a large number of references, and design around that before a high-volume integration goes live, not after it starts throwing lock errors in production.

None of these are exotic fixes — they're all variations on "don't let one record become a single point of contention for thousands of others." The hard part is recognizing the pattern during data-model design, when a "temporary" catch-all Account or a single shared integration-user owner looks like a harmless convenience rather than the seed of a skew problem that won't show up until the org is at real scale.

## Key terms

| Term | Meaning |
|---|---|
| Data skew | Excessive concentration of records against a single parent, owner, or lookup target |
| Account (parent-child) skew | Skew caused by too many child records under one parent Account |
| Ownership skew | Skew caused by too many records across an object owned by a single user or queue |
| Lookup skew | Skew caused by too many records referencing a single record through a lookup field |
| Record locking | Salesforce's mechanism for serializing concurrent changes to a record, which skew makes contention-prone |

## Lab

A wholesale distributor's integration user creates every inbound web-lead Contact under a single placeholder Account named "Web Leads — Unassigned," which has grown to 340,000 child Contacts over three years. The same integration user owns all 340,000 of those Contact records directly. Identify which skew pattern(s) are present in this scenario (there may be more than one), explain which specific operations will become expensive as a result, and propose the two concrete changes — one addressing the parent-level concentration, one addressing the ownership concentration — that would bring this under control going forward.

## Check yourself

Can you state the approximate threshold Salesforce's own guidance uses for when parent-child data skew becomes a concern? Can you explain, in your own words, why lookup skew is harder to detect than account or ownership skew?
