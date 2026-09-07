# Lesson 20 — Python vs. Power Query vs. DAX

**Chapter 6 · Python Inside Power BI · Lesson 20 of 20 (Course Final Lesson)**

## What you'll learn

- A decision framework for choosing the right tool, not just knowing three
- When Power Query is genuinely the right call, even though you now know Python
- When DAX is non-negotiable, no matter how comfortable Python feels
- Where Python actually earns its place — and where it's just an unnecessary detour

## The framework: ask what the calculation needs to do

Lesson 1 opened this course with the same three tools, described from the
outside. Twenty lessons later, here's the actual decision framework,
built from the inside:

| Question | Answer points to |
|---|---|
| Does it need to run **once**, shaping data before load? | Power Query |
| Does it need to recalculate **live**, per filter/click? | DAX |
| Does it need something **neither built-in tool can do at all**? | Python |

Notice the order. Power Query and DAX are checked *first* — Python is
the answer only when the first two genuinely don't cover it, not a
default reach because it's the tool you just spent the most lessons on.

## When Power Query is still the right call

Renaming columns, filtering rows, merging two Excel sheets, fixing a data
type — Chapter 4 of this course covered doing all of this in Pandas, and
you now genuinely can. But if Power Query's UI already does it in three
clicks, reaching for a Python script instead adds a dependency (a
correctly configured Python installation, on every machine that refreshes
this file) for zero actual benefit.

## When DAX is non-negotiable

Lesson 1 already told you this, and eighteen lessons of real Python
haven't changed it: DAX recalculates live, per filter context, as a user
interacts with a report. Python runs once, at import or refresh, and
produces a static result. A total that needs to change when someone
clicks a slicer has exactly one correct tool, and it was never Python.

## Where Python actually earns its place

The genuine, non-overlapping cases from this course:

- **Statistical or ML techniques** with no Power Query or DAX equivalent
  — forecasting, clustering, regression.
- **Cleaning patterns that are a few lines of Pandas** versus a dozen
  awkward Power Query steps — Lesson 18's `fillna(method='backfill')`
  predictive fill is a real example, not a contrived one.
- **A specific visual** no native chart type in the gallery covers —
  Lesson 19's Matplotlib visuals.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | Check what the calculation needs first; let that dictate the tool |
| Non-overlapping case | A genuine gap only Python fills — not a preference, a capability |

## Lab

1. Pick three tasks you've done in Power BI before this course — one
   that felt like data cleaning, one that felt like a calculation, one
   that felt like a chart.
2. For each, apply this lesson's framework and name which tool actually
   fits — and whether Python would have helped, or just added
   complexity.
3. Revisit the note from Lesson 1's lab — the task that felt harder than
   it should have. Which tool was actually the problem?

## Check yourself

The course is complete when you can hand someone a real Power BI task
and correctly identify, using this lesson's framework rather than a
guess, whether it belongs in Power Query, DAX, or Python — and explain
why in one sentence.

Congratulations — you now know exactly where Python fits into a Power BI
project, and just as importantly, where it doesn't.
