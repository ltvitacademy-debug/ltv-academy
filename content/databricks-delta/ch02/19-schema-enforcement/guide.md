# Lesson 19 — Schema Enforcement

**Chapter 2 · Delta Lake · Lesson 19 of 57**

## What you'll learn

- Delta rejects a mismatched write, by default — unlike Foundations' `nullable` flag
- The exact kinds of mismatches Delta actually catches
- Reading the real error message it raises
- Why this is "consistency" (Lesson 18) made concrete

## A real difference from Foundations Lesson 43

Recall Foundations' schema lesson: setting `nullable=False` on a
`StructField` was, deliberately, just a **hint** — Spark generally
still loaded an unexpected null rather than rejecting it. Delta
tables behave differently. By default, writing data whose schema
doesn't match the target table's schema **fails the write outright**
— this is a real, enforced guardrail, not a hint.

## What actually gets caught

```python
# Existing Delta table columns: VendorID (string), fare_amount (double)

new_data = spark.createDataFrame(
    [("2", 14.5, "extra_value")],
    ["VendorID", "fare_amount", "unexpected_column"],
)

new_data.write.format("delta").mode("append").save("/data/nyc_taxi/delta/trips")
# AnalysisException: A schema mismatch detected when writing to the Delta table.
```

An extra column, a missing column, or an incompatible type change
(string where the table expects a double) all get rejected by
default. This is exactly the trap Foundations Lesson 43 described
for `nullable=False` — except here, Delta actually does what that
flag only pretended to.

## Reading the real error

The error message Delta raises is specific: it names the columns
that don't match, and shows both the table's expected schema and
the incoming data's actual schema side by side. This is meant to be
acted on immediately — fix the incoming data, or (Lesson 20)
deliberately evolve the table's schema to accept the new shape.

## Why this matters — consistency, made concrete

This is Lesson 18's "Consistency" guarantee in its most visible,
everyday form: nobody — accidentally or otherwise — can silently
corrupt a table's shape with a single bad write. Compare this to
Foundations' CSV-reading lessons, where a malformed row could
become a silent null (Lesson 48) with no warning at all. Schema
enforcement is Delta's answer to exactly that risk.

## Key terms

| Term | Meaning |
|---|---|
| Schema enforcement | Delta's default behavior: reject a write whose schema doesn't match |
| `AnalysisException` | The real error raised on a schema mismatch, naming the exact conflict |
| Consistency | Lesson 18's ACID guarantee, made visible here as an enforced rejection |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: how
does Delta's schema enforcement differ from what Foundations'
`nullable=False` actually did?
