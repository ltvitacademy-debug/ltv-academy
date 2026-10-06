# Script — Why Human Approval Matters

## Segment 1 (title)

Autonomy is what makes an agent useful — and what makes it dangerous the moment a tool call has a real consequence. Anthropic's own guidance on building agents warns that autonomy brings "the potential for compounding errors": one wrong step becomes the basis for the next.

## Segment 2 (steps: where agents go wrong alone)

Three ways this happens. The agent misreads the goal and acts on the wrong interpretation. It trusts a flawed or stale tool result as if it were ground truth. And each step compounds the last error instead of catching it, because nothing paused to check.

## Segment 3 (code: the real pause point)

Here's the thing — that pause point already exists. When Claude decides to call a tool, the API returns stop_reason tool_use and a tool_use block naming the tool and its arguments, then stops. Nothing forces your code to execute that tool immediately. The gap between getting that block and sending back a tool_result is yours to hold open for a human.

## Segment 4 (steps: what needs a human)

So which calls get gated? Three signals. Irreversible — can't be undone once it runs. Costly — real money, real risk, real reputation. Low-confidence — even the agent's own result looks uncertain. Anything outside those three, let the agent keep moving.

## Segment 5 (outro)

That's the principle. Next up: actually designing the approval checkpoint itself — what the human needs to see, and how the loop waits for their answer.
