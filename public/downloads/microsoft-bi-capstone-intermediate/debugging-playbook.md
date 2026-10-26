# The "Numbers Don't Match" Debugging Playbook

Intermediate Capstone, Lessons 10–12. The real diagnostic method this project
walks through, worked example included — keep this open the next time two
pages of a report disagree and you're not sure why.

## The report

> "My Drill-Down page says Total Sales for the Pacific region is one number.
> The Sales Director's Executive Summary, filtered to Pacific, shows something
> completely different. Which one is right?"

"Something completely different" isn't enough to act on. The job isn't
fixing anything yet — it's reproducing the problem reliably.

## Step 1 — Reproduce it exactly as reported

Open both pages, apply the same filter to both, write down both numbers. If
they match, the report may have compared the wrong filter state — rule that
out before assuming a real bug.

- [ ] Both pages open, same filter applied to each
- [ ] Both numbers written down
- [ ] Confirmed they actually differ

## Step 2 — Isolate the variable

Change **one thing** — here, the region — and watch what does and doesn't
change. Repeat for at least three different values.

- [ ] Repeated the comparison for 3+ regions
- [ ] Noted which card changes correctly and which doesn't move at all

A number that never changes when the one filter that's supposed to control it
changes isn't a rounding difference — it's a sign that whatever's behind that
card isn't looking at the filter at all.

## Step 3 — Check the actual binding, not the title

Click the suspect visual. In the Fields pane, read exactly which measure is
sitting in the Values well — **not** what the visual's title text says. A
title is just a label; it has no relationship to which measure feeds the
visual.

- [ ] Clicked the suspect card and read its real Values-well binding

## Step 4 — Confirm with a controlled test

Don't declare victory from the Fields pane alone. Add a temporary second
visual, bind it explicitly to the measure you believe *should* be there, and
compare under the same filter.

- [ ] Added a test visual bound to the expected measure
- [ ] Confirmed it changes correctly where the suspect card doesn't

## Step 5 — Explain the mechanism completely

Don't stop at "it's bound to the wrong measure." Explain *why* that measure
produces this exact symptom — in this project's case: `CALCULATE ( ...,
ALL ( TerritoryDim ) )` strips the region filter on purpose, so the mis-bound
card shows the company-wide total no matter what's selected, and the two
measures coincidentally matched when nothing was filtered yet — which is
exactly why the mistake went unnoticed when the page was first built.

- [ ] Can state, in one sentence, the specific DAX mechanic causing the symptom

## Step 6 — Fix the actual cause, not the symptom

If this is a binding mistake, the fix is rebinding the visual — not rewriting
a measure that was correct all along and is still needed elsewhere.

- [ ] Fixed by rebinding (or rewriting, if the cause was actually in the DAX)
- [ ] Nothing else that depends on the "broken" measure got touched unless it needed to

## Step 7 — Validate against every case, not just the one reported

A fix checked only against the originally reported case isn't fully
validated — it can hide a new problem the same way the original one hid.

- [ ] Checked every relevant value (every region), not just the one reported
- [ ] Checked the unfiltered/default state too

## Step 8 — Consider a defensive change

If the root cause was something structurally easy to repeat (two
similarly-named measures sitting next to each other in an alphabetized list,
for example), a small change — a clearer name, a display folder, a comment —
reduces the odds of the same mistake recurring for the next person.

- [ ] Considered whether a small defensive change is worth making
