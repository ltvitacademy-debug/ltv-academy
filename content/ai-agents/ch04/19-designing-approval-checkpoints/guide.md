# Lesson 19 — Designing Approval Checkpoints

**Chapter 4 · Human-in-the-Loop & Approval · Lesson 19 of 32**

## What you'll learn

- The three pieces of information a reviewer actually needs to approve or reject safely
- How approve/reject maps onto the real `tool_result` format
- Where to put the checkpoint in your agent loop code, concretely
- Why a vague confirmation prompt is worse than no checkpoint at all

## A checkpoint is only as good as what it shows

Lesson 18 established *that* some tool calls need a human pause before they
run. This lesson is about making that pause actually work. A checkpoint that
just asks "proceed? y/n" with no detail isn't a safety control — it trains
the reviewer to click yes without reading, which is worse than having no
checkpoint, because it creates the illusion of oversight without the
substance of it.

A reviewer can only make a real decision with three things in front of them:

1. **The tool name and its exact arguments** — not a paraphrase. If the
   agent is about to call `issue_refund` with `{"amount_usd": 1200,
   "order_id": "ord_8831"}`, show that literal input, not "the agent wants
   to issue a refund."
2. **Why the agent is doing this** — the step of reasoning or the
   user-facing goal that led here, so the reviewer can judge intent, not
   just mechanics.
3. **What happens if they approve** — the real, concrete effect ("this
   will immediately refund $1,200 to the original payment method").

## Mapping the decision back onto the API

The reviewer's decision has to become something the agent loop can act on,
and the real mechanism for that is the `tool_result` block you already send
back after any tool call. An approval and a rejection are just two different
`tool_result` payloads for the same `tool_use_id`:

```
// Approved: run the real tool, send back its real result
{"type": "tool_result", "tool_use_id": "toolu_01A..",
 "content": "Refund of $1,200 issued to order ord_8831."}

// Rejected: never call the tool -- tell Claude it was declined
{"type": "tool_result", "tool_use_id": "toolu_01A..",
 "content": "Human reviewer declined this action: amount exceeds policy.",
 "is_error": true}
```

A rejection is not an error in your application's sense — your code worked
correctly — but marking it `is_error: true` is the right signal to Claude:
the requested action did not happen, and the reason is in `content`, so the
model can adjust its next step (ask the user, try a smaller amount, stop)
instead of assuming the refund went through.

## Where the checkpoint lives in the loop

Structurally, the checkpoint sits between receiving the `tool_use` block and
constructing that `tool_result`:

1. Agent loop receives `stop_reason: "tool_use"`.
2. Your code checks: does this tool name require approval?
3. If yes, persist the pending request (tool name, input, reasoning, a
   generated request ID) and *stop the loop* — don't poll in a tight spin.
4. A human reviews it out-of-band (a dashboard, a Slack message, a ticket
   queue) and responds approve or reject.
5. Your code resumes the loop, builds the `tool_result` above, and sends
   the next request to Claude.

That "stop the loop" step matters: a checkpoint that blocks a running
process waiting synchronously for a human is fragile and expensive. A
durable queue of pending approvals that the loop can resume from is what
makes this workable in production, not just in a demo.

## Key terms

| Term | Meaning |
|---|---|
| Approval checkpoint | A pause in the agent loop that shows a reviewer a pending tool call and blocks on their decision |
| `tool_result` | The real API content block used to return either a tool's output or a rejection back to Claude |
| `is_error` | Optional flag on a `tool_result` signaling the requested action did not succeed — including a human rejection |
| Pending request | The persisted record (tool, input, reasoning, ID) a reviewer acts on, decoupled from the live request |

## Check yourself

Write out, in plain English, the exact `tool_result` content you'd send back
if a human rejects a `delete_customer_record` call because the customer ID
looks malformed. Would you set `is_error`? Why?
