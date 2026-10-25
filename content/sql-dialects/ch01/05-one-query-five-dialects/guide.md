# Lesson 5 — A Side-by-Side Query: The Same SELECT in Five Dialects

**Chapter 1 · The Landscape · Lesson 5 of 5**

## What you'll learn

- The same simple query, written correctly in five different dialects
- Just how similar basic SELECT syntax really is across platforms
- Why this course spends most of its time somewhere other than basic querying
- What's coming in Chapter 2 onward now that the landscape is set

## The task: top 5 highest-priced products

Here's one simple, realistic task — get the 5 highest-priced products from a table — written
correctly in T-SQL, Oracle SQL, MySQL, PostgreSQL, and Snowflake.

**T-SQL (SQL Server):**
```sql
SELECT TOP (5) ProductName, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

**Oracle SQL:**
```sql
SELECT product_name, list_price
FROM products
ORDER BY list_price DESC
FETCH FIRST 5 ROWS ONLY;
```

**MySQL:**
```sql
SELECT product_name, list_price
FROM products
ORDER BY list_price DESC
LIMIT 5;
```

**PostgreSQL:**
```sql
SELECT product_name, list_price
FROM products
ORDER BY list_price DESC
LIMIT 5;
```

**Snowflake:**
```sql
SELECT product_name, list_price
FROM products
ORDER BY list_price DESC
LIMIT 5;
```

## What just happened

Look at what's identical: every single one of these queries uses `SELECT`, a column list, `FROM`,
`ORDER BY ... DESC`. That's the ANSI/ISO standard core, and it's rock solid across all five
platforms. The *only* thing that changed is how each platform expresses "just give me the top N" —
and even there, three of the five (MySQL, PostgreSQL, and Snowflake) happen to agree on `LIMIT`,
while SQL Server uses `TOP` and Oracle uses the newer standard `FETCH FIRST ... ROWS ONLY` syntax.

This is the pattern you should expect throughout this course: basic querying is almost a non-issue.
The real differences live in pagination details (Chapter 3 goes much deeper here, including
`OFFSET`), data types (Chapter 2, starting next), and especially procedural code (Chapters 5 and
6), where the standard never fully standardized anything and every vendor went its own way.

## Why this lesson matters for what's ahead

If this course only taught you that basic `SELECT` is portable, it would be a short course. The
reason Chapter 1 ends here, with a lesson showing you how *similar* the dialects are at this level,
is to set a baseline: everything that follows is specifically about where they genuinely diverge.
You now have the landscape — the players, how to set them up, how to read their docs, and a feel
for where they agree — so Chapter 2 can start digging into the real differences, beginning with
data types.

## Key terms

| Term | Meaning |
|---|---|
| `TOP (n)` | SQL Server's proprietary syntax for limiting result rows |
| `FETCH FIRST n ROWS ONLY` | The modern ANSI/ISO standard syntax for limiting result rows, used by Oracle (12c+) |
| `LIMIT n` | The syntax shared by MySQL, PostgreSQL, and Snowflake for limiting result rows |

## Lab

Take any T-SQL query you wrote recently that uses `TOP`. Rewrite it twice: once using Oracle's
`FETCH FIRST ... ROWS ONLY`, and once using `LIMIT`, keeping the rest of the query identical. This
is exactly the exercise you'll repeat, with more depth, in Chapter 3.

## Check yourself

You're ready for Chapter 2 when you can write the same basic SELECT with a row limit in at least
three of these five dialects from memory, and explain in one sentence why basic querying stays so
consistent while pagination syntax doesn't.
