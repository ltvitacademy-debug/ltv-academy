# Lesson 93 — Project 2: Customer Segmentation Dashboard

**Chapter 17 · Portfolio Projects · Lesson 93 of 95**

## What you'll learn

- How to build a real RFM (Recency, Frequency, Monetary) segmentation
  using LOD expressions
- How to turn raw customer-level metrics into business-readable
  segment labels
- How to build a scatter plot that encodes multiple dimensions of
  information without becoming unreadable
- How to wire a parameter into a dashboard so a viewer can change what
  the scatter plot actually measures

## The scenario

Marketing wants to stop treating every customer the same way. They've
asked for a dashboard that segments **Sample Superstore** customers by
purchase behavior, so retention campaigns can target the right people
with the right message — instead of emailing everyone the same offer.
This project pushes further than Project 1 technically: it leans
directly on the LOD expressions from Chapter 12 and the parameters
from Chapter 11.

## Dataset and fields

- `Customer Name`, `Order Date`, `Order ID`, `Sales`

## Required deliverables

1. **Three RFM calculated fields, built as LOD expressions:**
   - **Recency** — days since each customer's most recent order,
     relative to a fixed "as of" date (e.g., `DATEDIFF('day', {FIXED
     [Customer Name]: MAX([Order Date])}, [As Of Date Parameter])`).
   - **Frequency** — count of distinct orders per customer (`{FIXED
     [Customer Name]: COUNTD([Order ID])}`).
   - **Monetary** — total sales per customer (`{FIXED [Customer
     Name]: SUM([Sales])}`).
2. **A segmentation calculated field** that buckets each customer into
   a business-readable segment (e.g., "Champions," "Loyal," "At
   Risk," "Lost," "New") using `IF`/`CASE` logic against the three RFM
   values above — not generic labels like "Segment 1."
3. **A scatter plot** — one dot per customer, position encoding two of
   the three RFM metrics, color encoding the segment, and size
   encoding the third metric (e.g., Recency vs. Monetary on the axes,
   colored by segment, sized by Frequency).
4. **A segment summary bar chart** — customer count per segment, next
   to average sales per segment.
5. **A customer detail table** showing the actual customers within a
   segment a viewer clicks on — wired up with a filter or highlight
   action from the scatter plot or bar chart.
6. **A parameter** letting the viewer swap which two RFM metrics drive
   the scatter plot's axes (e.g., toggle between Recency-vs-Monetary
   and Frequency-vs-Monetary).

## What a strong version of this looks like

| Criterion | What it looks like when done well |
|---|---|
| RFM fields | Correctly implemented as LOD expressions (or table calcs with a clearly stated, deliberate reason if not) |
| Segmentation logic | You can state, in one sentence per segment, exactly what defines it |
| Scatter plot | Encodes at least three dimensions of information (two axes, color, size) and stays readable — not a wall of overlapping dots |
| Filter/highlight action | Clicking a segment in one view genuinely updates the customer detail table |
| Parameter | Actually changes the view meaningfully when swapped, not cosmetically |
| Labels | Business-readable segment names, never "Segment 1/2/3" |

The technical core of this project — a correct `FIXED` LOD expression
— is unforgiving: get the fixed dimension wrong and every downstream
segment is wrong with it. Test your Recency/Frequency/Monetary fields
against two or three individual customers by hand before trusting the
segmentation built on top of them.

## Key terms

| Term | Meaning |
|---|---|
| RFM analysis | Segmenting customers by Recency, Frequency, and Monetary value of their purchases |
| FIXED LOD expression | A calculation computed at a specified level of detail, independent of the view's other dimensions |
| Parameter | A user-adjustable input a workbook can reference to change what a view computes or displays |

## Lab

1. Build the three RFM calculated fields as `FIXED` LOD expressions
   and manually verify them against two customers you can check by
   eye in the underlying data.
2. Build the segmentation calculated field and the scatter plot,
   segment summary, and customer detail table.
3. Add the parameter that swaps the scatter plot's axes, and confirm
   it actually changes what's plotted.
4. Wire up the filter/highlight action from the scatter plot (or bar
   chart) to the customer detail table, and test it.

## Check yourself

You're ready for Lesson 94 when you can explain, in one sentence each,
what defines every segment in your dashboard, and demonstrate the
parameter changing the scatter plot's axes live.
