# Script — Copilot in Microsoft Fabric

## Segment 1 (title)

Copilot in Fabric isn't a separate chat window — it's an AI experience built directly into the Fabric item you're already working in: a notebook, a KQL queryset, a report, a pipeline. This lesson focuses on the notebook experience, since that's where the next two lessons build worked examples.

## Segment 2 (steps: chat pane vs in-cell)

Inside a notebook, Copilot shows up two ways. The chat pane handles multi-step workflows across several cells, with a diff to review before changes apply. In-cell Copilot is narrower — slash commands like explain, fix, comments, and optimize, scoped to a single cell.

## Segment 3 (code: schema-aware prompt)

Copilot is schema-aware: it understands your attached lakehouse's actual tables, files, and recent execution telemetry. That means you can ask "how many tables are in the lakehouse" or "what are the columns of customers" and get an answer grounded in your real workspace, not a generic guess.

## Segment 4 (steps: fix with copilot and approval)

When a cell fails, a Fix with Copilot action appears with an error summary, a root-cause guess, and a suggested fix you review as a diff — the same approval pattern the chat pane uses. By default Copilot always asks before running or applying anything; that's a guardrail worth keeping on.

## Segment 5 (outro)

Chat pane for multi-step workflows, in-cell slash commands for a quick fix or explanation — both schema-aware, both reviewable before they run. Next up: a worked example, using Copilot's chat pane to generate an actual notebook.
