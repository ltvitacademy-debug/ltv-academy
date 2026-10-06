# Lesson 24 — Cost & Action Limits

**Chapter 5 · Agent Safety & Guardrails · Lesson 24 of 32**

## What you'll learn

- Why a loop-level iteration cap (Lesson 23) doesn't bound spend or blast radius on its own
- Two different budgets to track: token/API cost and action-scope
- How a budget check fits as code around the loop, not a prompt instruction
- What to do when a budget is exhausted mid-task

## An iteration cap bounds *time*. It doesn't bound *cost* or *scope*

Lesson 23's stopping conditions keep a loop from running forever. But
"forever" and "expensive" aren't the same risk. Fifteen iterations of an
agent calling a cheap lookup tool costs very little. Fifteen iterations
where each one invokes a large tool result, or a nested sub-agent that
itself makes several calls, can be expensive even while staying well under
the iteration cap. Separately, an agent can stay within both its iteration
and cost budget while still taking actions across a far wider scope than
intended — touching ten different customer records when the task only
needed one. Cost and action-scope need their own limits, tracked
independently of step count.

## Budget one: token / API cost

Every Claude API response includes real `usage` data — input and output
token counts — so a running cost budget isn't a guess, it's arithmetic you
already have the numbers for:

```
budget_usd = 2.00
spent_usd = 0.0
# after each response:
spent_usd += (usage.input_tokens * IN_RATE
            + usage.output_tokens * OUT_RATE)
if spent_usd >= budget_usd:
    stop_loop("cost budget exhausted")
```

Setting that budget per-task (not just a global daily cap) matters: a
simple lookup task and an open-ended research task shouldn't share the same
ceiling, or the cheap task's budget is too loose while the expensive task's
budget is too tight.

## Budget two: action scope

Cost isn't the only resource. A second, separate limit caps *how much the
agent is allowed to touch*, regardless of what it costs in tokens:

```
MAX_RECORDS_MODIFIED = 1   # this task may touch exactly one order
MAX_DISTINCT_TOOLS = 3     # no more than 3 different tools this run
MAX_EXTERNAL_CALLS = 5     # calls to systems outside your own stack
```

This is what keeps a task scoped to "process this one refund request" from
quietly turning into "the agent also updated four unrelated records while it
was in there." A record-touch limit is often the single highest-leverage
guardrail for data-modifying agents, because it bounds the blast radius of
a mistake directly, independent of whether the mistake was expensive.

## Where this lives: around the loop, not inside the prompt

Both budgets are enforced in your application code wrapping the loop, the
same place Lesson 23's stopping conditions live — never as an instruction
in the system prompt asking the model to "stay within budget." A prompt
instruction is a suggestion the model might not follow under pressure from
a hard task; a code-level check before each tool execution is a guarantee.

## When a budget runs out mid-task

Exhausting a budget mid-task isn't a crash — it's a defined stopping point,
same as Lesson 23's limits. Stop the loop, report what was completed versus
what wasn't, and surface it as a task that needs either a higher budget
(a human decision) or a narrower scope, rather than silently truncating the
user's result.

## Key terms

| Term | Meaning |
|---|---|
| Token/API cost budget | A running total of real spend (from `usage` data) that halts the loop when exhausted |
| Action-scope limit | A cap on how much an agent can touch — records modified, tools used, external calls made |
| Blast radius | How much damage a single mistake can cause, bounded directly by action-scope limits |
| Per-task budget | A cost ceiling scoped to the specific task's expected cost, not one global number for every run |

## Check yourself

An agent is budgeted $2.00 and a max of 1 modified record for a single
refund task. At iteration 6 it has spent $1.40 and modified zero records
so far. Is this agent in trouble, and which budget would you watch closer
for the rest of the run?
