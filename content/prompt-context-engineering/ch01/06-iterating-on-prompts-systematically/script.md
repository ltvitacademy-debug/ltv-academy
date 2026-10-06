# Lesson 6 — Iterating on Prompts Systematically · Voiceover script

Segments map 1:1 to slides. Target: ~300 words / 2.5-3 minutes.

---

## S1 · TITLE CARD

We've covered what makes a prompt good, and the ways it tends to fail.
This lesson closes the chapter with the missing piece: a repeatable
process for actually improving a prompt, instead of just guessing at
fixes.

## S2 · STEPS CARD (four-step loop)

The loop has four steps. Baseline — run the current prompt against a
fixed set of test inputs and save the outputs. Pick test cases that cover
typical, edge, and already-failing inputs. Change exactly one thing. Then
compare the new outputs against the baseline before keeping the change.

## S3 · CODE CARD (one change at a time)

Here's why "one change" matters so much. Change the tone, the length, and
the format all at once, and if it improves, you have no idea which change
did it. Change only the length constraint this round, and if it improves,
you know exactly why — and exactly what to undo if it breaks something
else.

## S4 · CODE CARD (worked example)

Say a ticket classifier gets the right category 90% of the time, but
keeps missing tickets that mention both billing and a bug. The move isn't
to rewrite the whole prompt. Baseline the 90%, isolate those specific
cases, add one sentence resolving the ambiguity, then re-run the full test
set — not just the cases you were fixing.

## S5 · STEPS CARD (recap)

That full test set re-run is the step people skip, and it's the one that
catches regressions — cases that used to work, breaking because of a
change made for something else entirely.

## S6 · OUTRO CARD

Baseline, test cases, one change, compare. That's the whole loop — and
it's the same discipline Chapter 4 builds into a formal evaluation
practice. Next up, Chapter 2: advanced prompting techniques, starting with
chain-of-thought prompting.
