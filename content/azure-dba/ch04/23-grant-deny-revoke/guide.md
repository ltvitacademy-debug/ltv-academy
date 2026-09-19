# Lesson 23 — GRANT, DENY & REVOKE

**Chapter 4 · Authentication & Authorization · Lesson 5 of 7**

## What you'll learn

- `GRANT` — allow a permission
- `DENY` — explicitly block a permission, and why it always wins over `GRANT`
- `REVOKE` — remove a permission that was explicitly granted or denied
- Why `REVOKE` is not the opposite of either `GRANT` or `DENY`

## New syntax, not a recap

T-SQL Development's 118 lessons never covered `GRANT`, `DENY`, or
`REVOKE` — that course stayed entirely on the query-writing side of
SQL. This is genuinely new syntax, and it's some of the most
consequential T-SQL a DBA writes, because getting the precedence rule
wrong grants (or blocks) access silently.

## GRANT — the allow

```sql
GRANT SELECT ON Sales.Orders TO reporting_app;
GRANT SELECT, INSERT ON Sales.OrderLog TO order_service;
```

`GRANT` gives a security principal (Lesson 21) permission to do
something. On its own, this is the entire story — the principal now
has that access, through this grant or through any role membership
that also grants it.

## DENY — the explicit block that always wins

```sql
DENY SELECT ON Sales.SalaryDetails TO reporting_app;
```

`DENY` is not "don't grant" — it's an **explicit block** that
overrides *every other path* to that permission, including role
membership. If `reporting_app` is a member of `db_datareader` (which
grants `SELECT` on every table) but has an explicit `DENY SELECT` on
`Sales.SalaryDetails`, the deny wins. Full stop.

```
db_datareader membership  -->  GRANTs SELECT on Sales.SalaryDetails
Explicit DENY SELECT       -->  BLOCKS SELECT on Sales.SalaryDetails
                                 ------------------------------------
                                 Result: SELECT is BLOCKED
```

This is exactly why `DENY` is the tool for "everyone in this broad
role except this one sensitive table" — a single `DENY` statement
overrides the role's broad `GRANT` without touching the role
membership at all.

## REVOKE — remove, don't flip

```sql
REVOKE SELECT ON Sales.Orders FROM reporting_app;
```

`REVOKE` **removes** an explicit `GRANT` or an explicit `DENY` — it
does not grant the opposite of whatever was there, and it does not
touch permissions the principal has through some *other* path (a
role membership, for example).

```
Before: GRANT SELECT ON Sales.Orders TO reporting_app;
        REVOKE SELECT ON Sales.Orders FROM reporting_app;
After:  reporting_app has NO explicit permission here at all --
        NOT a denial, just back to whatever other paths apply
```

If `reporting_app` also happens to be in `db_datareader`, revoking the
explicit `GRANT` leaves the role's `SELECT` access completely intact
— `REVOKE` only undoes the one explicit statement, nothing else.

## The precedence rule, in one line

**`DENY` beats `GRANT`, from any source, always. `REVOKE` just erases
one explicit statement — it doesn't grant or deny anything by
itself.**

| Statement | What it does | Beats what |
|---|---|---|
| `GRANT` | Allows a permission | Nothing — can be beaten by `DENY` |
| `DENY` | Explicitly blocks a permission | Every `GRANT`, from any source (direct or role) |
| `REVOKE` | Removes an explicit `GRANT` or `DENY` | Nothing — reveals whatever other path remains |

## Key terms

| Term | Meaning |
|---|---|
| `GRANT` | Allows a security principal a specific permission |
| `DENY` | Explicitly blocks a permission, overriding every GRANT including through roles |
| `REVOKE` | Removes an explicit GRANT or DENY, without implying the opposite |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: if a
user is in a role that grants `SELECT` on a table, and also has an
explicit `DENY SELECT` on that same table, what happens — and what
does `REVOKE` do differently from both `GRANT` and `DENY`?
