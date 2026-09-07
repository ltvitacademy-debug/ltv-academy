# Lesson 5 — The Power BI Workflow: Get → Transform → Model → Visualize → Publish

**Chapter 1 · Power BI Fundamentals · Lesson 5 of 5**

## What you'll learn

- The five-step workflow that structures every remaining chapter in this course
- Which chapter teaches which step, so you always know what's coming next
- Why the steps happen in this order, and what goes wrong if you skip ahead

## Five steps, one course

Every single thing you'll do in Power BI — no matter how advanced — is one of
five steps. You've already touched three of them in this chapter without
necessarily noticing:

1. **Get** — connect to a data source
2. **Transform** — clean and reshape the data
3. **Model** — relate tables and prepare calculations
4. **Visualize** — turn data into charts people can read
5. **Publish** — share the finished report

This isn't just a mental model — it's the literal chapter order for the rest
of this course. When you feel lost in Chapter 6, come back to this list and
find which step you're standing on.

## Step 1: Get

You did this in Lesson 4: **Get data** on the Home ribbon, choose a source,
load a table.

![Screenshot of the Home ribbon in Power BI Desktop with Get data highlighted.](/courses/power-bi/ch01/05-power-bi-workflow/qs-connect-data_02.png)
*Get data — the front door to every source Power BI supports.*

Lesson 4 only used Excel. **Chapter 2** covers every other source: CSV and
text files, SQL Server and other databases, web pages, and REST APIs — plus
the important decision of *Import* versus *DirectQuery* for how your data
stays connected.

## Step 2: Transform

Once data is loaded, it's rarely clean enough to use as-is. Wrong data types,
extra columns, inconsistent text, values that need splitting or combining —
transforming fixes all of it, inside **Power Query Editor**.

![Screenshot of Power Query Editor with a query loaded, showing the ribbon, the Queries pane, the data grid, and the Query Settings pane with Applied Steps.](/courses/power-bi/ch01/05-power-bi-workflow/query-overview-with-data-connection.png)
*Power Query Editor: every cleaning step you take is recorded in Applied Steps, in order, and replays automatically every time your data refreshes.*

**Chapter 3** is entirely Power Query: changing data types, filtering rows,
splitting and merging columns, pivoting, grouping, and combining multiple
queries together.

## Step 3: Model

With clean data loaded, you tell Power BI how your tables relate to each
other — which is what makes it possible to build a visual that pulls fields
from more than one table at once.

![Screenshot of Model view showing several tables connected by relationship lines in a diagram.](/courses/power-bi/ch01/05-power-bi-workflow/modeling-view-07.png)
*Model view: every table as a box, every relationship as a line. You previewed this screen in Lesson 3.*

**Chapter 4** covers fact and dimension tables, the star schema, and exactly
how relationships and filter direction work. **Chapters 5 and 6** continue the
modeling step with DAX formulas and date/time intelligence — the calculations
that live on top of a well-built model.

## Step 4: Visualize

This is where data becomes something a person can actually read and act on —
the part you got a first taste of in Lesson 4.

![Screenshot of the Visualizations pane with a different chart type selected, changing the visual on the canvas.](/courses/power-bi/ch01/05-power-bi-workflow/change-visual.png)
*Visualize: the same fields, redrawn as whichever chart type tells the story best.*

**Chapter 7** covers the full range of visuals and how to filter and format
them properly. **Chapter 8** goes a level further — designing an entire
dashboard so it reads clearly at a glance, not just one chart at a time.

## Step 5: Publish

The last step turns a file on your computer into something your team can
open, share, and act on.

![Screenshot of the Power BI Desktop Home ribbon with the Publish button highlighted.](/courses/power-bi/ch01/05-power-bi-workflow/pbid_publish_publishbutton.png)
*One button, once your report is ready — Publish sends it from Desktop to the Power BI service.*

**Chapter 9** covers the Power BI service itself: workspaces, semantic
models, sharing and permissions, and Microsoft Fabric. **Chapters 10 and 11**
round out what happens after publishing — keeping data refreshed on a
schedule, and securing exactly who can see which rows of data.

## Why the order matters

You can't model relationships you haven't gotten yet (Get before Model). You
can't visualize a field that's still the wrong data type (Transform before
Visualize). You can't publish a report that doesn't exist yet (everything
before Publish). The order isn't arbitrary — each step depends on the one
before it, which is exactly why this course is structured the same way.

## Key terms

| Term | Meaning |
|---|---|
| Get | Connecting Power BI to a data source |
| Transform | Cleaning and reshaping data in Power Query Editor |
| Model | Relating tables and building calculations on top of them |
| Visualize | Turning modeled data into readable charts and reports |
| Publish | Sharing a finished report through the Power BI service |

## Lab

1. Open the .pbix file you saved in Lesson 4.
2. For each of the five steps, name the exact button, pane, or view you'd use
   to perform it — without looking back at this guide.
3. Write down, in one sentence each, what you expect to learn in Chapters 2
   through 11. You'll be able to check yourself against this later in the
   course.

## Check yourself

You're ready for Chapter 2 when you can list all five steps of the workflow,
in order, from memory — and say which chapter of this course teaches each one.
