# Lesson 4 — Virtual Warehouses, Scaling & Auto-Suspend/Auto-Resume

**Chapter 1 · Snowflake Architecture & Getting Started · Lesson 4 of 60**

## What you'll learn

- Warehouse sizes, from X-Small to 6X-Large, and what size actually controls
- Auto-suspend and auto-resume — why they matter for cost, not just convenience
- Multi-cluster warehouses, and the concurrency problem they solve
- How to create, resize, and configure a warehouse in Snowsight and in SQL

## What a warehouse actually is

A virtual warehouse is a named cluster of compute resources — CPU, memory,
and local temp storage — that Snowflake spins up to run your queries. It
has no data of its own; it reads from the storage layer (Lesson 2) and
gets thrown away or resized without touching a single row of underlying
data. Every trial account starts with one: `COMPUTE_WH`.

![Snowsight's Admin > Warehouses tab, listing the COMPUTE_WH warehouse: size XS, status Suspended, 0 running and 0 queued queries, owned by ACCOUNTADMIN.](/courses/snowflake/ch01/04-virtual-warehouses-scaling-auto-suspend-resume/warehouses-admin-tab.png)
*A warehouse sitting Suspended, at size XS — this is the default state and size for a new account's warehouse.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

## Sizes: X-Small through 6X-Large

Warehouse size is a T-shirt scale — each step up roughly doubles the
compute resources (and the credits it burns per hour):

```
X-Small → Small → Medium → Large → X-Large → 2X-Large → 3X-Large → 4X-Large → 5X-Large → 6X-Large
```

Bigger isn't automatically better. A larger warehouse finishes a single
query faster, but if your workload is many small, fast queries rather
than a few huge ones, a bigger warehouse just burns more credits per hour
for no real speed gain. Size for the workload, not out of habit.

## Auto-suspend and auto-resume

This is the pair of settings that makes Snowflake's "pay only for compute
you use" story real, and it's the direct payoff of storage and compute
being separate layers (Lesson 2):

- **Auto suspend** — after N minutes of no query activity, the warehouse
  suspends itself. A suspended warehouse consumes zero credits.
- **Auto resume** — the moment a query needs that warehouse again, it
  automatically resumes — typically in a second or two — with no manual
  restart required.

![The 'Edit Warehouse' dialog for COMPUTE_WH: Type Standard, Size X-Large, Auto resume checked, Auto suspend checked with 'Suspend After: 10 min(s) of inactivity', and Multi-cluster Warehouse enabled with Min Clusters 1, Max Clusters 2, Scaling Policy Standard.](/courses/snowflake/ch01/04-virtual-warehouses-scaling-auto-suspend-resume/edit-warehouse-dialog.png)
*Auto resume, auto suspend with a suspend-after timer, and multi-cluster settings — all configured in the same dialog.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

```sql
CREATE WAREHOUSE analytics_wh
  WAREHOUSE_SIZE = 'SMALL'
  AUTO_SUSPEND = 60        -- seconds of inactivity before suspending
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;
```

Compare this to a SQL Server instance you leave running (and paying for)
24/7 whether anyone is querying it or not. There is no equivalent concept
in on-prem SQL Server — this is worth internalizing now, because
Chapter 11 (cost management) is built almost entirely on tuning these two
settings correctly across many warehouses.

## Multi-cluster warehouses

A single warehouse cluster can only run so many queries at once before
new ones start **queuing** instead of running immediately — a concurrency
problem, not a size problem. A **multi-cluster warehouse** solves this by
adding more clusters of the *same size* automatically when queries start
queuing, then removing them again when demand drops:

```sql
CREATE WAREHOUSE analytics_wh
  WAREHOUSE_SIZE = 'SMALL'
  MIN_CLUSTER_COUNT = 1
  MAX_CLUSTER_COUNT = 4
  SCALING_POLICY = 'STANDARD'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;
```

Note the distinction: resizing a warehouse (X-Small → Large) makes each
query run *faster*. Adding clusters (multi-cluster) lets *more queries*
run *at once*. Fifty analysts hitting dashboards at 9am is a concurrency
problem — solve it with multi-cluster, not with a bigger single warehouse.

## Key terms

| Term | Meaning |
|---|---|
| Virtual warehouse | A named cluster of compute resources that runs queries against storage |
| Warehouse size | X-Small through 6X-Large — roughly doubles compute (and cost) per step up |
| Auto suspend | Automatically suspends a warehouse after N minutes of inactivity |
| Auto resume | Automatically resumes a suspended warehouse when a new query needs it |
| Multi-cluster warehouse | Adds/removes same-size clusters automatically to handle concurrent query load |

## Lab

1. Create a warehouse: `CREATE WAREHOUSE lab_wh WAREHOUSE_SIZE = 'XSMALL' AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;`
2. In Snowsight, open **Admin → Warehouses**, click `LAB_WH`, and open
   **Edit** — locate the Size dropdown and the Auto Suspend / Auto Resume
   checkboxes you just set in SQL.
3. Run a query against `LAB_WH`, then watch its state change from
   Suspended → Running → (after your auto-suspend window) Suspended
   again, without touching anything yourself.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking it up,
the difference between resizing a warehouse and adding clusters to a
multi-cluster warehouse — and which one solves a concurrency problem.
