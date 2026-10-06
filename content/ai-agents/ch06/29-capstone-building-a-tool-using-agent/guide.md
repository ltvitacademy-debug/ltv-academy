# Lesson 29 — Capstone: Building a Tool-Using Agent With Human Approval

**Chapter 6 · Capstone · Lesson 29 of 32**

## What you'll learn

- Writing real schemas for `get_order` and `issue_refund`
- Wiring the approval checkpoint from Lesson 19 onto the consequential tool
- The full first round trip: user message to approved, executed refund
- Where this lesson's build stops, and what Lesson 30 adds on top

## Two tools, two real schemas

Following Lesson 6's guidance — detailed descriptions, tight parameter
typing — here are the capstone's two tool definitions:

```
{"name": "get_order", "description":
  "Looks up an order by ID. Read-only, no approval needed.",
  "input_schema": {"type": "object",
    "properties": {"order_id": {"type": "string"}},
    "required": ["order_id"]}},

{"name": "issue_refund", "description":
  "Refunds an order to its original payment method.
   Requires human approval before executing.",
  "input_schema": {"type": "object",
    "properties": {"order_id": {"type": "string"},
      "amount_usd": {"type": "number"}},
    "required": ["order_id", "amount_usd"]}}
```

Note the description itself flags that `issue_refund` requires approval —
that's not what *enforces* the checkpoint, your code does that, but it's a
good practice so the model's own behavior (explaining its plan before
calling it) reflects reality.

## The checkpoint, wired onto one specific tool

The agent loop checks the tool name on every `tool_use` block, and only
`issue_refund` triggers the hold-for-approval path from Lesson 19:

```
def handle_tool_use(block):
    if block.name == "issue_refund":
        return queue_for_approval(block)  # Lesson 19
    return execute_tool(block)             # get_order runs immediately
```

`get_order` never touches the approval path at all — exactly the rule of
thumb from Lesson 18 in code: gate what's consequential, let the
read-only lookup move at full speed.

## The full round trip

1. User: "Refund order ord_8831, the item arrived damaged."
2. Claude calls `get_order` — runs immediately, returns order details.
3. Claude calls `issue_refund` with `{"order_id": "ord_8831",
   "amount_usd": 42.00}` — `stop_reason: "tool_use"`.
4. Your code recognizes this tool needs approval, persists the pending
   request, and stops the loop (Lesson 19).
5. A human reviews the order ID, amount, and Claude's stated reason, and
   approves.
6. Your code executes the real refund, builds the `tool_result`, and
   resumes the loop — Claude replies to the user confirming the refund.

## What this lesson's build does *not* yet include

On purpose, nothing here yet: audit logging, stopping conditions, a cost
budget, or scoped credentials. This lesson proves the approval mechanism
itself works end to end — tool call held, human decides, loop resumes
correctly either way. Lesson 30 adds every remaining safety layer from
Chapter 5 on top of this same two-tool foundation, without changing the
tools themselves.

## Key terms

| Term | Meaning |
|---|---|
| Round trip | The full sequence from user message through tool calls, approval, and final reply |
| Gated tool | A tool (here, `issue_refund`) whose `tool_use` triggers the approval-hold path |
| Ungated tool | A tool (here, `get_order`) that executes immediately with no checkpoint |

## Check yourself

Trace through the round trip above, but assume the human rejects the
refund in step 5. Write out what the `tool_result` in step 6 would contain
instead, using Lesson 19's rejection format.
