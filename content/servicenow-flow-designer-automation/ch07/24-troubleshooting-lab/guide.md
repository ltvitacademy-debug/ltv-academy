# Lesson 24 — Troubleshooting Lab

**Chapter 7 · Debugging & Troubleshooting Flows · Lesson 24 of 27**

## What you'll learn

- How to work a real stuck-flow report from first report to root cause
- How to tell, from the execution log, that a run is paused rather than broken
- How a data quality issue upstream can masquerade as a flow bug
- Why the real fix sometimes belongs in the data, not the flow logic
- How to add flow logic that protects against this exact gap in the future

## The report

HR reports that a "New Hire Onboarding" flow is "stuck." A new
employee, Maria Chen, started yesterday, and none of the onboarding
tasks that are supposed to fire off automatically — IT equipment
request, badge provisioning, manager welcome notification — have
happened. The flow triggers off new User record creation, and it's
been over 24 hours. HR assumes the flow is broken and asks you to fix
it.

## Step one: open the execution log, not the flow canvas

The instinct is to open the flow in Flow Designer and start reading
through the actions, looking for a mistake in the logic. Resist that.
The flow has presumably run successfully for other new hires before
Maria, so the logic itself is the least likely place to find the
problem. Instead, go straight to the flow's Runs and find the
specific execution record that was triggered by Maria Chen's User
record creation.

## Step two: read where the run actually is

The run isn't marked failed. It's marked **waiting**, sitting at an
Approval action labeled "Manager Approval — New Hire Equipment
Request." This single fact reframes the whole problem: this isn't a
broken flow at all. It's a flow doing exactly what it was built to
do — pause and wait for an approval response — except the approval
has nobody to actually respond to it.

## Step three: inspect the resolved approver pill

Expand that Approval step and look at what the "approver" data pill
actually resolved to for this run. It's empty. The flow was built to
set the approver to the new hire's manager field, read from the
User record. For Maria Chen specifically, that manager field is
blank. The flow correctly tried to route an approval to "the new
hire's manager" — there just isn't one on file for her. No one was
ever notified, so the approval has been silently waiting on a
response that can never come.

## Step four: find out why the manager field is blank

This is the moment to stop and separate two different problems that
look identical from the outside. The flow itself performed correctly:
it read the manager field and routed the approval exactly as
designed. The actual defect is upstream — a data quality issue.
Maria's manager field was never populated when her User record was
created, most likely because the person provisioning her account
didn't have her manager's name finalized yet. That's a real,
practical gap: new hire records can and do get created with
incomplete data, and this flow had no plan for that case.

## Step five: the real fix has two parts

The immediate fix is simple and non-technical: correct Maria Chen's
User record by populating her manager field, then resubmit or restart
the approval step so the flow can finally notify the right person and
continue. That unblocks her onboarding today. But the durable fix
belongs in the flow itself: add a check, right before the Approval
action, for whether the manager field is actually populated. If it
is, route to the manager as before. If it isn't, route instead to a
default fallback approver — an HR team lead or onboarding manager —
so a future new hire with the same data gap doesn't silently stall
for days with nobody noticing.

## Why this matters beyond this one flow

The lesson here generalizes past onboarding: a flow that looks
"stuck" is very often not malfunctioning at all — it's accurately
reflecting bad or missing data it was given. Treating every stuck
flow as a logic bug wastes time rebuilding something that already
works correctly. Reading the execution log first, confirming exactly
where and why a run is waiting, is what separates a five-minute
diagnosis from an afternoon of re-reading flow actions that were
never the problem.

## Check yourself

Walk through this scenario again from memory: what specific detail in
the execution log told you this was a data problem rather than a flow
logic problem, and what two separate actions did the real fix require
— one immediate, one durable?
