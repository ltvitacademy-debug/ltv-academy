# Lesson 20 — Merging Queries

**Chapter 3 · Power Query & Data Cleaning · Lesson 9 of 12**

## What you'll learn

- What "merging" two queries actually does — the SQL-style join, explained visually
- The six join kinds, and which two you'll use almost every time
- How to expand the merged column into real columns
- Why unmatched rows show up as null, and what that tells you

## The concept: two tables, one shared column

Merging joins two separate queries into one, based on a column they have
in common — exactly like a database join. Here's the idea in one picture:

![Diagram showing a Left Table (Date, CountryID, Units) and a Right Table (ID, Country) merging into one Merged Table with a new Country column, where CountryID 4 has no match and shows null.](/courses/power-bi/ch03/20-merging-queries/left-outer-join-operation.png)
*The left table keeps every row. The right table contributes a matching Country value wherever CountryID lines up — and null where it doesn't.*

This is different from **Append** (next lesson), which stacks tables with
the *same* columns on top of each other. Merge instead reaches *sideways*
— pulling columns from one table into another based on a shared key.

## Finding Merge Queries

**Merge Queries** lives in the Combine group on the Home ribbon:

![Screenshot of the Power Query Home ribbon with the Merge queries dropdown highlighted in the Combine group.](/courses/power-bi/ch03/20-merging-queries/merge-icons.png)
*"Merge queries" starts from your currently selected query as the left table. "Merge queries as new" lets you pick both tables from scratch.*

## Configuring the merge

Pick the right table, match up the columns that connect them, and choose a
**join kind**:

![Screenshot of the Merge dialog with Sales as the left table and Countries as the right table, both with CountryID selected, and six join kind options shown as icons: Left outer, Right outer, Full outer, Inner, Left anti, Right anti.](/courses/power-bi/ch03/20-merging-queries/merge-window-one-column-sample.png)
*Select the matching column in each table (CountryID here, in both). The status message confirms how many rows matched before you even click OK.*

## The six join kinds — but really, two you'll use most

| Join kind | Keeps |
|---|---|
| **Left outer** | Every row from the left table, matched data where it exists |
| Right outer | Every row from the right table, matched data where it exists |
| **Inner** | Only rows that matched in *both* tables |
| Full outer | Every row from *both* tables |
| Left anti | Only left-table rows that had *no* match |
| Right anti | Only right-table rows that had *no* match |

In practice, **Left outer** (keep everything from my main table, enrich it
where possible) and **Inner** (keep only rows that definitely matched) cover
the vast majority of real merges. The anti joins are specialty tools for
finding orphaned rows — useful for data-quality checks, rarely for regular
reporting.

## Expanding the result

After merging, your left table gains one new column — holding a nested
`[Table]` value for each row. Click the expand icon to pick which fields
from the right table to pull out:

![Screenshot of a table with a Countries column containing [Table] values, with an expand menu open listing CountryID, StateID, Country, and State checkboxes.](/courses/power-bi/ch03/20-merging-queries/expand-table-column.png)
*Check only the fields you actually need — Country, here — and decide whether to prefix the new column names with the source table's name (useful when field names might collide).*

The final result:

![Screenshot of a table with Date, CountryID, Units, and a new Country column, with the fourth row's Country value showing null.](/courses/power-bi/ch03/20-merging-queries/left-outer-final-table-2.png)
*CountryID 4 had no match in the Countries table, so its Country came back null — exactly as the diagram predicted. That null is informative: it tells you your reference table is missing a row.*

## Key terms

| Term | Meaning |
|---|---|
| Merge | Combines two queries sideways, based on matching column(s) |
| Join kind | Which rows survive the merge (Left outer, Inner, etc.) |
| Left/Right table | The two tables being merged — order matters for join kind |
| Expand | Pulling specific fields out of the nested table column a merge creates |

## Lab

1. Find (or create) two tables that share a common column — an ID,
   category, or code of some kind.
2. Merge them using **Left outer**, matching on that shared column.
3. Expand the resulting column, choosing just the fields you need.
4. If any rows show null in the new columns, explain why — what's missing
   from the other table?

## Check yourself

You're ready for Lesson 21 when you can explain, in one sentence, the
difference between Left Outer and Inner join, and why Merge is different
from Append.
