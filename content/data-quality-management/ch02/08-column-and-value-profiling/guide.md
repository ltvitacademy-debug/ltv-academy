# Lesson 8 — Column and Value Profiling

**Chapter 2 · Profiling · Lesson 8 of 30**

## What you'll learn

- Where a single table's column-level metadata actually lives in SSMS
- How to profile data types, lengths, and value ranges with T-SQL
- How to build a frequency distribution for a low-cardinality column
- How to spot outliers using `MIN`/`MAX` and simple statistical checks

## Where column metadata lives in SSMS

Lesson 7 covered the query mechanics. Before writing more SQL, it helps
to see where SSMS itself exposes column-level structure — expand any
table in Object Explorer and you'll find **Columns**, **Keys**,
**Constraints**, **Indexes**, and **Statistics** nodes underneath it.

![SQL Server Management Studio's Object Explorer with a table named dbo.Customers expanded, showing Columns, Keys, Constraints, Triggers, Indexes, and Statistics nodes underneath it.](/courses/data-quality-management/ch02/08-column-and-value-profiling/new-table.png)
*Expanding a table in Object Explorer — the Columns and Statistics nodes are exactly the structure this lesson's queries interrogate directly with SQL.*

This tree view is useful for browsing structure, but it won't tell you
what's actually *in* those columns — for that, you write a query and
read the Results grid, the same workflow from Lesson 7.

![SQL Server Management Studio's query editor and Results grid.](/courses/data-quality-management/ch02/08-column-and-value-profiling/ssms.png)
*The same query editor and Results grid from Lesson 7 — this lesson's column profiling queries run here, the same way.*

![SQL Server Management Studio's results toolbar, showing three view icons — grid, text, and file output — highlighted.](/courses/data-quality-management/ch02/08-column-and-value-profiling/results.png)
*SSMS can display query output as a grid, as plain text, or saved to a file. Every example in this lesson uses the default grid view.*

## Profiling data types and lengths

`INFORMATION_SCHEMA.COLUMNS` is a built-in system view that lists every
column's declared type, length, and nullability without you needing to
query the table itself:

```sql
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'Sales'
  AND TABLE_NAME   = 'Customer'
ORDER BY ORDINAL_POSITION;
```

This answers a different question than profiling the data itself: it
tells you what the column is *allowed* to contain (its declared
contract), which you then compare against what it *actually* contains.

## Profiling actual value lengths

A column declared `VARCHAR(50)` might never actually use more than 12
characters in practice, or — more interestingly for data quality — it
might be packed right up against its limit, a sign that real values are
getting truncated:

```sql
SELECT
    MIN(LEN(EmailAddress)) AS shortest_email,
    MAX(LEN(EmailAddress)) AS longest_email,
    AVG(LEN(EmailAddress)) AS avg_email_length
FROM Sales.Customer
WHERE EmailAddress IS NOT NULL;
```

If `longest_email` sits exactly at the column's declared maximum
length, that's worth a closer look — it's a strong hint that some
values were cut off at insert time rather than that they genuinely end
there.

## Frequency distributions for low-cardinality columns

For a column with a small, known set of expected values — like an
order status — `GROUP BY` with `COUNT(*)` builds a frequency table in
one query, which immediately surfaces any value that shouldn't be
there:

```sql
SELECT
    OrderStatus,
    COUNT(*) AS row_count
FROM Sales.SalesOrderHeader
GROUP BY OrderStatus
ORDER BY row_count DESC;
```

If the result includes `Shipp3d` alongside the expected `Shipped`,
`Pending`, and `Cancelled`, you've just caught a validity problem
(Lesson 14) directly in a profiling query — before it ever became a
formal rule in Chapter 4.

## Spotting outliers with MIN/MAX

For numeric or date columns, `MIN` and `MAX` are the cheapest possible
outlier check — a negative `UnitPrice`, or an `OrderDate` decades in the
future, usually indicates a data entry or integration error rather than
a real business event:

```sql
SELECT
    MIN(UnitPrice) AS min_price,
    MAX(UnitPrice) AS max_price,
    MIN(OrderDate) AS earliest_order,
    MAX(OrderDate) AS latest_order
FROM Sales.SalesOrderDetail d
JOIN Sales.SalesOrderHeader h ON h.SalesOrderID = d.SalesOrderID;
```

A `min_price` below zero or a `latest_order` dated next year are both
the kind of finding that sends you straight to Lesson 23's root cause
analysis rather than Chapter 4's remediation — something upstream
produced an impossible value.

## Key terms

| Term | Meaning |
|---|---|
| `INFORMATION_SCHEMA.COLUMNS` | System view listing every column's declared type, length, and nullability |
| Frequency distribution | A count of how often each distinct value appears in a column |
| Cardinality | How many distinct values a column has — "low cardinality" means few |
| Outlier | A value far outside the expected range, often signaling an error |

## Lab

1. Run an `INFORMATION_SCHEMA.COLUMNS` query against any table you have
   access to and compare the declared lengths to the actual `MIN`/`MAX`
   `LEN()` of a text column.
2. Pick a column you expect to have a small number of valid values
   (a status, a category, a state abbreviation) and build a frequency
   distribution with `GROUP BY` / `COUNT(*)`.
3. Scan the frequency distribution for anything that looks like a typo
   or an unexpected value, and write down what you'd ask the data owner
   about it.
4. Run a `MIN`/`MAX` check on a numeric or date column and decide
   whether either extreme looks like a plausible real-world value.

## Check yourself

Can you explain the difference between what `INFORMATION_SCHEMA.COLUMNS`
tells you and what a `GROUP BY` frequency query tells you — and why you
need both? If yes, you're ready for Lesson 9's relationship and pattern
profiling.
