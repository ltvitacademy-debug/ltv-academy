# Lesson 13 — The Numbers Don't Match — Now What?

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 13 of 16**

## What you'll learn

- Reproducing a reported discrepancy instead of guessing at it
- Why isolating one variable at a time is the first real diagnostic step
- What a genuinely useful bug report looks like, versus a vague one
- The specific tell that narrows this bug down before you've opened a single measure

## The report comes in

A few days after the refresh goes live, the Sales Director emails: "I filtered the Territory page
to Southwest and the headline card shows one number. The detail table, same page, same filter,
shows a different Total Sales for Southwest. Which one is right?"

That's a real BI support ticket, and "a different number" isn't enough to act on yet. The first
job isn't fixing anything — it's reproducing the problem reliably, on your own screen, before you
touch a single measure.

## Step 1: reproduce it exactly as reported

Open the Territory page. Set the territory slicer to **Southwest**. Read the headline card's
number. Read the detail table's `[Total Sales]` row for Southwest. Write both numbers down.

If they match, the Sales Director may have compared numbers from different refresh times, or
mis-read the table — worth ruling out before assuming a model bug. If they don't match — which is
what you'll find here — the report is confirmed real, and you now have two concrete numbers to
work from instead of a vague complaint.

## Step 2: isolate the variable — does it happen for every territory?

Repeat the same comparison for a second territory, say **Northwest**, then a third. This is the
single most useful diagnostic habit in BI troubleshooting: change **one thing** (the territory)
and watch what does and doesn't change. Here's the pattern you'll see:

- The detail table's `[Total Sales]` row **changes** correctly for each territory you pick.
- The headline card **does not change at all** — it shows the exact same number regardless of
  which territory is selected.

## That pattern is the real tell

A number that never changes when you change the one filter that's supposed to control it isn't a
rounding difference or a refresh-timing issue — it's a sign that whatever is behind that card
isn't actually looking at the territory filter at all. Recall from Lesson 9: there is a measure in
this model, `[Total Sales (All Territories)]`, built specifically to ignore the territory filter
on purpose, for a legitimate reason — a company-wide benchmark. That's not an accusation yet. It's
a lead, and the next lesson follows it.

## What NOT to do yet

Don't rewrite any measure, don't delete `[Total Sales (All Territories)]`, and don't guess which
number is "probably" wrong. You have a reproducible symptom and a strong lead. Lesson 14 confirms
the actual cause before anything gets changed.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Confirm a reported problem by triggering it yourself, under known conditions |
| Isolate the variable | Change one thing at a time to see what it affects |
| Symptom | An observed behavior (a number not changing) — not yet the cause |

## Lab

On your own model, reproduce the exact comparison above for at least three different territories.
Record, for each territory, the headline card's number and the detail table's `[Total Sales]`.
Confirm the pattern described above holds for all three before moving on.

## Check yourself

You're ready for Lesson 14 when you can answer, without looking: what specific pattern — not just
"the numbers differ" — tells you the headline card isn't responding to the territory filter at
all?
