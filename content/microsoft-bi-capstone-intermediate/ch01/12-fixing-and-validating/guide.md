# Lesson 12 — Fixing the Measure and Validating the Result

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 12 of 16**

## What you'll learn

- Making the actual fix: rebinding the card, not touching the DAX
- Why renaming a measure doesn't break anything that references it
- A real validation pass across multiple regions, not just the one that was reported
- A defensive change that reduces the odds of this exact mistake recurring

## The fix is a rebinding, not a rewrite

Lesson 11 confirmed this is a binding mistake, not a formula mistake — so the fix matches that
diagnosis exactly. On the Executive Summary page:

1. Click the headline Total Sales card.
2. In the Fields pane, remove `[Total Sales (All Regions)]` from the Values well.
3. Drag in the plain `[Total Sales]` measure instead.

Nothing about `[Total Sales (All Regions)]`'s DAX changes. It's still correct, and it's still
needed — `[Pct of Company Total]` depends on it.

## Validate against every region, not just the one that was reported

A fix that's only checked against the region in the original complaint isn't fully validated. Go
through each territory in `TerritoryDim` and confirm, for each one:

- The Executive Summary's Total Sales card now changes correctly when that region is selected.
- It matches the Drill-Down page's `[Total Sales]` for the same region.
- Clearing the slicer back to no selection still shows the full company total on both pages —
  confirming you didn't just make the symptom disappear for one case while breaking another.

This matters because the earlier mistake was invisible with no filter applied — a fix that's only
tested in that same unfiltered state could just as easily hide a *new* problem the same way.

## A defensive change: reduce the odds of a repeat

The root cause in Lesson 11 was two similarly-named measures sitting adjacent in an alphabetized
Fields list. The fix above doesn't change that risk for the *next* person building a card. Two
small, low-cost improvements that do:

```dax
-- Rename for clarity — references to it still work automatically,
-- Power BI updates every formula that calls it by its old name.
Total Sales (All Regions) -> Total Sales — Company Benchmark (ALL Territories)
```

Then, in Model view, assign both benchmark-style measures (`Total Sales — Company Benchmark
(ALL Territories)` and `Pct of Company Total`) to a **display folder** named `Benchmarks`,
separating them visually from the plain, filter-responsive measures in the Fields pane.

## Why the rename is safe

Renaming a measure in Power BI Desktop updates every reference to it automatically — including
inside `[Pct of Company Total]`'s formula, which calls it by object reference, not by typed text.
This is worth confirming directly: after renaming, open `[Pct of Company Total]` and check that
its formula now shows the new name, and that the card using it still returns the same number as
before the rename.

## Key terms

| Term | Meaning |
|---|---|
| Rebinding | Changing which field a visual uses, without touching the measure's definition |
| Display folder | A Power BI feature for organizing related measures in the Fields pane |
| Full validation pass | Checking a fix across every relevant case, not just the one reported |

## Lab

Make the rebinding fix, then validate across at least four different territories plus the
unfiltered state. Rename `[Total Sales (All Regions)]` and confirm `[Pct of Company Total]`
still works. Create the `Benchmarks` display folder and move both benchmark measures into it.

## Check yourself

You're ready for Lesson 13 when you can answer, without looking: why does renaming
`[Total Sales (All Regions)]` not break `[Pct of Company Total]`, and why is validating against
every region more thorough than validating against only the one originally reported?
