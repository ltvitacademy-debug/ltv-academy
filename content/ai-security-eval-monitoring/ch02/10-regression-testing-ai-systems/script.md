# Lesson 10 — Regression Testing AI Systems · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

An AI regression is quieter than a normal software bug — nothing crashes, the answer just gets subtly worse. This lesson covers how to catch that automatically.

## S2 · STEPS — The basic loop

Run the full eval dataset against the current version as a baseline. Make the change — a prompt edit, a model swap. Run the same dataset again. Compare pass rates and flag anything that dropped, case by case, not just in aggregate.

## S3 · SCREENSHOT — The baseline run

A results viewer makes the baseline readable — every test case's input, output, and pass/fail state in one table. That's the reference point the "after" run gets compared against.

## S4 · SCREENSHOT — Making it automatic

The real value shows up wired into the same workflow as the code change. A CI integration re-runs the eval dataset whenever a prompt file changes, and posts the before/after comparison directly on the pull request — not a dashboard nobody checks.

## S5 · SCREENSHOT — Drilling into what changed

A summary count tells you that something regressed; you still need to see what changed to judge whether it matters. Clicking through opens the specific case, with both versions' outputs side by side, where a human makes the final call.

## S6 · OUTRO

Next lesson: red-teaming your own AI app — turning Chapter One's risk categories into attacks you run against your own system, on purpose, before someone else does.
