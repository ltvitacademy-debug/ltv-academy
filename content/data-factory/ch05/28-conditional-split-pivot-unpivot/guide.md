# Lesson 28 — Conditional Split, Pivot & Unpivot

**Chapter 5 · Mapping Data Flows · Lesson 6 of 7**

## What you'll learn

- How Conditional Split routes rows down different paths
- What `disjoint` actually controls
- How Pivot turns unique row values into new columns
- Why Unpivot does exactly the reverse

## Conditional Split: a CASE statement for rows

**Conditional Split** works like a `CASE` decision structure: it
evaluates one or more expressions per row, and routes each row to the
**first** matching stream, an optional **default** stream for
anything that matches nothing:

![Screenshot of the Conditional Split UI, showing multiple condition expressions and their target output streams.](/courses/data-factory/ch05/28-conditional-split-pivot-unpivot/conditionalsplit1.png)

A real example: split `year < 1960` into `moviesBefore1960`, and
`year > 1980` into `moviesAfter1980`, with everything else falling
into a default stream, `AllOtherMovies`.

**`disjoint`** controls whether a row goes to only its **first**
matching stream (`disjoint: false` — the common case) or to
**every** stream it matches (`disjoint: true`) — meaning the same row
can genuinely flow down more than one branch at once.

## Pivot: rows become columns

**Pivot** is an aggregation transformation that turns the unique
values of one column into a set of new columns:

![Diagram showing how Pivot's group-by columns, pivot key, and pivoted columns interact to reshape a data stream.](/courses/data-factory/ch05/28-conditional-split-pivot-unpivot/pivot5.png)

Three real inputs configure it:

1. **Group by** — which columns collapse multiple rows into one
   output row (optional — leave it empty, and the whole stream
   aggregates into a single row).
2. **Pivot key** — the column whose unique values become new columns.
   By default, one new column per unique value.
3. **Pivoted columns** — the aggregate function generating each
   pivoted column's actual value; every pivoted column needs at least
   one aggregate function.

Because pivoted column names are often generated **dynamically** at
run time, they don't always show up in Inspect or Sink mapping
automatically — enable **Allow schema drift** on the sink to still
write them through.

## Unpivot: columns become rows

**Unpivot** does exactly the reverse of Pivot: it takes several
columns and collapses them into two — one holding what used to be the
**column name**, one holding what used to be that column's **value**.
Where Pivot is for turning a long, tidy table into a wide summary,
Unpivot is for turning a wide table (say, one column per month) back
into a long, tidy one a downstream aggregation or chart can actually
work with.

## Choosing between the three

| Need | Reach for |
|---|---|
| Route rows down different paths based on a condition | Conditional Split |
| Turn unique row values into new summary columns | Pivot |
| Turn wide columns back into long, row-based data | Unpivot |

## Key terms

| Term | Meaning |
|---|---|
| Conditional Split | Routes each row to a matching stream, CASE-statement style |
| disjoint | Whether a row goes to only its first match, or every stream it matches |
| Pivot | Turns unique values of one column into new aggregated columns |
| Unpivot | Turns multiple columns back into row-based name/value pairs |

## Lab

1. Build a Conditional Split with two conditions and a default
   stream, and confirm in Data Preview that rows land where you'd
   expect.
2. Build a Pivot transformation grouping by one column, with a
   pivot key and one aggregate function.
3. Write one sentence describing a real scenario where you'd reach
   for Unpivot instead of Pivot.

## Check yourself

You're ready for Lesson 29 when you can explain, in one sentence
each, what Conditional Split, Pivot, and Unpivot are each actually
for.
