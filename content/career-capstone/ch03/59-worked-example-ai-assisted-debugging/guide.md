# Lesson 59 — A Worked Example: AI-Assisted Pipeline Debugging

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 59 of 81**

## What you'll learn

- A full scenario that combines RCA drafting, guardrails, and evaluation from this chapter
- How the draft-verify-ship loop plays out on one real-shaped failure, start to finish
- Where an AI assistant like Copilot genuinely saves time in this scenario
- Why the fix still isn't "done" until it's confirmed against real data

## The scenario

A nightly pipeline that loads `FactOrders` from Lesson 8's star schema
fails at 2 a.m. The on-call engineer opens the alert Fabric Lesson 53
would have set up, sees a stack trace ending in a `KeyError` on
`discount_pct`, and has fifteen minutes before the morning dashboards
are due. This is exactly the situation Lesson 54 described: high
pressure, an unfamiliar error, and a log file to make sense of fast.

## Step 1 — draft the hypothesis (guardrails applied)

Before pasting anything into an AI assistant, the engineer strips the
log of anything identifying — no real customer IDs, no account
numbers, just the stack trace, the surrounding log lines, and the
transformation's spec. That's Lesson 56's hard line in action: the
draft happens with sanitized input, not the raw production log.

```
Sanitized input to the assistant:
KeyError: 'discount_pct'
  at transform_orders.py, line 84, in apply_discount()
Context: source table added a new nullable column yesterday;
         transform assumes the column has always existed.
```

The assistant's draft, per Lesson 54's pattern: "The new column was
likely added without a default value, and existing code assumes it's
always present — check whether the column is null for rows loaded
before yesterday's schema change."

## Step 2 — verify against real data, not the draft's confidence

The engineer doesn't ship that hypothesis. They query the actual
source table for null `discount_pct` values and confirm: every row
loaded before yesterday's 3 p.m. deploy has `discount_pct = NULL`,
exactly matching the draft's hypothesis. That confirmation — Lesson
58's spot-check against ground truth — is what turns the draft into
an actual finding, not the fact that the draft sounded right.

## Step 3 — fix, and re-verify

The fix is a `COALESCE(discount_pct, 0)` in the transform, matching
the business rule that a missing discount means no discount. Copilot
drafts the one-line change instantly — this is where an AI assistant
genuinely saves time, the same way Lesson 45 covered generating
boilerplate in a notebook. The engineer runs the pipeline against a
sample of the previously-failing rows and confirms the output
matches what the business rule actually expects, not just that the
code runs without an error.

```
1. Draft   — sanitized log + spec into the assistant
2. Verify  — query real data to confirm the hypothesis
3. Fix     — assistant drafts the one-line change
4. Re-verify — run against real failing rows, check the actual output
```

## What made this work

Every step that mattered was a human decision: what to sanitize, what
to query to confirm, whether the fix matched the actual business
rule. The AI assistant sped up the drafting at each stage — the
hypothesis, the fix — but never made the call about what was
actually true. That's the whole chapter's throughline, applied to one
concrete 2 a.m. failure.

## Key terms

| Term | Meaning |
|---|---|
| Sanitized input | The log/spec stripped of identifying data before it goes into a prompt |
| Confirmed hypothesis | A draft RCA that's been checked against real data and matches |
| Human decision points | The moments in this scenario where AI sped up drafting but a human made the call |

## Check yourself

You're ready for Lesson 60 when you can explain, without looking:
at which three points in this scenario did a human decision, not the
AI's draft, actually determine what shipped?
