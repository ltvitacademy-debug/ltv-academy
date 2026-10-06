# Lesson 21 — Regression Testing Prompts

**Chapter 4 · Evaluating Prompts · Lesson 21 of 24**

## What you'll learn

- Why a prompt change that passes its own target case can still ship a
  real regression
- A real example of a regression being caught: a case that flipped
  from pass to fail between versions
- The regression-testing discipline, applied to prompts the same way
  it's applied to software
- Why versioning prompts alongside their eval scores makes a
  regression bisectable instead of a mystery

## A fix can also be a break

Lesson 20 covered deciding a winner between two prompt versions on a
defined metric. That's not the end of the story: a new version can
genuinely win on the metric it was optimized for — and still break
something that used to work, if nothing is specifically checking the
*rest* of the eval set, not just the case the change targeted.

## A real regression, caught

```
{
  "case_id": "ev_014",
  "baseline_v14": "pass",
  "current_v15": "fail",
  "status": "REGRESSION"
}
```

This is the exact shape of what catches it: a specific case,
`ev_014`, that passed on the prior version (`v14`) and fails on the
current one (`v15`). It's flagged as a regression regardless of
whether `v15`'s overall pass rate is higher than `v14`'s — because the
question regression testing answers isn't "is this version better
overall," it's "did anything that used to work stop working."

## The discipline, borrowed directly from software

This is the same practice as a regression test suite in software
engineering, applied to prompts:

1. **Baseline every passing case.** Every eval case's current
   known-good result gets saved, not just the overall pass rate.
2. **Re-run the full suite on every ship**, not only the cases related
   to whatever just changed. A change aimed at fixing one case can
   affect behavior on cases that look unrelated.
3. **Treat any pass-to-fail flip as blocking.** The same way a broken
   unit test blocks a software deploy, a regression in the eval suite
   should block a prompt from shipping — it's not a "nice to notice
   later," it's a stop sign.
4. **Version prompts like code.** Store the prompt text for each
   version alongside its eval results, so a drop in scores can be
   traced back to the exact version — and the exact change — that
   caused it.

## Why versioning makes a drop bisectable

```
v12  pass_rate 0.810
v13  pass_rate 0.857
v14  pass_rate 0.905
v15  pass_rate 0.881  <- drop,
                        bisect here
```

A version history like this turns "something regressed recently" into
"v15 regressed, specifically" — because each version's prompt text and
score are both on record. Without that history, finding the cause of
a drop means guessing at which of several recent changes is
responsible; with it, the answer is already in the log.

## Key terms

| Term | Meaning |
|---|---|
| Regression | A previously-passing eval case that now fails, after a prompt change |
| Baseline | The saved, known-good result for each eval case, used for comparison |
| Bisecting | Tracing a score drop back to the specific version that caused it, using a version history |

## Lab

1. For your Lesson 18 eval set, record a baseline result (pass/fail)
   for every case against your current prompt.
2. Make one deliberate change to the prompt, re-run the full suite,
   and check for any pass-to-fail flips — not just whether your
   intended fix worked.

## Check yourself

You're ready for the capstone when you can explain why "this version
scores higher overall" and "this version has no regressions" are two
different claims — and can point to a specific case id as evidence
either way.
