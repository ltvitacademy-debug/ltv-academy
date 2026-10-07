# Script — Human-in-the-Loop: Approval Patterns for Cortex Agents

## Segment 1 (title)

Worth saying directly, since it's easy to assume otherwise: Snowflake doesn't document one single feature literally named "human-in-the-loop" covering every Cortex Agent tool type. What it does document is a real, specific permission_policy mechanism for the code execution tool, and a broader governance pattern — Agent Identity plus Horizon policies plus your own approval step — for gating other kinds of consequential actions. This lesson teaches both, honestly labeled as what they are.

## Segment 2 (code: permission_policy)

For a code execution tool, permission_policy is a field nested under tool_resources, with two values. always_ask, the default, always prompts for approval before executing a state-modifying tool call. always_allow skips the approval check entirely — the agent executes without asking — and Snowflake's own documentation is blunt that this should only be used in trusted, automated workflows where human-in-the-loop approval genuinely isn't needed.

## Segment 3 (steps: what happens under always_ask)

This isn't just a config flag that silently logs the action after the fact — it changes the agent's execution flow. Under always_ask, when the agent reaches a state-modifying call, it emits a tool_use event and stops, waiting. The calling application resumes execution by sending back a permission_decision content block referencing that tool call's ID, with the approval choice. Nothing executes in between — the agent is genuinely paused.

## Segment 4 (steps: building it yourself)

Cortex Analyst and Cortex Search tool calls don't ship a documented permission_policy the same way code execution does. If you're building an application on Cortex Agents and need a gate before some other consequential action, you assemble it from pieces you already have: Agent Identity tells you an agent, not a person, is about to act; a Horizon row access or masking policy keyed off IS_AGENT_ACTIVATED is a hard backstop independent of whether your approval step works; and your own application layer implements that same stop-and-wait shape for the tool type Snowflake hasn't pre-built it for.

## Segment 5 (outro)

Next lesson: governing agent access directly — putting Chapter 9's RBAC, masking, and row access policies to work specifically against AI agents.
