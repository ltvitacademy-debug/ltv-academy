# Lesson 38 — REF CURSORs in PL/SQL

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 4 of 8**

## What you'll learn

- Why Oracle procedures can't just "return a result set" the way T-SQL procedures do
- What a REF CURSOR actually is: a cursor *variable*, not a fixed, named cursor
- `SYS_REFCURSOR`, the generic weakly-typed ref cursor type
- Returning a REF CURSOR from a procedure's `OUT` parameter
- Opening the same REF CURSOR for different queries at runtime

## The problem: Oracle procedures don't auto-stream results back

```sql
-- T-SQL: a bare SELECT inside a procedure just streams
-- its result set straight back to whatever called it
CREATE PROCEDURE dbo.GetActiveCustomers
AS
BEGIN
  SELECT CustomerId, CustomerName FROM Customers WHERE IsActive = 1;
END;
```

In T-SQL, you've never had to think about this: a plain `SELECT` inside a stored procedure just
works as a result set the caller receives. Oracle procedures do not behave this way — a `SELECT`
by itself inside a PL/SQL procedure has nowhere to "go." Cursors (covered side by side with T-SQL
in Lesson 31) let you process a result set row by row *inside* PL/SQL, but that's not the same
thing as handing a result set back out to whatever called the procedure. Oracle needs a completely
different, explicit mechanism for that: the REF CURSOR.

## A REF CURSOR is a cursor *variable*

```sql
DECLARE
  v_cursor SYS_REFCURSOR;
  v_id NUMBER;
  v_name VARCHAR2(100);
BEGIN
  OPEN v_cursor FOR SELECT customer_id, customer_name
                    FROM customers WHERE is_active = 1;

  LOOP
    FETCH v_cursor INTO v_id, v_name;
    EXIT WHEN v_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(v_id || ' - ' || v_name);
  END LOOP;

  CLOSE v_cursor;
END;
/
```

An ordinary explicit cursor (Lesson 31) is bound to one fixed query, declared up front. A REF
CURSOR is different: it's a *variable* that can hold a reference to any query's result set, opened
for that query at runtime with `OPEN ... FOR`. `SYS_REFCURSOR` is the generic, weakly-typed ref
cursor data type most developers reach for — it can be opened for any query shape, which is exactly
what makes it flexible enough to pass around.

## Returning a REF CURSOR as an OUT parameter — Oracle's answer to "return a result set"

```sql
CREATE OR REPLACE PROCEDURE get_active_customers (
  p_customers OUT SYS_REFCURSOR
) IS
BEGIN
  OPEN p_customers FOR
    SELECT customer_id, customer_name
    FROM customers
    WHERE is_active = 1;
END get_active_customers;
/

-- Calling it from another PL/SQL block:
DECLARE
  v_cursor SYS_REFCURSOR;
  v_id NUMBER;
  v_name VARCHAR2(100);
BEGIN
  get_active_customers(v_cursor);
  LOOP
    FETCH v_cursor INTO v_id, v_name;
    EXIT WHEN v_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(v_id || ' - ' || v_name);
  END LOOP;
  CLOSE v_cursor;
END;
/
```

This is the real answer to "how does an Oracle procedure return a result set to a caller": give it
an `OUT` parameter typed `SYS_REFCURSOR`, `OPEN` that parameter `FOR` the query inside the
procedure, and the caller — whether that's another PL/SQL block, or a Java/.NET/Python application
using an Oracle driver — receives a live, open cursor it can fetch rows from. This is the direct
functional equivalent of what T-SQL gives you for free with a bare `SELECT`; Oracle just requires
you to be explicit about it.

## The same REF CURSOR variable, opened for different queries

```sql
DECLARE
  v_cursor SYS_REFCURSOR;
  v_use_detailed BOOLEAN := TRUE;
BEGIN
  IF v_use_detailed THEN
    OPEN v_cursor FOR SELECT customer_id, customer_name, email FROM customers;
  ELSE
    OPEN v_cursor FOR SELECT customer_id, customer_name FROM customers;
  END IF;
  -- whatever processes v_cursor from here doesn't need to know
  -- which query actually produced it
END;
/
```

Because a REF CURSOR is a variable, not a fixed declaration, the *same* variable can be opened for
entirely different queries depending on runtime logic — a genuinely flexible capability an ordinary
named cursor doesn't give you, since a named cursor's query is fixed at declaration time.

## Key terms

| Term | Meaning |
|---|---|
| REF CURSOR | A cursor variable that can be opened for different queries at runtime and passed around |
| `SYS_REFCURSOR` | Oracle's generic, weakly-typed ref cursor data type |
| `OPEN ... FOR` | Associates a REF CURSOR variable with a specific query at runtime |
| `OUT` parameter | A procedure parameter used here to hand a REF CURSOR's result set back to the caller |

## Lab

Write a procedure `get_orders_for_customer` that takes a customer ID `IN` parameter and a
`SYS_REFCURSOR` `OUT` parameter, opens the out parameter for a query of that customer's orders,
then call it from an anonymous block that fetches and prints every row with `DBMS_OUTPUT.PUT_LINE`.

## Check yourself

You're ready for Lesson 39 when you can answer, without looking: why can't an Oracle procedure's
bare `SELECT` return a result set the way a T-SQL procedure's can, what is a REF CURSOR, and how do
you use one to hand a result set back from a procedure?
