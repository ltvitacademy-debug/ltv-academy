# Lesson 13 — Deletion Strategies and Soft Deletes

**Chapter 3 · Managing Volume · Lesson 13 of 16**

## What you'll learn

- How Salesforce's default (soft) delete actually behaves, and why it still costs performance
- When and how hard delete changes that behavior, and why it's off by default
- Truncation as a narrower, custom-object-only option
- How to choose the right deletion strategy for a specific volume-management scenario

## Soft delete is the default, and it isn't free

By default, deleting a record in Salesforce doesn't immediately erase it. The platform flags the record as deleted and moves it into the **Recycle Bin**, where it remains visible and restorable — this is **soft delete**. Soft-deleted records get a real grace period: Salesforce's documented retention is 15 days in the Recycle Bin, after which they're scheduled for permanent (hard) deletion, though Salesforce doesn't guarantee the exact moment that permanent removal happens.

The detail that matters most for this course: soft-deleted records still cost something, even while sitting in the Recycle Bin. The underlying data still physically exists, so it still affects database performance, and every query against the object has to account for excluding deleted records from its results. The one genuine relief is that Recycle Bin contents don't count against the org's storage limits — but "not counted toward storage" and "free to query around" are two different things, and only the first one is true of soft-deleted data.

This connects directly back to Lesson 5: skinny tables specifically exclude Recycle Bin records, which is one of the reasons they can outperform a straight query against the base object — the base object still has to account for soft-deleted rows that a skinny table doesn't carry at all.

## Hard delete: bypassing the Recycle Bin entirely

**Hard delete** removes a record immediately and permanently, bypassing the Recycle Bin stage altogether. This is the option that actually relieves the ongoing cost of a soft-deleted record sitting around, because there's no retained row for queries to work around during a waiting period.

Two things to know about hard delete: it's available through Bulk API and Bulk API 2.0, and it's **disabled by default** — an administrator has to explicitly enable the hard delete option before it can be used. Salesforce's own guidance frames hard delete specifically as the right tool for large-scale deletion: once a deletion operation is removing on the order of a million or more records, hard delete through Bulk API 2.0 is the recommended approach, precisely because leaving that volume of records to cycle through a 15-day soft-delete window would mean carrying a large, actively-costly backlog the whole time.

## Truncation: a narrower tool for custom objects

**Truncation** removes all records from a custom object immediately, and it's a meaningfully different tool from hard delete: it isn't a bulk-delete operation against a filtered set of records, it clears an entire custom object at once, and it's primarily relevant in sandbox contexts where a team wants to quickly clear out test data from a custom object. Truncation requires help from Salesforce Customer Support to execute, and it has its own constraint: it can't be performed if the org has already reached its limit on the number of allowed custom objects, since truncation and object-count accounting interact at the org level.

## Choosing the right strategy

Put together with Lesson 11's archiving sequence, the decision an architect is actually making is layered: first, is this data being archived (preserved elsewhere) or genuinely discarded forever — if archived, extraction and backup come first regardless of which deletion method follows. Second, for genuine deletion, is the volume large enough (Salesforce's own guidance points to roughly a million or more records) to justify hard delete's permanence in exchange for avoiding a costly Recycle Bin backlog, versus a smaller, routine deletion where the default soft-delete behavior and its safety net are worth keeping. Truncation stays a narrow, sandbox-oriented tool reserved for clearing an entire custom object's test data rather than a general production deletion strategy.

## Key terms

| Term | Meaning |
|---|---|
| Soft delete | Salesforce's default delete behavior — the record is flagged deleted and moved to the Recycle Bin, restorable for 15 days, not counted toward storage but still affecting query/scan performance |
| Hard delete | Immediate, permanent deletion that bypasses the Recycle Bin, available via Bulk API/Bulk API 2.0, disabled by default |
| Recycle Bin | The holding area for soft-deleted records, with a documented 15-day retention window before permanent removal |
| Truncation | Immediately clearing all records from a custom object, via a Salesforce Support request, mainly used for sandbox test data |

## Lab

An org needs to permanently remove 2.3 million obsolete Lead records that have already been confirmed (per Lesson 11's process) as not needed for any future retrieval. Using this lesson's concepts, explain why the default soft-delete behavior would be a poor fit for this specific volume, what has to be true of the org's configuration before hard delete can even be used, and why truncation would not be an appropriate alternative here even though it's also a bulk-removal tool.

## Check yourself

Can you explain, in your own words, why a soft-deleted record still affects performance even though it doesn't count against storage? Can you state the retention window for the Recycle Bin, and explain why Salesforce recommends hard delete specifically once a deletion operation reaches roughly a million or more records?
