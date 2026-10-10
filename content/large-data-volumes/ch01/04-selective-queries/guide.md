# Lesson 4 — Selective Queries

**Chapter 1 · Working at Scale · Lesson 4 of 16**

## What you'll learn

- The exact selectivity thresholds that decide whether a standard index gets used
- Why custom indexes are held to a stricter threshold than standard indexes
- The specific operators and patterns that make an otherwise-indexed filter unselective
- How to reason about selectivity math for a query against your own object

## Selectivity, defined

A filter condition is **selective** when the Force.com query optimizer estimates it will match a small enough fraction of an object's total records that using an index is actually worth it. "Small enough" isn't a judgment call left to the optimizer in the abstract — Salesforce publishes specific thresholds, expressed as a percentage of targeted records, and those thresholds are commonly treated as approximate and subject to change across releases, so always sanity-check current numbers against Salesforce's own documentation or a Query Plan check before relying on them precisely.

## The published thresholds

For a **standard index** (one of the automatically-indexed fields from Lesson 3), a filter is generally treated as selective if it targets no more than about 30% of the first 1 million records, and no more than about 15% of records beyond that first million — with the threshold capped so that it never requires targeting more than roughly 1 million records in absolute terms.

For a **custom index** (one requested from Support), the bar is stricter: a filter is generally treated as selective if it targets no more than about 10% of the first 1 million records and no more than about 5% beyond that, capped at roughly 333,000 targeted records in absolute terms.

The practical effect: a custom index needs a noticeably narrower filter to actually get used than a standard index does. A field holding a handful of common values (like a picklist with five options, each roughly 20% of records) might comfortably clear the standard-index bar on an indexed lookup field but fail the custom-index bar on a differently-indexed field — which is exactly the kind of thing to check with the Query Plan tool rather than assume.

## What makes an otherwise-indexed filter unselective

Even on a field that is indexed, specific operators and patterns are treated as unselective regardless of how narrow the underlying data actually is, because the optimizer can't use an index to evaluate them efficiently:

- **Negative operators** — `!=`, `NOT LIKE`, `EXCLUDES`, and similar "not equal to" style conditions. These require checking what a value *isn't*, which an index can't shortcut the way it can for "equals" or "is in this range."
- **Null checks** — filtering for `= null` or `!= null` on a field.
- **Leading wildcards in LIKE** — a condition like `LIKE '%foo%'` or `LIKE '%foo'` can't use an index, because the index is ordered by the start of the value, and a leading wildcard means the match could start anywhere.
- **Non-deterministic or cross-object formula fields** — formula fields that reference another object, or that can return different values depending on context, aren't indexable the way a stored field is.

A query can have an indexed field and still end up effectively unscoped if its *only* filter condition uses one of these patterns — which is why "selective query" means more than "query against an indexed field." It means a filter the optimizer can actually use to narrow the row set.

## Designing for selectivity

The practical implication for an architect is to build the most selective filter into any query, report, or list view that will run against an LDV-scale object, and to prefer positive, equality- or range-style conditions against indexed fields over negative or wildcard-based ones wherever the business requirement allows it. Where a business requirement genuinely needs a negative or wildcard condition, consider adding an additional, genuinely selective condition alongside it (even if redundant from a pure logic standpoint) so the optimizer has something useful to narrow on before applying the unselective part.

## Key terms

| Term | Meaning |
|---|---|
| Selectivity | How small a fraction of an object's rows a filter condition is estimated to match |
| Standard index threshold | ~30% of the first 1M targeted records, ~15% beyond that, capped near 1M targeted records |
| Custom index threshold | ~10% of the first 1M targeted records, ~5% beyond that, capped near 333,000 targeted records |
| Unselective pattern | A filter condition (negative operators, null checks, leading-wildcard LIKE, certain formula fields) the optimizer can't use an index to evaluate, regardless of field indexing |

## Lab

An object has 4 million records. A report filters on `Status__c != 'Closed'`, where Status__c has a custom index and 'Closed' covers 70% of all records (so the filter targets the remaining 30%, or 1.2 million records). Using what this lesson covers, explain two separate reasons this filter will not be treated as selective — one about the operator used, and one about the raw percentage targeted relative to the custom-index threshold — and propose a rewritten filter condition that would fix both problems.

## Check yourself

Can you state the approximate selectivity threshold for a standard index and for a custom index, and explain why the custom-index threshold is stricter? Can you name at least three filter patterns that make a condition unselective even on an indexed field?
