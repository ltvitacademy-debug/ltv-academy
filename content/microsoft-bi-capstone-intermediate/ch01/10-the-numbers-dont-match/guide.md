# Lesson 10 — The Numbers Don't Match on Two Pages — Now What?

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 10 of 16**

## What you'll learn

- Reproducing a reported discrepancy instead of guessing at it
- Why isolating one variable at a time is the first real diagnostic step
- What a genuinely useful bug report looks like, versus a vague one
- The specific tell that narrows this bug down before you've opened a single measure

## The report comes in

A week after the scheduled refresh goes live, the Operations Manager emails: "My Drill-Down page
says Total Sales for the Pacific region is one number. The Sales Director's Executive Summary,
filtered to Pacific, shows something completely different. Which one is right?"

That's a real BI support ticket, and "something completely different" isn't enough to act on yet.
The first job isn't fixing anything — it's reproducing the problem reliably, on your own screen,
before you touch a single measure.

## Step 1: reproduce it exactly as reported

Open both pages. On the Drill-Down page, set the Region slicer to **Pacific** and read the
`[Total Sales]` card. On the Executive Summary page, set its own Region slicer to **Pacific** and
read its headline Total Sales card. Write both numbers down.

If they match, the Operations Manager may have compared the wrong filter state, or compared
numbers from different refresh times — worth ruling out before assuming a model bug. If they
don't match — which is what you'll find here — you've confirmed the report is real, and you now
have two concrete numbers to work from instead of a vague complaint.

## Step 2: isolate the variable — does it happen for every region?

Repeat the same comparison for a second region, say **Europe**, then a third. This is the single
most useful diagnostic habit in BI troubleshooting: change **one thing** (the region) and watch
what does and doesn't change. Here's the pattern you'll see:

- The Drill-Down page's Total Sales **changes** correctly with each region you pick.
- The Executive Summary page's headline Total Sales **does not change at all** — it shows the
  exact same number regardless of which region is selected.

## That pattern is the real tell

A number that never changes when you change the one filter that's supposed to control it isn't a
rounding difference or a refresh-timing issue — it's a sign that whatever is behind that card
isn't actually looking at the region filter at all. Recall from Lesson 6: there is a measure in
this model, `[Total Sales (All Regions)]`, built specifically to ignore the region filter on
purpose, for a legitimate reason — a company-wide benchmark. That's not an accusation yet. It's a
lead, and the next lesson follows it.

## What NOT to do yet

Don't rewrite any measure, don't delete `[Total Sales (All Regions)]`, and don't guess which card
is "probably" wrong. You have a reproducible symptom and a strong lead. Lesson 11 confirms the
actual cause before anything gets changed.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Confirm a reported problem by triggering it yourself, under known conditions |
| Isolate the variable | Change one thing at a time to see what it affects |
| Symptom | An observed behavior (a number not changing) — not yet the cause |

## Lab

On your own model, reproduce the exact comparison above for at least three different regions.
Record, for each region: the Drill-Down page's `[Total Sales]` and the Executive Summary page's
headline Total Sales. Confirm the pattern described above holds for all three before moving on.

## Check yourself

You're ready for Lesson 11 when you can answer, without looking: what specific pattern — not just
"the numbers differ" — tells you the Executive Summary's card isn't responding to the region
filter at all?
