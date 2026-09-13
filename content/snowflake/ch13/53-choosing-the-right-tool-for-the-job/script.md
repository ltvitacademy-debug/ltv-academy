# Script — Choosing the Right Tool for the Job

## Segment 1 (title)

Given a new requirement, four questions in order narrow down the answer fast — and the default answer, more often than people expect, is plain SQL.

## Segment 2 (steps: four questions)

Can this be one SQL statement — a view or a scheduled task? If so, stop there. Does it need tests, documentation, or version control across a team's worth of models? That's what dbt formalizes. Does the logic require something SQL can't do, like calling an external API? That's Python. And does success depend on multiple systems finishing in the right order? That's an orchestrator's job.

## Segment 3 (steps: four scenarios)

Recomputing month-end totals from tables that already exist is one SQL statement — a view or a task, nothing more. Forty transformation models built by a five-person team need dbt, not for better SQL, but for the tests and version control wrapped around it. Pulling daily exchange rates from a REST API needs Python, because no amount of SQL calls an external API. And a nightly pipeline where an ADF load must finish before dbt runs needs an orchestrator, because the problem there is sequencing, not any one step's logic.

## Segment 4 (steps: the other mistake)

The framework cuts both ways. Standing up dbt for a single SQL view, or wiring an orchestrator around one step with no dependencies, adds a tool to maintain and monitor for a problem plain SQL already solved. The right answer is often "no additional tool," and that should never feel like it's missing something.

## Segment 5 (outro)

That closes out this chapter on the modern data stack. Next up: troubleshooting real Snowflake problems, before the course's final capstone brings everything together end to end.
