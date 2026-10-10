# Picking a Research Question

Every course assignment you've done up to now came with the question already written for you: build this report, write this query, configure this pipeline. A research project starts one step earlier — you have to pick the question yourself, before anyone can check your work against an answer key, because there isn't one. This lesson covers what separates a good research question from a vague one, using the lab's own three projects as worked examples.

## What you'll learn

- How a research question differs from a course assignment
- Three tests a research question needs to pass: specific, falsifiable, scoped
- How the lab's three projects satisfy all three tests
- Why "scoped to days" matters more than it sounds like it should

## A question, not a task

A course assignment tells you what to build and what "correct" looks like. A research question asks something you don't already know the answer to, and commits you to finding out with evidence rather than intuition. That shift changes how you work: instead of following steps to a known destination, you design an experiment whose result could genuinely go either way.

## Three tests for a good research question

- **Specific.** "Is RL good for databases?" is not a research question — it's a mood. "Can an RL agent pick better execution-plan hints than SQL Server's own optimizer, for this one parameterized query template?" is.
- **Falsifiable.** There has to be an experiment that could prove the claim wrong. If no result you could possibly observe would change your mind, it isn't a research question yet.
- **Scoped to days, not months.** A question you can answer in an afternoon is too small to be interesting; a question that needs six months of infrastructure before you learn anything is scoped for a different kind of team. This lab's projects all land in between: a few focused days each.

## The lab's three questions, already scoped

- **Project 1:** "Across randomized instances of one four-table join, does a PPO agent choosing from five plan hints beat SQL Server's default plan on logical reads and elapsed time?" — specific, falsifiable by running 200 held-out episodes, and scoped to one query template.
- **Project 2:** "Trained on roughly 500 labeled pairs, does a `distilbert-base-uncased` reward model rank the human-preferred cleaned record higher than the alternative, and where does it fail?" — specific, falsifiable by held-out pair accuracy, scoped to one rubric.
- **Project 3:** "Does RLHF on top of an SFT model measurably improve execution-correctness accuracy for SQL Pete, without introducing new hallucinated columns or tables?" — specific, falsifiable by a before/after evaluation, scoped to one assistant and two schemas.

```
Research-question template:
  Claim:      [what you think is true]
  Test:       [the experiment that could prove it wrong]
  Metric:     [the number that decides it]
  Time-box:   [days, not months]
```

## Key terms

- **Research question** — a specific, falsifiable claim you commit to testing with evidence
- **Falsifiable** — there exists a possible result that would prove the claim wrong
- **Scope** — how much the question demands before it yields an answer; this lab targets days

## Recap

A good research question is specific, falsifiable, and scoped to days rather than months — all three of this lab's projects were picked to satisfy that, and you'll see the same shape again when you write each project's question in its opening lesson. Next up, Lesson 3: turning a scoped question into a time-boxed experiment plan.
