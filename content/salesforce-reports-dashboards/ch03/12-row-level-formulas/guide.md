# Row-Level Formulas

A summary formula calculates on grouped totals. A **row-level formula** calculates on every individual record, before any grouping happens. If a summary formula is a calculation over `SUM(...)` and `COUNT(*)`, a row-level formula is a computed column in your `SELECT` list: `Amount * Probability AS WeightedAmount`.

## What you'll learn

- What a row-level formula is and how it differs from a summary formula
- How to add one in the Report Builder
- Common uses: classifying rows, computing ages, and weighting values
- The order of operations: row-level first, then grouping, then summary
- How it compares with a formula field on the object
- Limits to check before you rely on one

## Adding a row-level formula

In the Lightning Report Builder, open the dropdown next to **Columns** in the Outline panel. Alongside the options for a bucket column and a summary formula, you will find one to add a **row-level formula**. Unlike a summary formula, this option is not limited to grouped reports; it is meant to work on the individual records of the report, whatever the format. In most orgs it is available on tabular, summary, and matrix reports, but confirm for joined reports since support has differed.

The dialog asks for a column name, a **formula output type** (for example Number, Currency, Percent, or Text), decimal places where relevant, and then the formula editor with its Fields and Functions tabs. Pick fields from the editor so it inserts the exact tokens; in many orgs they look like `AMOUNT` or `CLOSE_DATE` for standard fields, and the API name for custom ones.

## Typical uses

**Classify each record** into readable labels, similar to a bucket but with free-form logic:

```
IF(AMOUNT > 100000, "Large",
   IF(AMOUNT > 25000, "Medium", "Small"))
```

**Compute an age or a gap** in days:

```
TODAY() - CREATED_DATE
```

**Weight a value** before summing it, the classic weighted pipeline:

```
AMOUNT * PROBABILITY
```

Once the column exists, you can summarize it like any other numeric column. Group by Owner, choose Sum for the weighted amount, and you have a weighted-pipeline report without asking an admin to build a field.

## Order of operations

This is the concept that matters most. The report engine works in stages:

1. Row-level formulas are evaluated for each record.
2. Records are filtered, grouped, and summarized.
3. Summary formulas run last, on the grouped totals.

That is why "weight then sum" works with a row-level formula, while a summary formula could only multiply the already-summed amount by an already-summed probability, which is a different, wrong answer. When in doubt, ask: does this calculation belong to each row before the totals, or to the totals themselves?

## Row-level vs a formula field

A **formula field** on the object lives in the org's metadata, appears everywhere (page layouts, list views, SOQL, every report), and needs admin access to create. A row-level formula lives only inside one report. Use a row-level formula for exploration and one-off analysis. If several reports keep re-creating the same expression, that is a signal to ask an administrator for a permanent formula field. This mirrors the difference between a calculated column in a single query and a computed column on the table.

## Limits to check

- A report can hold only a small number of row-level formulas; the cap has been low, so check current documentation before designing around several.
- Function support differs between row-level and summary formulas. Row-level formulas generally offer text and date functions that summary formulas do not; the Functions tab shows what is available.
- A very complex expression is hard to read and maintain. Add a description so the next analyst understands it.

## SQL mapping

```sql
SELECT Name,
       Amount * Probability / 100.0 AS Weighted,
       CASE WHEN Amount > 100000 THEN 'Large'
            ELSE 'Small' END AS Size
FROM Opportunity
```

## Recap

Row-level formulas add a computed column that is evaluated per record, before grouping. Use them to classify, to compute ages, and to weight values, then summarize the result. Summary formulas run afterward on totals. For anything you need in many reports, ask for a formula field instead. Next you will survey the functions available in both kinds of formula.

## Check yourself

You want weighted pipeline by owner, where each deal is Amount multiplied by Probability. Should the multiplication be a row-level or summary formula, and what do you do after creating it?
