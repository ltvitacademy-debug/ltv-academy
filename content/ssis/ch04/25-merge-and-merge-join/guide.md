# Lesson 25 — Merge & Merge Join

**Chapter 4 · Data Flow Transformations · Lesson 25 of 49**

## What you'll learn

- The difference between the Merge transformation and the Merge Join
  transformation — they solve two different problems
- When to use Union All instead of Merge
- The join types Merge Join supports: FULL, LEFT, and INNER
- Why both transformations require sorted, metadata-matched inputs

## Two inputs, two very different jobs

Both transformations take **exactly two inputs**, and both **require
sorted data** — but that's where the similarity ends.

**Merge** combines two sorted datasets into a **single dataset** by
stacking rows together based on their key columns — it's for combining
rows that share the same shape, like two extracts of the same table
from different sources. **Merge Join** actually **joins** two sorted
datasets together, the way a SQL join combines *columns* from two
different tables into wider rows.

## Merge — for stacking, not joining

The Merge transformation is genuinely similar to **Union All** — so
similar that Microsoft's own documentation tells you exactly when to
use Union All *instead*:

- The inputs aren't sorted.
- The combined output doesn't need to be sorted.
- You have **more than two inputs** (Merge only ever takes two; Union
  All can take many).

Merge requires that the merged columns have **matching metadata** — you
can't merge a numeric column with a character column, and if you're
merging string columns, the second input's column length must be less
than or equal to the first's. The SSIS Designer automatically maps
columns with identical metadata for you — and leaves the rest ignored
until you map them yourself:

![The Merge Transformation Editor, with columns Output Column Name, Merge Input 1, and Merge Input 2. Most Merge Input 2 cells read "<ignore>"; a handful — Id, CreationDate, ParentId, Score, Title — carry a real mapped value.](/courses/ssis/ch04/25-merge-and-merge-join/merge-editor-sqlshack2.png)
*SSIS auto-maps columns with matching metadata; everything else is left as &lt;ignore&gt; until you map it.*

## Merge Join — for actual joins

The **Merge Join** transformation produces output by joining two sorted
datasets using a **FULL**, **LEFT**, or **INNER** join — you pick the
join type, specify the join columns, and decide whether nulls should be
treated as equal to other nulls. Think of a LEFT join that combines a
products table with a country/region-of-manufacture table: the result
lists every product, joined to its origin.

This is functionally similar to what a **Lookup transformation** does —
both add columns from a second source based on matching keys — but
Merge Join works with two data flow *inputs* directly (no reference
dataset, no caching modes), and it natively supports outer joins the way
Lookup's Match/No Match model doesn't as directly.

Picking up right where Lesson 24 left off — both Sort outputs wired into
the still-unconfigured Merge Join:

![A data flow diagram showing EmpSalary feeding Sort, EmpLocation feeding Sort 1, and both Sort outputs connected into a Merge Join transformation that is still flagged with an error.](/courses/ssis/ch04/25-merge-and-merge-join/mj-wired-unconfigured.png)
*Both sorted outputs now feed the same Merge Join — still flagged, because the join itself isn't configured yet.*

Opening that Merge Join shows exactly what's missing — a join type, and
a join key checked on both sides:

![The Merge Join Transformation Editor, with Join type set to Inner join, and both Sort panels — Sort and Sort 1 — showing Name checked as the Join Key, in matching sort-key order.](/courses/ssis/ch04/25-merge-and-merge-join/mj-editor-inner.png)
*Inner join selected; Name is the join key on both sides, checked in matching sort-key order.*

## The shared requirement: sorted input

Both transformations demand **sorted data** on their join/merge
columns — this is exactly why Lesson 24 exists. If either input arrives
unsorted, you need a **Sort** transformation (or a source query with an
`ORDER BY` and the `IsSorted` property set) immediately before it. Both
also require the joined/merged columns to have **matching metadata**,
and neither transformation supports an **error output** — plan your
upstream error handling before the data ever reaches them.

## Key terms

| Term | Meaning |
|---|---|
| Merge | Combines two sorted, same-shape datasets into one, based on key columns |
| Merge Join | Joins two sorted datasets column-wise using FULL, LEFT, or INNER join logic |
| Union All | The transformation to use instead of Merge when inputs are unsorted or there are more than two |
| Swap Inputs | A Merge Join Editor option to reverse input order — useful with a LEFT outer join |

## Lab

1. Add two OLE DB sources: one reading `Sales.SalesOrderHeader`
   (sorted by `CustomerID` via a Sort transformation), and one reading
   `Sales.Customer` (also sorted by `CustomerID`).
2. Drag a **Merge Join** transformation onto the data flow. Connect the
   `SalesOrderHeader` sort output as Merge Join input 1, and the
   `Customer` sort output as input 2.
3. Set **Join type** to **Left outer join**, join on `CustomerID`, and
   select the columns you want in the output (include `SalesOrderID`
   from input 1 and `AccountNumber` from input 2).
4. Add a data viewer after the transformation and run the package.
   Confirm every sales order row appears, with a matching customer
   `AccountNumber` attached.

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: what's
the real difference between what Merge does and what Merge Join does,
and why do both of them insist on sorted input?
