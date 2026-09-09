# Lesson 20 — Schema Evolution

**Chapter 2 · Delta Lake · Lesson 20 of 57**

## What you'll learn

- `mergeSchema` — deliberately allowing a table's shape to grow
- What it actually permits, and what it still refuses
- `ALTER TABLE ... ADD COLUMN` — the explicit, SQL-side alternative
- Why "the schema needs to change" is a real, common event, not an edge case

## The escape hatch: mergeSchema

```python
new_data.write.format("delta").mode("append") \
    .option("mergeSchema", "true") \
    .save("/data/nyc_taxi/delta/trips")
```

Last lesson's rejected write succeeds here, with one addition:
`.option("mergeSchema", "true")`. This tells Delta "I mean it —
widen the table's schema to include this new column," rather than
treating the mismatch as an error. Existing rows get the new
column filled with `null`, since they genuinely have no value for
it.

## What it permits, and what it still refuses

`mergeSchema` allows **additive** changes — a genuinely new column
showing up. It does **not** silently allow a type change that would
lose information (say, a `double` column suddenly getting string
values) — that's still a real error, on purpose. Schema evolution is
about safely growing a schema, not about disabling schema
enforcement altogether.

## The explicit SQL alternative

```sql
ALTER TABLE trips ADD COLUMN payment_type STRING;
```

Rather than waiting for a write to trigger evolution implicitly,
`ALTER TABLE` changes the schema directly and immediately — a
deliberate, planned change to a table's shape, done as its own
step, independent of any particular write. Real production
pipelines often prefer this: an explicit migration, reviewed and
run on its own, rather than a schema change that happens as a
side effect of some unrelated job's `mergeSchema` flag.

## Why this is common, not an edge case

Real pipelines evolve. A source system adds a field; a business
question needs a column that didn't exist last quarter. Foundations'
Chapter 1 covered zones (raw/cleansed/curated) partly because data
shape genuinely changes over a pipeline's lifetime — schema
evolution is Delta's mechanism for handling that reality without
either breaking existing pipelines or silently corrupting the table.

## Key terms

| Term | Meaning |
|---|---|
| `mergeSchema` | A write option that deliberately widens a table's schema, additively |
| `ALTER TABLE ... ADD COLUMN` | An explicit, immediate schema change, independent of any write |
| Additive change | A new column — always allowed; a lossy type change is still rejected |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: does
`mergeSchema` allow changing an existing column's type from double
to string?
