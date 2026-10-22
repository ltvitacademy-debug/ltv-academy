# Lesson 22 — The Flow Execution Log

**Chapter 7 · Debugging & Troubleshooting Flows · Lesson 22 of 27**

## What you'll learn

- Where to find the real execution record for any flow run
- What a flow's execution log actually shows you, step by step
- How to read resolved data pill values at the point a step ran
- How to tell a failed step apart from a step that's merely waiting
- Why this log is your primary diagnostic tool, not guesswork

## Every run leaves a real record

Every single time a flow runs — whether it was triggered by a record
being created, updated, or by a scheduled or subflow call — ServiceNow
creates an execution record for that specific run. You can reach it
two ways: open the flow itself in Flow Designer and look at its
**Runs** (execution history) list, or go through the platform's
central execution/context log that tracks every flow and subflow
context across the instance. Either path lands you on the same
underlying data: a complete, ordered account of what that one run
actually did. This is not a summary or an approximation — it is the
literal sequence of actions ServiceNow executed for that trigger, in
the order it executed them.

## What the log shows you

Open a specific run and you see every action in the flow listed in
execution order, each with its own status: completed, failed,
cancelled, or waiting. For completed actions, you can expand the step
and see exactly how long it took to run — useful when a flow feels
slow and you need to find which single step is the bottleneck, rather
than assuming the whole flow is just "slow." For every step, you can
also inspect the actual input values that were passed into that
action and the actual output values it produced. This is the detail
that matters most: a data pill in the flow's design view shows you
what *could* resolve there; the execution log shows you what *did*
resolve there, for this specific record, on this specific run.

## Reading resolved values instead of guessing

This is the single most important habit this lesson teaches. When a
flow misbehaves, the instinct is to re-read the flow's logic and try
to reason out what must have gone wrong. That's guessing. The
execution log removes the guesswork: open the run, find the step in
question, and look at what the data pill actually contained at that
moment. If an If/Else branch went the wrong way, the log shows you
the actual value it evaluated — not what you assumed it would be. If
an approval action targeted the wrong person, the log shows you
exactly which user or group field it resolved to. You are reading
what happened, not reconstructing what should have happened.

## Failed vs. paused — a critical distinction

Not every run that "isn't finishing" has failed. A run can be
**paused**, legitimately waiting on something external — most
commonly an approval that hasn't been answered yet, or a wait
condition that hasn't been met. The execution log distinguishes this
clearly: a paused run shows the flow sitting at a specific action with
a status like "waiting," not an error. A **failed** run, by contrast,
shows a specific action with an error status and, critically, an
error message describing what went wrong — an unmapped required
input, a REST call that returned a failure response, a script step
that threw an exception. Treating a paused flow as broken (or a
broken flow as merely slow) is the most common troubleshooting
mistake this log exists to prevent.

## This is Flow Designer's version of the System Log

If you've already worked with the platform's System Log for
general-purpose troubleshooting, think of the flow execution log as
its purpose-built sibling: instead of scanning instance-wide events
for something relevant, you go directly to the one record that
describes exactly the run you care about, with every action, every
timing, and every resolved value already organized in the order they
happened. That specificity is what makes it the first place to look
— not the last resort after everything else has failed.

## Key terms

| Term | Meaning |
|---|---|
| Execution record | The record ServiceNow creates for one specific run of a flow |
| Runs / execution history | The list, on the flow itself, of its past execution records |
| Resolved value | What a data pill actually contained at the moment a step ran, as opposed to what it could contain |
| Paused run | A run legitimately waiting on something external, such as an unanswered approval |
| Failed run | A run that stopped at a specific action with an error status and message |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: how
would you tell, just from the execution log, whether a flow that
hasn't produced its expected result yet is actually broken, or simply
paused waiting on an approval?
