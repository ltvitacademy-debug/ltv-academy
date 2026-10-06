# Lesson 21 — Audit Logging for Agent Actions

**Chapter 4 · Human-in-the-Loop & Approval · Lesson 21 of 32**

## What you'll learn

- Why "the agent did something wrong" is unanswerable without a log
- The minimum fields a useful agent audit log entry needs
- How a log entry maps directly onto the real `tool_use` / `tool_result` pair
- The difference between a debug log and an audit log — and why agents need both

## You can't review what you didn't record

Every checkpoint, escalation, and approval from this chapter produces a
decision — but a decision that isn't written down anywhere durable might as
well not have happened, from the point of view of anyone trying to answer
"why did the agent do that?" three weeks later. Audit logging is the answer
to that question before it's even asked: a durable, append-only record of
every consequential action an agent took, what led to it, and who (human or
agent) signed off.

This isn't the same as the debug logs you'd use while developing the agent.
A debug log is for you, today, chasing a bug, and it's fine to be noisy and
ephemeral. An audit log is for anyone — a different engineer, a compliance
reviewer, the customer who's asking why their account was modified — who
needs to reconstruct exactly what happened, potentially much later, and it
has to be complete and trustworthy even if the person reading it wasn't in
the room.

## What belongs in an entry

An agent audit log entry is built almost directly from information you
already have in the tool-calling round trip:

```
{
  "timestamp": "2026-10-06T14:32:11Z",
  "tool_use_id": "toolu_01A09q90qw90lq9",
  "tool_name": "issue_refund",
  "input": {"amount_usd": 1200, "order_id": "ord_8831"},
  "agent_session_id": "sess_77f2",
  "approval": {"required": true, "decision": "approved",
               "approved_by": "reviewer_442", "latency_s": 94},
  "result": {"status": "success", "output": "Refund issued."}
}
```

Every one of those fields answers a real question someone will eventually
ask: *what* did it do (`tool_name`, `input`), *when* (`timestamp`), *in what
session or conversation* (`agent_session_id`), *did a human sign off and who*
(`approval`), and *what actually happened* (`result`). The `tool_use_id` ties
the log entry back to the exact API exchange, so if you also keep raw
request/response logs, the two can be cross-referenced.

## Log the rejections and escalations too

It's tempting to only log successful actions, but a rejected or escalated
request is at least as important to keep: it's evidence the checkpoint from
Lesson 19 is actually catching things, and a pattern of repeated rejections
on the same tool is a signal that the agent's prompting or tool design needs
fixing, not just that one request was wrong.

## Append-only, not editable

An audit log that can be silently edited or deleted after the fact isn't an
audit log — it's a note that happens to look like one. Write entries once,
never update them in place, and if a later correction is needed, append a
new entry referencing the original rather than mutating it. This is what
makes the log usable as the record of truth during an incident review, not
just a convenience during normal operation.

## Key terms

| Term | Meaning |
|---|---|
| Audit log | A durable, append-only record of every consequential agent action, its inputs, and who approved it |
| Debug log | A developer-facing, ephemeral log for troubleshooting — not a substitute for an audit trail |
| `agent_session_id` | An identifier tying a log entry back to the specific conversation/run that produced it |
| Append-only | A logging discipline where entries are never edited or deleted, only added |

## Check yourself

An agent calls a tool, a human rejects it, and the agent retries with
different arguments five minutes later, which gets approved. How many audit
log entries should this produce, and what should each one contain?
