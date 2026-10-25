# Lesson 36 — PL/SQL Packages: A Concept T-SQL Doesn't Have

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 2 of 8**

## What you'll learn

- What a PL/SQL package is: a named group of procedures, functions, variables, cursors, and types
- The split between a package SPECIFICATION (the public interface) and a package BODY (the implementation)
- Why a package body can change without forcing callers to recompile
- Private helper procedures that exist only inside the body, never exposed
- Package-level variables that persist for the life of a session — genuinely unique to Oracle
- Why T-SQL has nothing that maps to this 1:1

## The specification: the public interface

```sql
CREATE OR REPLACE PACKAGE order_pkg AS
  -- Public: anything listed here is callable from outside the package
  FUNCTION get_order_total (p_order_id IN NUMBER) RETURN NUMBER;
  PROCEDURE apply_discount (p_order_id IN NUMBER, p_percent IN NUMBER);
  g_last_order_checked NUMBER;  -- a public package variable
END order_pkg;
/
```

A package specification (sometimes just "package spec") declares what's visible to code outside the
package — the function and procedure signatures, plus any public variables, cursors, or types. It's
the contract: callers write `order_pkg.get_order_total(1001)` and never need to know how that
function is actually implemented.

## The body: the actual implementation

```sql
CREATE OR REPLACE PACKAGE BODY order_pkg AS

  -- Private: NOT listed in the spec, so nothing outside this package can call it
  FUNCTION compute_tax (p_subtotal IN NUMBER) RETURN NUMBER IS
  BEGIN
    RETURN p_subtotal * 0.08;
  END compute_tax;

  FUNCTION get_order_total (p_order_id IN NUMBER) RETURN NUMBER IS
    v_subtotal NUMBER;
  BEGIN
    SELECT SUM(unit_price * quantity) INTO v_subtotal
    FROM order_items WHERE order_id = p_order_id;
    g_last_order_checked := p_order_id;
    RETURN v_subtotal + compute_tax(v_subtotal);
  END get_order_total;

  PROCEDURE apply_discount (p_order_id IN NUMBER, p_percent IN NUMBER) IS
  BEGIN
    UPDATE orders SET discount_pct = p_percent WHERE order_id = p_order_id;
  END apply_discount;

END order_pkg;
/
```

The body contains the real code: every procedure and function declared in the spec gets its full
implementation here, and the body can also contain entirely **private** helpers — like
`compute_tax` above — that never appear in the spec and so can never be called from outside the
package. Crucially, you can rewrite the body (fix a bug in `compute_tax`, change the tax rate
logic entirely) and **recompile only the body** — every caller, and the spec itself, stays
untouched. That separation between a stable public contract and a freely-changeable implementation
is the whole point of splitting spec from body.

## Package variables persist for the entire session

```sql
BEGIN
  DBMS_OUTPUT.PUT_LINE(order_pkg.get_order_total(1001));
  -- g_last_order_checked is now 1001, and it STAYS 1001
  -- for the rest of this database session, even across
  -- completely separate calls, until something sets it again
  DBMS_OUTPUT.PUT_LINE(order_pkg.g_last_order_checked);
END;
/
```

This is a genuinely unique Oracle capability: a package-level variable like `g_last_order_checked`
is initialized once, the first time *anything* in the session references the package, and then
keeps its value for the life of that session — surviving across many separate calls to the
package's procedures and functions, as if the package itself were a small piece of session-scoped
state. There's no cleanup step required; it simply persists until the session ends (or the package
is explicitly reset).

## Where T-SQL has nothing directly equivalent

T-SQL has **no** construct that maps onto a package. The closest it gets is grouping related
stored procedures and functions in the same schema (e.g. `dbo.GetOrderTotal`, `dbo.ApplyDiscount`)
or, loosely, a single `.sql` file containing several related objects — but that's just an
organizational convention, not a language feature. Specifically, T-SQL gives you none of these:

- **No spec/body separation.** Every T-SQL procedure's definition *is* its public interface; there's
  no way to change an implementation without the "contract" being the exact same object you just
  altered.
- **No package-level private state.** T-SQL has no construct that's private to a group of procedures
  but inaccessible from outside it, the way `compute_tax` is private to `order_pkg`.
- **No package-level session-persistent variables.** This is the biggest gap. T-SQL has no built-in
  way for a group of procedures to share a variable that automatically persists for the life of a
  session without you managing it yourself (e.g. via a temp table, `CONTEXT_INFO`, or `SESSION_CONTEXT`
  — all workarounds, none a true language-level package variable).

## Key terms

| Term | Meaning |
|---|---|
| Package specification | The public interface: procedure/function signatures, public variables, visible to callers |
| Package body | The implementation: full code for every spec'd routine, plus private helpers not in the spec |
| Private package member | A procedure, function, or variable that exists only in the body, never exposed |
| Package variable | A variable declared at package level that persists for the life of the database session |

## Lab

Write a package `counter_pkg` with a spec exposing one procedure, `increment`, and one function,
`get_count`. In the body, add a private package variable `g_count NUMBER := 0;` that `increment`
adds 1 to and `get_count` returns. Call `increment` three times from an anonymous block, then call
`get_count` and confirm it returns 3 — proving the variable persisted across three separate calls.

## Check yourself

You're ready for Lesson 37 when you can answer, without looking: what's the difference between a
package specification and a package body, what can live in the body that can never live in the
spec, and why can't T-SQL replicate a package-level variable's session-persistent behavior with a
plain stored procedure?
