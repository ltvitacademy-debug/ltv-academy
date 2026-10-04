# Lesson 11 — Accuracy

**Chapter 3 · The Quality Dimensions · Lesson 11 of 30**

## What you'll learn

- What "accuracy" means as a data quality dimension — and how it's
  different from a value just being well-formatted
- Why accuracy always requires something to compare against
- How to measure accuracy with a reference table and T-SQL
- The most common real-world causes of inaccurate data

## What accuracy actually means

**Accuracy** is how closely a piece of data reflects the real-world
fact it's supposed to represent. A customer's phone number is accurate
if it's the number that actually reaches that customer — not just a
string that happens to look like a phone number.

That distinction matters because it's the one students mix up most
often: accuracy is not the same dimension as **validity** (Lesson 14).
A value can be perfectly valid — right data type, right format, inside
an allowed range — and still be wrong. `555-0199` is a validly
formatted US phone number whether or not it's actually *this
customer's* number. Validity is checked against rules. Accuracy is
checked against **truth**.

![Microsoft SQL Server Management Studio open with Object Explorer on the left showing a connected server, databases, and the SQL Server Agent node, and an empty query editor on the right.](/courses/data-quality-management/ch03/11-accuracy/ssms.png)
*SQL Server Management Studio — the tool every query example in this chapter runs in.*

## Why accuracy needs a reference

Because accuracy is about truth, not format, you can't check it with a
rule by itself. You need something to compare the data *against*:

- A **system of record** — the application or source system where the
  value originates (the billing system is the system of record for a
  customer's current address)
- **External verification** — a postal-service address-validation API,
  a bank's routing-number directory, a government ID-format registry
- **Physical or manual confirmation** — counting inventory on a shelf
  and comparing it to what the system says is on hand
- A **trusted reference table** your organization already maintains
  and trusts more than the table you're checking

Without one of these, "accuracy" quietly collapses into "it looks
plausible" — which is validity wearing accuracy's name.

## Measuring accuracy with SQL

The most common pattern in practice: load (or already have) a trusted
reference table, then join it against the table you're checking and
flag rows where the values disagree.

```sql
SELECT
    c.CustomerId,
    c.Email        AS CurrentEmail,
    r.Email        AS ReferenceEmail
FROM dbo.Customers AS c
JOIN dbo.CustomerReference AS r
    ON c.CustomerId = r.CustomerId
WHERE c.Email <> r.Email;
```

This doesn't tell you the email in `Customers` is *invalid* — it's
probably a perfectly well-formed email address. It tells you it
disagrees with a source you trust more, which is exactly what an
accuracy check is for.

A second common pattern: sample-based accuracy, used when there's no
full reference table, only a smaller trusted sample (common after a
manual audit):

```sql
SELECT
    s.RecordId,
    s.AuditedValue,
    t.CurrentValue,
    CASE WHEN s.AuditedValue <> t.CurrentValue THEN 1 ELSE 0 END AS Mismatch
FROM dbo.AuditSample AS s
JOIN dbo.TargetTable AS t
    ON s.RecordId = t.RecordId;
```

Aggregate the `Mismatch` column across the sample and you get an
**estimated accuracy rate** for the whole table — a number you can
track over time, even without auditing every row.

## Common causes of inaccurate data

- **Manual entry errors** — a transposed digit, a copy-paste from the
  wrong row
- **Stale source data** — the value was accurate when it was captured,
  but the real-world fact has since changed (a customer moved; the
  address didn't update)
- **Integration mapping bugs** — a field gets mapped to the wrong
  source column during an ETL load
- **Unit or currency mismatches** — `42` is accurate as a weight in
  kilograms and wildly inaccurate as the same weight in pounds

## Key terms

| Term | Meaning |
|---|---|
| Accuracy | How closely data reflects the real-world fact it represents |
| System of record | The authoritative source application for a given value |
| Reference table | A trusted dataset used as the comparison point for an accuracy check |
| Accuracy rate | The percentage of sampled or compared records that match the trusted source |

## Lab

Using any two tables you have access to (or create small test tables
with `CREATE TABLE` and a handful of rows), write a query that:

1. Joins a "current" table to a "reference" table on a shared key.
2. Returns only the rows where at least one compared column
   disagrees between the two tables.
3. Adds a final query that counts total rows compared vs. mismatched
   rows, and calculates a mismatch percentage:
   ```sql
   SELECT
       COUNT(*) AS TotalCompared,
       SUM(CASE WHEN c.Email <> r.Email THEN 1 ELSE 0 END) AS Mismatches,
       CAST(SUM(CASE WHEN c.Email <> r.Email THEN 1 ELSE 0 END) AS DECIMAL(5,2))
           / COUNT(*) * 100 AS MismatchPct
   FROM dbo.Customers AS c
   JOIN dbo.CustomerReference AS r
       ON c.CustomerId = r.CustomerId;
   ```

## Check yourself

- Can you explain, in one sentence, why a correctly formatted value
  can still be inaccurate?
- Name three different kinds of "trusted reference" an accuracy check
  could compare against.
- Why does accuracy checking always require a join (or an external
  call), while some other dimensions don't?
