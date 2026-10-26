# Lesson 14 — Finding the Real Cause

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 14 of 16**

## What you'll learn

- Checking exactly which field a visual is bound to, not assuming
- Running a controlled test to confirm a hypothesis before touching anything
- The specific DAX mechanics that explain the symptom completely
- Why this exact bug is easy to make and easy to miss during normal report-building

## Step 1: check what the card is actually bound to

Click directly on the Territory page's headline card. In the **Fields** pane on the right, Power
BI highlights which field is populating the selected visual's **Values** well. Look at the exact
measure name sitting there — not what the card's title text says, which is just a label you (or
someone) typed.

This is the single most important diagnostic step, and the one that's easy to skip because it
feels too obvious: a visual's displayed title has no relationship to which measure actually feeds
it. If the card's title says "Total Sales" but the Values well is actually populated by
`[Total Sales (All Territories)]`, the title is simply wrong — the measure, not the title, decides
the number.

## Step 2: confirm the hypothesis with a controlled test

Don't just stare at the Fields pane and declare victory — prove it. Temporarily add a **second**
card to the page, bind it explicitly to the plain `[Total Sales]` measure, and filter the page to
Southwest again:

- The existing (suspect) card: unchanged, same value as every other territory.
- The new test card, bound to `[Total Sales]`: changes to Southwest's actual total — and now
  matches the detail table's number for Southwest.

That's a controlled experiment, not a guess: you changed one thing (which measure a card is bound
to) and watched the output change exactly as the hypothesis predicted.

## Step 3: understand exactly why this happened

Here's the full mechanical explanation, precisely:

- `[Total Sales (All Territories)]` is defined as `CALCULATE ( [Total Sales], ALL ( DimTerritory ) )`.
  `ALL ( DimTerritory )` removes any filter currently applied through the `DimTerritory`
  relationship — including the one coming from this page's own territory slicer.
- The headline card is bound to `[Total Sales (All Territories)]` instead of the plain
  `[Total Sales]` — most likely from a mis-drag back in Lesson 11, where all five "Total Sales…"
  measures sit alphabetically adjacent in a long Fields list, during fast, repetitive
  card-building.
- With no territory selected, both measures return the same number by coincidence — `ALL` has
  nothing to strip away — which is exactly why this went unnoticed when the page was first built
  and reviewed.
- The moment a territory filter is actually applied, the mis-bound card keeps showing the
  company-wide total, while every correctly-bound visual (including the detail table's
  `[Total Sales]` column) responds to the filter normally. That mismatch is precisely the symptom
  from Lesson 13.

## Why this is a realistic bug, not a contrived one

Nothing about `[Total Sales (All Territories)]` is wrong — it's a legitimate, correctly-written
measure, still needed elsewhere (it's the denominator inside `[Pct of Company Total (Territory)]`).
The bug isn't in the DAX. It's in which measure a specific visual happens to be bound to, which is
a binding mistake, not a formula mistake — and binding mistakes don't show up in a measure's
definition no matter how carefully you review the DAX itself.

## Key terms

| Term | Meaning |
|---|---|
| Field binding | Which specific column or measure a visual's well is actually wired to |
| Controlled test | Changing exactly one variable and observing the predicted effect |
| Coincidental match | Two different measures returning the same result only in one specific filter state |

## Lab

On your own model, click the Territory page's headline card and read its actual Values-well
binding in the Fields pane. Add the temporary test card described above, filter to the same
territory you recorded in Lesson 13, and confirm the test card's number now matches the detail
table's number for that territory.

## Check yourself

You're ready for Lesson 15 when you can answer, without looking: why did `[Total Sales]` and
`[Total Sales (All Territories)]` look identical when the page was first built in Lesson 11, and
what specifically changed that revealed the mis-binding?
