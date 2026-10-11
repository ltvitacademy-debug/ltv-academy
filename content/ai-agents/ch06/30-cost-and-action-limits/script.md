# Script — Cost & Action Limits

## Segment 1 (title)

An iteration cap bounds time. It doesn't bound cost or scope. Fifteen cheap lookups cost nothing; fifteen expensive ones can add up fast while staying under the same iteration count. Cost and scope need their own limits.

## Segment 2 (code: token and API cost budget)

Every Claude API response carries real usage data — input and output token counts — so a running cost budget isn't a guess. Track spend after every response, and stop the loop once it crosses the budget. Set that budget per task, not one global number, because a simple lookup and an open-ended research task shouldn't share a ceiling.

## Segment 3 (code: action scope)

The second budget isn't about dollars, it's about blast radius. How many records can this task touch, how many distinct tools can it use, how many calls can it make to systems outside your own stack. A record-touch limit of one is often the single highest-leverage guardrail for any agent that modifies data.

## Segment 4 (steps: enforcement and what happens at zero)

Both budgets live in your application code wrapping the loop, never as a prompt instruction asking the model to behave — a prompt is a suggestion, a code check is a guarantee. And running out mid-task isn't a crash. Stop the loop, report what completed and what didn't, and surface it for a human to raise the budget or narrow the scope.

## Segment 5 (outro)

Budgets bound cost and scope. They don't bound where the agent is allowed to run at all. Next up: sandboxing — containing what an agent's actions can actually reach.
