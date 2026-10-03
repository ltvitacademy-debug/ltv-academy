# Lesson 24 — Sort

**Chapter 4 · Data Flow Transformations · Lesson 24 of 49**

## What you'll learn

- How the Sort transformation orders rows using numbered sort keys
- The convention that positive numbers mean ascending, negative mean
  descending
- How it removes duplicate rows as part of the same sort
- Why it's the mandatory setup step before Merge or Merge Join

## Sorting with numbered keys

The **Sort** transformation sorts input data in ascending or descending
order and copies the sorted result to its output. You can sort by more
than one column at once — each sort column gets a **number** that
determines its priority. The column numbered `1` is sorted first, the
column numbered `2` breaks ties within that first sort, and so on.

The sign of the number tells the transformation the direction:

- A **positive** number means ascending order.
- A **negative** number means descending order.
- `0` means the column isn't being sorted at all — but it's still
  copied through to the output alongside the sorted columns.

So a `CountryRegion` column set to `1` and a `City` column set to `2`
produces output sorted by region first, then by city within each
region — exactly the same idea as `ORDER BY CountryRegion, City` in
T-SQL.

Here's the Sort Transformation Editor configured with two sort keys —
EmpName sorting first, EmpLocation breaking ties within it:

![The Sort Transformation Editor, with EmpName and EmpLocation checked in Available Input Columns, and a grid below showing both set to Sort Type ascending — EmpName at Sort Order 1, EmpLocation at Sort Order 2.](/courses/ssis/ch04/24-sort/sort-editor2.png)
*Two sort keys — EmpName first, EmpLocation second — both ascending.*

## Removing duplicates in the same pass

The Sort transformation can also **remove rows with duplicate sort
values** as part of the same operation — a checkbox, not a separate
transformation. "Duplicate" here means rows whose sort key values
match, based on the string comparison options you've configured; two
literal strings can technically differ and still produce the same sort
key. If two rows tie on every sorted column, the Sort transformation
keeps a single entry and discards the rest.

One quirk worth flagging: the Sort transformation does **not** sort
GUIDs the same way T-SQL's `ORDER BY` does. Both sort GUIDs starting
with `0-9` before those starting with `A-F`, but the exact ordering
within that differs from the SQL Server Database Engine — don't assume
parity if GUID order matters downstream.

## Why Merge and Merge Join need it

This transformation has **one input and one output**, and it does not
support an error output — but its real importance in this course is
what comes *next*. Both the **Merge** transformation and the **Merge
Join** transformation (Lesson 25) require their inputs to already be
sorted on the columns they'll merge or join on. The Sort transformation
is how you guarantee that before the data ever reaches them.

In practice, that means one Sort transformation **per source**, not one
shared Sort for everything — each input gets sorted independently before
it goes anywhere near a Merge or Merge Join:

![A data flow diagram showing two separate sources, EmpSalary and EmpLocation, each feeding its own Sort transformation (Sort and Sort 1).](/courses/ssis/ch04/24-sort/sort-verified.png)
*Two separate sources, two separate Sort transformations — each one sorting its own input before anything downstream touches it.*

Zoom out one step further and the reason both exist becomes obvious —
both sorted outputs are headed for the same downstream component:

![The same data flow diagram, now showing a Merge Join transformation below the two Sort transformations, still unconnected and flagged with an error.](/courses/ssis/ch04/24-sort/sort-full-pipeline.png)
*Both Sort outputs are headed for the same Merge Join — which is exactly why they both had to be sorted first.*

## Key terms

| Term | Meaning |
|---|---|
| Sort order | The number assigned to a column that sets its priority and direction in a multi-column sort |
| Ascending / descending | Positive sort order = ascending; negative = descending |
| Passthrough column | A column with sort order 0 — copied to output unsorted |
| Remove duplicate sort values | Option that collapses rows with matching sort keys into a single row |

## Lab

1. Add an OLE DB source reading `Sales.SalesOrderHeader` from
   AdventureWorks2012 (it has `CustomerID` and `OrderDate` columns).
2. Drag a **Sort** transformation onto the data flow and connect the
   source to it.
3. Check `CustomerID` and set its **Sort Type** to Ascending with
   **Sort Order** `1`. Check `OrderDate` and set it to Ascending with
   **Sort Order** `2`.
4. Enable **Remove rows with duplicate sort values**, then add a data
   viewer after the transformation and run the package. Confirm the
   output is ordered by `CustomerID`, then `OrderDate` within each
   customer, with no duplicate `(CustomerID, OrderDate)` pairs.

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why do
Merge and Merge Join specifically require sorted input, and what
transformation guarantees that before the data gets there?
