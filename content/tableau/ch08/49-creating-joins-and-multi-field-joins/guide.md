# Lesson 49 — Creating Joins & Joining on Multiple Fields

**Chapter 8 · Data Modeling · Lesson 49 of 95**

## What you'll learn

- The exact steps to build a join inside Tableau's physical layer
- How to add a second (or third) join clause — Tableau's version of
  `ON a.Col1 = b.Col1 AND a.Col2 = b.Col2`
- What each join type (inner, left, right, full outer) actually keeps
  and drops, in the same terms you learned them in SQL
- Where to remove a join clause you added by mistake

## Building a join, step by step

1. Drag your first table onto the logical layer canvas.
2. Drag or double-click a second table **onto that same logical
   table** (not next to it) — this opens the physical layer and
   starts a join, rather than creating a relationship.
3. Click the join icon (the small Venn-diagram symbol between the two
   tables) to open the Join dialog.
4. Pick a join type: Inner, Left, Right, or Full Outer.
5. Pick the matching field from each table for your first join clause.
6. If one field pair isn't enough to match rows correctly, click **Add
   new join clause** and pick a second pair.

![The real Join dialog in Tableau, showing Inner/Left/Right/Full Outer tabs, one join clause already set (Book ID = BookID), and the 'Add new join clause' row below it for adding a second matching field pair.](/courses/tableau/ch08/49-creating-joins-and-multi-field-joins/join-dialog-clause.png)
*Every join clause you add here is one more `AND` condition in the equivalent SQL `ON` clause.*
Source: [Tableau Help — Join Your Data](https://help.tableau.com/current/pro/desktop/en-us/joining_tables.htm)

## Multi-field joins — the SQL you already know, one clause at a time

If you needed to join two tables on a composite key in SQL, you wrote
something like this:

```sql
FROM Orders o
INNER JOIN OrderDetails d
  ON o.OrderID = d.OrderID
  AND o.WarehouseID = d.WarehouseID
```

Tableau's Join dialog does exactly this — just one field pair at a
time, added with **Add new join clause** instead of typed as an
`AND`. Each clause you add behaves like one more condition in the
`ON` clause: a row only matches if *every* clause is satisfied.

## The four join types, mapped to what you already know

| Tableau join type | SQL equivalent | Keeps |
|---|---|---|
| Inner | `INNER JOIN` | Only rows with a match on both sides |
| Left | `LEFT JOIN` | Every row from the first (left) table, matched or not |
| Right | `RIGHT JOIN` | Every row from the second (right) table, matched or not |
| Full Outer | `FULL OUTER JOIN` | Every row from both tables, matched or not |

Nothing new here conceptually — same four types, same behavior, just
picked from tabs in a dialog instead of typed as keywords.

## Removing or editing a join clause

Hover over the right side of a join clause and an "x" appears — click
it to delete that clause. To change the join type after the fact,
reopen the Join dialog by clicking the join icon and pick a different
tab; Tableau re-evaluates the join immediately.

## Key terms

| Term | Meaning |
|---|---|
| Join clause | One field-pair match condition inside a join — equivalent to one `AND` condition in a SQL `ON` clause |
| Join icon | The small Venn-diagram symbol on the physical layer canvas — click it to open the Join dialog |
| Composite key join | A join matched on more than one field pair, because no single field uniquely identifies a match |

## Lab

1. In the Sample Superstore workbook, open the Orders table's physical
   layer and join in the People table (matched on Region).
2. Notice this is a many-to-one join at the row level — every Orders
   row that matches a Region gets that salesperson's name attached.
3. Try switching the join type from Left to Inner and watch the row
   count in the data grid at the bottom change (or not change, if
   every Region has a match).

## Check yourself

You're ready for Lesson 50 when you can build a join with two join
clauses from scratch, and explain in one sentence which SQL construct
"Add new join clause" corresponds to.
