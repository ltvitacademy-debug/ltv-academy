# Lesson 9 — Secure Views

**Chapter 2 · Data Protection · Lesson 9 of 25**

## What you'll learn

- What `CREATE SECURE VIEW` adds on top of an ordinary view
- Why a regular view's definition being visible can itself be a leak
- The syntax for creating, checking, and toggling a view's secure flag
- The trade-off a secure view makes against query optimization

## A regular view's definition isn't private

Everything so far in this chapter — masking policies, row access policies — controls data. A **secure view** controls something different: the view's own **definition**. By default, a view's `SELECT` statement is visible to anyone who can run `SHOW VIEWS` or `GET_DDL` against it, even if they have no ability to query the underlying table directly. That can itself be a leak — a `WHERE` clause can reveal a secret business threshold, or expose table and column names a tenant shouldn't even know exist.

Here's an ordinary view's detail page in Snowsight, for context on what a view object looks like generally:

![A view's detail page in Snowsight, labeled "View" with a database icon, showing View Details, Columns, and Data Preview tabs, with the Data Preview tab active.](/courses/snowflake-data-governance/ch02/09-secure-views/view-object-in-snowsight.png)
*Honestly: this is an ordinary (non-secure) view's detail page — a secure view looks identical here. The SECURE behavior only shows up in what other roles can and can't see about this view's definition, which isn't something a single screen can capture.*

## Creating a secure view

The syntax is just `CREATE SECURE VIEW` instead of `CREATE VIEW` — everything else about defining a view stays the same:

```sql
CREATE OR REPLACE SECURE VIEW widgets_view AS
  SELECT w.*
  FROM widgets AS w
  WHERE w.id IN (
    SELECT widget_id
    FROM widget_access_rules AS a
    WHERE upper(role_name) = CURRENT_ROLE()
  );
```

This is a real pattern from Snowflake's own documentation: a multi-tenant view where `widget_access_rules` decides which rows each role can see — conceptually similar to the row access policy pattern from Lesson 8, but expressed directly inside a view's `WHERE` clause instead of as a separate policy object. Making it `SECURE` means a role without the right to inspect the view can't see this `WHERE` clause, the `widget_access_rules` table name, or any of this logic — they can only query the view and get results, the same as anyone else.

## Checking and toggling the secure flag

```sql
SHOW VIEWS LIKE 'widgets_view';
-- the IS_SECURE column reports TRUE for this view

ALTER VIEW widgets_view SET SECURE;
ALTER VIEW widgets_view UNSET SECURE;
```

`SHOW VIEWS` reports an `IS_SECURE` column so you can confirm a view's status without re-reading its full definition. `ALTER VIEW ... SET SECURE` and `UNSET SECURE` toggle it after the fact, without needing to `CREATE OR REPLACE` the whole view.

## The trade-off: optimizer visibility

Secure views aren't free. Making a view secure isn't something to reach for by default on every view you write:

```sql
-- A secure view's query is NOT exposed to the optimizer the same way a
-- regular view's is, which can mean fewer execution-plan optimizations
-- (e.g. predicate pushdown across the view boundary can be more limited).
-- Use SECURE only where that privacy guarantee is actually needed --
-- not as a default on every view.
```

A regular view's query text is visible to Snowflake's optimizer in ways that can enable better execution plans — predicate pushdown across the view boundary, for instance. A secure view trades away some of that visibility for the privacy guarantee. That's a real cost, which is exactly why this isn't a "just always use secure" switch: reach for it specifically where the privacy guarantee matters.

## When to reach for it

Good candidates for `SECURE`: views that wrap row access policies or masking logic (where the logic itself shouldn't be exposed), views handed to external or shared consumers, and multi-tenant views like `widgets_view` above, where even the existence of certain tables or columns might be sensitive to disclose.

## Key terms

| Term | Meaning |
|---|---|
| Secure view | A view whose own SQL definition is hidden from anyone without the privilege to see it, in addition to normal view behavior |
| `IS_SECURE` | The column `SHOW VIEWS` reports to indicate whether a view is currently secure |
| View definition exposure | The default behavior where a view's SELECT statement is visible via SHOW VIEWS / GET_DDL, even to those who can't query the underlying table |
| Optimizer trade-off | A secure view's definition is less visible to Snowflake's query optimizer, which can mean fewer available execution-plan optimizations |

## Lab

1. Take any `CREATE VIEW` statement you've written in this course so far and rewrite it as `CREATE SECURE VIEW`.
2. Write the `SHOW VIEWS` statement you'd run to confirm its `IS_SECURE` status.
3. In your own words, describe one scenario from your own work (or a hypothetical one) where a view's definition being visible would itself be a problem.

## Check yourself

- What does SECURE hide that an ordinary view does not, and who is it hidden from?
- Why might a view wrapping a row access policy or masking logic be a good candidate for SECURE?
- What does a secure view give up in exchange for hiding its definition?
