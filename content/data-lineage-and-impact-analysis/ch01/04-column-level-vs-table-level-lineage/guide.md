# Lesson 4 — Column-Level vs. Table-Level Lineage

**Chapter 1 · Lineage Concepts · Lesson 4 of 25**

## What you'll learn

- The difference between table-level lineage (which tables feed which) and column-level lineage (which specific columns feed which)
- Why table-level lineage can be misleading on its own, with a concrete example
- The real tradeoff — precision versus cost — that determines which granularity a team actually chooses
- When each level is the right tool for the job

## Two levels of granularity, inside technical lineage

Lesson 3 separated lineage by *audience* (business vs. technical). This lesson separates technical lineage further, by *granularity*.

**Table-level lineage** records which tables feed which other tables — "`stg.Orders_Clean` feeds `dw.FactSales`" — without specifying which columns are involved. It's coarse, but fast to produce and easy to read at a glance, especially for understanding overall system architecture.

**Column-level lineage** records which specific columns feed which other specific columns — "`stg.Orders_Clean.OrderTotal` feeds `dw.FactSales.NetRevenue`, after subtracting `stg.Orders_Clean.DiscountAmount`." It's far more precise, and it's the level of detail actually required to answer "if I change this one column, what specifically breaks?"

## Why table-level lineage can mislead

Imagine `stg.Orders_Clean` has 15 columns and feeds `dw.FactSales`, which also has 15 columns. Table-level lineage shows one arrow: `stg.Orders_Clean → dw.FactSales`. That arrow is technically true, but it implies every column in the source might matter to every column in the target — which is almost never the case. If you need to change the `CustomerNotes` column in `stg.Orders_Clean`, table-level lineage gives you no way to know whether `dw.FactSales` is actually affected at all, because the arrow doesn't say *which* columns the relationship covers. You'd have to go read the actual transformation code to find out — the exact manual digging lineage is supposed to eliminate.

Column-level lineage would instead show you directly: `CustomerNotes` isn't referenced in any column mapping into `dw.FactSales` at all, so the change is safe. That's the difference between a useful answer and a false sense of having one.

## The real tradeoff: precision vs. cost

If column-level lineage is strictly more useful, why doesn't everyone just use it everywhere? Because it's meaningfully more expensive to produce and maintain:

- **Capture effort** — column-level lineage usually requires parsing actual transformation logic (SQL, code, mapping configs) rather than just reading job dependency lists, which table-level tools can often infer more cheaply
- **Volume** — a system with thousands of tables and tens of thousands of columns produces an enormous number of column-to-column edges to store, index, and keep current
- **Maintenance** — every time a transformation's logic changes, column-level mappings have to be re-derived accurately, or the lineage silently goes stale and becomes actively misleading

Most organizations end up using table-level lineage broadly (for architecture overviews and quick dependency checks) and reserve column-level lineage for the specific columns that matter most — which connects directly to the critical data elements concept from the Metadata Management course: the fields important enough to justify the extra documentation cost.

## When to use which

| Situation | Right granularity |
|---|---|
| "What's the overall shape of our pipeline architecture?" | Table-level |
| "Is it safe to rename this specific column?" | Column-level |
| Documenting hundreds of low-priority internal staging tables | Table-level |
| Documenting a handful of critical data elements feeding the board report | Column-level |

## Key terms

| Term | Meaning |
|---|---|
| Table-level lineage | Lineage recorded at the granularity of whole tables — which tables feed which |
| Column-level lineage | Lineage recorded at the granularity of individual columns — which columns feed which |
| Lineage edge | One recorded link in a lineage graph, between two tables or two columns |

## Lab

Pick any two related tables or spreadsheets you have access to (even personal ones, like a budget spreadsheet feeding a summary tab). Draw the table-level lineage arrow between them in one line. Then pick one column in the source and trace, by hand, exactly which column(s) in the target it actually feeds — noticing how much more work that took, and how much more useful the answer is.

## Check yourself

Can you explain, using the `CustomerNotes` example, why a table-level lineage arrow can give a false sense of having answered an impact-analysis question when it hasn't?
