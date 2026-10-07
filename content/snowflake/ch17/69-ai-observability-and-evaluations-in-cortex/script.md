# Script — AI Observability and Evaluations in Cortex

## Segment 1 (title)

Every agent you've built in Chapter 16 makes judgment calls on every run — which tool to call, what arguments to pass it, how to phrase the final answer. Eyeballing a handful of chat transcripts tells you almost nothing about whether those calls hold up at scale. Cortex AI Observability closes that gap: it traces an agent's full decision-making lifecycle — which tools it picked, how well it executed them, how good the final answer was — and scores it against metrics you can compare run over run.

## Segment 2 (steps: the four system metrics)

Four built-in system metrics cover a Goal, Plan, Action framework end to end. Answer correctness checks how closely the final response matches an expected ground-truth answer. Logical consistency is reference-free — it checks whether the agent's thinking, tool selection, and final response hang together, without needing a ground-truth answer to compare against. Tool selection accuracy checks whether the orchestration layer called the tools you'd expect for the question. Tool execution accuracy checks whether each tool the agent ran actually received the right input and returned output that meets your bar.

## Segment 3 (screenshot: a real evaluation run)

This is a real evaluation run from Snowsight's AI and ML area, against a supply-chain agent. Five metric cards sit across the top — the four system metrics plus a custom Supply Chain Risk Assessment metric this team added on top — and every one of thirty test questions gets its own row, scored per metric, so you can scan for exactly which inputs are dragging a score down, instead of guessing from a few spot-checks.

## Segment 4 (code: starting a run from SQL)

You can also start a run straight from SQL with EXECUTE_AI_EVALUATION, pointing it at a ground-truth dataset and a YAML config file staged in Snowflake — the same call supports STATUS, CANCEL, and DELETE to manage a run after it starts. A metric version — v1, v2, v3 — pins the judge model, prompt, rubric, and thresholds together, so the same trace scores the same way next week as it does today, which is exactly what went GA for Cortex Agent and Cortex Analyst evaluations in August 2026.

## Segment 5 (outro)

Next lesson: Horizon Catalog — the governance engine that takes everything this chapter measures and starts actually enforcing policy on it at runtime, for both human and agent-driven queries.
