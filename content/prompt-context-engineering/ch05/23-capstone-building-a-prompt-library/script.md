# Script — Capstone: Building the Library

## Segment 1 (title)

A prompt library isn't one clever prompt saved in a notes app. It's a real, organized set of files — the same way a codebase is organized, not just a folder of scripts.

## Segment 2 (code: a real folder layout)

Here's a real layout: a prompts folder with system.md and a templates folder; a context folder with budget.md and any tool schemas; an evals folder with the eval set and a results folder per test run; and a changelog at the root. Four folders, and a changelog that ties every shipped version to its actual scores.

## Segment 3 (steps: what lives in each folder)

Every deliverable from the kickoff has a specific home. prompts holds system.md plus one file per template. context holds budget.md — the worksheet from Lesson 13 — plus any tool schemas from Lesson 16. evals holds the eval set itself plus a results folder, one entry per test run. And CHANGELOG.md records every version, what changed in its prompt, and its pass rate.

## Segment 4 (steps: the build order)

Build it in this order. First, system.md and your templates — Chapters 1 and 2, applied to your real use case. Second, budget.md and any tool schemas — Chapter 3's worksheet and rules, written down, not just thought about. Third, eval_set.json — at least ten cases, across all four categories from Lesson 18. Fourth, run your tests and update the changelog — every version gets a real, dated pass-rate entry, not a note that you "tested it."

## Segment 5 (outro)

The changelog is what makes this a library instead of a folder of files — it's the version history from Lesson 21, kept for real, so a stranger (or you, in six months) can see exactly what changed and whether it helped. Next: the final lesson — wrap-up and portfolio presentation, presenting this real, working library as evidence of a skill.
