# Parameter Sniffing

Lesson 7 flagged parameter sniffing as one of the two usual causes of an estimated-vs-
actual mismatch. This lesson covers the mechanism in full — why it happens, how to spot
it definitively, and the real fixes, including the option most DBAs reach for too fast.

## What you'll learn

- The actual compile-and-cache mechanism that causes parameter sniffing
- How to distinguish it from stale statistics with certainty
- Real fixes: OPTION (RECOMPILE), OPTIMIZE FOR, and Parameter Sensitive Plan optimization

## The mechanism

When SQL Server compiles a parameterized query or stored procedure for the first time (or
after the plan is evicted and recompiled), it "sniffs" the actual parameter value(s)
supplied on that specific call and builds a plan optimized for *that value* — using
statistics to estimate how many rows a filter like `WHERE CustomerID = @id` will return
for the value it was handed. That plan is then cached and reused for every subsequent
call, regardless of what parameter value comes in next. This is normally a good thing —
it avoids recompiling on every call — but it breaks down when the column's data
distribution is skewed: a plan built for a customer with 5 orders (Nested Loops, cheap)
performs terribly for a customer with 500,000 orders (should have been a Hash Match or
Scan), or vice versa.

```sql
CREATE PROCEDURE dbo.GetOrdersByCustomer @CustomerID INT
AS
SELECT * FROM Sales.SalesOrderHeader WHERE CustomerID = @CustomerID;
-- First call with @CustomerID = 29825 (5 orders) compiles a Nested-Loops plan.
-- That same plan then runs for @CustomerID = 11000 (12,000 orders) — badly.
```

## Distinguishing it from stale statistics

Both look identical at first: a big estimated-vs-actual row count gap. The decisive test
is `OPTION (RECOMPILE)`: force a fresh compile using the *current* call's actual
parameter value, bypassing the cached plan entirely.

- If the recompiled plan is dramatically better for this call, and statistics are
  confirmed current (`sys.dm_db_stats_properties`, recent `last_updated`), it's parameter
  sniffing — the cached plan was simply built for a different value.
- If the plan is still bad even after a fresh compile with current statistics, the
  problem is something else entirely (a genuinely bad index choice, missing statistics on
  a computed column, etc.) — not sniffing.

## Real fixes

- **`OPTION (RECOMPILE)`** — recompile every single execution using that call's actual
  parameter value. Guarantees the best plan for every call, at the cost of paying
  compilation overhead every time. Best for queries run infrequently, where compile cost
  is trivial next to execution cost.
- **`OPTIMIZE FOR` a specific value** — `OPTION (OPTIMIZE FOR (@CustomerID = 11000))`
  forces the optimizer to always compile as if that value were supplied, regardless of
  what's actually passed. Useful when you know the "typical" or "worst realistic" case and
  want to stabilize around it. `OPTIMIZE FOR UNKNOWN` instead compiles using average
  density statistics, ignoring the sniffed value entirely — a reasonable middle ground when
  no single value is representative.
- **Parameter Sensitive Plan (PSP) optimization** — new in SQL Server 2022 (and Azure SQL
  Database), under the default compatibility level. The optimizer can automatically cache
  *multiple* plan variants for the same query based on parameter value ranges, instead of
  forcing one plan to serve every case. This directly addresses the classic
  skewed-distribution sniffing problem without any query rewrite, when it's applicable.

## Key terms

| Term | Meaning |
|---|---|
| Parameter sniffing | Compiling a plan for the first-seen parameter value, then reusing it for very different later values |
| OPTION (RECOMPILE) | Forces a fresh, per-execution compile using the current call's actual parameter value |
| OPTIMIZE FOR | Forces compilation as if a specified (or UNKNOWN/average) value were supplied |
| Parameter Sensitive Plan (PSP) | SQL Server 2022+ feature caching multiple plan variants per parameter value range |

## Check yourself

A stored procedure runs fast for most customers but takes 40 seconds for one specific
high-volume customer. Statistics were updated yesterday. Using this lesson's decisive
test, how would you confirm this is parameter sniffing and not something else — and which
fix would you reach for first, given it's a single known problem value?
