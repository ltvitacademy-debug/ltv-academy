# Lesson 18 — Why Human Approval Matters

**Chapter 4 · Human-in-the-Loop & Approval · Lesson 18 of 32**

## What you'll learn

- Why an agent acting alone can fail in ways a simple chatbot never does
- Anthropic's own guidance on pausing agents for human feedback
- Where the pause point for approval already lives in the tool-calling round trip
- A practical rule of thumb for which actions need a human and which don't

## Autonomy is the whole point — and the whole risk

Everything from Chapter 1 through Chapter 3 built toward the same capability:
an agent that plans, calls tools, observes results, and decides its own next
step without a human typing each instruction. That autonomy is exactly what
makes agents useful for multi-step work. It's also exactly what makes them
dangerous the moment a tool call has a real-world consequence — sending an
email, charging a card, deleting a record, deploying code.

Anthropic's own engineering guidance on building agents is direct about this
trade-off: agentic systems "trade latency and cost for better task
performance," and that autonomy "makes them ideal for scaling tasks in
trusted environments" — but it comes with "higher costs, and the potential
for compounding errors." An agent that misreads a goal, or trusts a stale or
wrong tool result, doesn't just produce one bad sentence. It can act on that
mistake, observe its own flawed output as if it were ground truth, and take
a second action on top of the first — compounding the error before any human
ever sees it.

## The fix isn't removing autonomy — it's gating the right steps

The same guidance recommends that agents "pause for human feedback at
checkpoints or when encountering blockers" and build in "stopping conditions
... to maintain control." This chapter is about building exactly that: not
turning the agent back into a simple chatbot, but inserting a deliberate
pause before the actions where a mistake would be expensive, irreversible,
or hard to detect.

That pause point already exists structurally in every tool-calling loop you
built in Chapters 1–3. When Claude decides to call a tool, the API returns
`stop_reason: "tool_use"` and a `tool_use` content block — naming the tool
and its arguments — and *stops there*. Nothing in the API forces your
application to execute that tool immediately. The gap between receiving the
`tool_use` block and sending back a `tool_result` is your code's own
decision point. A human-approval checkpoint is simply code that, for the
right tools, holds in that gap until a person responds.

```
// Claude's response: stop_reason "tool_use"
{
  "type": "tool_use",
  "id": "toolu_01A09q90qw90lq917835lq9",
  "name": "send_wire_transfer",
  "input": {"amount_usd": 50000, "to_account": "acct_9182"}
}
// Your code decides what happens next --
// nothing in the API requires calling the tool immediately.
```

## Which actions actually need a human

Not every tool call deserves a checkpoint — gating a read-only lookup would
just slow the agent down for no safety benefit. A practical rule of thumb:

- **Irreversible** — can't be undone once it runs (send, delete, pay, post publicly)
- **Costly** — real money, real risk, or real reputational exposure
- **Low-confidence** — even the agent's own plan or tool result looks uncertain

If a tool call is none of these — looking up a record, running a read-only
query, drafting (not sending) a message — autonomy is the right call. The
rest of this chapter builds the mechanics: how to design the checkpoint
itself (Lesson 19), what happens when no human is immediately available
(Lesson 20), how to log what happened either way (Lesson 21), and how to
undo an approved action that still turns out to be wrong (Lesson 22).

## Key terms

| Term | Meaning |
|---|---|
| Compounding error | A mistake an agent doesn't catch, which becomes the (wrong) basis for its next decision |
| Checkpoint | A deliberate pause in the agent loop where a human reviews before execution continues |
| `tool_use` block | Claude's structured request to call a tool — the natural point to intercept before execution |
| Irreversible action | An action with no undo: sent, deleted, charged, published |

## Check yourself

Given a tool called `update_ticket_priority` and one called `issue_refund`,
which one needs a human-approval checkpoint and why — using the three-part
rule of thumb above?
