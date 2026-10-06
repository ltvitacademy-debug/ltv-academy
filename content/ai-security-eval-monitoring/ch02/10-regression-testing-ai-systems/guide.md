# Lesson 10 — Regression Testing AI Systems

**Chapter 2 · Evaluating AI Systems · Lesson 10 of 25**

## What you'll learn

- Why AI regressions are quieter and easier to miss than normal software regressions
- How to turn an eval dataset (Lesson 7) and metrics (Lesson 8) into an automatic gate
- What a real before/after comparison looks like when a prompt changes
- Where this check belongs in a team's actual workflow

## Why AI regressions are different

In traditional software, a regression usually breaks something visibly — a page errors out, a test fails red. An AI regression is quieter: the system still runs, still returns a fluent, confident-sounding answer, but the answer is now subtly worse than it was before a prompt tweak, a model version bump, or a dependency update. Nothing crashes. Nothing obviously errors. The only way to catch it is to compare today's outputs against yesterday's, on the same test cases, deliberately — which is exactly what the eval dataset from Lesson 7 is for.

## The basic loop

Regression testing for AI systems is the eval dataset and metrics from the last two lessons, run automatically, every time something changes:

1. Run the full eval dataset against the current version, establishing a baseline.
2. Make the change (a prompt edit, a model swap, an updated retrieval step).
3. Run the same dataset again against the new version.
4. Compare pass rates and flag anything that dropped, case by case, not just in aggregate.

A results viewer makes the baseline run itself readable — every test case's input, output, and pass/fail state in one table, which is also what you'd compare the "after" run against:

![Promptfoo's results viewer, showing search, filters, and a table of variables and outputs with pass/fail counts per provider](/courses/ai-security-eval-monitoring/ch02/10-regression-testing-ai-systems/web-ui-viewer.png)
*A baseline run: every test case, every output, every pass/fail — the reference point the "after" run gets compared against.*

## Making it automatic: gating on every change

The real value of regression testing shows up when it's wired into the same workflow as the code change itself, not run manually and occasionally. A CI integration can automatically re-run the eval dataset whenever a prompt file changes, and post the before/after comparison directly where the change is being reviewed:

![A GitHub Actions bot comment on a pull request reading "LLM prompt was modified" with a Success/Failure table showing 11 successes and 1 failure, and a link to view full eval results](/courses/ai-security-eval-monitoring/ch02/10-regression-testing-ai-systems/github-action-comment.png)
*A CI comment posted automatically the moment a prompt file changes — the regression check lands right where the change is being reviewed, not in a separate dashboard nobody checks.*

## Drilling into what actually changed

A summary count ("11 passed, 1 failed") tells you *that* something regressed; you still need to see *what* changed to judge whether it matters. Clicking through from that comment opens the specific case, with both versions' outputs side by side:

![A side-by-side comparison view showing two prompt variants' outputs for the same test cases, with one column passing 70% and the other 100%](/courses/ai-security-eval-monitoring/ch02/10-regression-testing-ai-systems/web-viewer-diff.png)
*The actual diff: two prompt variants, same inputs, outputs side by side — where a human makes the final call on whether a regression is real.*

## Where this belongs in the workflow

- **Run it on every pull request that touches a prompt, model config, or retrieval logic** — not just before a big release.
- **Gate merges on a pass-rate threshold**, so an obvious regression can't land without someone explicitly overriding it.
- **Still route borderline cases to a human** (Lesson 9) — an automated gate catches clear regressions; judgment calls on close ones still need a person.
- **Add every newly discovered regression back into the eval dataset** so the exact same mistake can never silently reappear.

## Key terms

| Term | Meaning |
|---|---|
| Regression (AI-specific) | A quality drop with no crash or visible error — only measurable by comparison |
| Baseline run | An eval run against the current version, used as the comparison point for a later change |
| Gating | Blocking a merge or deploy automatically when a regression check fails |

## Lab

Think of a prompt change you (or a team) might reasonably make to an AI feature — tightening instructions, adding a new rule, switching models. Write down which 3 of your Lesson 7 eval cases you'd expect to be most at risk of regressing from that specific change, and why.

## Check yourself

Can you explain, in your own words, why an AI regression can pass a casual "try it a few times" check but still show up clearly in an eval dataset run before/after a change?
