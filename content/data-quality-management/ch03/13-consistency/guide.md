# Lesson 13 — Consistency

**Chapter 3 · The Quality Dimensions · Lesson 13 of 30**

## What you'll learn

- What "consistency" means — and how it's different from both
  accuracy and validity
- The two kinds of consistency: internal (within one system) and
  cross-system (between two systems)
- How to write T-SQL checks that catch both kinds
- Why consistency problems are often the first visible symptom of a
  deeper integration bug

## What consistency actually means

**Consistency** is whether the same fact agrees with itself,
everywhere it's stored or derived. It doesn't ask "is this value
true?" (accuracy) or "is this value well-formed?" (validity) — it asks
"does this value agree with the *other* copies, or other
representations, of the same fact?"

A customer's `State` column can be perfectly valid (`'CA'`, a real
two-letter state code) and plausible (so an accuracy check wouldn't
necessarily flag it) while still being **inconsistent** with their
`ZipCode` column, if that zip code is actually in Oregon.

## Internal vs. cross-system consistency

| Type | What it checks | Example |
|---|---|---|
| **Internal consistency** | Two columns in the *same* row (or table) agree with each other | `OrderDate` is after `CustomerSignupDate`, not before it |
| **Cross-system consistency** | The same fact, stored in two different systems, agrees | A customer's `Email` in the CRM matches their `Email` in the billing system |

Internal consistency is checkable in one query against one table.
Cross-system consistency needs a join (or a federated query) across
two data sources — it's the direct predecessor to the reconciliation
checks you'll build in Lesson 20.

## Checking internal consistency with SQL

```sql
-- OrderDate should never be before the customer's own signup date
SELECT
    o.OrderId,
    o.OrderDate,
    c.SignupDate
FROM dbo.Orders AS o
JOIN dbo.Customers AS c
    ON o.CustomerId = c.CustomerId
WHERE o.OrderDate < c.SignupDate;
```

```sql
-- State and ZipCode should agree — flag known mismatches
-- (ZipPrefixState is a lookup table: first 3 digits -> expected state)
SELECT
    c.CustomerId,
    c.State,
    c.ZipCode
FROM dbo.Customers AS c
JOIN dbo.ZipPrefixState AS z
    ON LEFT(c.ZipCode, 3) = z.ZipPrefix
WHERE c.State <> z.ExpectedState;
```

## Checking cross-system consistency with SQL

When both systems land in the same SQL Server instance (or are
reachable through a linked server), the pattern is the same join-based
mismatch check used for accuracy — but the comparison is now between
two *independent systems of record*, not a system and a known-trusted
reference:

```sql
SELECT
    crm.CustomerId,
    crm.Email AS CrmEmail,
    billing.Email AS BillingEmail
FROM dbo.CrmCustomers AS crm
JOIN dbo.BillingCustomers AS billing
    ON crm.CustomerId = billing.CustomerId
WHERE crm.Email <> billing.Email;
```

This query *looks* almost identical to Lesson 11's accuracy check —
and that's intentional. The difference is which system you'd trust to
fix the mismatch. An accuracy check tells you a value is wrong.
A consistency check only tells you two copies disagree — figuring out
*which one* is correct is a separate, often harder, question.

## Key terms

| Term | Meaning |
|---|---|
| Consistency | Whether the same fact agrees with itself across columns or systems |
| Internal consistency | Agreement between related columns within one row or table |
| Cross-system consistency | Agreement of the same fact as stored in two different systems |

## Lab

1. Create two small test tables representing the "same" customer data
   from two different systems (for example, `CrmCustomers` and
   `BillingCustomers`, both with a shared `CustomerId`).
2. Insert a handful of rows into each, including at least two rows
   where a shared field (like `Email` or `Phone`) deliberately
   disagrees between the tables.
3. Write a query that joins the two tables and returns only the
   disagreeing rows.
4. Add a second query checking internal consistency on a single table
   you already have (for example, a date column that should always be
   on or after another date column in the same row).

## Check yourself

- In your own words, how is a consistency check different from an
  accuracy check, even when the SQL looks nearly identical?
- Give one example each of internal and cross-system consistency from
  a dataset you've worked with.
- Why can't a consistency check, by itself, tell you *which* of two
  disagreeing values is correct?
