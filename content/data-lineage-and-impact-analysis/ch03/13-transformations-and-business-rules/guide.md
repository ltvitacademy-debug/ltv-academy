# Lesson 13 — Transformations and Business Rules

**Chapter 3 · Dependencies and Impact · Lesson 13 of 25**

## What you'll learn

- Why a lineage arrow isn't just "connects to" — it usually carries a transformation
- The difference between documenting that a connection exists and documenting what it does
- How business rules get buried inside transformation logic, often invisibly
- A worked example showing why the logic matters as much as the structure

## An arrow is not "nothing happens here"

Lesson 12's chain — `SourceTable -> StagingView -> FactTable -> Report` — drew each hop as a plain arrow. In a real system, almost none of those arrows are a straight copy. Something happens at every hop: a filter drops rows, a join combines tables, a calculation derives a new column, a currency gets converted, a status code gets mapped to a human-readable label. The arrow represents a **transformation**, and the transformation is where the real complexity of lineage lives.

This matters because lineage that only shows *that* StagingView feeds FactTable, without showing *how*, tells you half the story. Knowing a dependency exists lets you find what's connected. Knowing the transformation lets you understand what actually happens to the data in between — which is what you need for both impact analysis (Lesson 14) and root cause analysis (Lesson 16).

## Business rules live inside transformations

A **business rule** is a piece of logic that encodes an organizational decision, not just a mechanical data operation. Transformations often carry both at once, tangled together. Consider a calculated field:

```
Revenue = Price * Quantity - Discount
```

The multiplication is mechanical. But which `Discount` field — the one entered at order time, or the one recalculated after returns? Does `Revenue` include tax or not? Is a cancelled order's revenue zero, or excluded from the calculation entirely? Those are business rules, not arithmetic, and they're usually decided once, written into a transformation, and then forgotten — until someone downstream gets a number that doesn't match their expectation and has no way to see why.

## Why "what changed" isn't enough

A rename is an easy change to document: `CustomerID` became `Customer_Key`. But a transformation change is harder to see and far more dangerous, because the column name, data type, and location can all stay exactly the same while the business rule behind it quietly changes — for example, if someone edits the Discount logic above without renaming anything. Lineage documentation that only tracks structure (Lesson 17) and ignores the rules embedded in transformations will miss exactly the kind of change most likely to break a downstream report silently.

## Connecting back to the glossary

Metadata Management & Business Glossary covered defining terms like "Revenue" in a shared glossary. A transformation is where that glossary definition either does or doesn't get honored in actual code. Part of documenting lineage well is checking that a transformation's logic actually matches its glossary definition — a mismatch there is a common, quiet source of numbers that don't reconcile between reports.

## Key terms

| Term | Meaning |
|---|---|
| Transformation | The logic applied at a lineage hop — filtering, joining, calculating, mapping, converting |
| Business rule | Organizational logic encoded inside a transformation (which fields to use, how exceptions are handled) |
| Derived field | A field whose value is calculated from other fields, rather than copied directly from a source |

## Lab

Find one calculated field in a report or model you have access to (a total, a margin, a status flag — anything derived rather than copied). Write down, in plain English, every business rule you can identify inside its formula or logic. If you can't tell what a piece of the logic is actually doing, that's worth flagging — it's exactly the kind of gap Chapter 4 exists to close.

## Check yourself

Can you explain the difference between documenting that StagingView feeds FactTable, and documenting what the transformation between them actually does? Can you give an example of a business rule that could change without any column being renamed?
