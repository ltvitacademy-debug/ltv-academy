# Lesson 26 — Junk Dimensions

**Chapter 6 · Advanced Warehouse Patterns · Lesson 26 of 39**

## What you'll learn

- The problem junk dimensions solve: a warehouse cluttered with dozens
  of tiny, low-cardinality dimension tables
- How a junk dimension is actually built — the Cartesian product of
  every combination of the values it consolidates
- When consolidating flags into a junk dimension is the right call,
  and when it isn't
- How a junk dimension changes the fact table itself

## The problem: too many tiny dimensions

By this point in the course you've built dimensions that describe real
business entities — products, customers, dates. But every warehouse
also accumulates a second category of attribute: small, independent,
low-cardinality flags and indicators that don't belong to any of
those entities on their own. Order status. Payment method. A rush-order
flag. A gift-wrap flag. Each one, taken alone, looks like it deserves
its own tiny dimension table with two or three rows and a surrogate
key.

The trouble is scale. If a sales fact table picks up eight of these
one-off flag dimensions, it now carries eight extra foreign key
columns, and the semantic model's field list is cluttered with eight
tables nobody thinks of as "real" dimensions. Storage grows, joins
multiply, and the model gets harder to navigate for the exact people
it's supposed to serve.

## The fix: consolidate into one junk dimension

A **junk dimension** is a single dimension table that consolidates
several small, unrelated, low-cardinality attributes into one table,
in place of many separate ones. It earns the "junk" name honestly —
it's a deliberate catch-all for miscellaneous flags that don't fit
anywhere else, not a designed business entity like `Customer` or
`Product`.

The construction is mechanical: build the table as the **Cartesian
product** of every value in every attribute being combined, with one
surrogate key column identifying each unique combination.

Microsoft's own dimensional modeling guidance for Fabric Warehouse
shows exactly this with a two-attribute example: order status (say,
three possible values) crossed with delivery status (say, three
possible values) produces nine rows in a single `Sales Status`
dimension — one row for every combination, each with its own
surrogate key.

![Diagram showing order status and delivery status values, and how their Cartesian product produces the Sales Status junk dimension's rows.](/courses/data-warehousing/ch06/26-junk-dimensions/junk-dimension.svg)

*Every combination of order status and delivery status becomes one row.*

Nine rows total (three order statuses times three delivery statuses)
replaces what would otherwise be two separate two- or three-row
dimension tables and two separate foreign keys on the fact table. Add
a third or fourth flag and the row count grows multiplicatively — a
junk dimension is only practical while the combined cardinality stays
small.

## What changes on the fact table

Before consolidation, a sales fact table with three independent flags
would carry three foreign keys: `OrderStatus_FK`, `DeliveryStatus_FK`,
`GiftWrap_FK`. After building a junk dimension, all three collapse
into a single `SalesStatus_FK` pointing at the one consolidated table.
The fact table gets narrower, the join count for a report that filters
on any of those flags stays at one join instead of three, and the
field list in Power BI shows one `Sales Status` table instead of
three barely-named lookup tables.

## When to use a junk dimension — and when not to

Good candidates share three traits, all straight from Microsoft's own
guidance:

- **Many** of them — this is a consolidation technique, not something
  you'd bother with for a single flag
- **Few attributes each** — often just one column
- **Low cardinality** — few distinct values per attribute

Flags and indicators, order status, and customer demographic states
(gender, age group) are the textbook candidates. What you should
*not* junk-dimension: attributes with real, independent business
meaning that analysts need to filter or slice on their own terms
(that's a real dimension), or attributes whose combined row count
would explode — five attributes with ten values each multiply out to
100,000 rows, at which point you've built something worse than what
you started with.

## Key terms

| Term | Meaning |
|---|---|
| Junk dimension | A single dimension table consolidating several small, unrelated, low-cardinality attributes |
| Cartesian product | Every possible combination of the input attributes' values — the technique used to build a junk dimension's rows |
| Cardinality | The number of distinct values an attribute can take — junk dimensions only work when this stays low |

## Lab

1. In AdventureWorksDW2014, look at `FactInternetSales`. Identify two
   or three low-cardinality flag-like columns that could plausibly be
   consolidated (for example order-related status indicators).
2. Sketch (on paper or in a script, no need to actually build it) a
   junk dimension table combining them: list every attribute, its
   possible values, and calculate the resulting row count as a
   Cartesian product.
3. Decide, and justify in one sentence: at that row count, is this
   still a good candidate for a junk dimension, or has the combined
   cardinality grown too large?

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: what
a junk dimension actually consolidates, how its rows are constructed
(Cartesian product), and one concrete reason to stop consolidating
before the row count gets too large.
