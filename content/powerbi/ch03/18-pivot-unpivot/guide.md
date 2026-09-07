# Lesson 18 — Pivoting & Unpivoting

**Chapter 3 · Power Query & Data Cleaning · Lesson 7 of 12**

## What you'll learn

- Why a "wide" table full of date columns is hard to analyze
- How Unpivot Columns turns those columns into rows
- The three unpivot variants, and why one of them is safer long-term
- Pivot Column, unpivot's exact reverse

## The problem with a "wide" table

Here's a common shape for exported data — one column per date, one row per
country:

![Screenshot of a table with columns Country, 6/1/2023, 7/1/2023, and 8/1/2023, each row a country with a number under each date.](/courses/power-bi/ch03/18-pivot-unpivot/unpivot-initial-table.png)
*Readable at a glance, but hard to filter, chart, or relate to other tables — "which date" is baked into column headers instead of being real data.*

This layout is common in spreadsheets built for humans to *read*, but
Power BI (and most analysis tools) work far better when "which date" is a
value in a column, not a column header itself.

## Unpivot: turning columns into rows

Select the columns you want to unpivot, right-click, and choose **Unpivot
Columns**:

![Screenshot of a right-click context menu on selected date columns, with Unpivot columns highlighted among many other transform options.](/courses/power-bi/ch03/18-pivot-unpivot/unpivot-columns-right-click.png)
*Select every date column (Ctrl+click for more than one), right-click, Unpivot Columns.*

Power Query collapses them into exactly two new columns — **Attribute**
(the original column headers) and **Value** (what was under them):

![Screenshot of the resulting table with Country, Attribute, and Value columns, showing each country repeated once per date, with the date in Attribute and the number in Value.](/courses/power-bi/ch03/18-pivot-unpivot/unpivot-columns-final-table.png)
*Nine rows instead of three columns — but now "date" is real, filterable data instead of a column header.*

## Three variants — and one is safer

The right-click menu actually offers three related commands:

- **Unpivot Columns** — unpivots exactly the columns you selected. If your
  source later gains a new date column, this step won't pick it up
  automatically.
- **Unpivot Other Columns** — the reverse selection: pick the columns to
  **keep** (like Country), and everything else gets unpivoted:

  ![Screenshot of a right-click menu with the cursor on Unpivot other columns, with the Country column selected instead of the date columns.](/courses/power-bi/ch03/18-pivot-unpivot/unpivot-other-columns.png)
  *Same result today — but this version keeps working correctly if new date columns show up later.*

- **Unpivot Only Selected Columns** — behaves like the first option but
  with slightly different refresh behavior for edge cases.

Here's why the distinction matters. Imagine your source table later adds a
new month and two new countries:

![Screenshot of an updated source table now including a 9/1/2023 column and two new rows for UK and Mexico.](/courses/power-bi/ch03/18-pivot-unpivot/unpivot-updated-source-table.png)
*A totally plausible refresh — a new month arrived, and so did new countries.*

With **Unpivot Other Columns**, the new September column gets unpivoted
automatically on refresh, because the step just says "unpivot everything
except Country" — it never had to know the date columns' names in advance.
With plain **Unpivot Columns**, September would be silently left out,
because that step locked in the *specific* columns selected the day you
built it. **Default to Unpivot Other Columns** whenever your source might
grow new columns over time.

## Pivot Column: the exact reverse

**Pivot Column** (Transform tab) does the opposite of everything above —
turning unique values from one column into new column headers, with
another column's values filling them in. Feed it the unpivoted table from
this lesson, choose **Attribute** as the column to pivot and **Value** as
the values, and you'd get back to the original wide layout. You'll use
Pivot Column far less often than Unpivot in practice — most real work goes
from wide to tall, not the other way — but it's worth knowing it exists
for the rare case you need a summary table shaped like a matrix.

## Key terms

| Term | Meaning |
|---|---|
| Unpivot Columns | Turns selected columns into Attribute/Value row pairs |
| Attribute / Value | The two columns Unpivot always produces |
| Unpivot Other Columns | Unpivots everything except the columns you keep — refresh-safe |
| Pivot Column | The reverse: turns row values into new column headers |

## Lab

1. Find (or build) a table with one column per date or category, and
   **Unpivot Other Columns** on it, keeping only the identifying column.
2. Rename the resulting Attribute and Value columns to something
   meaningful (like "Month" and "Sales").
3. On the resulting table, try **Pivot Column** (Transform tab) using your
   renamed Attribute-equivalent column, and confirm you get back something
   close to the original layout.

## Check yourself

You're ready for Lesson 19 when you can explain why Unpivot Other Columns
is generally the safer default over Unpivot Columns, and describe what
Pivot Column does in one sentence.
