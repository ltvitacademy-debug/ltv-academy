# Lesson 53 — Relationships vs. Joins vs. Blending — Which Should You Use?

**Chapter 8 · Data Modeling · Lesson 53 of 95**

## What you'll learn

- A single side-by-side comparison of the three techniques from
  Lessons 48-52
- A decision process for picking the right one, in order
- Why "relationships first" is the right default, and when each
  alternative earns its place
- How this maps onto the SQL join knowledge you brought into this
  chapter

## Recap: three ways to combine data in Tableau

![Tableau's two-layer data model — the logical layer (relationships between logical tables) sitting above the physical layer (joins/unions inside each logical table).](/courses/tableau/ch08/53-relationships-vs-joins-vs-blending/data-model-layers.png)
*Relationships and joins both live inside one data source. Blending, covered last lesson, is the third option — and it lives outside this diagram entirely, combining two separate data sources only in the view.*
Source: [Tableau Help — How Relationships Differ from Joins](https://help.tableau.com/current/pro/desktop/en-us/datasource_relationships_learnmorepage.htm)

You've now built all three:

| | Relationship (L48) | Join (L49) | Blend (L52) |
|---|---|---|---|
| **Where it lives** | Logical layer, between logical tables | Physical layer, inside one logical table | Outside the data source — combined only in the worksheet |
| **When rows combine** | Deferred — per worksheet, at that worksheet's level of detail | Immediately, at the row level (like SQL) | Never at the row level — each source aggregates independently first |
| **Join-type picker?** | No | Yes: inner/left/right/full outer | N/A — no join type, just a linking field |
| **Fan-out risk (L50)?** | No — auto-aggregates per worksheet | Yes, if grains mismatch | No — but you also can't do row-level analysis |
| **Works across incompatible connectors / published data sources?** | No | No | Yes — this is blending's whole reason to exist |
| **Can the linking field vary sheet by sheet?** | No — fixed at the data source level | No — fixed at the data source level | Yes |

## The decision process, in order

1. **Start with a relationship.** It's the default for a reason: no
   fan-out risk, automatic per-worksheet aggregation, and it covers
   the vast majority of real analysis. If your two tables can be
   related, relate them.
2. **Drop to a join only when you need something a relationship can't
   express** — a non-equality condition, an intentional
   row-duplication setup (some row-level-security patterns), or you
   specifically need one flat physical table for performance.
3. **Reach for blending only when relating or joining isn't possible
   at all** — one source is a published Tableau data source, the
   connectors can't support a cross-database join, or you need the
   linking field to vary sheet by sheet within the same workbook.

## Translating this back to SQL

If you're thinking in T-SQL terms: a Tableau join is your `JOIN`
keyword, unchanged in behavior. A Tableau relationship is something
SQL doesn't really have an equivalent for — closer to "defer the join
decision until the query is written, and let the optimizer pick based
on what columns are actually selected." Blending has no SQL
equivalent at all — it's closer to running two separate queries in
your application code and merging the results in your reporting tool,
which is exactly what it's doing under the hood.

## Key terms

| Term | Meaning |
|---|---|
| Relationship | Default choice — flexible, context-aware, no fan-out |
| Join | SQL-equivalent — immediate, row-level, fan-out risk if grains mismatch |
| Blend | Last resort — two sources aggregated independently, combined only visually |

## Lab

For each scenario below, decide relationship, join, or blend, and
write one sentence of justification:

1. Combining Orders and Returns from the same Excel workbook, related
   by Order ID.
2. Combining your company's Salesforce data (published as a Tableau
   Server data source) with a local spreadsheet of quota targets.
3. Joining a Customers table to a Transactions table where you
   specifically need every transaction row duplicated per associated
   promo code for a compliance report.

## Check yourself

You're ready for Lesson 54 when you can walk through this decision
process from memory, for any two tables someone hands you, without
looking at the table above.
