# Lesson 12 — Benchmarking Models · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Public leaderboards measure general capability, not your workload. This lesson covers how to benchmark models against what you actually need them to do.

## S2 · SCREENSHOT — Running the same dataset

This is the same eval infrastructure from Lesson 8, pointed at multiple providers instead of one — the same test cases, the same grading criteria, run once per candidate model so the comparison is apples to apples.

## S3 · SCREENSHOT — Quality isn't the only axis

A model that wins on accuracy can still be the wrong choice if it's too slow or too expensive. Here, all three models answered correctly, but one failed anyway — on a latency threshold, not a quality problem. That distinction only shows up at the per-case level.

## S4 · SCREENSHOT — Reading why, not just whether

A single aggregate score tells you a model is worse; it doesn't tell you in what way. Drilling into one case's full assertion breakdown separates "the content was wrong" from "the content was right but something else failed."

## S5 · STEPS — What to actually compare

Pass rate on your own eval dataset, not a public score. Cost per request and per token, at your real volume. Latency, especially for anything interactive. And failure mode, not just failure count — how a model fails matters as much as whether it does.

## S6 · OUTRO

That closes Chapter Two. You now have the full evaluation toolkit — datasets, metrics, human review, regression gates, red-teaming, and benchmarking — to measure an AI system instead of just hoping it works.
