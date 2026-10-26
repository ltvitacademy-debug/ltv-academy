# Lesson 2 — Planning the Data Pipeline

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 2 of 16**

## What you'll learn

- The three-stage pipeline this project builds: T-SQL extract, Python clean/join, Power BI
- Why the extraction work happens in T-SQL instead of pulling raw tables into Python directly
- Why the cleaning and joining work happens in Python instead of only in Power Query
- Why Power BI is still the right last stage, even with two different stakeholder pages

## Plan before you build

The messy-combination problem from Lesson 1 could be patched a dozen ad-hoc ways — a VLOOKUP in
Excel, a manual find-and-replace, a one-off Power Query merge. This project deliberately doesn't
do any of that. It builds a real, three-stage pipeline instead, because that's the shape of
pipeline a Data Analyst is actually expected to reason about and defend in an interview.

## Stage 1 — T-SQL extract

The two extracts come straight out of AdventureWorks2012 using T-SQL: one query joining
`Sales.Customer` to order data for the customer-segment view, one query joining
`Sales.SalesTerritory` to order data for the territory view. The database is where the filtering,
joining, and aggregation of the *source* tables belongs — it's faster there, and it keeps the
extract focused on exactly the rows and columns each stakeholder's question needs, instead of
pulling entire raw tables somewhere else first.

## Stage 2 — Python, for cleaning and joining the two extracts

T-SQL produces two separate result sets. Getting them into one clean, combined shape — fixing
duplicate rows, fixing inconsistent values, and joining the two extracts together on a shared key
— is exactly the kind of repeatable, inspectable data-cleaning work pandas is built for:
`.dropna()`, `.fillna()`, `.drop_duplicates()`, and `pd.merge()` turn "two messy CSVs" into one
reliable DataFrame, with every step visible and re-runnable. This project deliberately builds that
skill in Python rather than leaving it to manual Power Query clicks, because cross-extract
reconciliation like this is easier to write, read, and re-run as code.

## Stage 3 — Power BI, for the model and the two stakeholder pages

Once there's one clean, combined dataset, Power BI takes over: a star-schema model, DAX measures,
and two report pages — one answering the Marketing Manager's question, one answering the Sales
Director's — both built on the same single source of truth instead of two disconnected reports.

## The plan, end to end

```text
T-SQL (two extracts) -> Python (clean + join) -> Power BI (model + two pages)
```

Each stage does the job it's actually good at. Lesson 3 starts at the beginning: writing the two
T-SQL extracts.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline | An ordered sequence of stages that moves and transforms data from source to report |
| Extraction | Pulling a focused result set out of a source database |
| Reconciliation | Resolving mismatches between two independently-produced datasets |

## Lab

Sketch the pipeline above on paper or in a notes file, labeling what goes in and comes out of each
stage: T-SQL takes AdventureWorks2012 tables and produces two CSV-shaped extracts; Python takes
those two extracts and produces one combined DataFrame; Power BI takes that DataFrame and produces
a model plus two pages.

## Check yourself

You're ready for Lesson 3 when you can answer, without looking: what does each of the three
pipeline stages actually take in and produce, and why does the cross-extract cleanup work happen
in Python rather than directly in Power Query?
