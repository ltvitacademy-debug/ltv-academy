# Refund Agent — Reference Build (Annotated)

The capstone's complete build, consolidated into one file. Lesson 35 proves
the approval mechanism; Lesson 36 wraps it with logging and limits; Lesson 37
turns it into something deployable. This file is all three, together, the
way you'd actually keep it in a real project.

## Tool schemas

```json
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

## Task-specific guardrails

```python
MAX_ITERATIONS = 8        # this task needs far fewer than a generic 15
MAX_REPEAT_CALLS = 2
BUDGET_USD = 0.50          # a refund lookup is cheap
MAX_RECORDS_MODIFIED = 1   # exactly the one order being refunded

CREDENTIAL_SCOPES = ["refunds:write", "orders:read"]  # never "*"
```

## The gated handler, with logging wrapped around it

```python
spent_usd = 0.0
records_modified = 0
audit_log = []  # in a real deployment: durable storage, not an in-memory list

def handle_tool_use(block, usage):
    global spent_usd, records_modified

    entry = {
        "timestamp": now(),
        "tool_use_id": block.id,
        "tool_name": block.name,
        "input": block.input,
    }

    spent_usd += cost_of(usage)
    if spent_usd >= BUDGET_USD:
        entry["result"] = {"status": "stopped", "reason": "cost budget exhausted"}
        audit_log.append(entry)
        return stop_loop(entry)

    if block.name == "issue_refund":
        decision = queue_for_approval(block)   # Lesson 25 — stops the loop,
        entry["approval"] = decision           # persists the pending request,
        if decision["decision"] == "rejected": # resumes on a human decision
            entry["result"] = {"status": "declined"}
            audit_log.append(entry)
            return tool_result(block.id,
                "Human reviewer declined this action: " + decision["reason"],
                is_error=True)

        if records_modified >= MAX_RECORDS_MODIFIED:
            entry["result"] = {"status": "stopped", "reason": "record-touch limit"}
            audit_log.append(entry)
            return stop_loop(entry)

        result = execute_tool(block)            # the real refund call
        records_modified += 1
    else:
        result = execute_tool(block)            # get_order runs immediately,
                                                  # never touches the approval path

    entry["result"] = {"status": "success", "output": result}
    audit_log.append(entry)                      # append-only — never edit in place
    return tool_result(block.id, result)
```

## Pre-deployment checklist (Lesson 37)

```
[ ] Approval queue reachable by reviewers outside your dev machine
    (a real queue/dashboard, not a local terminal prompt)
[ ] Audit log written to durable storage, not an in-memory list
[ ] Budget and iteration limits read from config, not hardcoded
    (see agent-guardrail-config-template.yaml in this vault)
[ ] Credentials loaded from a secrets manager, never committed to code
[ ] A defined behavior for "approver didn't respond" (escalate, Lesson 26)
[ ] Monitoring wired to the audit log (Lesson 33's four signals)
```

## What's deliberately NOT in this file

Real infrastructure — which cloud, which secrets manager, how to provision
the sandbox from Lesson 31 as actual infrastructure, how to wire real
alerting — is genuinely its own subject. This reference build is the
agent's own logic and safety design, matching exactly what the capstone
lessons cover; the next course in the AI Engineer path picks up the
infrastructure side.
