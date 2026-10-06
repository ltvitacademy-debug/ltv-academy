# Lesson 6 — Iterating on Prompts Systematically

**Chapter 1 · Prompt Engineering Fundamentals · Lesson 6 of 24**

## What you'll learn

- Why "tweak and re-run until it looks right" doesn't scale past a handful of tests
- A four-step iteration loop: baseline, test cases, change one thing, compare
- Why changing more than one variable per iteration makes results impossible to trust
- How this lesson's loop sets up Chapter 4's deeper dive into formal prompt evaluation

## Guessing doesn't scale

It's tempting to fix a misbehaving prompt by eyeballing one bad output,
tweaking a sentence, running it once more, and moving on once it looks
better. That approach breaks down fast: a single re-run doesn't tell you
whether the fix actually helped, hurt some other case, or just got lucky
on this one input. Prompt iteration needs the same discipline as debugging
code — a repeatable loop, not a vibe check.

## The four-step loop

```
1. BASELINE   — run the current prompt against a fixed
                set of test inputs, save the outputs
2. TEST CASES — pick inputs that cover the real range:
                typical, edge case, and one that already
                fails
3. ONE CHANGE — edit exactly one thing in the prompt
                (not three at once)
4. COMPARE    — re-run the same test inputs, compare
                against the baseline, keep the change
                only if it actually helped
```

Repeat the loop for the next issue. This is slower per-iteration than
eyeballing a single output, but far faster overall, because you stop
re-discovering problems you already "fixed" and then silently broke again.

## Why "one change" matters

```
Bad iteration:                    Good iteration:
Change tone AND length AND        Change ONLY the length
output format all at once         constraint this round
-> if it improves, you don't      -> if it improves, you know
   know which change did it         exactly why
-> if it breaks something,        -> if it breaks something,
   you don't know which change      you know exactly what to
   to undo                          revert
```

Changing one variable per round costs a few extra iterations. It's worth
it: every change becomes attributable, so your prompt's history actually
means something instead of being a pile of edits nobody can explain.

## A worked example

Say a support-ticket classifier prompt gets the right category 90% of the
time on your test set, but keeps misclassifying tickets that mention both
billing and a bug. Bad move: rewrite the whole prompt. Good move: baseline
the current 90%, isolate the billing-plus-bug test cases specifically, add
one sentence addressing that exact ambiguity ("if a ticket mentions both a
charge and a bug, classify by whichever issue is primary"), then re-run
the full test set — not just the cases you were fixing — to confirm
nothing else regressed.

## Key terms

| Term | Meaning |
|---|---|
| Baseline | The current prompt's output on a fixed set of test inputs, before any change |
| Test case | One specific input used to check a prompt's behavior, chosen to cover typical and edge cases |
| Regression | A previously-working case that breaks because of a change made for a different case |
| Iteration loop | The repeatable baseline → test → change → compare cycle |

## Lab

Pick a prompt you've written in an earlier lesson's lab that you suspect
has room to improve. Run the four-step loop on it once: establish a
baseline against 3 test inputs, change exactly one thing, and compare the
new outputs against the baseline for all 3 inputs — not just the one you
were trying to fix.

## Check yourself

You're ready for Chapter 2 when you can explain, without looking, why
changing three things in a prompt at once makes it impossible to know
which change actually caused an improvement — and why that matters even
when the change appears to work.
