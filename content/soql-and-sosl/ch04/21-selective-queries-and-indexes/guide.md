# Lesson 21 — Selective Queries and Indexes

**Chapter 4 · Advanced Queries and Optimization · Lesson 21 of 23**

## What you'll learn

- What "selective" actually means for a query, precisely
- The documented selectivity thresholds for standard versus custom indexes
- Why the same filter can be selective on one object and unselective on another
- What fields are indexed automatically, and how to get more indexed

## Selectivity, defined precisely

A query is **selective** when its filter narrows the result set down to a small enough fraction of the object's total rows that Salesforce's query optimizer decides it's worth using an index to satisfy it, rather than scanning the table. "Small enough" isn't a vague feeling — Salesforce documents exact thresholds:

- **Standard index:** selective if the filter matches fewer than 30% of the first 1,000,000 records, and fewer than 15% of records beyond that first million (with a total cap of 1,000,000 targeted records).
- **Custom index:** a tighter bar — selective if the filter matches fewer than 10% of the first 1,000,000 records, and fewer than 5% beyond that (capped at 333,333 targeted records).

These percentages are relative to the object's actual size, which is exactly why selectivity is a moving target over an object's lifetime: a filter that was comfortably selective when a table had 10,000 rows can become unselective once that same table grows to 5 million, with no change to the query itself.

## A worked example

For an object holding 2.5 million records, a standard-indexed filter stays selective below roughly 525,000 matching records (30% of the first million, plus 15% of the remaining 1.5 million) — while a custom-indexed filter on the same object has a tighter threshold of roughly 175,000 matching records (10% of the first million, plus 5% of the rest). The custom index's bar is stricter because custom indexes are a less specialized tool than the indexes Salesforce builds in on certain standard fields.

## What's indexed by default

Several fields are automatically indexed on every object: `Id`, `Name`, `OwnerId`, `CreatedDate`, `LastModifiedDate`, and fields marked as **External ID** or **Unique**, among others. Foreign key (lookup/master-detail) fields are also indexed. Anything else — most custom text or picklist fields, for instance — is not indexed unless you take a deliberate step to make it so.

## Getting more fields indexed

Two documented paths exist for adding an index beyond what's automatic:

- **Mark a custom field as External ID or Unique** at creation time — this automatically gets it indexed, no support request needed.
- **Ask Salesforce Customer Support to create a custom index** on a specific field that doesn't otherwise qualify. This isn't self-service; it requires a support request, and Support will evaluate whether it's appropriate for your use case.

## Operators that stay unselective even on an indexed field

A field being indexed doesn't make every operator against it selective. Negative filters — `!=`, `NOT LIKE`, and a leading-wildcard `LIKE '%term'` — generally can't use an index regardless, because "everything except this value" or "anything containing this substring anywhere" doesn't narrow the search the way an index needs to be useful. Preferring `IN` or `=` over a negative filter, where the business logic allows it, is the practical takeaway from Lesson 4 landing here with its full architectural weight.

## Key terms

| Term | Meaning |
|---|---|
| Selectivity | Whether a filter narrows results down enough, relative to object size, for the optimizer to use an index |
| Standard index threshold | <30% of the first 1M records, <15% beyond that |
| Custom index threshold | <10% of the first 1M records, <5% beyond that — a tighter bar than standard |
| Automatically indexed fields | Id, Name, OwnerId, CreatedDate, LastModifiedDate, External ID/Unique fields, and foreign keys |

## Lab

Pick an object in a Developer Edition org with a reasonable number of test records. Estimate what percentage of the total row count a specific filter you'd realistically use would match. Using this lesson's thresholds, judge whether that filter would likely be treated as selective on a standard-indexed field versus a custom-indexed field, and explain your reasoning in writing.

## Check yourself

Why can the exact same SOQL query be selective today and unselective a year from now, with no change to the query itself? Why is the custom-index selectivity threshold stricter than the standard-index threshold?
