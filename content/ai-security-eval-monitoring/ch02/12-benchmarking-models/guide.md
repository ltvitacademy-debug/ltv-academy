# Lesson 12 — Benchmarking Models

**Chapter 2 · Evaluating AI Systems · Lesson 12 of 25**

## What you'll learn

- Why published benchmark leaderboards don't answer the question you actually have
- How to benchmark models against your own workload instead
- Why cost and latency belong in the comparison alongside quality
- How to read a per-case result to understand *why* a model lost, not just that it did

## Why leaderboard numbers aren't your answer

Public model leaderboards measure general capability on broad, published benchmarks — useful for getting a rough sense of a model's overall strength, but they say very little about how that model will do on your specific prompts, your specific data, and your specific task. A model that scores well on a generic reasoning benchmark might still underperform a smaller, cheaper model on your narrow use case, and a leaderboard has no way to tell you that. The only benchmark that actually answers your question is one built from your own eval dataset (Lesson 7), run against the specific models you're considering.

## Running the same dataset across candidate models

This is the same eval infrastructure from Lesson 8, pointed at multiple providers instead of one — the same test cases, the same grading criteria, run once per candidate model so the comparison is apples to apples:

![A results dashboard titled "GPT vs Claude vs Gemini comparison" showing three provider columns with pass rates of 100%, 100%, and 33%, plus pass-rate, score-frequency, and scatter-plot charts](/courses/ai-security-eval-monitoring/ch02/12-benchmarking-models/overview.jpg)
*The same eval dataset, run once per candidate model — pass rate, cost, and token usage, all computed from one run.*

## Quality isn't the only axis

A model that wins on accuracy can still be the wrong choice for a given feature if it's too slow or too expensive for the workload. A real benchmarking run captures per-case detail, not just an aggregate pass rate — including cases where a model's content was perfectly correct but it still failed on a different criterion entirely:

![Three models' outputs for the same riddle test case, with one model (Gemini) showing "1 FAIL 3 PASS" and a red note reading "Latency 9681ms is greater than threshold 5000ms"](/courses/ai-security-eval-monitoring/ch02/12-benchmarking-models/latency.jpg)
*All three models answered correctly — but one failed anyway, on a latency threshold, not a quality problem. That distinction only shows up at the per-case level.*

## Reading why, not just whether

A single aggregate score tells you a model is worse; it doesn't tell you *in what way*. Drilling into one case's full assertion breakdown shows exactly which criterion failed and why, separate from the ones that passed:

![A details panel for one model's response, showing a table of four assertions — latency (failed, 9681ms over the 5000ms threshold), output length (passed), content match (passed), and an LLM-rubric check (passed) — each with its own pass/fail and reason](/courses/ai-security-eval-monitoring/ch02/12-benchmarking-models/details.jpg)
*Per-assertion detail separates "the content was wrong" from "the content was right but something else failed" — a critical distinction for deciding whether a model is actually unsuitable or just needs a timeout adjustment.*

## What to actually compare

- **Pass rate on your own eval dataset** — not a public benchmark score.
- **Cost per request and per token**, at the volume you actually expect to run.
- **Latency**, especially for any feature with a real-time or interactive requirement.
- **Failure mode, not just failure count** — a model that's slightly less accurate but fails gracefully may be a better fit than one that's more accurate but occasionally produces something unsafe.

## Key terms

| Term | Meaning |
|---|---|
| Leaderboard benchmark | A general-capability score on a public, broad test set, not your specific workload |
| Apples-to-apples comparison | Running the same dataset and grading criteria across every candidate model |
| Failure mode | The specific way a model fails (wrong content, too slow, too costly), not just that it failed |

## Lab

Pick two AI models you have access to (or could access via a free tier). Take three of your Lesson 7 eval cases and run them against both models manually. Note not just whether each passed, but how: on content accuracy, on response length, on anything that felt slower or more expensive.

## Check yourself

Can you explain, in your own words, why a model that tops a public leaderboard might still be the wrong choice for a specific application, and what kind of test would actually reveal that?
