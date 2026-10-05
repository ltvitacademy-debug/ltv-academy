# Lesson 12 — Upstream and Downstream Dependencies

**Chapter 3 · Dependencies and Impact · Lesson 12 of 25**

## What you'll learn

- What "upstream" and "downstream" mean for a specific dataset or field in a lineage graph
- Why direction is the single most important property of a lineage edge
- How to read a dependency chain and identify what each hop represents at a glance
- Why upstream questions and downstream questions are different questions, asked for different reasons

## Upstream and downstream, defined

In data lineage, every arrow has a direction, and that direction is what everything else in this chapter depends on. **Upstream** of a dataset is everything that feeds it — the sources, transformations, and systems data passed through to arrive at this point. **Downstream** is everything that consumes it — the reports, models, and other tables built on top of it.

The terms are relative, not absolute. A staging table is downstream of a source system and upstream of the fact table built from it, at the same time. "Upstream" and "downstream" only make sense once you've fixed a reference point: upstream *of what*?

## Reading a dependency chain

Chapter 2 traced data moving through ETL/ELT, lakes and warehouses, semantic models, and into Power BI and executive dashboards. Chapter 3 is about the dependency *relationships* those hops create. Take a simple chain:

```
SourceTable -> StagingView -> FactTable -> Report
```

Reading left to right is reading downstream: SourceTable is upstream of everything after it; Report is downstream of everything before it. Reading right to left is reading upstream: to understand what feeds the Report, walk the arrows backward.

## Why the direction you walk depends on the question

You'll walk this exact chain in both directions in this chapter, for two different purposes:

- **Walking downstream** (Lessons 14–15): a change is proposed somewhere upstream — what breaks?
- **Walking upstream** (Lesson 16): something is already wrong downstream — where did it start?

Confusing the two directions is a common and costly mistake. Asking "what feeds this report" when you actually need "what does this report feed" gets you looking at the wrong half of the graph entirely.

## A dependency graph, not just a chain

Real systems rarely form a single straight line. A FactTable usually has multiple upstream StagingViews feeding it, and a single StagingView often feeds multiple downstream FactTables and Reports. This branching structure is why lineage is drawn as a **graph**, not a list — a dataset can have many upstream dependencies and many downstream dependents at once, and impact analysis (Lesson 14) has to account for all of them, not just the most obvious path.

## Key terms

| Term | Meaning |
|---|---|
| Upstream | Everything that feeds a given dataset or field — its sources and the transformations before it |
| Downstream | Everything that consumes a given dataset or field — the reports and tables built on it |
| Dependency graph | The full network of upstream and downstream relationships, not just one chain |

## Lab

Pick a report you traced in Chapter 2's labs. List everything you believe is directly upstream of it (one hop back) and, if you can tell, anything downstream of it (what else might consume the same underlying table). Note which of those you're confident about and which you're guessing at — that gap is exactly what Chapter 4's documentation closes.

## Check yourself

Can you explain, in your own words, why "upstream" and "downstream" are always relative to a chosen starting point, and give an example of something that is simultaneously upstream of one thing and downstream of another?
