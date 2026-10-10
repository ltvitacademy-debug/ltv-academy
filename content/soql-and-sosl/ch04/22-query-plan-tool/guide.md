# Lesson 22 — Query Plan Tool

**Chapter 4 · Advanced Queries and Optimization · Lesson 22 of 23**

## What you'll learn

- How to enable and open the Query Plan tool in the Developer Console
- What "cost," "cardinality," and "leading operation type" each mean in its output
- How to read and compare multiple plans for the same query
- The REST API's `explain` parameter as the same information outside the Developer Console

## Enabling the tool

The Query Plan tool lives inside the Developer Console's Query Editor, but it isn't on by default. Turn it on once per Developer Console session (or permanently, depending on your settings): open the Developer Console, go to **Help → Preferences**, and enable **Enable Query Plan**. Once enabled, a **Query Plan** button appears next to **Execute** in the Query Editor.

## Reading the output

Run a query, click **Query Plan**, and you'll see a table of one or more candidate plans, each with several key figures:

- **Cost** — a number comparing the query's cost against the selectivity threshold from Lesson 21. The practical rule of thumb: a cost at or below 1 generally indicates the query is selective; a cost above 1 signals it isn't, and is likely to fall back to scanning a large portion of the table.
- **Cardinality** — the estimated number of records the plan's leading operation would return, based on index statistics.
- **Leading operation type** — what approach Salesforce's optimizer intends to use to satisfy the query. `Index` means an index will be used; `TableScan` means it intends to scan the table broadly, which the tool itself flags as "not a good thing" for a query you expect to run efficiently at scale; `Sharing` means the plan is driven by an index based on the running user's sharing rules rather than a field filter.

## Multiple plans, and which one wins

Most of the time, a query generates more than one candidate plan — the tool genuinely considers alternative approaches, not just one. The plans are presented sorted from most optimal to least optimal, and **Salesforce automatically uses whichever plan has the minimum cost** — you don't pick a plan yourself; the tool is showing you what the optimizer already decided, and why, so you can judge whether that decision is as good as you'd hoped or confirms a real problem.

## A worked example

Running a query filtered with `Status != 'New'` against a Case-like object produces a Query Plan showing a `TableScan` leading operation type with a high cost — a direct, visible illustration of exactly the "unselective negative filter" problem from Lessons 20 and 21, now showing up as a concrete number instead of an abstract rule. Rewriting the same query with a positive, indexed filter (`Status = 'Working'`, for instance, if that's what you actually need) and re-running the Query Plan tool should show a lower-cost `Index` plan instead — letting you verify the fix actually worked, rather than just assuming it did.

## The REST API alternative

The same analysis is available outside the Developer Console, through the REST API's `query` resource with an `explain` parameter — useful for checking a query's plan from a script or CI pipeline rather than by hand, or for an integration team that doesn't have Developer Console access but needs the same diagnostic. The returned data mirrors the Developer Console's tool: plan options sorted from most to least optimal, each with its own cost, cardinality, and leading operation type.

## Key terms

| Term | Meaning |
|---|---|
| Query Plan tool | A Developer Console feature (enabled via Help → Preferences) showing how the optimizer intends to execute a query |
| Cost | A figure compared against the selectivity threshold; at or below 1 generally indicates a selective query |
| Leading operation type | The optimizer's chosen approach: Index, TableScan, or Sharing |
| explain parameter | The REST API equivalent of the Query Plan tool, for use outside the Developer Console |

## Lab

In a Developer Edition org, enable the Query Plan tool, then run two versions of a query against a standard object: one using an unselective filter like `!=`, and one using a selective, indexed `=` filter instead. Compare the cost, cardinality, and leading operation type the tool reports for each, and write down which plan the optimizer would actually use for each query.

## Check yourself

What does a leading operation type of TableScan tell you about a query, and why is that worth noticing before the query ever runs against production-scale data? Why does Query Plan sometimes show more than one candidate plan for the same query, and how do you know which one actually gets used?
