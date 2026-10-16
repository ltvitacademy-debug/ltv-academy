# Chart Type & Goal Seek Decision Guide

Compiled from Chapter 7 (Charts & Data Analysis) — the course's closing chapter. Two decision
tools: which chart family actually answers your question, and how to run Goal Seek without
mixing up its three fields.

## Name the question before opening the Insert tab

A perfectly formatted chart still fails if it can't answer the real question behind it — a pie
chart has no concept of time, no matter how well it's formatted. Name the question in one
sentence first; the chart type follows from the sentence.

| Question | Chart family | Why |
|---|---|---|
| How do a handful of categories compare right now? | Bar / column | Length is the easiest visual quantity to compare accurately |
| Is a value trending up, down, or flat over a period? | Line | Built for change over a continuous axis — never a pie |
| What share does each part contribute to a total? | Stacked bar/column, or pie (small handful of slices only) | Pie becomes unreadable past five or six slices |
| Does one variable move with another? | Scatter | The one job a bar or line chart can't do |
| How are individual values spread across a range? | Histogram | Bins continuous values — reveals outliers, skew, clusters |

Excel's **Insert > Recommended Charts** reasons only from your data's shape (column/category
counts), not your actual business question — treat its suggestion as a well-informed first guess,
then check it against the table above.

## Goal Seek — the three fields, every time

```
Data > What-If Analysis > Goal Seek
```

| Field | What goes there |
|---|---|
| Set cell | The cell holding the **formula** whose result you care about — never a plain input |
| To value | The exact target number you want that formula to reach |
| By changing cell | The single input cell Goal Seek is allowed to adjust — must feed into the Set cell's formula |

Goal Seek only ever adjusts one input per run, solving backward from a known target to the unknown
input that produces it — the inverse of how a formula normally runs.

## Goal Seek vs. a Data Table, in one line

Goal Seek solves for **one** target using **one** changing input. A **Data Table** (same What-If
Analysis menu) instead shows the result for **many** different input values side by side — reach
for Goal Seek when you have one specific target, a Data Table when you want to see a whole range
of scenarios at once.

## Related course material

- Lesson 24 — Choosing the Right Chart
- Lesson 25 — What-If Analysis & Goal Seek
