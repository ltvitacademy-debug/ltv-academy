# Lesson 30 — Capstone: Adding Logging & Guardrails

**Chapter 6 · Capstone · Lesson 30 of 32**

## What you'll learn

- Wrapping the Lesson 29 build with audit logging on every call
- Adding stopping conditions and a cost + action-scope budget
- Scoping the capstone's credentials to least privilege
- Why this is additive wrapping, not a rewrite of the working build

## Same agent, wrapped — not rebuilt

Lesson 29 proved the approval mechanism works. Nothing about that changes
here. Every addition in this lesson wraps *around* the existing
`handle_tool_use` function rather than touching its logic — which is
itself the point: a working, tested core shouldn't be disturbed just to
add safety layers around it.

## Audit logging on every call

Lesson 21's log shape, applied directly: every call — approved, rejected,
or ungated — writes one entry.

```
def handle_tool_use(block):
    entry = {"timestamp": now(), "tool_use_id": block.id,
             "tool_name": block.name, "input": block.input}
    if block.name == "issue_refund":
        decision = queue_for_approval(block)
        entry["approval"] = decision
    result = execute_or_skip(block, decision if block.name ==
             "issue_refund" else None)
    entry["result"] = result
    audit_log.append(entry)   # append-only, Lesson 21
    return result
```

## Stopping conditions and budget

Lesson 23 and 24's limits, scoped to this specific task:

```
MAX_ITERATIONS = 8        # this task needs far fewer than 15
MAX_REPEAT_CALLS = 2
budget_usd = 0.50         # a refund lookup is cheap
MAX_RECORDS_MODIFIED = 1  # exactly the one order being refunded
```

Note the numbers are *task-specific*, not copy-pasted from the lessons
that introduced them — a refund-lookup task genuinely needs fewer
iterations and a smaller budget than an open-ended research agent would,
which is exactly the point Lesson 24 made about per-task budgets.

## Scoped credentials

Lesson 25's least-privilege principle, applied to this project's one real
credential:

```
api_key: "sk_live_refund_scope_only",
scopes: ["refunds:write", "orders:read"]
// not: scopes: ["*"]
```

Even if every other control somehow failed, this credential alone cannot
touch anything outside orders and refunds — it has no path to, say, a
customer's account settings or payment method on file.

## What changed, and what didn't

The tool schemas from Lesson 29 are untouched. The approval checkpoint
logic is untouched. What's new is everything *around* that core: a log
entry per call, a hard stop if the loop misbehaves, a budget that can't be
exceeded, and a credential that can't reach beyond its scope. That's
exactly Chapter 5's argument in miniature — safety is additive layers
around a working core, not a replacement for good core design.

## Key terms

| Term | Meaning |
|---|---|
| Additive wrapping | Adding safety layers around existing, working logic without modifying that logic |
| Task-specific budget | A cost/iteration limit sized to this particular task, not a generic default |
| Least-privilege credential | A key scoped to exactly this agent's needed actions, nothing broader |

## Check yourself

If `MAX_RECORDS_MODIFIED = 1` and the agent somehow tried to call
`issue_refund` on a second, different order in the same task, what should
happen — and which earlier lesson's pattern governs the answer?
