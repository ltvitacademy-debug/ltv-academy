# Lesson 35 — PL/SQL Blocks: DECLARE, BEGIN, EXCEPTION, END

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 1 of 8**

## What you'll learn

- The four-part PL/SQL block structure: `DECLARE`, `BEGIN`, `EXCEPTION`, `END`
- Why every PL/SQL program — procedure, function, trigger, package body — is built from this one shape
- How this is a genuinely different mental model from T-SQL
- Blocks can nest, each with its own local scope
- A first look at the `EXCEPTION` section as part of the block itself

## The four-part shape every PL/SQL program follows

```sql
DECLARE
  v_employee_count NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_employee_count
  FROM employees
  WHERE department_id = 90;

  DBMS_OUTPUT.PUT_LINE('Count: ' || v_employee_count);
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('No matching rows.');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Unexpected error: ' || SQLERRM);
END;
/
```

This is the fundamental unit of PL/SQL code: an optional `DECLARE` section for variables, cursors,
and local types; a required `BEGIN ... END;` section holding the executable statements; and an
optional `EXCEPTION` section for error handlers, placed *before* the final `END;`. Every single
PL/SQL program you will ever write — a one-off script, a stored procedure, a function, a trigger
body, even each procedure inside a package — is built from this same four-part shape.

## `BEGIN...END` is required; `DECLARE` and `EXCEPTION` are optional

```sql
-- The minimal legal PL/SQL block: no DECLARE, no EXCEPTION
BEGIN
  DBMS_OUTPUT.PUT_LINE('Hello from the smallest possible block.');
END;
/
```

`BEGIN` and `END` are the only parts that can never be omitted. Skip `DECLARE` when a block needs
no local variables; skip `EXCEPTION` when you're content to let an error propagate to whatever
called the block. But the moment you need a local variable, it goes in `DECLARE` — there's no way
to declare a variable inline inside `BEGIN...END` the way some other languages allow.

## Blocks nest, and each one gets its own scope

```sql
DECLARE
  v_outer VARCHAR2(20) := 'outer value';
BEGIN
  DBMS_OUTPUT.PUT_LINE('Before inner block: ' || v_outer);

  DECLARE
    v_inner VARCHAR2(20) := 'inner value';
  BEGIN
    DBMS_OUTPUT.PUT_LINE('Inside inner block: ' || v_outer || ' / ' || v_inner);
  END;
  -- v_inner no longer exists here — it was scoped to the inner block only

  DBMS_OUTPUT.PUT_LINE('After inner block: ' || v_outer);
END;
/
```

A block can contain another complete block as one of its executable statements. The inner block's
`DECLARE` section creates variables that exist *only* for the life of that inner block — once its
`END;` runs, `v_inner` is gone, while `v_outer` (declared in the surrounding block) remains visible
the whole time. This gives you a genuine, language-level way to scope temporary variables tightly
around just the statements that need them.

## Where T-SQL genuinely has no equivalent

T-SQL has a `BEGIN...END` keyword pair too, but it means something much narrower: it's purely a
way to group multiple statements so they count as one unit inside an `IF`, a `WHILE` loop, or a
stored procedure body. It does **not** carry its own variable scope — a `DECLARE @x INT` inside a
T-SQL `BEGIN...END` is still scoped to the whole batch or procedure, not to that `BEGIN...END`
specifically. And `TRY...CATCH` in T-SQL is a separate, independent construct you layer on top; it
isn't a structural part of `BEGIN...END` the way `EXCEPTION` is a structural part of a PL/SQL
block. The closest T-SQL gets to PL/SQL's block is the whole stored-procedure body — but T-SQL
never gives you PL/SQL's *nested*, independently-scoped sub-blocks inside a single procedure. This
is one of the clearest examples of a different underlying mental model, not just different syntax.

## Every named PL/SQL program is a block with a name wrapped around it

```sql
CREATE OR REPLACE PROCEDURE show_employee_count (p_dept_id IN NUMBER) IS
  v_count NUMBER;  -- this IS section is exactly a DECLARE section, just renamed
BEGIN
  SELECT COUNT(*) INTO v_count FROM employees WHERE department_id = p_dept_id;
  DBMS_OUTPUT.PUT_LINE('Count: ' || v_count);
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END show_employee_count;
/
```

Notice the procedure body is exactly the block you've been looking at all lesson, just with a name
and a parameter list attached, and `IS` standing in for `DECLARE` (both introduce the same kind of
section — Oracle just uses `IS` once a name is involved). Functions, trigger bodies, and every
procedure inside a package body all follow this identical pattern. Once you can read one PL/SQL
block, you can read the skeleton of anything PL/SQL.

## Key terms

| Term | Meaning |
|---|---|
| PL/SQL block | The DECLARE / BEGIN / EXCEPTION / END structure underlying every PL/SQL program |
| `DECLARE` section | Optional; holds local variables, cursors, and types |
| `EXCEPTION` section | Optional; holds error handlers, placed before the block's final `END;` |
| Nested block | A complete block used as a statement inside another block's `BEGIN...END` |

## Lab

Write an anonymous block that declares a `NUMBER` variable, sets it from a `SELECT COUNT(*)` against
any table you have access to, then nests a second block inside the first that declares its own
`VARCHAR2` variable and prints both values together. Add an `EXCEPTION` section to the outer block
that catches `WHEN OTHERS` and prints `SQLERRM`.

## Check yourself

You're ready for Lesson 36 when you can answer, without looking: what are the three sections of a
PL/SQL block and which one is never optional, and why doesn't T-SQL's `BEGIN...END` give you the
same variable-scoping behavior as a PL/SQL block?
