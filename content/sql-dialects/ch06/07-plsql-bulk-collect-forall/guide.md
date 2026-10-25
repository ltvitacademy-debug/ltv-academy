# Lesson 41 — Bulk Operations: BULK COLLECT and FORALL

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 7 of 8**

## What you'll learn

- The context-switch overhead these two features exist to eliminate
- `SELECT ... BULK COLLECT INTO` — fetching an entire result set in one context switch
- `FORALL` — bulk DML across a whole collection in one context switch
- Why this is a genuinely well-known, real Oracle performance best practice ("bulk binding")
- The T-SQL parallel: preferring set-based operations over cursor loops

## The problem: row-by-row means constant context switching

```sql
-- Row-by-row with an ordinary cursor loop: SLOW for large result sets
DECLARE
  CURSOR c_employees IS SELECT employee_id FROM employees WHERE department_id = 90;
  v_id employees.employee_id%TYPE;
BEGIN
  FOR r IN c_employees LOOP
    -- EVERY iteration here switches between the PL/SQL engine and the SQL engine
    UPDATE employees SET bonus = bonus + 100 WHERE employee_id = r.employee_id;
  END LOOP;
  COMMIT;
END;
/
```

Every time PL/SQL code hands a statement to the SQL engine and gets control back, that's a context
switch — and each one carries real overhead. A cursor loop that fetches one row, then runs one DML
statement, then fetches the next row, repeats that switch thousands of times for a large result
set. `BULK COLLECT` and `FORALL` exist specifically to collapse many of those switches into one.

## BULK COLLECT: fetch an entire result set in one switch

```sql
DECLARE
  TYPE t_id_list IS TABLE OF employees.employee_id%TYPE;
  v_ids t_id_list;
BEGIN
  SELECT employee_id
  BULK COLLECT INTO v_ids
  FROM employees
  WHERE department_id = 90;

  DBMS_OUTPUT.PUT_LINE('Fetched ' || v_ids.COUNT || ' rows in one round trip.');
END;
/
```

`SELECT ... BULK COLLECT INTO` fetches the **entire** result set into a collection (an Associative
Array or Nested Table, from Lesson 39) in a single context switch, instead of one switch per row
the way an ordinary cursor `FETCH` loop works. The collection then holds every row in memory, ready
for further processing entirely inside PL/SQL.

## FORALL: bulk DML across a whole collection in one switch

```sql
DECLARE
  TYPE t_id_list IS TABLE OF employees.employee_id%TYPE;
  v_ids t_id_list;
BEGIN
  SELECT employee_id BULK COLLECT INTO v_ids
  FROM employees WHERE department_id = 90;

  FORALL i IN v_ids.FIRST .. v_ids.LAST
    UPDATE employees SET bonus = bonus + 100 WHERE employee_id = v_ids(i);

  COMMIT;
  DBMS_OUTPUT.PUT_LINE('Updated ' || SQL%ROWCOUNT || ' rows in one bulk DML operation.');
END;
/
```

`FORALL` sends a whole batch of `INSERT`, `UPDATE`, or `DELETE` statements — one per collection
element — to the SQL engine as a single bulk operation, instead of looping through them
statement-by-statement. Combined with `BULK COLLECT` above, the entire fetch-then-update workflow
drops from thousands of context switches down to just two.

## This is "bulk binding" — a real, well-known Oracle performance practice

```sql
-- The anti-pattern this whole lesson exists to fix
FOR r IN (SELECT employee_id FROM employees WHERE department_id = 90) LOOP
  UPDATE employees SET bonus = bonus + 100 WHERE employee_id = r.employee_id;
END LOOP;  -- one context switch PER ROW, both for the fetch and the update
```

This pattern — collapsing row-by-row cursor processing into `BULK COLLECT` plus `FORALL` — is
called **bulk binding**, and it's one of the most widely documented, genuinely real PL/SQL
performance recommendations, not an obscure trick. Oracle's own PL/SQL performance guidance
consistently points developers toward it whenever a procedure is doing substantial row-by-row work
against meaningful data volumes.

## The T-SQL parallel you already know

The reasoning here is the same reasoning behind a core T-SQL habit you likely already have: you
prefer a set-based `INSERT ... SELECT`, or a table-valued parameter passed to a stored procedure,
over looping through rows one at a time with a T-SQL cursor — because a cursor loop in T-SQL pays
its own kind of per-row overhead. `BULK COLLECT`/`FORALL` is PL/SQL's version of that same
underlying lesson: minimize the number of round trips between the procedural layer and the SQL
engine, whichever platform you're on.

## Key terms

| Term | Meaning |
|---|---|
| Context switch | The overhead of control passing between the PL/SQL engine and the SQL engine |
| `BULK COLLECT` | Fetches an entire result set into a collection in one context switch |
| `FORALL` | Sends a batch of INSERT/UPDATE/DELETE statements across a collection in one context switch |
| Bulk binding | The overall technique of using BULK COLLECT and FORALL together to reduce context switches |

## Lab

Write a block that uses `BULK COLLECT` to fetch every `employee_id` from one department into a
collection, then uses `FORALL` to give each of those employees a flat bonus in a single bulk UPDATE.
Print `SQL%ROWCOUNT` afterward to confirm how many rows the bulk operation touched.

## Check yourself

You're ready for Lesson 42 when you can answer, without looking: what problem do `BULK COLLECT`
and `FORALL` solve, how many context switches does a `BULK COLLECT` + `FORALL` pair cost compared
to an equivalent cursor loop, and what's the T-SQL habit this whole lesson parallels?
