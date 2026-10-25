# Lesson 37 — Anonymous Blocks and DBMS_OUTPUT

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 3 of 8**

## What you'll learn

- What an anonymous block is: a PL/SQL block with no name, run directly
- Why this is the rough equivalent of running a T-SQL batch ad hoc in SSMS
- `DBMS_OUTPUT.PUT_LINE` as Oracle's rough equivalent of `PRINT`
- The `SET SERVEROUTPUT ON` trip-up every first-timer hits
- When you'd reach for an anonymous block versus a real stored procedure

## An anonymous block is just a block with no name

```sql
SET SERVEROUTPUT ON;

DECLARE
  v_order_count NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_order_count FROM orders;
  DBMS_OUTPUT.PUT_LINE('Orders in the system: ' || v_order_count);
END;
/
```

Every block you saw in Lesson 35 that wasn't attached to a `CREATE PROCEDURE` or `CREATE FUNCTION`
was already an anonymous block — this lesson just names the pattern explicitly. It's the PL/SQL
equivalent of what you already do constantly in T-SQL: opening SSMS, typing a few statements, and
hitting Execute without ever wrapping them in a stored procedure. You're not creating any permanent
database object; the block compiles, runs once, and is gone.

## `DBMS_OUTPUT.PUT_LINE` is Oracle's rough equivalent of `PRINT`

```sql
BEGIN
  DBMS_OUTPUT.PUT_LINE('Starting validation...');
  DBMS_OUTPUT.PUT_LINE('Step 1 complete.');
  DBMS_OUTPUT.PUT_LINE('Step 2 complete.');
END;
/
```

```sql
-- The T-SQL equivalent you already know
PRINT 'Starting validation...';
PRINT 'Step 1 complete.';
PRINT 'Step 2 complete.';
```

`DBMS_OUTPUT` is a built-in Oracle package (packages were Lesson 36 — this is a real-world example
of one), and `PUT_LINE` is the procedure inside it you'll use constantly for debug output: printing
a variable's value, confirming a branch of an `IF` ran, or tracing how far a script got before it
failed. It's not meant for returning real result sets to an application — it's a developer's
debugging tool, exactly like `PRINT` is in T-SQL.

## The trip-up: you must turn output ON first

```sql
-- Without this, DBMS_OUTPUT.PUT_LINE runs with NO error,
-- but you will see NOTHING printed
SET SERVEROUTPUT ON;

BEGIN
  DBMS_OUTPUT.PUT_LINE('Can you see this?');
END;
/
```

This is the single most common first-timer trip-up with `DBMS_OUTPUT`: the block runs successfully,
`PUT_LINE` is called with no error, and yet nothing appears on screen — because the client tool
(SQL*Plus, SQL Developer, etc.) only *displays* that buffered output when you've told it to. In
SQL*Plus or SQL Developer's worksheet, that's `SET SERVEROUTPUT ON`, typically run once at the top
of a session. T-SQL has no equivalent toggle — `PRINT` output always shows up in SSMS's Messages
tab with nothing to turn on first, which is exactly why this step catches so many T-SQL developers
off guard the first time they try it in Oracle.

## Anonymous blocks versus a real stored procedure

```sql
-- Anonymous block: one-off, not saved, good for debugging and migrations
BEGIN
  UPDATE employees SET salary = salary * 1.03 WHERE department_id = 50;
  DBMS_OUTPUT.PUT_LINE('Rows updated: ' || SQL%ROWCOUNT);
END;
/

-- vs. a named procedure: saved, reusable, callable by other code
CREATE OR REPLACE PROCEDURE give_raise (p_dept_id IN NUMBER, p_pct IN NUMBER) IS
BEGIN
  UPDATE employees SET salary = salary * (1 + p_pct / 100) WHERE department_id = p_dept_id;
END give_raise;
/
```

Reach for an anonymous block for ad hoc data fixes, one-time migrations, quick debugging, or
testing a snippet of logic before committing it to a real procedure — the same situations where you
already run a raw T-SQL batch instead of creating a stored procedure. Reach for a named procedure
(Lesson 28 covered writing these) the moment the logic needs to be reusable, called from an
application, or scheduled to run again later.

## Key terms

| Term | Meaning |
|---|---|
| Anonymous block | A PL/SQL block with no name, compiled and run once, never saved as a database object |
| `DBMS_OUTPUT.PUT_LINE` | Built-in procedure for printing debug output; the rough equivalent of T-SQL's `PRINT` |
| `SET SERVEROUTPUT ON` | Client-tool setting that must be enabled before buffered `DBMS_OUTPUT` text actually displays |

## Lab

Write an anonymous block (remember `SET SERVEROUTPUT ON;` first) that declares a variable, runs a
`SELECT COUNT(*)` against any table, and prints the result with `DBMS_OUTPUT.PUT_LINE`. Then
comment out the `SET SERVEROUTPUT ON;` line, run it again, and confirm for yourself that the block
still succeeds but nothing prints — that's the trip-up in action.

## Check yourself

You're ready for Lesson 38 when you can answer, without looking: what's the PL/SQL equivalent of
just running a T-SQL batch in SSMS, what does `DBMS_OUTPUT.PUT_LINE` correspond to in T-SQL, and
what one setting do you need before you'll actually see its output?
