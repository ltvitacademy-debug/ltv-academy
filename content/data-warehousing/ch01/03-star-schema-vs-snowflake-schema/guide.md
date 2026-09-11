# Lesson 3 — Star Schema vs. Snowflake Schema

**Chapter 1 · Dimensional Modeling Fundamentals · Lesson 3 of 39**

## What you'll learn

- What a star schema actually looks like, and why the shape earns
  that name
- What a snowflake schema is — a normalized variant of a dimension,
  not a different table classification
- The concrete tradeoffs between the two: join count, storage,
  maintainability, and query performance
- Microsoft's own default recommendation, and the specific
  situations where snowflaking is still the right call

## The star schema

A **star schema** is the most common shape a dimensional model takes.
One fact table sits at the center, and its related dimension tables
each connect to it directly — one join away, no intermediate tables.
Drawn out, the fact table forms the center of a star while its
dimensions form the points, which is exactly where the name comes
from.

![Diagram of a star schema for sales facts, with five dimension tables arranged around a central fact table.](/courses/data-warehousing/ch01/03-star-schema-vs-snowflake-schema/star-schema.svg)
*A sales fact table with five dimensions, each one join away — the classic star shape.*

Every dimension table in a star schema is fully **denormalized**: a
product dimension stores category and subcategory names directly in
the same row as the product, even though category and subcategory
repeat across many products. That redundancy is intentional — it's
what keeps every dimension exactly one join away from the fact table,
which is the entire performance case for the star shape.

## The snowflake schema

A **snowflake schema** normalizes one or more of those dimension
tables into multiple related tables instead of one flat table. The
classic example: instead of one denormalized `Product` dimension, you
split it into `Product`, `Subcategory`, and `Category` tables, each
referencing the one above it.

![Diagram of a snowflake dimension made of three related tables — Product, Subcategory, and Category.](/courses/data-warehousing/ch01/03-star-schema-vs-snowflake-schema/snowflake-dimension.svg)
*The same product hierarchy, normalized into three related tables instead of one.*

Picture those normalized tables fanning outward from the fact table,
and you can see where the name comes from — the points of the star
sprout their own smaller points.

**A snowflake schema is not a different table classification.** Every
table involved is still either a fact table or a dimension table. What
changed is that one dimension, which *could* have been a single flat
table, is instead split across several related ones.

## The tradeoffs

| | Star schema | Snowflake schema |
|---|---|---|
| Joins to reach fact data | Fewer — one join per dimension | More — one join per normalized level |
| Storage | More redundant data stored | Less redundant data stored |
| Query performance | Generally faster | Generally slower, more join overhead |
| Maintainability | Simple, single-table dimension | More tables to manage per dimension |
| Hierarchies | Must live in columns of one table | Naturally split by normalized level |

Microsoft's own dimensional modeling guidance is direct about the
default: **dimension tables should almost always be denormalized**
(star), and snowflaking is the exception, not the starting point. It's
worth reaching for a snowflake design specifically when:

- The dimension is extremely large, and the storage savings from
  normalizing it outweigh the query-performance cost — worth
  periodically reassessing as data volumes change.
- You need keys that relate the dimension to **higher-grain facts**
  — for example, a sales fact table stored at the product level and a
  sales-target fact table stored at the subcategory level, both
  needing to join to the right level of the same hierarchy.
- You need to track historical change at a **higher level** of the
  hierarchy than the base dimension itself.

## The practical middle ground

In practice, many warehouses store a dimension in normalized
(snowflaked) form for ETL and maintenance reasons, but expose it to
reporting as a single **denormalized view** that joins the pieces back
together — getting easier maintenance on the load side without paying
the extra-join cost on every analytical query. This course builds
denormalized star-schema dimensions by default (Chapters 3-4), and
calls out the rare cases where snowflaking earns its keep.

## Key terms

| Term | Meaning |
|---|---|
| Star schema | A fact table joined directly, one hop, to each of its fully denormalized dimension tables |
| Snowflake schema | A star schema where one or more dimensions are normalized into multiple related tables |
| Denormalized | Descriptive data (like category name) repeated in every row rather than stored once and joined |
| Higher-grain fact | A fact table whose grain sits at a coarser level (e.g. subcategory) than another fact table's grain (e.g. product) |

## Lab

1. In AdventureWorksDW2014, look at `DimProduct`,
   `DimProductSubcategory`, and `DimProductCategory`. Are these three
   tables snowflaked, or is the product hierarchy denormalized into
   one table? Check the columns to be sure.
2. Write (or sketch) the join path from `FactInternetSales` to
   `DimProductCategory`, counting every table you cross. Compare that
   join count to what it would be if the entire hierarchy were
   flattened into a single `DimProduct` table.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: the
structural difference between a star and a snowflake schema, one
concrete reason to snowflake a dimension anyway, and why Microsoft's
default guidance still favors denormalized star dimensions.
