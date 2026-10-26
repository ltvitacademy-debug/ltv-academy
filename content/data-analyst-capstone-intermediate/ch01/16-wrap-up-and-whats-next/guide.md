# Lesson 16 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 16 of 16**

## What you'll learn

- A full recap of the pipeline built across this project, stage by stage
- The real skills proven along the way, not just the tools used
- Why this project's shape — two stakeholders, one shared pipeline — is a common real one
- What the Advanced project builds on top of this foundation

## The pipeline, start to finish

```text
T-SQL (two extracts)  ->  Python (clean + join)  ->  Power BI (model + two pages)
```

- **T-SQL**: two real extracts against AdventureWorks2012 — a customer-segment extract built with
  a `CASE` expression on `StoreID`, and a territory extract joined through `Sales.SalesTerritory`
  — both scoped to shipped orders with `Status = 5`.
- **Python**: `.drop_duplicates()` to remove the re-exported duplicate rows, `.fillna()` and
  `.dropna()` to handle missing and inconsistent values, and `pd.merge(..., how="left")` to
  combine the two extracts into one reliable DataFrame.
- **Power BI**: a star schema (`Fact`, `DimCustomer`, `DimTerritory`), `CALCULATE` + `ALL`
  benchmark measures, two stakeholder pages, and a Personal Gateway so the Python-script source
  actually refreshes in the Service.

## The real skills this project proved

- Reasoning about which stage of a pipeline a given piece of work belongs in — and why.
- Writing real, reusable pandas cleaning code instead of patching data by hand.
- Understanding a genuinely important Power BI refresh limitation most beginner material skips.
- Diagnosing a field-binding bug with reproduce → isolate-the-variable → confirm, the same
  real debugging method used across Thornbury's BI work, not guesswork.

## Why this project's shape is a common, real one

Two stakeholders asking for related-but-different views of the same underlying data, built from
data that didn't arrive clean, is an everyday shape of Data Analyst and BI work — not an
artificial exercise. The pipeline built here — SQL extraction, Python reconciliation, Power BI
delivery — scales to far more than two pages or two stakeholders.

## What's next: the Advanced project

The Advanced project in this capstone track picks up from here with a larger, more demanding
version of this same real shape: more stakeholders, a bigger pipeline, and new failure modes
beyond a single mis-bound card. Everything proven in this project — the discipline of profiling
before cleaning, cleaning in code instead of by hand, and diagnosing before fixing — carries
forward directly.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline | The full sequence this project built: T-SQL extract, Python clean/join, Power BI report |
| Field binding | What actually drives a visual's number, independent of its title text |

## Lab

Write a short, plain-English summary — three to five sentences — of this entire project, as if
explaining it to a new teammate who's never seen it: what the two stakeholders needed, what went
wrong with the raw data, and how the pipeline solved it.

## Check yourself

Before moving to the Advanced project, you should be able to answer, without looking: name all
three pipeline stages and one specific real problem each one solved in this project.
