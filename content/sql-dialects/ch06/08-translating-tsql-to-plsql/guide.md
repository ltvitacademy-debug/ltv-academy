# Lesson 42 — Translating a Real T-SQL Stored Procedure into PL/SQL

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 8 of 8**

## What you'll learn

- A complete, realistic T-SQL stored procedure, translated into idiomatic PL/SQL line by line
- Every decision point: parameters, variables, control flow, returning a result set, error handling
- How the last seven lessons' concepts (blocks, REF CURSORs, exception handling) combine in one real example
- A checklist you can reuse for your own T-SQL-to-PL/SQL translations

## The starting point: a real T-SQL stored procedure

```sql
CREATE PROCEDURE dbo.GetCustomerOrderSummary
    @CustomerId INT
AS
BEGIN
    DECLARE @OrderCount INT;
    DECLARE @TotalSpent DECIMAL(10,2);

    SELECT @OrderCount = COUNT(*), @TotalSpent = SUM(TotalAmount)
    FROM Orders
    WHERE CustomerId = @CustomerId;

    IF @OrderCount = 0
    BEGIN
        PRINT 'No orders found for this customer.';
        RETURN;
    END

    SELECT OrderId, OrderDate, TotalAmount
    FROM Orders
    WHERE CustomerId = @CustomerId
    ORDER BY OrderDate DESC;
END;
```

This procedure takes a customer ID, checks whether that customer has any orders at all, prints a
message and exits early if not, and otherwise returns the full list of that customer's orders as a
result set — a realistic, everyday T-SQL pattern. Let's translate it decision by decision.

## Decision 1: `@CustomerId INT` becomes a bare parameter name with `IN`

```sql
-- T-SQL
CREATE PROCEDURE dbo.GetCustomerOrderSummary
    @CustomerId INT
AS

-- PL/SQL
CREATE OR REPLACE PROCEDURE get_customer_order_summary (
    p_customer_id IN NUMBER
) IS
```

T-SQL parameters keep their `@` sigil throughout the whole procedure body. PL/SQL parameters drop
it entirely, are explicitly marked `IN` (or `OUT`, or `IN OUT`), and by convention get a `p_` prefix
to visually distinguish them from local variables inside the body.

## Decision 2: `DECLARE @var` becomes the block-level `DECLARE` section

```sql
-- T-SQL: DECLARE statements scattered through the body
DECLARE @OrderCount INT;
DECLARE @TotalSpent DECIMAL(10,2);

-- PL/SQL: every local variable lives in ONE DECLARE section (Lesson 35),
-- before BEGIN — IS plays the role DECLARE plays in an anonymous block
CREATE OR REPLACE PROCEDURE get_customer_order_summary (
    p_customer_id IN NUMBER
) IS
    v_order_count NUMBER;
    v_total_spent NUMBER;
BEGIN
```

T-SQL lets you `DECLARE` a variable anywhere in the batch, even mid-procedure. PL/SQL requires
every local variable to be declared up front, in the single `DECLARE`-equivalent section (`IS`,
here, for a named procedure) that comes before `BEGIN` — this is the block structure from Lesson 35
in action.

## Decision 3: `IF ... BEGIN...END` becomes `IF ... THEN ... END IF`

```sql
-- T-SQL
IF @OrderCount = 0
BEGIN
    PRINT 'No orders found for this customer.';
    RETURN;
END

-- PL/SQL
IF v_order_count = 0 THEN
    DBMS_OUTPUT.PUT_LINE('No orders found for this customer.');
    RETURN;
END IF;
```

T-SQL's `IF` needs `BEGIN...END` only when the branch has more than one statement. PL/SQL's `IF`
always needs `THEN`, and always closes with `END IF` (two words) regardless of how many statements
are inside — there's no equivalent of T-SQL's single-statement-doesn't-need-wrapping shortcut.
`PRINT` becomes `DBMS_OUTPUT.PUT_LINE` (Lesson 37), and `RETURN` works the same way in both: exit
the procedure immediately.

## Decision 4: returning a result set needs an explicit REF CURSOR OUT parameter

```sql
-- T-SQL: the final bare SELECT just streams back to the caller, for free
SELECT OrderId, OrderDate, TotalAmount
FROM Orders
WHERE CustomerId = @CustomerId
ORDER BY OrderDate DESC;

-- PL/SQL: needs an explicit OUT parameter, opened for the query (Lesson 38)
CREATE OR REPLACE PROCEDURE get_customer_order_summary (
    p_customer_id IN  NUMBER,
    p_orders      OUT SYS_REFCURSOR
) IS
```

This is the single biggest structural change the translation requires. T-SQL's free "bare `SELECT`
streams to the caller" behavior has no PL/SQL equivalent — the procedure's signature itself must
change to add a `SYS_REFCURSOR OUT` parameter, which gets `OPEN`ed for the final query instead of
just running it bare.

## The complete translated procedure

```sql
CREATE OR REPLACE PROCEDURE get_customer_order_summary (
    p_customer_id IN  NUMBER,
    p_orders      OUT SYS_REFCURSOR
) IS
    v_order_count NUMBER;
    v_total_spent NUMBER;
BEGIN
    SELECT COUNT(*), SUM(total_amount)
    INTO v_order_count, v_total_spent
    FROM orders
    WHERE customer_id = p_customer_id;

    IF v_order_count = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No orders found for this customer.');
        RETURN;
    END IF;

    OPEN p_orders FOR
        SELECT order_id, order_date, total_amount
        FROM orders
        WHERE customer_id = p_customer_id
        ORDER BY order_date DESC;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Unexpected: no aggregate row returned.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error in get_customer_order_summary: ' || SQLERRM);
END get_customer_order_summary;
/
```

Notice the added `EXCEPTION` section (Lesson 35) with a `WHEN OTHERS` handler — the original T-SQL
version had no explicit error handling at all (no `TRY...CATCH`), but a production-quality PL/SQL
translation should add one, since an unhandled PL/SQL exception behaves differently from an
unhandled T-SQL error and it costs nothing to be defensive here.

## Your reusable translation checklist

| T-SQL | PL/SQL |
|---|---|
| `@param` | bare name, `IN`/`OUT`/`IN OUT`, usually `p_` prefixed |
| `DECLARE @var` scattered through the body | one `DECLARE`/`IS` section before `BEGIN` |
| `IF ... BEGIN...END` | `IF ... THEN ... END IF` (always, regardless of statement count) |
| `PRINT` | `DBMS_OUTPUT.PUT_LINE` (plus `SET SERVEROUTPUT ON`) |
| bare `SELECT` returning a result set | `SYS_REFCURSOR OUT` parameter, `OPEN ... FOR` |
| `TRY...CATCH` (if present) | `EXCEPTION` section with `WHEN ... THEN` handlers |

## Key terms

| Term | Meaning |
|---|---|
| Translation checklist | The six structural decision points this lesson walks through for any T-SQL-to-PL/SQL conversion |
| `p_` prefix | Common PL/SQL naming convention distinguishing parameters from local variables |

## Lab

Pick a T-SQL stored procedure you've written before (or write a simple one with a parameter, a
local variable, an `IF` check, and a final `SELECT`) and translate it into PL/SQL using the
checklist above. Add a `SYS_REFCURSOR OUT` parameter for the result set and an `EXCEPTION` section
with a `WHEN OTHERS` handler, even if the original T-SQL version had neither.

## Check yourself

You've completed Chapter 6 when you can translate, without looking at a reference: a T-SQL
parameter declaration, a scattered `DECLARE`, an `IF...BEGIN...END`, a `PRINT` statement, and a
bare result-set-returning `SELECT`, each into its correct PL/SQL equivalent.
