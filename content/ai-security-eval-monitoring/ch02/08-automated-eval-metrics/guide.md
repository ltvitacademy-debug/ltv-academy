# Lesson 8 — Automated Eval Metrics: Accuracy, Relevance & Faithfulness

**Chapter 2 · Evaluating AI Systems · Lesson 8 of 25**

## What you'll learn

- Why grading AI output at scale needs more than a human reading every response
- The main automated metric types, from simplest to most flexible
- What accuracy, relevance, and faithfulness each actually measure
- How a real eval tool's web UI ties a dataset (Lesson 7) to a graded result

## Why automated grading matters

A 150-case eval dataset is only useful if something can actually grade all 150 cases, every time you change a prompt or swap a model, without a human manually reading every response. That's what automated eval metrics are for: turning each test case's output into a pass/fail or a score, consistently and fast enough to run on every change.

## Setting up an eval

Real eval tools (this course uses [promptfoo](https://www.promptfoo.dev/), a widely-used open-source eval framework, as a concrete reference point) let you configure providers — the models or endpoints being tested — directly from a web UI, so you're not hand-writing the full test harness from scratch.

![Promptfoo's eval setup screen, showing the Choose Providers step with AI models, HTTP APIs, Python scripts, and JavaScript providers as options](/courses/ai-security-eval-monitoring/ch02/08-automated-eval-metrics/eval-setup.png)
*Setting up an eval: choosing which models or endpoints to test before defining the grading rules.*

## The main metric types

**Exact / string match.** The simplest check: does the output contain, equal, or match a pattern against an expected string? Fast and unambiguous, but only works when there's one acceptable phrasing — rare for anything beyond short factual answers.

**Semantic similarity.** Compares the meaning of the output to a reference answer using embeddings, rather than exact wording — useful when there are many acceptable ways to phrase a correct answer.

**LLM-as-judge (model-graded).** A second model reads the output against a rubric you write ("does this response refuse to guarantee a refund without conditions?") and returns a pass/fail with a reason. This is what makes grading open-ended, free-text output practical at scale — it trades perfect precision for coverage a string match could never achieve.

**Accuracy, relevance, and faithfulness — the three that matter most for AI quality specifically:**
- **Accuracy** — is the factual content of the answer correct?
- **Relevance** — does the answer actually address what was asked, rather than a tangent?
- **Faithfulness (groundedness)** — for RAG systems specifically, does the answer stick to what the retrieved source documents actually say, rather than adding unsupported claims?

## Seeing it in a results view

Once an eval runs, a results view shows every test case's output side by side across providers, with a pass rate calculated automatically:

![Promptfoo's web UI showing evaluation results in a side-by-side table, comparing two models' outputs per test case with pass/fail badges](/courses/ai-security-eval-monitoring/ch02/08-automated-eval-metrics/custom-example-view.png)
*Results view: every test case's output, per provider, with an aggregate pass rate at the top of each column.*

## Reading the aggregate picture

Beyond the per-case table, most eval tools also chart the aggregate numbers — pass rate per provider, the distribution of scores across the whole dataset, and how two prompt or model variants compare head-to-head:

![Charts showing pass rate by provider, a score-frequency histogram, and a scatter plot comparing two prompt variants' scores](/courses/ai-security-eval-monitoring/ch02/08-automated-eval-metrics/web-ui-results-charts.png)
*Aggregate views like these are what make a 150-case run readable in seconds instead of requiring a full manual review.*

## Key terms

| Term | Meaning |
|---|---|
| LLM-as-judge | Using a second model to grade an output against a written rubric |
| Faithfulness / groundedness | Whether a RAG answer sticks to what the retrieved sources actually say |
| Pass rate | The percentage of test cases in a dataset that passed their assertion |

## Lab

For the five test cases you wrote in Lesson 7's lab, decide which metric type (exact match, semantic similarity, or LLM-as-judge) fits each one best, and write one sentence explaining why for each. Notice how few of them a simple exact-match check can actually handle.

## Check yourself

Can you explain, in your own words, why faithfulness is a meaningfully different thing to measure than accuracy, specifically for a RAG-based system?
