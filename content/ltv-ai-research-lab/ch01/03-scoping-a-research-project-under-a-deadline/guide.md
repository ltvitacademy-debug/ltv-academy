# Scoping a Research Project Under a Deadline

You now have a specific, falsifiable, days-not-months research question. The next skill is turning that question into something you can actually finish: a minimal viable experiment, time-boxed on paper before you write a line of code, with a plan for what you'll do when something goes wrong — because something always does.

## What you'll learn

- What a minimal viable experiment (MVE) is, and why it's smaller than you'll want to make it
- How to time-box a project before touching code, not after you're already behind
- How to keep a risk register so surprises don't eat your whole time-box
- Why a clean null result still counts as finishing on time

## The minimal viable experiment

An MVE is the smallest version of your experiment that could still answer your research question — one slice of data, one baseline to compare against, one metric that decides the outcome, and a rough bound on how much compute and time it needs. It is not the most thorough version you can imagine; it's the cheapest version that still produces evidence. You can always extend it once it works. Project 1's MVE, for example, isn't "tune all six actions against every possible query shape" — it's "train PPO on one query template for 50,000 timesteps, then compare 200 held-out episodes against the optimizer's default plan."

```
MVE template:
  Question:   [from Lesson 2]
  Baseline:   [what you're comparing against]
  Metric:     [the single number that decides it]
  Data slice: [the smallest dataset that's still representative]
  Time-box:   [days, written down before you start]
```

## Time-boxing on paper, first

Pick a number of days before you start, and write down what you'll do if you hit that number without a result — stop and write up a null result, rather than silently extending the deadline. A time-box only works if it's decided before you're inside it, when you can still think clearly about what "good enough" looks like. Writing it down in the notebook from Lesson 1 makes it a commitment, not a guess you'll quietly abandon.

## Keep a risk register

Before you start, list what could realistically go wrong and what you'll do about each one. A short table beats a vague worry:

| Risk | Likelihood | Mitigation |
|---|---|---|
| Training doesn't converge in the time-box | Medium | Cut timesteps, narrow the query-parameter range |
| Baseline is harder to beat than expected | Medium | Report the gap honestly as a finding, not a failure |
| Tooling/environment setup eats a full day | High | Reuse a known-working environment from an earlier lesson |
| Scope creep ("just one more hint type") | High | Freeze the action space in the MVE template before training |

## A null result is still a result

If your agent doesn't beat the optimizer, or your reward model doesn't rank preferences well, that's not a failed project — it's an answer to your research question, and it belongs in the write-up exactly like a positive result would. The risk register exists so that running out of time doesn't turn into running out of a finding.

## Key terms

- **Minimal viable experiment (MVE)** — the smallest version of an experiment that still answers the research question
- **Time-box** — a fixed, pre-committed deadline with a decided action for when it's reached
- **Risk register** — a short table of what could go wrong, how likely it is, and the mitigation
- **Null result** — an outcome that doesn't support the hypothesis, still reportable as a finding

## Recap

Scope the smallest experiment that could answer your question, time-box it on paper before you start, and keep a risk register so surprises don't quietly consume your deadline. A null result, reached on time, is a finished project. Chapter 2 picks this up immediately: framing Project 1 as an RL problem.
