# Lesson 69 — AI Observability and Evaluations in Cortex

**Chapter 17 · AI Governance, Evaluation & Security · Lesson 69 of 76**

## What you'll learn

- Why "it looked right in the demo" isn't enough to trust an agent in production
- The four system metrics Cortex uses to score an agent run: answer correctness, logical consistency, tool selection accuracy, tool execution accuracy
- How a metric **version** pins the judge model, prompt, rubric, and thresholds together
- How to kick off an evaluation run with `EXECUTE_AI_EVALUATION` and read the results in Snowsight

## An agent that "seems fine" isn't the same as a measured one

Every agent you've built in Chapter 16 — Cortex Analyst answering questions
in SQL, Cortex Search retrieving documents, a Cortex Agent orchestrating
both — makes judgment calls on every run: which tool to call, what
arguments to pass it, how to phrase the final answer. Eyeballing a handful
of chat transcripts tells you almost nothing about whether those calls hold
up at scale. **Cortex AI Observability** closes that gap: it traces an
agent's full decision-making lifecycle — which tools it picked, how well it
executed them, how good the final answer was — and scores it against
metrics you can compare run over run, the same way a query profile
(Lesson 43) tells you what your SQL actually did, not what you hoped it did.

## The four system metrics

Cortex Agent Evaluation follows what Snowflake calls a Goal → Plan → Action
framework, and ships four built-in metrics that cover it end to end:

| Metric | What it checks |
|---|---|
| `answer_correctness` | How closely the agent's final response matches the expected ground-truth answer — closes the loop from actions back to the user's goal |
| `logical_consistency` | Reference-free: does the agent's thinking, tool selection, and final response hang together, without needing a ground-truth answer to compare against |
| `tool_selection_accuracy` | Did the agent's orchestration layer call the tools you'd expect for this question (Cortex Search vs. Cortex Analyst vs. both)? |
| `tool_execution_accuracy` | Did each tool the agent called actually receive the right input and return output that meets your bar? |

You're not limited to these four — custom metrics are supported too — but
these four are the baseline every Cortex Agent evaluation run reports.

## Versions pin down what "correct" means

A metric score is only useful if it's reproducible. A **version** —
`v1`, `v2`, `v3`, and so on — pins the judge model (the LLM grading the
agent's output) together with the prompt, rubric, and thresholds behind
that score, so the same trace scores the same way next week as it does
today. Version targeting for Cortex Agent and Cortex Analyst evaluations
went GA in August 2026 specifically to stop "the judge quietly changed
underneath me" from silently shifting your scores between runs.

## Running an evaluation

You can kick off a run from Snowsight, from Cortex Code, or straight from
SQL:

```sql
CALL EXECUTE_AI_EVALUATION(
  'START',
  OBJECT_CONSTRUCT('run_name', 'supply_chain_agent_eval_1'),
  '@EVAL_DB.EVAL_SCHEMA.METRICS/agent_evaluation_config.yaml'
);
```

That call needs a ground-truth dataset — questions with expected answers —
defined in the config file, and it runs asynchronously; `'STATUS'` in
place of `'START'` polls progress, `'CANCEL'` stops a run, `'DELETE'`
removes a finished one.

## Reading the results

The screenshot below is a real evaluation run against a supply-chain
agent, straight from Snowsight's AI & ML → Evaluations area. Five metric
cards sit across the top — the four system metrics plus a custom
"Supply Chain Risk Assessment" metric this team added — each with a
0–1 (or custom-scale) score and a progress bar. Below that, every one of
the 30 test questions gets its own row, scored per-metric, so you can
scan for the specific inputs where `tool_execution_accuracy` or
`answer_correctness` dipped, rather than guessing from a handful of
spot-checks.

![Snowsight's Cortex Agent evaluation run overview: five metric cards (Answer Correctness 0.60, Logical Consistency 1.00, a custom Supply Chain Risk Assessment 4.68, Tool Execution Accuracy 0.44, Tool Selection Accuracy 0.76) above a table of 30 scored test questions with per-metric columns.](/courses/snowflake/ch17/69-ai-observability-and-evaluations-in-cortex/eval-run-overview.png)
*A real Cortex Agent Evaluation run — four system metrics plus one custom metric, scored across every question in the test set.*
Source: [Snowflake Engineering Blog — Cortex Agent Evaluations](https://www.snowflake.com/en/blog/engineering/cortex-agent-evaluations/)

You can then click into any single row to see the full trace — the exact
tool calls the agent made, their timing, and the judge's reasoning for
each metric score — the same level of detail Lesson 65's thread view gave
you for a conversation, now applied to grading.

## Key terms

| Term | Meaning |
|---|---|
| Cortex AI Observability | Snowflake's tracing and scoring layer for agent/app runs — accuracy, latency, usage, cost |
| Cortex Agent Evaluation | The evaluation framework specifically for Cortex Agents, following a Goal → Plan → Action model |
| `answer_correctness` | System metric: does the final answer match the expected ground truth |
| `tool_selection_accuracy` | System metric: did the agent call the tools you'd expect |
| `tool_execution_accuracy` | System metric: did each tool call get the right input and return acceptable output |
| Version (e.g. `v2`) | Pins the judge model, prompt, rubric, and thresholds behind a metric score, so results stay reproducible |
| `EXECUTE_AI_EVALUATION` | SQL function to start, check, cancel, or delete an evaluation run |

## Lab

1. Pick a Cortex Agent you built in Chapter 16 (or sketch one on paper).
   Write five ground-truth question/answer pairs for it.
2. For one of those five, predict which of the four system metrics is
   most likely to catch a mistake if the agent picks the wrong tool —
   explain your reasoning in one sentence.
3. Sketch what an evaluation config YAML would need to reference: the
   ground-truth dataset location and which metrics/versions to run.

## Check yourself

You're ready for Lesson 70 when you can name all four Cortex Agent
system metrics from memory, explain what a metric "version" pins down,
and describe why `tool_selection_accuracy` and `tool_execution_accuracy`
check two different things even though they sound similar.
