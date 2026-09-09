# Lesson 103 — Normalization: 2NF and 3NF · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

1NF was the ground floor. Now two stricter rules: Second Normal Form and
Third Normal Form — each one closing a sneakier gap than the last.

## S2 · CODE CARD (2NF violation)

2NF applies when you have a composite key, like Lesson 95's
order-and-product pair. It says every non-key column has to depend on the
WHOLE key, not just part of it. Here, product name only depends on
product ID — that's a partial dependency, a 2NF violation.

## S3 · CODE CARD (real 2NF fix)

AdventureWorks gets this right. Sales Order Detail's real composite key
includes Sales Order Detail ID, but it only stores Product ID — never the
product name directly. The name lives over in Production dot Product, one
join away.

## S4 · CODE CARD (3NF violation)

3NF goes one step further. It forbids a TRANSITIVE dependency — a non-key
column depending on ANOTHER non-key column, instead of the primary key
itself. Here, department name really depends on department ID, not
directly on employee ID.

## S5 · CODE CARD (the test)

Here's a simple test for any table you design: does each column depend on
the key, the WHOLE key, and NOTHING BUT the key? A no to any part of that
points straight at a violation — first, second, or third normal form,
respectively.

## S6 · OUTRO CARD

Three normal forms, one underlying goal: every fact stored exactly once,
in exactly the right place. Next lesson steps back to look at the
databases SQL Server itself depends on — the system databases. See you
there.
