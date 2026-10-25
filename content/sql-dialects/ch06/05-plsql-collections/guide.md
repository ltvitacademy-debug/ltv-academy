# Lesson 39 — PL/SQL Collections: Arrays, Nested Tables & Associative Arrays

**Chapter 6 · PL/SQL Deep Dive for T-SQL Developers · Lesson 5 of 8**

## What you'll learn

- Three real, distinct PL/SQL collection types: VARRAY, Nested Table, and Associative Array
- How they differ from each other, not just from T-SQL
- Why the Associative Array is the one most similar to a dictionary/hash map
- Why T-SQL's table variables and temp tables aren't a close match for any of them
- Indexing a collection by string, not just by integer

## VARRAY: a fixed-maximum-size array

```sql
DECLARE
  TYPE t_top_scores IS VARRAY(5) OF NUMBER;
  v_scores t_top_scores := t_top_scores(98, 95, 91, 88, 85);
BEGIN
  FOR i IN 1 .. v_scores.COUNT LOOP
    DBMS_OUTPUT.PUT_LINE('Score ' || i || ': ' || v_scores(i));
  END LOOP;
  -- v_scores.EXTEND would fail past 5 elements — the max is fixed at declaration
END;
/
```

A `VARRAY` ("variable-size array") declares its maximum size up front — 5 here — and can never
hold more elements than that. It's the most array-like of the three: densely indexed from 1, with
a hard ceiling you decide at declaration time. Reach for it when you know the data genuinely has a
small, fixed upper bound (top 5 scores, 12 months of the year).

## Nested Table: unbounded, and can be a real database column type

```sql
DECLARE
  TYPE t_tags IS TABLE OF VARCHAR2(30);
  v_tags t_tags := t_tags('urgent', 'billing', 'reviewed');
BEGIN
  v_tags.EXTEND;
  v_tags(v_tags.COUNT) := 'escalated';  -- grows freely, no fixed max
  FOR i IN 1 .. v_tags.COUNT LOOP
    DBMS_OUTPUT.PUT_LINE(v_tags(i));
  END LOOP;
END;
/
```

A Nested Table has no upper bound — it grows as needed, unlike a `VARRAY`. The other genuinely
distinct capability: a Nested Table type, unlike a `VARRAY`, can be used as a **real column type**
in a database table (an Oracle-specific feature called a nested table column), letting a single
row store a variable-length collection of values directly — something with no PL/SQL-only
restriction the way `VARRAY` is more size- and usage-constrained in practice.

## Associative Array: indexed by integer OR string, in-memory only

```sql
DECLARE
  TYPE t_price_lookup IS TABLE OF NUMBER INDEX BY VARCHAR2(30);
  v_prices t_price_lookup;
BEGIN
  v_prices('WIDGET') := 19.99;
  v_prices('GADGET') := 49.99;
  v_prices('GIZMO')  := 9.99;

  DBMS_OUTPUT.PUT_LINE('Widget price: ' || v_prices('WIDGET'));

  DECLARE
    v_key VARCHAR2(30) := v_prices.FIRST;
  BEGIN
    WHILE v_key IS NOT NULL LOOP
      DBMS_OUTPUT.PUT_LINE(v_key || ' = ' || v_prices(v_key));
      v_key := v_prices.NEXT(v_key);
    END LOOP;
  END;
END;
/
```

Formerly called a "PL/SQL table," the Associative Array is indexed by either `BINARY_INTEGER` or,
as above, a string type — and it exists **only** in memory, as a purely PL/SQL-side construct, with
no corresponding database column type at all (unlike Nested Tables). Indexing by string is what
makes this the one most similar in spirit to a dictionary or hash map in other languages, and it's
the collection type you'll reach for most often inside ordinary procedural code — fast, flexible,
in-memory lookups keyed however makes sense for your logic.

## Where T-SQL's closest analogues fall short

```sql
-- T-SQL: a table variable — a real row set in the database engine
DECLARE @Prices TABLE (ProductName VARCHAR(30), Price DECIMAL(10,2));
INSERT INTO @Prices VALUES ('WIDGET', 19.99);
```

T-SQL's table variables and temp tables are **fundamentally different** from any PL/SQL collection:
they're real database-engine row sets, with their own storage, indexes, and query optimizer
involvement — not an in-memory-only, PL/SQL-language construct. There's no T-SQL analogue to
declaring a typed collection *variable* indexed by an arbitrary string key the way an associative
array is, and no T-SQL equivalent of a `VARRAY`'s fixed-size-at-declaration array semantics either.
Reaching for a table variable when you really want PL/SQL-style in-memory dictionary behavior is a
common point of confusion for a T-SQL developer's first PL/SQL collection.

## Key terms

| Term | Meaning |
|---|---|
| VARRAY | A fixed-maximum-size, densely-indexed array; max size set at declaration |
| Nested Table | An unbounded collection; can also be used as a real database column type |
| Associative Array | In-memory-only collection, indexed by integer or string; no database column equivalent |
| `INDEX BY` | Clause that makes a collection type an associative array, specifying its key type |

## Lab

Declare an associative array indexed by `VARCHAR2`, keyed by product name, holding each product's
quantity on hand. Populate it with three products, then loop over every key using `.FIRST` and
`.NEXT` and print each product name alongside its quantity.

## Check yourself

You're ready for Lesson 40 when you can answer, without looking: what are the three PL/SQL
collection types, which one has no fixed maximum size AND can be a real database column type, and
why don't T-SQL table variables or temp tables closely match any of the three?
