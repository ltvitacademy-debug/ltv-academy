# Lesson 12 — Change Approval Workflows

**Chapter 3 · Implementing Change Enablement · Lesson 12 of 32**

## What you'll learn

- Why change approval workflows are built in Flow Designer, not a legacy workflow editor
- How a real multi-stage approval chain works: manager, then conditionally CAB
- How the risk value from Lesson 11 decides which stages actually fire
- How the multi-stage approval pattern from Catalog Automation carries over directly
- What happens to a change record while each approval stage is pending

## Same tool, same pattern, different trigger

Catalog Automation's chapter on multi-stage approval workflows showed you how to chain approval actions in Flow Designer — one stage approves, and only then does the flow move to the next stage, rather than firing every approval at once. Change approval workflows are built with exactly that same tool and exactly that same pattern. The flow is still triggered by a record (here, `change_request` instead of a catalog request), it still uses Flow Designer's **Ask for Approval** action, and it still supports chaining one approval stage after another. What's different is the condition that decides which stages actually run — and that's where Lesson 11's calculated risk value comes in.

## A real two-stage pattern for Normal changes

A common, real implementation pattern for Normal change approval looks like this: every Normal change first requires **manager approval** — the requester's manager (or the assignment group's manager) reviews and approves or rejects the change. That stage runs for every Normal change, regardless of risk. The flow then checks the change's calculated `risk` field. If risk is Low, the flow can move straight to Scheduled once manager approval completes. If risk is Medium or High, the flow adds a second stage: **CAB approval** — the Change Advisory Board (built in Lesson 13) reviews and approves before the change can move forward. The two stages are chained sequentially, exactly the way Catalog Automation taught: Stage 2 doesn't even start until Stage 1's approval record is actually approved.

## Building the condition that branches the flow

The branching logic lives in the flow itself, as a condition evaluated right after the manager-approval stage resolves. A Flow Designer **If** action (or equivalent decision logic) checks `change_request.risk`: when the value is Medium or High, the flow continues into the CAB-approval stage; when it's Low, the flow skips directly to whatever action moves the change toward Scheduled (typically setting state and notifying the assignee). This is the concrete mechanism behind Lesson 11's principle that "higher risk should programmatically require more approval" — it isn't a policy written in a document somewhere, it's a real branch in a real flow, evaluated automatically every time, with no one having to remember to escalate a risky change manually.

## While approval is pending

While any approval stage is active, the change record's `approval` field reflects that an approval is outstanding, and the change itself typically sits in a **Scheduled**-pending or **Assess** state rather than moving toward implementation. If a manager or CAB rejects at any stage, the flow should route the record back for rework or mark it rejected outright, rather than silently stalling — a real implementation always gives the requester a clear, visible outcome, not a change that just sits unapproved with no next step defined.

## Why this chapter builds in this order

Lesson 10 established the three types and which ones even enter this approval machinery. Lesson 11 built the risk value this flow branches on. This lesson is where those two pieces actually connect into a working path from "change created" to "change authorized." Lesson 13 completes the picture by covering what the CAB stage actually is as a real recurring body, not just an approval step in a flow diagram.

## Key terms

| Term | Meaning |
|---|---|
| Ask for Approval action | The Flow Designer action that generates an approval record and pauses the flow until it's resolved |
| Multi-stage approval chain | Sequential approval stages where a later stage doesn't start until an earlier one is approved |
| Branching condition | The If logic that checks `change_request.risk` to decide whether CAB approval is added |
| Approval field | The field on the change record reflecting whether an approval is currently outstanding |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: in a two-stage Normal change approval flow, what decides whether CAB approval gets added as a second stage, and why is that decision made inside the flow rather than left to a human to remember?
