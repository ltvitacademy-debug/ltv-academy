# Lesson 15 — Building the Approval Workflow

**Chapter 4 · Project 3 — Tool-Using Agent With Human Approval · Lesson 15 of 23**

## What you'll learn

- The real checkpoint pattern: pause before executing, not after
- Why you still have to send a `tool_result` for a *rejected* call, and
  the real `is_error` field that makes a rejection a recoverable
  response instead of a dead end
- A real dispatcher that branches on the `requires_approval` flag from
  Lesson 14
- A formatting rule from the Messages API that shapes how you can
  implement "wait for a human"

## Pause before executing, not after

The checkpoint has to sit *before* the tool runs, not after. Once
`issue_refund` executes, approval is theater. When Claude's response
contains a `tool_use` block for a tool flagged `requires_approval` in
your own metadata, your code's job is to stop, record the pending
request, and *not* call the real refund function until a human responds.

```python
def handle_tool_use(tool_use, risk_table):
    tool = risk_table[tool_use.name]
    if tool["requires_approval"]:
        record_id = create_pending_approval(
            tool_name=tool_use.name,
            input=tool_use.input,
            tool_use_id=tool_use.id,
        )
        notify_reviewer(record_id)
        return None  # execution paused -- nothing runs yet
    return execute_tool(tool_use.name, tool_use.input)
```

`None` here means exactly that: no refund has happened, no `tool_result`
has been sent back to Claude yet, and nothing resumes until a human
approves or rejects `record_id`.

## A rejection still needs a real response

This is the detail that's easy to miss: you can't just drop a rejected
tool call. The Messages API expects a `tool_result` for every `tool_use`
it sent before the conversation can continue — skipping one produces an
error about missing results. A rejection is a **valid, real result**,
sent with `is_error: true`:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
      "content": "Rejected by reviewer: refund amount exceeds the order's paid total. Re-check the order and ask the customer for clarification.",
      "is_error": true
    }
  ]
}
```

Claude treats this the way it treats any tool error: it incorporates the
reason into its next response instead of silently retrying or stalling
— "I wasn't able to process that refund; a reviewer flagged the amount
as incorrect. Let me double-check the order total." A terse `"denied"`
works technically, but an instructive message (what was wrong, what to
try next) gives Claude something real to act on, the same principle as
writing a good tool-execution error.

## One formatting rule that shapes your implementation

The Messages API requires `tool_result` blocks to immediately follow
their `tool_use` message in the conversation — no other messages can sit
between them. In practice, this means "wait for a human" has to happen
*in your application state*, not as a pause in the middle of an API
call: hold the pending approval in your own database, don't send the
next Messages API request at all until the decision is made, then send
exactly one `tool_result` (approved or rejected) for that `tool_use_id`
when you do.

## The full flow

1. Claude returns a `tool_use` for `issue_refund`.
2. Your dispatcher sees `requires_approval: true` and creates a pending
   record instead of executing anything.
3. A reviewer sees the pending request (input, reason) and approves or
   rejects it.
4. **Approved** → run the real tool, send its real result back.
   **Rejected** → send an `is_error: true` result explaining why.
5. Claude's next response reflects whichever outcome happened — a
   completed refund, or an explanation of why it didn't go through.

## Key terms

| Term | Meaning |
|---|---|
| Pending approval | A recorded, not-yet-executed tool request waiting on a human decision |
| `is_error` | The `tool_result` field that marks a result as a failure/denial Claude should react to, not silent data |
| Instructive rejection message | A rejection reason specific enough that Claude can act on it, not just a bare "no" |

## Lab

Implement the dispatcher above for your own Project 3's `requires_approval` tool. Build a minimal reviewer interface (even a CLI prompt is fine for now) that approves or rejects a pending request, and confirm both paths — approved and rejected — produce a correct `tool_result` and a sensible final response from Claude.

## Check yourself

- Why does the checkpoint have to sit before tool execution, not after?
- What happens if you skip sending a `tool_result` for a rejected tool
  call entirely?
- Why does an instructive rejection message work better than a bare
  `"denied"` string?
