# Lesson 47 — Snowflake Credits & Warehouse Costs

**Chapter 11 · Cost Management · Lesson 47 of 60**

## What you'll learn

- How Snowflake actually bills you: credits consumed per-second by warehouses
- Why storage cost is a completely separate bill from compute cost
- The credit-per-hour rate table across warehouse "t-shirt" sizes
- How to see real credit consumption per warehouse in Snowsight

## Two bills, not one

Coming from an on-prem SQL Server box, "cost" mostly meant licensing and
hardware you already owned. Snowflake splits cost into two bills that
never touch each other:

- **Storage** — what you're keeping, billed per terabyte per month,
  the same flat rate no matter which warehouse touches it or how often.
- **Compute** — what you're running, billed in **Snowflake credits**
  consumed by whichever **warehouse** executes a query.

A warehouse that never runs a query costs nothing in compute, even if
it holds petabytes in the tables underneath it, because storage and
compute are billed independently. This is the direct consequence of
the storage/compute separation from Chapter 1 — it's not just an
architecture diagram, it's the reason your Snowflake bill is shaped
the way it is.

## Credits are consumed per-second, by warehouse size

Every warehouse has a size — XS, S, M, L, XL, and up — and each size
consumes credits at a fixed multiple of the size below it:

| Warehouse size | Credits/hour |
|---|---|
| X-Small (XS) | 1 |
| Small (S) | 2 |
| Medium (M) | 4 |
| Large (L) | 8 |
| X-Large (XL) | 16 |
| 2X-Large (2XL) | 32 |
| 3X-Large (3XL) | 64 |
| 4X-Large (4XL) | 128 |

Doubling the warehouse size doubles both the compute power *and* the
credit burn rate — a Medium warehouse running for one hour costs
exactly as many credits as a Small warehouse running for two hours.
Sizing up doesn't create new cost out of nothing; it trades a slower
query at a lower rate for a faster query at a higher rate.

Credits are metered **per second**, with a 60-second minimum each time
a warehouse resumes from suspension — not per query and not rounded up
to the nearest hour. This is exactly why `AUTO_SUSPEND` (Chapter 8)
matters for cost, not just tidiness: a warehouse sitting idle for hours
between queries burns nothing once it suspends, and a short query
still costs at least a minute's worth of credits when the warehouse
has to spin back up to run it.

## Seeing what you've actually spent

Snowflake logs every warehouse's credit usage to
`ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY`. A real query against that
view, from a live Snowflake account, looks like this:

![A Snowsight worksheet result grid: two columns, WAREHOUSE_NAME and CREDITS_USED_COMPUTE_SUM, listing real warehouse names (RESET_WH, DGARDNER_WH, BI_LARGE_WH, LOAD_WH, and others) each with a credit total, sorted highest to lowest.](/courses/snowflake/ch11/47-snowflake-credits-and-warehouse-costs/credits-by-warehouse.png)
*Real output of `SELECT WAREHOUSE_NAME, SUM(CREDITS_USED_COMPUTE) ... FROM ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY GROUP BY 1 ORDER BY 2 DESC` — the credit total per warehouse, straight from Snowflake's own metering.*
Source: [Snowflake — Resource Optimization: Usage Monitoring](https://www.snowflake.com/en/developers/guides/resource-optimization-usage-monitoring/)

Notice the spread: a handful of warehouses account for most of the
credits, and several sit at 0.000000000 — provisioned but essentially
unused. That's the single most common cost story in a real Snowflake
account: it's rarely "everything is too expensive," it's "three
warehouses are doing almost all the spending, and nobody's looked."

## Key terms

| Term | Meaning |
|---|---|
| Credit | Snowflake's unit of compute cost — consumed per-second by a running warehouse |
| Warehouse size | A "t-shirt size" (XS–4XL+) that sets both compute power and credit burn rate |
| Storage cost | A separate, flat per-terabyte-per-month bill, independent of compute |
| `WAREHOUSE_METERING_HISTORY` | The Account Usage view logging every warehouse's actual credit consumption |
| Auto-suspend | The setting that stops a warehouse from burning credits while idle |

## Lab

1. In a worksheet, run:
   ```sql
   SELECT WAREHOUSE_NAME,
          SUM(CREDITS_USED_COMPUTE) AS CREDITS_USED_COMPUTE_SUM
     FROM ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
    GROUP BY 1
    ORDER BY 2 DESC;
   ```
   against your own account (or a trial account with the sample
   Snowflake sample data warehouses running).
2. Pick your busiest warehouse from the results and run
   `SHOW WAREHOUSES LIKE '<that warehouse>';` — note its `size` and
   `auto_suspend` columns.
3. Using the rate table above, estimate roughly how many credits one
   hour of continuous use at that size would cost, and compare it to
   what `WAREHOUSE_METERING_HISTORY` actually shows for a recent hour.

## Check yourself

You're ready for Lesson 48 when you can explain, without looking it
up, why a Small warehouse running for two hours costs the same
credits as a Medium warehouse running for one hour, and why storage
cost doesn't change no matter which warehouse queries the data.
