# Lesson 14 — Impact Analysis

**Chapter 3 · Dependencies and Impact · Lesson 14 of 25**

## What you'll learn

- What impact analysis is, and why it's a downstream walk of the dependency graph
- The basic process: locate the change point, traverse downstream, classify what you find
- Why Critical Data Elements make some impact analyses matter far more than others
- A worked example of a single column change rippling through a dependency graph

## What impact analysis is

**Impact analysis** answers one question: *if this changes, what breaks?* It's the practical application of Lesson 12's "walking downstream" — you start at the dataset or field someone wants to change, and you traverse every arrow leading away from it, following the dependency graph outward until you've identified everything that consumes it, directly or indirectly.

This is different from simply knowing a dependency exists. Impact analysis is specifically about **before-the-fact** discovery — finding the consequences of a change *before* you make it, rather than finding out from an angry stakeholder after a report goes wrong.

## The basic process

1. **Identify the change point** — the exact dataset, column, or transformation that's about to change.
2. **Traverse downstream** — walk every outgoing dependency from that point, then every dependency of those, recursively, until you reach the leaves (reports, dashboards, exports, downstream systems with no further consumers).
3. **Classify what you find** — not every consumer is equally affected. A report that displays the field directly is affected differently than a table that stores it but never surfaces it to a user.

Without documented lineage (Chapter 4), step 2 is done from memory or by asking around — slow, incomplete, and exactly the kind of guesswork that misses something.

## Not all impact is equal: this is where Critical Data Elements come in

Metadata Management & Business Glossary, Chapter 4, introduced **Critical Data Elements (CDEs)** — the small, deliberately selective set of data elements whose errors have outsized consequences for regulatory reporting, financial statements, or major decisions. Impact analysis is exactly the mechanism that puts that concept to work: when you traverse downstream from a proposed change, the first thing worth checking isn't "how many things does this touch" — it's "does this touch a CDE, anywhere in the downstream path."

A change that ripples through twenty minor internal tables is lower-stakes than a change that touches one CDE feeding a regulatory report, even if the twenty-table ripple looks bigger on paper. Impact analysis without a sense of which downstream nodes are CDEs treats every consumer as equally important, which — as that earlier lesson put it — is functionally the same as treating nothing as important.

## A worked example

Someone proposes renaming `dbo.Orders.OrderTotal` to `dbo.Orders.NetOrderAmount`. Walking downstream from that column:

```
Orders.OrderTotal
  -> RevenueFact (direct column reference)
      -> ExecutiveRevenueDashboard (CDE — feeds board reporting)
      -> CommissionCalcJob (recalculates sales commissions nightly)
  -> InventoryReorderView (references OrderTotal in a threshold filter)
```

Three consumers found, two of them materially affected by a silent rename (the dashboard and the commission job would both break or silently show stale data), one requiring a closer look (the reorder view's filter logic needs checking). The dashboard branch is the one to flag loudest — it's the CDE.

## Key terms

| Term | Meaning |
|---|---|
| Impact analysis | Traversing downstream from a proposed change to find every consumer it would affect |
| Change point | The specific dataset, column, or transformation about to change |
| Blast radius | An informal term for the full set of downstream consumers an impact analysis surfaces |

## Lab

Using the dependency list you built in Lesson 12's lab, pick one field and imagine renaming or removing it. Walk downstream as far as you can and list every consumer you can identify. Flag any that you believe would qualify as a Critical Data Element under the four criteria from Metadata Management, Chapter 4.

## Check yourself

Can you explain why impact analysis is a downstream traversal, not an upstream one? Can you explain why a CDE deep in the downstream path can matter more than a dozen non-critical consumers closer to the change?
