# Lesson 10 — Auto-Incrementing Keys: IDENTITY vs. SEQUENCE vs. AUTO_INCREMENT vs. SERIAL

**Chapter 2 · Data Types Across Dialects · Lesson 5 of 6**

## What you'll learn

- SQL Server's IDENTITY(seed, increment) as your baseline
- Oracle's traditional SEQUENCE + trigger pattern, and its modern IDENTITY alternative
- MySQL's direct AUTO_INCREMENT column attribute
- PostgreSQL's SERIAL/BIGSERIAL convenience and the modern GENERATED ALWAYS AS IDENTITY syntax

## SQL Server — IDENTITY(seed, increment)

```sql
-- SQL Server
CREATE TABLE Customers (
    CustomerId INT IDENTITY(1, 1) PRIMARY KEY,
    CustomerName VARCHAR(100)
);
```

`IDENTITY(seed, increment)` is a column property: the database generates and tracks the next value
for you automatically on insert.

## Oracle — traditionally SEQUENCE + trigger

Oracle's traditional approach is more manual: create a `SEQUENCE` object, then a trigger that
pulls the next sequence value into the column on insert:

```sql
-- Oracle (traditional)
CREATE SEQUENCE customer_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE customers (
    customer_id NUMBER PRIMARY KEY,
    customer_name VARCHAR2(100)
);

CREATE OR REPLACE TRIGGER customer_bir
BEFORE INSERT ON customers
FOR EACH ROW
BEGIN
    SELECT customer_seq.NEXTVAL INTO :new.customer_id FROM dual;
END;
```

Modern Oracle (12c and later) also supports a more SQL Server-like `IDENTITY` column syntax —
which is really a sequence under the hood, with the trigger machinery handled for you:

```sql
-- Oracle 12c+ (modern)
CREATE TABLE customers (
    customer_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name VARCHAR2(100)
);
```

## MySQL — AUTO_INCREMENT directly on the column

MySQL's approach is the most direct of the four — a single column attribute, no separate object:

```sql
-- MySQL
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100)
);
```

## PostgreSQL — SERIAL/BIGSERIAL, or the modern standard syntax

PostgreSQL's classic convenience type, `SERIAL` (or `BIGSERIAL` for a larger range), is really
just shorthand that creates a `SEQUENCE` for you behind the scenes:

```sql
-- PostgreSQL (classic convenience)
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100)
);

-- PostgreSQL (modern standard-SQL syntax, equivalent)
CREATE TABLE customers (
    customer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name VARCHAR(100)
);
```

## Side-by-side summary

| Platform | Idiomatic syntax |
|---|---|
| SQL Server | `IDENTITY(seed, increment)` |
| Oracle (traditional) | `SEQUENCE` + `BEFORE INSERT` trigger |
| Oracle (12c+) | `GENERATED ALWAYS AS IDENTITY` (sequence under the hood) |
| MySQL | `AUTO_INCREMENT` |
| PostgreSQL | `SERIAL`/`BIGSERIAL` (sequence under the hood), or `GENERATED ALWAYS AS IDENTITY` |

## Key terms

| Term | Meaning |
|---|---|
| `IDENTITY` | A column property (SQL Server, modern Oracle, modern PostgreSQL) that auto-generates sequential values |
| `SEQUENCE` | A standalone database object generating sequential numbers, used directly or under the hood of other syntax |
| `SERIAL`/`BIGSERIAL` | PostgreSQL's convenience pseudo-types that create a `SEQUENCE` automatically |

## Lab

Write the `CREATE TABLE` for an `Orders` table with an auto-incrementing primary key on all four
platforms — use Oracle's modern `IDENTITY` syntax, not the traditional trigger approach.

## Check yourself

You're ready for Lesson 11 when you can explain what `SERIAL` actually creates behind the scenes in
PostgreSQL, and how Oracle's modern `IDENTITY` syntax relates to its traditional `SEQUENCE` +
trigger pattern.
