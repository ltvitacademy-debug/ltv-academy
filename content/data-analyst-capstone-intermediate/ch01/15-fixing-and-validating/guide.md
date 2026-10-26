# Lesson 15 — Fixing and Validating

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 15 of 16**

## What you'll learn

- Making the actual fix: rebinding the card, not touching the DAX
- Why renaming a measure doesn't break anything that references it
- A real validation pass across multiple territories and segments, not just the one reported
- A defensive change that reduces the odds of this exact mistake recurring

## The fix is a rebinding, not a rewrite

Lesson 14 confirmed this is a binding mistake, not a formula mistake — so the fix matches that
diagnosis exactly. On the Territory page:

1. Click the headline card.
2. In the Fields pane, remove `[Total Sales (All Territories)]` from the Values well.
3. Drag in the plain `[Total Sales]` measure instead.

Nothing about `[Total Sales (All Territories)]`'s DAX changes. It's still correct, and it's still
needed — `[Pct of Company Total (Territory)]` depends on it.

## Validate against every territory, not just the one that was reported

A fix that's only checked against the territory in the original complaint isn't fully validated.
Go through each territory in `DimTerritory` and confirm, for each one:

- The headline card now changes correctly when that territory is selected.
- It matches the detail table's `[Total Sales]` for the same territory.
- Clearing the slicer back to no selection still shows the full company total on both — confirming
  you didn't just make the symptom disappear for one case while breaking another.

Then check the Segment page too, since it shares the same model and the same measure-naming risk:
confirm its cards are still correctly bound to `[Total Sales]`, not `[Total Sales (All Segments)]`.
This matters because the earlier mistake was invisible with no filter applied — a fix that's only
tested in that same unfiltered state could just as easily hide a *new* problem the same way.

## A defensive change: reduce the odds of a repeat

The root cause in Lesson 14 was five similarly-named measures sitting adjacent in an alphabetized
Fields list. The fix above doesn't change that risk for the *next* person building a card. Two
small, low-cost improvements that do:

```dax
-- Rename for clarity -- references to it still work automatically,
-- Power BI updates every formula that calls it by its old name.
Total Sales (All Territories) -> Total Sales — Company Benchmark (ALL Territories)
Total Sales (All Segments)    -> Total Sales — Company Benchmark (ALL Segments)
```

Then, in Model view, assign both renamed benchmark measures, plus both `Pct of Company Total (…)`
measures, to a **display folder** named `Benchmarks`, separating them visually from the plain,
filter-responsive measures in the Fields pane.

## Why the rename is safe

Renaming a measure in Power BI Desktop updates every reference to it automatically — including
inside `[Pct of Company Total (Territory)]`'s formula, which calls it by object reference, not by
typed text. This is worth confirming directly: after renaming, open `[Pct of Company Total
(Territory)]` and check that its formula now shows the new name, and that the card using it still
returns the same number as before the rename.

## Key terms

| Term | Meaning |
|---|---|
| Rebinding | Changing which field a visual uses, without touching the measure's definition |
| Display folder | A Power BI feature for organizing related measures in the Fields pane |
| Full validation pass | Checking a fix across every relevant case, not just the one reported |

## Lab

Make the rebinding fix, then validate across at least four different territories plus the
unfiltered state, and re-check the Segment page's cards too. Rename both "(All …)" measures and
confirm both `Pct of Company Total (…)` measures still work. Create the `Benchmarks` display
folder and move all four benchmark-related measures into it.

## Check yourself

You're ready for Lesson 16 when you can answer, without looking: why doesn't renaming
`[Total Sales (All Territories)]` break `[Pct of Company Total (Territory)]`, and why is
validating against every territory — and checking the other page too — more thorough than
validating against only the one originally reported?
