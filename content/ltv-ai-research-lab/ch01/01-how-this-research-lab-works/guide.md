# How This Research Lab Works

Welcome to the LTV AI Research Lab, the capstone of the AI/ML Research Engineer & Alignment Engineer destination. Up to this point, every course in this catalog has taught you a tool or a technique. This one works differently: you're joining a small research lab for three connected projects, each one deliberately built around SQL and data systems — the strength of this catalog — instead of generic game or text toys. This lesson lays out how the lab runs before you touch any code.

## What you'll learn

- The three research projects you'll run, and how they connect to each other
- Why this lab is structured like a real research team, not a graded course module
- What a research notebook is and why you keep one from day one
- What "done" looks like: the portfolio you'll assemble in the final chapter

## The three projects

- **Project 1 — RL for SQL Query Optimization.** You'll train a reinforcement learning agent to choose execution-plan hints for a parameterized four-table join against AdventureWorks2012, and compare it against SQL Server's own optimizer.
- **Project 2 — Reward Modeling for Data Quality.** You'll build a small preference dataset over cleaned-vs-messy Northwind customer records and train a reward model to score which cleanup a human would prefer.
- **Project 3 — RLHF for a Database Assistant.** You'll fine-tune a small open-weight model into "SQL Pete," a natural-language-to-SQL assistant, then run RLHF on top of it using an execution-correctness reward.

Each project ends in its own chapter with a short write-up. After Project 3, Chapter 5 takes a detour: an interpretability case study that opens up SQL Pete itself to see what it's actually doing inside.

## A research notebook, not a workbook

Every graded course you've taken so far hands you a problem with a known answer and checks your work against it. A research project doesn't come with an answer key — you're the one deciding what counts as evidence. That means the single most useful habit you can build in this lab is keeping a running, dated notebook: what you tried, what you expected, what actually happened, and why you changed direction. Dead ends belong in the notebook too — a documented dead end is still a finding, and it's exactly what the write-up template in each project's final lesson asks you to summarize.

```
2026-10-07 — Project 1, attempt 2
Tried: FORCE ORDER hint on all episodes
Expected: lower logical reads across the board
Observed: worse on narrow date ranges, better on wide ones
Next: let the agent condition the hint on date_range_days
```

## What ships at the end

Three project write-ups and one interpretability finding are the raw material. In Chapter 6, you'll assemble them into a single portfolio artifact — the kind of thing you'd actually show a hiring manager — and practice presenting it out loud.

## Key terms

- **Research question** — a specific, falsifiable claim you can test with evidence, covered in depth next lesson
- **Research notebook** — a dated running record of what you tried, what happened, and why you changed course
- **Write-up** — the short end-of-project summary each project chapter ends with
- **Portfolio** — the assembled collection of all three write-ups plus the interpretability finding

## Recap

This lab is three connected projects — RL for query optimization, reward modeling for data quality, and RLHF for a database assistant — plus an interpretability case study on the model you build in Project 3. Keep a notebook from the first experiment, including the ones that don't work. Next up, Lesson 2: how to pick a research question worth running.
