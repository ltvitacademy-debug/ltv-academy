# Lesson 16 — Sharing Recalculation and Deferred Sharing

**Chapter 3 · Sharing Architecture · Lesson 16 of 24**

## What you'll learn

- The specific events that force Salesforce to recalculate sharing, and why recalculation isn't continuous
- Where to monitor a recalculation job and how to tell it's falling behind
- What the Defer Sharing Calculations feature actually suspends, and what it doesn't
- The real trade-off a deferred window introduces, and how to reason about whether it's acceptable
- How to use deferral deliberately as part of a planned bulk change, rather than as emergency damage control

## Recalculation isn't constant — it's event-driven

Salesforce doesn't recompute sharing on every query; the sharing table is maintained ahead of time so that read access is cheap. What's expensive is keeping that table correct whenever the inputs to it change. A **sharing recalculation** is triggered by a defined set of events: a role hierarchy change (a role is added, moved, or deleted), a territory hierarchy or territory assignment change, a public group or queue membership change, and the creation, edit, or deletion of a sharing rule. Each of these can cascade: moving one role near the top of a hierarchy can force recalculation of every sharing row that depends on every role beneath it, for every object with sharing rules that reference that hierarchy.

Recalculation runs as an **asynchronous background job**, not inline with the change that triggered it — which is why an admin can make a role-hierarchy edit and see the UI respond instantly, while the actual sharing-row updates are still processing behind the scenes, sometimes for a long time on a large, skewed org. Two places to check on recalculation health: **Setup Audit Trail**, which shows exactly which changes (and who made them) triggered recalculations historically, and the **Background Jobs** area of Setup, where a long-running or stuck sharing recalculation job is visible and can be investigated before it becomes a user-facing problem.

## Defer Sharing Calculations

For orgs doing bulk, deliberate changes to role hierarchy, territory hierarchy, or group membership — a reorganization, a large territory realignment, a phased role-hierarchy redesign — recalculating after every single intermediate change is wasteful: each step forces a full recalculation, even though only the *final* state actually matters to users. **Defer Sharing Calculations** is a Setup feature built for exactly this situation: an admin enables it before starting a batch of changes, makes every change in the batch without triggering recalculation after each one, and then explicitly triggers **Resume Sharing Calculations**, which runs a single recalculation reflecting the net effect of the whole batch — far cheaper than one recalculation per intermediate step. In some orgs this capability isn't enabled by default and has to be turned on by Salesforce Support before an admin can use it from Setup, so it's worth confirming availability well before a planned reorg, not the week of it.

## The trade-off deferral introduces

Deferring recalculation is not free — it's a deliberate trade of **temporary inconsistency** for **total recalculation cost**. While deferral is active, sharing access for the objects affected by role hierarchy, territory, and group-membership changes does not reflect the in-progress changes; the sharing table still represents the state from before deferral started, until Resume Sharing Calculations is explicitly run. That means a user's actual access during the deferred window may not match what the new org structure implies — someone newly supposed to see a set of records might not yet, and in principle the reverse could also hold true until resume runs. An architect weighing deferral has to decide whether that window is acceptable for the business: a maintenance window with no active users is a safe time to defer and resume; deferring during active business hours with users actively working records is a much riskier call, because the temporary mismatch is visible to real people in real time, not just to the admin running the change.

## Using deferral deliberately, not as an emergency patch

The feature is designed to be planned, not reached for only once recalculation has already become an incident. A disciplined pattern: schedule a maintenance window, enable Defer Sharing Calculations, make the full batch of role/territory/group changes, verify the changes are complete and correct, run Resume Sharing Calculations, and confirm the subsequent recalculation job completes cleanly before reopening the window to users. Treating deferral as routine process for any bulk hierarchy change — rather than a rescue mechanism pulled out only after a recalculation job has already been running for hours — is what separates a planned reorg from an incident.

## Key terms

| Term | Meaning |
|---|---|
| Sharing recalculation | The asynchronous process that updates the sharing table after a role, territory, group, or sharing-rule change |
| Setup Audit Trail | The log showing which changes triggered recalculations and when |
| Background Jobs | The Setup area showing running and completed recalculation jobs |
| Defer Sharing Calculations | A Setup feature that suspends recalculation during a batch of hierarchy/territory/group changes |
| Resume Sharing Calculations | The action that runs one net recalculation covering everything done while deferral was active |

## Lab

A company is merging two regional sales divisions into one, which requires moving 40 roles in the hierarchy and reassigning territory membership for roughly 15,000 users over a single weekend. Write the step-by-step plan you'd hand to the admin team: when to enable Defer Sharing Calculations, what to verify before enabling it (including confirming the org has the capability turned on), what order to make the role and territory changes in, when to run Resume Sharing Calculations, and what you'd check before telling the business the new structure is live. Separately, explain in one paragraph why you would *not* recommend deferring this same change if it had to happen gradually during business hours over two weeks instead of in one weekend window.

## Check yourself

List the four categories of event that trigger sharing recalculation. What exactly does Defer Sharing Calculations suspend, and what specific risk does an architect take on during the deferred window?
