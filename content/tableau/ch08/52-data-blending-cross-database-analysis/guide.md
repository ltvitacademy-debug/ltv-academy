# Lesson 52 — Data Blending & Cross-Database Analysis

**Chapter 8 · Data Modeling · Lesson 52 of 95**

## What you'll learn

- What data blending is, and how it's fundamentally different from a
  join or a relationship — no combined table ever exists
- When you're forced to blend instead of relate/join (published data
  sources, incompatible connectors)
- How to set up a blend, including manual field mapping when field
  names don't match
- The real limitation blending has that relationships and joins don't

## Blending never actually combines the data

Every technique so far in this chapter — relationships (Lesson 48),
joins (Lesson 49), unions (Lesson 51) — produces one combined table
that Tableau can query as a single thing. **Data blending** doesn't.
Instead, each data source is queried **independently**, aggregated to
whatever level of detail your worksheet needs, and the two aggregated
results are stitched together only in the visualization itself, using
whatever fields the two sources share.

That's a fundamentally different mental model than anything in SQL:
there's no equivalent single query you could write for a blend,
because a blend is really two separate queries whose results get
matched up visually, after aggregation, not before it.

![Two independent data sources, Bookshop and Movie Adaptations, blended together in one worksheet answering 'Are longer books longer movies?' — a scatter plot of average pages against average movie length.](/courses/tableau/ch08/52-data-blending-cross-database-analysis/blended-two-sources-scatter.png)
*Bookshop and Movie Adaptations never actually merge — Tableau queries each one, aggregates the results, and lines them up by whatever field they share (here, book/movie title).*
Source: [Tableau Help — Blend Your Data](https://help.tableau.com/current/pro/desktop/en-us/multiple_connections.htm)

## When you're forced to blend

Blending isn't your first choice — relationships and joins are more
powerful and more flexible. You reach for blending specifically when:

- One of your sources is a **published Tableau data source** (which
  can't be joined or related to another data source)
- Your sources use **incompatible connectors** that don't support
  cross-database joins at all (certain cube data, extract-only
  connectors)
- You need the linking fields to **vary sheet by sheet** in the same
  workbook, which relationships and joins — fixed once, at the data
  source level — can't do

## Setting up a blend, and mapping fields manually

Add a second data source to your workbook (Data > New Data Source),
then drag a field from that secondary source onto your worksheet.
Tableau automatically links the two sources on any field with a
matching name and compatible role. When names don't match, you map
them manually:

![The Add/Edit Field Mapping dialog, showing a primary data source field list (Book Title, Date Released, Genre...) on the left and a secondary data source field list (Movie Title, Rating, Genre...) on the right, with Title selected to map to the secondary source's Title field.](/courses/tableau/ch08/52-data-blending-cross-database-analysis/blend-edit-field-mapping.png)
*Select the primary field, then the matching secondary field, so Tableau knows how to line the two sources up.*
Source: [Tableau Help — Blend Your Data](https://help.tableau.com/current/pro/desktop/en-us/multiple_connections.htm)

## The real limitation

Because a blend is two separately-aggregated queries stitched together
after the fact, you **cannot** blend at a finer level of detail than
the linking field allows, and you **can't** do row-level analysis
across the two sources — every measure from the secondary source is
already aggregated by the time it reaches your view. If you need true
row-level combination, you need a relationship or a join, not a blend.

## Key terms

| Term | Meaning |
|---|---|
| Primary data source | The first data source added to a worksheet — its fields drive the view |
| Secondary data source | An additional data source blended in, linked on shared fields |
| Linking field | The field(s) Tableau uses to match the primary and secondary sources' aggregated results |

## Lab

1. Add a second, unrelated data source to a workbook that already has
   the Sample Superstore connection loaded (any small CSV or Excel
   file with a shared field like State or Region works).
2. Build a worksheet using a field from Superstore, then drag in a
   measure from the second source. Confirm Tableau links them
   automatically if a field name matches.
3. Rename the linking field in your second source so the names no
   longer match, and use Data > Edit Blend Relationships to map it
   manually.

## Check yourself

You're ready for Lesson 53 when you can explain, in one sentence, why
a blend can't do row-level analysis the way a relationship or join
can — and name one situation where blending is your only option.
