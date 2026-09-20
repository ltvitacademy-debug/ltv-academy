# Capstone Kickoff: A Slow Production Database

Every chapter in this course has been building toward this. Chapters 1–9 gave you a
methodology, execution-plan literacy, index design, query-rewrite technique, wait-stat
analysis, tempdb/memory tuning, Query Store, and configuration tuning. This chapter is a
single continuous scenario, spread across six lessons, where you apply all of it to one
genuinely slow production database — start to finish, the way it actually happens on the
job.

## What you'll learn

- The fictional company and database you'll work with for the rest of this chapter
- The specific application, procedure, and symptom you're being handed
- Why "the database is slow" is exactly the vague starting point Chapter 1 warned about

## Meet Meridian Outfitters

**Meridian Outfitters** is a mid-size outdoor gear retailer. Its order system lives in a
database called **MeridianRetail**, and its support reps use an internal CRM called
**MeridianConnect** to look up a customer's order history when a customer calls in. Three
years ago, `dbo.Orders` held about 2 million rows and the lookup was instant. Today it
holds roughly **14 million rows** — partly organic growth, but mostly because Meridian
launched a B2B wholesale program 18 months ago. Wholesale accounts like **TrailWorks
Co-op** (`CustomerID = 48213`) don't place a handful of orders a year like a typical
consumer; they place thousands, sometimes tens of thousands.

The screen reps use is powered by one stored procedure:

```sql
CREATE PROCEDURE dbo.usp_CustomerOrderHistory
    @CustomerID INT
AS
BEGIN
    SELECT o.OrderID, o.OrderDate, o.OrderStatus, o.OrderTotal, o.ShipDate
    FROM dbo.Orders AS o
    WHERE o.CustomerID = @CustomerID
      AND o.OrderDate >= DATEADD(MONTH, -12, GETDATE())
    ORDER BY o.OrderDate DESC;
END
```

Nothing exotic. A single filtered, sorted `SELECT` against one table. For a consumer
account with 40 orders a year, this procedure has always returned in milliseconds — and
still does today.

## The symptom, as reported by users

Support tickets don't arrive as "the database is slow." They arrive as this: starting
about six weeks ago, reps began reporting that the **Order History** panel in
MeridianConnect sometimes spins for 20–30 seconds before timing out with "Order history
request timed out" — the app gives up at 30 seconds. It's worst between **10 AM and 2
PM Eastern**, Meridian's peak call-center hours, and it's not every customer — most
lookups are still instant. Reps have started avoiding pulling full order history for
certain accounts and are quietly warning each other which customers to expect delays on.
That pattern — intermittent, load-correlated, concentrated on specific accounts — is a
real clue, not noise, and it's exactly the kind of detail Chapter 1 said to capture before
touching anything.

## Why you don't start changing things yet

It would be easy to guess right now: "it's probably a missing index" or "tempdb is
probably contended at that database size." Chapter 1's loop exists precisely to stop you
from acting on a guess. Before this chapter is done, you'll gather a real baseline, read
the actual execution plan, check real wait statistics, and only then make one deliberate,
measured change. The next lesson starts exactly there — measuring, not fixing.

## Key terms

| Term | Meaning |
|---|---|
| MeridianRetail | The fictional production database for this capstone — `dbo.Orders` has ~14M rows |
| dbo.usp_CustomerOrderHistory | The stored procedure behind MeridianConnect's Order History panel |
| Wholesale account | A B2B customer type (e.g., TrailWorks Co-op) placing orders at far higher volume than a consumer account |
| Load-correlated symptom | A performance problem that worsens under concurrent load — a clue pointing at resource contention, not just one bad query plan |

## Check yourself

The symptom is "intermittent, worse at 10 AM–2 PM, and concentrated on certain accounts."
Why is that combination of details more useful to you than simply being told "the Order
History screen is slow"?
