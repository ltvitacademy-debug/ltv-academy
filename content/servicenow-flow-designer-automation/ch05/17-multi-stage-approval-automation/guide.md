# Lesson 17 — Multi-Stage Approval Automation

**Chapter 5 · Service Catalog Automation · Lesson 17 of 27**

## What you'll learn

- Why a single Approval action isn't enough for real-world request routing
- The difference between sequential approval stages and parallel ones
- How "any one approver" differs from "all approvers," inside a parallel stage
- How If/Else logic reads an approval's outcome to decide what happens next
- A real example chaining Manager approval into Finance approval for high-cost requests

## One approval action isn't the whole story

Lesson 10 introduced the Approval action — asking one person or group
to approve or reject, and giving the flow a result to branch on.
Real approval processes are rarely that simple. A low-cost office
supply request might need exactly one approval. A high-cost equipment
request might need Manager approval, and only after that approval
clears, a second, separate approval from Finance. Multi-stage approval
automation is what Flow Designer calls chaining more than one Approval
action together, with the flow's own logic controlling what happens
between stages.

## Sequential stages: one gate, then the next

A **sequential** approval chain runs its stages one after another,
and a later stage never starts until the stage before it has actually
been approved. The flow places a second Approval action downstream of
the first, inside the "approved" branch of an If/Else that checks the
first stage's outcome. If the first stage is rejected, the flow routes
to a rejection path instead, and the second approval action never
runs at all — Finance never sees a request that Manager already
turned down. This is the right shape whenever one approver's decision
is a genuine prerequisite for asking the next one.

## Parallel stages: any approver vs. all approvers

A **parallel** approval stage asks more than one person at the same
time, inside a single Approval action's configuration, and the flow
has two real options for how that stage resolves. "Any" approval
resolves as soon as the first response comes back — the first
approve or reject wins, and the rest of the group's pending requests
are irrelevant once that happens. "All" approval waits for every
named approver to respond, and only resolves once the last one has;
a single rejection among the group typically ends the stage as
rejected. The choice between "any" and "all" is a setting on the
Approval action itself, not something you build with separate steps —
but deciding which one a stage needs is a real business judgment call,
not a default to leave untouched.

## Reading the outcome with If/Else

Every Approval action produces an outcome — approved or rejected — as
a data pill, exactly like any other action's output from Lesson 5.
An If/Else step immediately after the Approval action checks that
outcome and branches: the approved path continues to the next stage
(or to fulfillment, if this was the last stage), and the rejected path
routes to whatever the process needs on rejection — a notification,
a record update, an early end to the flow. This is the same If/Else
construct from Lesson 6, applied specifically to an approval's result
instead of a record field.

## A real example

A high-cost equipment request needs Manager approval, then Finance
approval — strictly sequential, because Finance shouldn't be bothered
with a request Manager hasn't even cleared yet. The flow runs an
Approval action targeting the requester's manager; an If/Else checks
the outcome. On approved, a second Approval action fires, this time
targeting the Finance group configured as "all" approvers, since the
business wants every named finance approver to sign off before an
expensive purchase proceeds. On rejected at either stage, the flow
routes to a shared rejection path instead of continuing further.

## Key terms

| Term | Meaning |
|---|---|
| Sequential approval | A later approval stage only starts after the prior stage is approved |
| Parallel approval | Multiple approvers asked at the same stage, resolved as "any" or "all" |
| Any approval | The stage resolves on the first response received, approve or reject |
| All approval | The stage waits for every named approver before resolving |

## Check yourself

Without looking back: a request needs sign-off from any one of three
regional directors, and the business wants whichever director
responds first to settle the decision. Is that an "any" parallel
stage or an "all" parallel stage — and what changes in the flow's
behavior if it were configured the other way?
