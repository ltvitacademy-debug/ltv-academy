# Lesson 23 — Power Query Best Practices & Performance

**Chapter 3 · Power Query & Data Cleaning · Lesson 12 of 12**

## What you'll learn

- How to keep queries fast by filtering early and ordering steps deliberately
- Why the right connector and correct data types matter more than they seem to
- How to use Power Query's built-in data profiling tools before you transform anything
- How to keep a growing collection of queries organized, documented, and resilient to change

This is the last lesson of the chapter — a roundup of habits that separate a
query that just works from one that stays fast, readable, and safe to hand
off to someone else.

## Start with the right connector

Power Query ships with dozens of purpose-built connectors — SQL Server,
Excel, SharePoint, Salesforce, and more — plus generic ones like ODBC for
anything without a dedicated option. Always reach for the purpose-built
connector first. It gives you a better **Get Data** experience and, for
sources like SQL Server, unlocks **query folding**: Power Query pushes your
filters and transformations back to the source database instead of pulling
every row down first.

![Screenshot of the Navigator window in Power Query, showing a list of tables on the left and a preview of the selected table's data on the right.](/courses/power-bi/ch03/23-power-query-best-practices/navigator.png)
*The Navigator window — every connector funnels into this same select-and-preview experience.*

## Filter early to improve performance

Cut rows as early in your query as you can. Fewer rows means every step
after the filter has less work to do, and for connectors that support query
folding, an early filter can be pushed all the way back to the source.

The auto filter menu shows every distinct value in a column, with a search
bar to help you find the ones you want:

![Screenshot of the auto filter menu in Power Query, showing a searchable checklist of distinct column values.](/courses/power-bi/ch03/23-power-query-best-practices/filter-values-auto-filter-menu.png)
*Uncheck what you don't need, or use the search bar to narrow a long list first.*

## Do expensive operations last

Not all steps cost the same. A **sort** has to read the entire source before
it can return even one row, because the last row of your data might belong
at the top. A **filter**, by contrast, can stream — returning results as it
reads, without waiting for everything. Put streaming operations like filters
first, and save expensive ones like sorts for the end. Your query editor
preview stays responsive while you're still building the query.

## Work against a data subset while building

If a query is slow to edit, add a **Keep First Rows** step at the top while
you build out the rest of your steps. Every step you add after it only has
to process a handful of rows, so the preview stays fast. Once the query is
finished, delete that step so the real run processes the full data set.

## Set the correct data type for every column

Getting data types right isn't cosmetic — it unlocks type-specific tools.
A date column with the **Date** type enabled gives you options like
**Add Column → Date and time column** and previous-period filters that stay
grayed out otherwise:

![Screenshot of the Power Query ribbon's Add column tab, with the Date and time column group highlighted on the right.](/courses/power-bi/ch03/23-power-query-best-practices/type-specific-filter-for-date.png)
*These date-specific options only appear once the column actually has the Date type applied.*

Structured sources like databases usually bring correct types with them from
the table schema. Unstructured sources — CSV and TXT files especially —
don't, so it's on you to set them explicitly, the same habit from
[Lesson 13](/app/courses/power-bi/changing-data-types).

## Profile your data before you transform it

Before writing a single transformation, turn on Power Query's data
profiling tools (**View** ribbon → **Column quality**, **Column
distribution**, **Column profile**) and actually look at what you're
working with:

![Screenshot of the Power Query editor with data profiling enabled, showing quality, distribution, and detailed column statistics.](/courses/power-bi/ch03/23-power-query-best-practices/data-preview-tools-enabled-v2.png)
*Column quality flags errors and empties per column; column distribution shows value frequency; column profile gives full statistics for whichever column you select.*

| Tool | What it shows |
|---|---|
| Column quality | The percentage of values that are valid, errors, or empty |
| Column distribution | How frequently each distinct value appears |
| Column profile | Detailed statistics for one selected column |

Five minutes here often saves an hour of chasing a transformation that
silently produced errors because of a data problem you never noticed.

## Document your work

Power Query auto-names each step, but a name like `Filtered Rows1` tells the
next person nothing. Rename steps to describe what they actually do, and add
a description on anything non-obvious — right-click a step, **Properties**,
and fill in both fields:

![Screenshot of the Applied Steps pane with each step renamed to describe its purpose.](/courses/power-bi/ch03/23-power-query-best-practices/documenting.png)
*Readable step names turn the Applied Steps pane into documentation you get for free.*

## Split large queries into modules

A query with a long, tangled list of Applied Steps is hard to reason about.
Right-click any step and choose **Extract Previous** to split the query in
two at that point — everything before becomes its own referenced query,
and your original query picks up where it left off:

![Screenshot of the Applied Steps context menu with Extract Previous highlighted.](/courses/power-bi/ch03/23-power-query-best-practices/extract-previous.png)
*Splitting at a natural boundary — like right before a merge — makes each half easier to follow on its own.*

Once queries start multiplying, use **groups** in the Queries pane (right-click
→ **Move to Group**) to keep related queries together, the same way folders
organize files.

## Future-proof your queries

Design queries to survive changes in the source data, not just today's
shape of it:

| If the source might... | Use this instead of a fixed reference | So that |
|---|---|---|
| Gain or lose rows, but always has a fixed number of footer rows to drop | **Remove Bottom Rows** | The removal stays correct regardless of row count |
| Gain or lose columns, but you only need specific ones | **Choose Columns** | New, unneeded columns don't break the query |
| Change which columns need unpivoting | **Unpivot Only Selected Columns** | Only the intended columns transform, others pass through |
| Occasionally produce a bad value on type conversion | Remove rows with errors | One bad row doesn't fail the whole refresh |

## Everything ties together

Parameters ([Lesson 22](/app/courses/power-bi/parameters)) and
custom functions build directly on these habits — a well-named, well-typed,
sensibly split query is exactly the kind of query that's easy to turn into
a reusable function later. None of this is about writing more — it's about
writing your Applied Steps so that future-you, or whoever inherits the
query, can trust it.

## Key terms

| Term | Meaning |
|---|---|
| Query folding | Power Query pushing steps back to the source instead of processing them locally |
| Streaming operation | A step (like filter) that can return results before reading all the source data |
| Data profiling | Power Query's built-in column quality, distribution, and profile tools |
| Extract Previous | Splits a query in two at a chosen step, creating a new referenced query |

## Lab

1. Open any query you've built in this chapter and rename at least two
   Applied Steps to describe what they actually do.
2. Turn on the data profiling tools (**View** ribbon) on a query with a few
   hundred rows, and check the Column quality bar for every column.
3. Find a step partway through a longer query and try **Extract Previous**
   to see how it splits into two referenced queries.

## Check yourself

You're ready to move on when you can name, from memory, three habits from
this lesson that make a query either faster to run or easier for someone
else to maintain.
