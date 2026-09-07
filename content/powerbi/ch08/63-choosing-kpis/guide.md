# Lesson 63 — Choosing KPIs

**Chapter 8 · Dashboard Design & Storytelling · Lesson 2 of 5**

## What you'll learn

- What makes a number a genuine KPI rather than just an interesting metric
- A simple test for deciding whether a metric belongs on a dashboard
- Why fewer, well-chosen KPIs beat a dashboard packed with everything available
- How a KPI needs a target, not just a value, to do its job

## Not every number is a KPI

A **key performance indicator** is a metric tied directly to a goal —
something the organization has explicitly decided matters enough to
track and act on. That's a narrower category than "any number you could
compute." Total revenue, if the business has a revenue target, is a
KPI. The average length of a product name in your catalog is a number
— but it isn't a KPI, because nothing hinges on it.

## The test: does this number change a decision?

Before adding a metric to a dashboard, ask: **if this number moved
significantly, would anyone actually do anything differently?** If the
honest answer is no, it's interesting, not actionable — and it belongs
in a detailed report a curious viewer could drill into, not in the
small set of numbers someone checks every day.

This is the same discipline from Lesson 62's audience questions, sharpened
into a single filter you can apply metric by metric.

## Fewer, better, beats more

A dashboard crowded with fifteen tiles doesn't communicate fifteen
things — it communicates that nothing on it was worth prioritizing.
Microsoft's own guidance is blunt about this: keep the dashboard to one
screen, avoid scroll bars, and remove everything that isn't essential.
A shorter list of KPIs that the audience actually checks beats a longer
list that gets skimmed past.

## A KPI needs a target, not just a value

A raw number on its own — "$2.3M in sales this quarter" — doesn't tell
anyone whether that's good. A genuine KPI compares that value against
something: a target, a prior period, a benchmark. This is exactly why
Lesson 55's KPI visual exists as something distinct from a plain card —
it's built to show progress toward a defined goal, not just display a
number in isolation.

When you're choosing KPIs for a dashboard, make sure each one has (or
can be given) a real target to compare against. A metric with no target
attached is a candidate for a card, not a KPI.

## A short checklist

For each candidate metric, ask:

1. Is it tied to an actual goal the organization tracks?
2. Would a significant change in this number change what someone does?
3. Does it have — or can it be given — a target to compare against?
4. Is it one of the handful the audience needs *at a glance*, not
   something better suited to a detailed report?

A metric that clears all four is a real KPI. One that doesn't belongs
somewhere else — a report page, a drillthrough, or nowhere at all.

## Key terms

| Term | Meaning |
|---|---|
| KPI (key performance indicator) | A metric tied to a goal, used to track progress and inform decisions |
| Actionable metric | A number that would actually change someone's decision if it moved |

## Lab

1. List five metrics you could compute from **AdventureWorksDW2014**
   (total sales, order count, average order value, distinct customers,
   whatever comes to mind).
2. Run each one through the four-question checklist above.
3. Narrow your list down to the two or three that would actually make
   the cut for an executive dashboard, and explain why the others didn't.

## Check yourself

You're ready for Lesson 64 when you can explain, in one sentence, why a
dashboard with fewer well-chosen KPIs communicates more than one packed
with everything available.
