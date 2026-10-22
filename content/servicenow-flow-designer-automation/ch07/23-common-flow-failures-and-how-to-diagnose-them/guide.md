# Lesson 23 — Common Flow Failures & How to Diagnose Them

**Chapter 7 · Debugging & Troubleshooting Flows · Lesson 23 of 27**

## What you'll learn

- Five real, recurring categories of flow failure
- Why a null data pill usually means a timing or record-lifecycle problem, not a bug in the pill itself
- How a data type mismatch quietly breaks an If/Else condition
- Why approvals stall when they're routed to the wrong person or group
- How to diagnose an IntegrationHub REST step failure using the execution log

## Null or empty data pill values

The most common flow failure isn't a crash — it's a pill that
silently resolves to nothing. This happens when a flow references a
field on a record that no longer exists in the state the flow
expects, at the point the step actually runs. A classic case: a flow
triggers on record creation, and three steps later tries to reference
a related record that gets deleted between the trigger firing and
that later step executing. The pill doesn't error — it just resolves
to null, and whatever logic depends on it behaves unpredictably. The
diagnosis is always the same: open the execution log for that run,
find the step, and look at what the pill actually held at that
moment, rather than assuming the field "should" have had a value.

## A required input left unmapped

Every action has required inputs, and Flow Designer will let you
save a flow with one left unmapped if validation doesn't catch it at
author time. At runtime, that step fails outright with an error
stating the specific input that was missing. This is one of the
easiest failures to diagnose because the execution log's error
message names the exact input — the fix is almost always mapping a
data pill to it, or adding a fallback value for cases where the
expected pill might be empty.

## A condition that evaluates the wrong branch

If/Else actions compare values, and a quiet but common failure is a
data type mismatch: a number field compared against a string value,
or a choice field compared against plain text that doesn't exactly
match the underlying choice value. The condition doesn't throw an
error — it just evaluates in a way that sends the flow down the
unexpected branch. Diagnosing this means opening the run, finding the
If/Else step, and inspecting the actual resolved values on both sides
of the comparison — you'll typically find one side formatted
differently than you assumed.

## An approval that never resolves

A flow that's "just stuck" is very often paused at an Approval
action, waiting indefinitely because it was routed to the wrong
person or an empty group. This isn't a flow bug in the traditional
sense — the flow is working exactly as designed, waiting for a
response that will never come because nobody was actually notified.
The execution log confirms this clearly: the run shows "waiting" at
the approval step, and inspecting the resolved approver or group pill
reveals it's empty or points to someone who was never meant to
approve this.

## An IntegrationHub REST step failure

When a flow calls an external system through an IntegrationHub REST
step, two realistic failure modes dominate: the Connection & Credential
Alias it relies on has expired or been invalidated, or the external
system itself is unreachable or returns an error response. The
execution log shows this failure directly on the REST step — an
authentication error points to the alias, while a timeout or an
HTTP error response from the far end points to the external system.
Either way, the fix starts with reading that step's actual error, not
re-checking the flow's logic, since the flow's own logic is usually
not the problem.

## Key terms

| Term | Meaning |
|---|---|
| Unmapped required input | A required action field left without a data pill, causing a runtime failure |
| Data type mismatch | Comparing values of different underlying types, causing a condition to evaluate unexpectedly |
| Connection & Credential Alias | The stored authentication reference an IntegrationHub step uses to reach an external system |
| Known failure category | A recurring, real pattern of flow breakage with its own diagnostic approach |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: for
each of the five failure categories in this lesson, what specific
thing would you look for in the execution log to confirm which one
you're dealing with?
