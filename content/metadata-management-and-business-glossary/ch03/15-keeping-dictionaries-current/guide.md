# Lesson 15 — Keeping Dictionaries Current

**Chapter 3 · Data Dictionaries · Lesson 15 of 25**

## What you'll learn

- Why a dictionary's structural facts and its written descriptions go stale in completely different ways
- Two concrete techniques for catching each kind of staleness
- A worked example showing exactly how a schema change silently breaks a dictionary entry
- How this closes out Chapter 3 and sets up critical data elements next

## Two completely different kinds of staleness

This is the "maintain" stage of the metadata lifecycle (Lesson 4), applied specifically to dictionaries — and it splits into two distinct problems, because the two halves of a dictionary entry (Lesson 11) go stale in different ways:

- **Structural drift** — a column gets renamed, resized, or dropped, and the dictionary entry still describes the old shape. This is detectable automatically, because the real schema and the documented schema can be directly compared.
- **Descriptive drift** — the column itself hasn't changed structurally, but what it actually *means* in practice has shifted (the business redefined "active" from 90 days to 60 days, say), and the written description nobody updated is now quietly wrong. This is much harder to catch automatically, because nothing in the schema itself signals that the meaning changed.

## Catching structural drift: compare the schema to the documentation

Because `INFORMATION_SCHEMA` is always current by definition (Lesson 12), structural drift is detectable with a straightforward comparison: run the schema query again periodically, and diff it against what the dictionary currently documents. A column that exists in the live schema but not in the dictionary, or vice versa, is an immediate, unambiguous signal — no judgment call required.

```sql
-- Columns that exist in the schema but have no extended property description
SELECT c.TABLE_NAME, c.COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS c
LEFT JOIN sys.extended_properties ep
    ON ep.major_id = OBJECT_ID(c.TABLE_SCHEMA + '.' + c.TABLE_NAME)
    AND ep.minor_id = COLUMNPROPERTY(OBJECT_ID(c.TABLE_SCHEMA + '.' + c.TABLE_NAME), c.COLUMN_NAME, 'ColumnId')
    AND ep.name = 'MS_Description'
WHERE ep.value IS NULL;
```

This query directly surfaces undocumented columns — exactly the kind of structural gap that's easy to automate and easy to miss without automation.

## Catching descriptive drift: scheduled review, not automation

Descriptive drift can't be caught by a query, because the schema hasn't changed — only the business meaning has. The only real defense is the same "last reviewed" field from the six core metadata fields (Lesson 3): every dictionary entry gets a periodic re-confirmation, where the accountable owner actively checks "does this description still match what the business means by this column today?" rather than passively assuming it still does.

## A worked example: a silent drift

A `ShippingStatus` column was documented as having three values: `Pending`, `Shipped`, `Delivered`. Six months later, a new `Returned` value was added by a developer who updated the application code but never told anyone documenting the dictionary. The schema itself didn't change — it's still a `VARCHAR` column — so no structural-drift query catches this. Only a scheduled review, where someone actually checks the current distinct values against the documented ones, would have caught it.

## Key terms

| Term | Meaning |
|---|---|
| Structural drift | The schema changed, but the documentation still describes the old shape — automatically detectable |
| Descriptive drift | The meaning changed, but the schema and documentation text look unchanged — requires scheduled human review |

## Lab

For the table you've been documenting across this chapter's labs, write one plausible example of structural drift (a column being renamed or added) and one plausible example of descriptive drift (the business meaning shifting without the column itself changing) that could affect it.

## Check yourself

Can you explain the difference between structural drift and descriptive drift, which one can be caught automatically, and why the other genuinely can't be?
