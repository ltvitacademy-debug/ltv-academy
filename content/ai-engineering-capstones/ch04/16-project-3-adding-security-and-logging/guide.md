# Lesson 16 — Adding Security & Logging

**Chapter 4 · Project 3 — Tool-Using Agent With Human Approval · Lesson 16 of 23**

## What you'll learn

- Why a tool's `input_schema` validates *shape*, not *truth* — and why
  that gap matters for a tool like `issue_refund`
- A real input-validation pattern that re-derives the critical number
  instead of trusting what the model sent
- A concrete audit-log JSON shape for every tool call and approval
  decision
- Why the approval workflow from Lesson 15 isn't complete without both
  of these

## Schema validation checks shape, not truth

`issue_refund`'s `input_schema` from Lesson 14 guarantees `amount_cents`
is an integer. It says nothing about whether that integer is *correct*
— whether it actually matches what the order was paid. The tool's
description tells Claude not to exceed the paid total, but a
description is guidance for the model, not a guarantee your code can
rely on. If Claude miscalculates, or a cleverly worded question nudges
it toward the wrong number, a type-valid `amount_cents` can still be
wrong.

## Re-derive the critical number, don't trust it

The fix: before a pending approval is even created, re-fetch the
authoritative value from your own system and check the model's claim
against it — never execute (or even surface for approval) a number you
haven't independently verified.

```python
def validate_refund_input(order_id: str, amount_cents: int) -> str | None:
    order = get_order(order_id)  # your own DB, not Claude's claim
    if order is None:
        return f"No such order: {order_id}"
    if amount_cents <= 0:
        return "Refund amount must be positive."
    if amount_cents > order.paid_total_cents:
        return (f"Refund of {amount_cents} exceeds paid total "
                f"of {order.paid_total_cents}.")
    return None  # passed -- safe to surface for human approval
```

This runs *before* `create_pending_approval` from Lesson 15. A reviewer
should never even see a pending request with a bad number — catch it in
code first, and only escalate a tool call that already passed this
check.

## Log every decision, not just the executions

An audit log exists so a later question — "why did this refund happen,"
"who approved it," "did the model ever try something it shouldn't have"
— has a real answer. Log the full lifecycle, not just successful runs:

```json
{
  "timestamp": "2026-10-06T14:32:01Z",
  "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
  "tool_name": "issue_refund",
  "input": {"order_id": "ord_4471", "amount_cents": 2500, "reason": "damaged item"},
  "risk_tier": "irreversible_financial",
  "validation_result": "passed",
  "decision": "approved",
  "reviewer_id": "user_9c2",
  "executed": true,
  "result_summary": "refund rf_8820 issued"
}
```

Log the rejected and failed-validation cases too, with the same shape
(`decision: "rejected"` or `validation_result: "failed"`). Those entries
are often more useful than the successful ones — they're the record of
every time the system almost did something it shouldn't have.

## Why this completes the checkpoint

Lesson 15's approval workflow pauses execution and routes it through a
human. Without validation, a reviewer can still rubber-stamp a wrong
number they had no way to catch. Without logging, there's no way to
answer "what happened" after the fact, or notice a pattern — repeated
rejected requests for the same tool, say — that suggests something
upstream needs attention. Both layers turn "we added a human in the
loop" into "we can actually show, after the fact, that the system
behaved correctly."

## Key terms

| Term | Meaning |
|---|---|
| Schema validation | Checking that a tool's input matches its declared types and required fields |
| Independent verification | Re-deriving a critical value from your own authoritative source instead of trusting the model's claim |
| Audit log | A durable record of every tool call, its validation result, its approval decision, and its outcome |

## Lab

Add a validation function for your own Project 3's `requires_approval`
tool that re-derives its critical value from your own data, not from
the model's input. Add audit logging covering all four outcomes:
validation failure, rejection, approval, and execution.

## Check yourself

- Why isn't a type-valid `amount_cents` the same as a *correct*
  `amount_cents`?
- Where does `validate_refund_input` run relative to
  `create_pending_approval` from Lesson 15, and why does the order
  matter?
- Name one question an audit log should be able to answer that a
  "did it run successfully" log alone cannot.
