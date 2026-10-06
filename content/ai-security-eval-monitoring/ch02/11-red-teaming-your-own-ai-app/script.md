# Lesson 11 — Red-Teaming Your Own AI App · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter One's risk categories stop being theoretical here. Red-teaming turns them into a repeatable test suite you run against your own app, on purpose, before an attacker finds the gaps.

## S2 · SCREENSHOT — Describing what you're protecting

A useful run needs context about the application, not just the model — what it's for, what data it can reach, what a realistic attacker impersonating a user would try. The more specific this is, the more realistic the generated attacks.

## S3 · SCREENSHOT — Running probes at scale

From that description, the tool generates test cases across many attack categories and runs them against the live application. A real run isn't a handful of manual tries — it's thousands of generated probes, executed automatically.

## S4 · SCREENSHOT — Reading the risk report

Raw pass/fail counts across thousands of probes aren't useful alone. A risk report organizes results by category and severity, turning a wall of results into an actual punch list — critical issues first.

## S5 · STEPS — Reading it like a practitioner

Critical and high findings come first, regardless of overall pass rate. A failed check maps straight back to a Chapter One category. This isn't one-time — every change can reopen a category that passed before. And a finding becomes a permanent eval dataset case once it's fixed.

## S6 · OUTRO

Next lesson: benchmarking models — using these same tools to compare models head to head before you commit to one.
