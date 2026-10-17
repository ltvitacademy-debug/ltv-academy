# AWS Glue Data Quality: Defining and Enforcing Data Quality Rules

This lesson is a written case study, not a recording, researched and verified directly against the current AWS Glue DQDL (Data Quality Definition Language) reference. Chapter 3 covered crawlers, the Catalog, and ETL jobs — all of it assumes incoming data is shaped the way you expect. AWS Glue Data Quality is the piece that actually checks that assumption, with a real rule language purpose-built for it, rather than hand-rolled validation logic inside a Glue ETL script.

## What you'll learn

- DQDL's actual ruleset syntax — not a vague description, the real structure
- The rule types you'll reach for constantly: `IsComplete`, `IsUnique`, `RowCount`, `ColumnValues`, `Completeness`
- How composite rules combine with `and`/`or`, and the row-vs-column evaluation distinction that trips people up
- Where rules run: a Glue ETL job versus the Data Catalog, and what that choice costs you

## The actual ruleset structure

A DQDL document is a case-sensitive list named `Rules`, inside square brackets:

```
Rules = [
   IsComplete "order_id",
   IsUnique "order_id"
]
```

Every rule generally follows the shape `<RuleType> <Parameter> <Expression>` — the rule type is case-sensitive (`IsComplete`, not `iscomplete`), and parameters differ by rule type.

## Rule types you'll actually reach for

```
Rules = [
   # Is this column ever null?
   IsComplete "customer_id",

   # Does this column ever repeat a value that should be unique?
   IsUnique "order_id",

   # Does the table have a sane number of rows at all?
   RowCount > 0,

   # Does a numeric/date column stay inside an expected range?
   ColumnValues "order_total" > 0,

   # What fraction of this column is actually populated?
   Completeness "email_address" > 0.95
]
```

`IsComplete` and `IsUnique` already return a true/false result on their own. Other rule types — `ColumnValues`, `Mean`, `Completeness` — return a value that needs an expression to turn into a pass/fail result: `>`, `<`, `between ... and ...`, `in [...]`, or `matches` for a regex pattern. `ColumnValues "order_total" > 0` reads almost exactly like the plain-English rule it represents.

## Composite rules: and / or, and the row-vs-column trap

Multiple rules combine with `and`/`or`, with each individual rule wrapped in parentheses:

```
Rules = [
   (IsComplete "order_id") and (IsUnique "order_id"),
   (ColumnValues "order_total" > 0) or (ColumnValues "order_status" = "refunded")
]
```

Here's the detail worth being precise about, because it's genuinely easy to get backwards: **by default, a composite rule evaluates each side independently across the entire column, then combines the two overall results** — it does not check both conditions against the same row. `(ColumnValues "myCol1" > 1) OR (ColumnValues "myCol2" > 2)` checks whether *every* value in `myCol1` is `> 1` as one pass/fail result, and separately whether *every* value in `myCol2` is `> 2` as another — then ORs those two overall outcomes together. If you actually need row-by-row evaluation — "for this specific row, is either condition true" — you have to explicitly set `compositeRuleEvaluation.method` to `"ROW"` in the job's `additionalOptions`. Getting this backwards is a real, common source of a data quality check that technically runs and reports a result, while not actually checking what its author intended.

## Thresholds, for rules that don't need to be perfect

Not every rule needs 100% compliance to be useful — a `with threshold` clause lets you set how much of a column has to satisfy a condition, rather than requiring every single row:

```
Rules = [
   ColumnValues "country_code" in ["US", "CA", "MX"] with threshold > 0.98
]
```

This passes as long as at least 98% of rows match, tolerating a small amount of real-world messiness (a handful of genuinely invalid or legacy values) without failing the entire run over it.

## Where rules actually run, and what that choice costs

DQDL rules can run in two places, and the choice has real consequences:

- **Inside a Glue ETL job** (via `EvaluateDataQuality.processRows` on a `DynamicFrame`) — gets you the full feature set: dynamic rules comparing against historical metrics (`RowCount > avg(last(5))`), analyzers, labels for organizing results by team, and row-level pass/fail results you can act on inside the same job.
- **Directly in the Glue Data Catalog**, attached to a table, with no custom ETL script required — simpler to set up, but DynamicRules, Analyzers, and Labels are **not supported** in this mode; you get the core rule evaluation without the more advanced tooling built around it.

For a quick, standing check on a table ("does this table stay reasonably complete and unique over time"), the Catalog-attached option is the lower-effort choice. For a pipeline that needs to react to a specific failing row, or compare today's run against a historical trend, the rules need to run inside the Glue ETL job itself.

## Key terms

| Term | Meaning |
|---|---|
| DQDL | Data Quality Definition Language — the rule language AWS Glue Data Quality rules are written in |
| `IsComplete` / `IsUnique` | Rule types that already return a true/false result without needing an expression |
| Composite rule | Multiple rules combined with `and`/`or`, each wrapped in parentheses |
| `compositeRuleEvaluation.method` | The option that switches composite-rule evaluation from per-column (default) to per-row |
| `with threshold` | A clause allowing a rule to pass if a specified percentage of rows satisfy it, rather than requiring 100% |

## Check yourself

Given the rule `(ColumnValues "price" > 0) OR (ColumnValues "status" = "void")`, explain — without looking it up — what this rule actually checks by default, and what single configuration change would make it instead check, row by row, whether either condition holds for that specific row.
