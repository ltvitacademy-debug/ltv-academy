# Lesson 29 — Parameterized Queries & SQL Injection

**Chapter 5 · Python for Data Engineers · Lesson 29 of 48**

## What you'll learn

- What SQL injection actually looks like in real code
- Why building queries with f-strings or `.format()` is dangerous
- Parameterized queries with `?` placeholders in `pyodbc`
- Why parameterization is also about correctness, not just security

## The dangerous way: building SQL with string formatting

```python
product_name = "Trail Runner GTX"

# DANGEROUS - never do this
query = f"SELECT * FROM Production.Product WHERE Name = '{product_name}';"
df = pd.read_sql(query, conn)
```

This looks fine with a clean value like `"Trail Runner GTX"`. But if
`product_name` ever comes from a user, a web form, or an upstream file
you don't fully control, consider what happens if it arrives as:

```python
product_name = "x'; DROP TABLE Production.Product; --"
```

Spliced into the f-string above, the query SQL Server actually
receives becomes two statements — the harmless `SELECT` and a second
one that drops the entire `Product` table. That's SQL injection:
attacker-controlled text turning into attacker-controlled SQL.

## The safe way: parameterized queries

```python
product_name = "Trail Runner GTX"

query = "SELECT * FROM Production.Product WHERE Name = ?;"
df = pd.read_sql(query, conn, params=[product_name])
```

With a `?` placeholder, `product_name` is sent to SQL Server as a
*value*, never as part of the SQL text. Even the malicious string above
would simply fail to match any product name — it can never be
interpreted as SQL, because the database never parses it as SQL in the
first place.

## Parameterizing with a plain cursor

```python
cursor = conn.cursor()
cursor.execute(
    "SELECT ProductID, Name FROM Production.Product WHERE ListPrice > ?;",
    (100.00,)
)
for row in cursor.fetchall():
    print(row.ProductID, row.Name)
```

Multiple placeholders take multiple values, in order:

```python
cursor.execute(
    "SELECT * FROM Sales.SalesOrderHeader WHERE OrderDate BETWEEN ? AND ?;",
    ("2011-01-01", "2011-01-31")
)
```

## It's not only about security

Parameterized queries also sidestep real formatting bugs — a product
name containing an apostrophe, like `O'Brien's Gear`, breaks a
hand-built query string (the apostrophe ends the quoted literal early)
but is handled correctly as a parameter, because it's never treated as
SQL syntax at all.

## The rule

Any value that isn't a literal constant you typed yourself — anything
from a variable, a file, an API response, or user input — belongs in a
parameter, never spliced into the SQL string. There are no exceptions
worth making in real pipeline code.

## Key terms

| Term | Meaning |
|---|---|
| SQL injection | Attacker-controlled text being interpreted as SQL instead of data |
| Parameterized query | A query with placeholders whose values are sent separately from the SQL text |
| `?` placeholder | `pyodbc`'s parameter marker, filled in order by a tuple or list |

## Lab

Rewrite this unsafe query as a parameterized one:

```python
category = "Camping"
query = f"SELECT * FROM Production.ProductCategory WHERE Name = '{category}';"
```

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: what
SQL injection actually is, and why a parameterized query prevents it
even when the parameter value contains quote characters.
