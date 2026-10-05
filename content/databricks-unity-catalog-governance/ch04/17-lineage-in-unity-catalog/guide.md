# Lesson 17 — Lineage in Unity Catalog

**Chapter 4 · Discovery, Lineage and Auditing · Lesson 17 of 25**

## What you'll learn

- What Unity Catalog lineage captures automatically, and what triggers it
- How to open the lineage graph in Catalog Explorer, and read the details panel
- The difference between table-level and column-level lineage
- Real compliance and impact-analysis use cases lineage is built for
- Querying the same graph as plain SQL through system tables

## Lineage, captured automatically

**Data lineage** shows where a table's data came from and everywhere it goes: which queries and files populate it, which jobs and notebooks transform it, and which dashboards consume the results. Unity Catalog captures this automatically, down to the column level, for any query that runs through the Spark DataFrame or Databricks SQL interfaces — no manual diagramming, no tagging required. It covers tables, views, ML model versions, and (via external lineage) assets outside Databricks entirely, like a Salesforce source or a Power BI dashboard consuming the data downstream.

## Opening the graph

In Catalog Explorer, search or browse to a table and open its **Lineage** tab, then click **See Lineage Graph** for the interactive view. By default it shows one level of connections; clicking the plus icon on any node expands further.

![Unity Catalog's lineage graph, showing the 'users' table connected by curved lines to a 'Consumers' node, two materialized views ('sample_users_' and 'business_users'), each listing their own columns.](/courses/databricks-unity-catalog-governance/ch04/17-lineage-in-unity-catalog/uc-lineage-overview.png)
*The real lineage graph in Catalog Explorer — every upstream and downstream object for the selected table, built with zero manual setup.*

## The details panel

Clicking the icon on a connecting edge opens a **Lineage details** panel describing that specific connection — its source, its target, and which notebooks, jobs, or queries produced it.

![Lineage graph showing 'compact_car_sales' connected to 'car_sales_features', with a Lineage details panel on the right listing Source 'compact_car_sales', Target 'car_sales_features', and a downstream consumer 'sales_analytics'.](/courses/databricks-unity-catalog-governance/ch04/17-lineage-in-unity-catalog/uc-lineage-details.png)
*Click an edge, not a node — the details panel names exactly what produced this specific link, and what consumes it downstream.*

## Column-level lineage

Table-level lineage answers "what's connected to what." For a wide table, the more useful question is narrower: which *specific* upstream column fed a specific downstream one. Clicking a column in the graph highlights only the columns that genuinely contributed to it.

![Column-level lineage view: the 'revenue' column highlighted in the 'honda_sales_worldwide' materialized view, with highlighted lines tracing to matching 'revenue' columns in two upstream tables, 'audi_sales_worldwide' and 'bmw_sales_worldwide', converging into 'compact_car_sales'.](/courses/databricks-unity-catalog-governance/ch04/17-lineage-in-unity-catalog/uc-column-lineage.png)
*Clicking `revenue` lights up only its actual upstream columns — not every column in every upstream table, just the real lineage path.*

## What lineage is actually for

Databricks frames four concrete use cases: **impact analysis** (before changing or deleting a column, see every downstream table, job, and dashboard that depends on it), **root-cause investigation** (a report looks wrong — trace upstream to find where the data diverged), **sensitive data tracking** (for a compliance audit, see exactly where regulated data originates and everywhere it's transformed), and **cross-team dependency discovery** (who owns the upstream sources you rely on, and who consumes what you own).

Permissions follow the same model as everything else in this course: a user needs at least `BROWSE` on a table's parent catalog to view its lineage at all, and tables they can't access appear in the graph only as masked, unexpandable nodes.

## Querying lineage as SQL

Everything the graph shows is also available as plain SQL, through `system.access.table_lineage` and `system.access.column_lineage` — a repeatable, scheduled query instead of a manual click-through:

```sql
SELECT source_table_full_name, source_column_name,
       target_table_full_name, target_column_name
FROM system.access.column_lineage
WHERE source_column_name = 'ssn'
  AND source_table_full_name = 'hr_catalog.silver.employees';
```

That's a real answer to a real question — "every downstream table that contains a column derived from `ssn`" — run on a schedule as a pre-migration blast-radius check or a GDPR data-subject request, instead of a one-time UI click-through. Lineage data captured after September 1, 2024 is retained indefinitely in Catalog Explorer; the system tables themselves retain a rolling one-year window.

## Key terms

| Term | Meaning |
|---|---|
| Lineage graph | The interactive, automatically-built diagram of a table's upstream and downstream dependencies |
| Column-level lineage | Highlights only the exact upstream columns that fed a specific selected column |
| `system.access.table_lineage` / `column_lineage` | System tables exposing the same lineage graph as queryable SQL |

## Lab

Pick a table you have access to in any Databricks workspace (or describe one hypothetically). Write the `system.access.column_lineage` query you'd run to answer: "if I change this column's format, which downstream tables break?"

## Check yourself

Without looking back: what's the practical difference between clicking a node and clicking an edge in the lineage graph, and why does querying `system.access.column_lineage` matter for compliance in a way that a one-time UI click-through doesn't?
