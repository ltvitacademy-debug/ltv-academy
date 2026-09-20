# Reading Execution Plans, in Depth

T-SQL for DBAs introduced execution plans as a troubleshooting tool. This lesson goes
much deeper into actually *reading* one — the direction data flows, what the icons mean,
what arrow thickness tells you, and how cost percentages should (and shouldn't) guide
where you look first. This is the foundation the rest of Chapter 2 builds on.

## What you'll learn

- Why plans read right-to-left and bottom-to-top, not the way you'd read English
- What arrow (data flow line) thickness actually encodes
- How to use operator cost percentages without being misled by them

## Data flows right-to-left, bottom-to-top

A graphical execution plan is a tree, and it reads backwards from normal text: the
rightmost, bottom-most operators run *first* (typically the base table/index access —
Scans and Seeks), and data flows left and up through each operator until it reaches the
leftmost operator, the SELECT icon, which represents the final result handed back to the
client. A Nested Loops join sitting between a table scan and an index seek is combining
rows from both branches beneath it; the join happens after both its inputs are already
producing rows. Getting this backwards is the single most common reason a plan looks
incomprehensible to someone reading it for the first time.

## Operator icons are a fixed vocabulary

Each operator icon means something specific, not just "some kind of step":

- **Index Seek** — the engine navigated the index's B-tree structure directly to the
  needed rows. Efficient, and what you want to see for a selective, well-indexed query.
- **Index Scan / Table Scan** — the engine read every row in the index or table (a Table
  Scan happens against a heap with no clustered index). Not automatically bad for a small
  table or when most rows are needed, but a red flag on a large table for a selective
  query.
- **Key Lookup** — a secondary trip back to the clustered index to fetch columns not
  included in a nonclustered index used for the seek. One lookup per matching row — cheap
  in isolation, expensive at scale (Lesson 8).
- **Nested Loops** — for each row from the outer input, probe the inner input once. Great
  when the outer input is small.
- **Hash Match** — build an in-memory hash table from one input, probe it with the other.
  Common for larger, unsorted joins or aggregations; needs memory (Lesson 8, Chapter 6).
- **Sort** — explicitly reorders rows, often to satisfy an `ORDER BY` or to prepare input
  for a Merge Join. Expensive for large row counts, especially if it spills to disk.

## Arrow thickness encodes row count, not cost

The connecting lines between operators are drawn with a thickness proportional to the
*number of rows* flowing through that point in the plan — not cost, not time. A very thick
arrow feeding into a thin one usually means a filter or aggregation is doing real work at
that point; a thick arrow persisting all the way through several operators when you
expected filtering earlier is often the visual signal that a `WHERE` clause predicate
isn't being applied where you'd expect (or isn't seekable at all). Hover over any arrow in
SSMS to see the exact estimated or actual row count as a tooltip.

## Cost percentages are relative, not absolute

Each operator shows a cost percentage, and SSMS bolds the operator(s) with the highest
percentage — but that percentage is the optimizer's *estimated* relative cost within this
one plan, not a measured, real-world number, and not comparable across different plans or
different queries. A 90%-cost Sort operator tells you where the optimizer's own model
thinks the expense is concentrated in *this specific plan*; it's an excellent starting
point for investigation, but it's not proof, and (per Lesson 7) it can be flatly wrong when
statistics are stale or a parameter caused a bad estimate.

## Key terms

| Term | Meaning |
|---|---|
| Data flow direction | Right-to-left, bottom-to-top: base table access runs first, SELECT is the final step |
| Key Lookup | A secondary seek back into the clustered index for columns not in a nonclustered index |
| Arrow thickness | Proportional to row count flowing between operators, not cost or time |
| Cost percentage | The optimizer's estimated relative cost within one plan; a lead, not proof |

## Check yourself

Looking at a plan, you see a very thick arrow flowing out of a Table Scan straight into
the SELECT operator, with almost no thinning along the way. What does that suggest about
whether the query's `WHERE` clause is actually filtering effectively?
