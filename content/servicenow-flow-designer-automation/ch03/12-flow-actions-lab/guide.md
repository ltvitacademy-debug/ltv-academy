# Lesson 12 — Flow Actions Lab

**Chapter 3 · Flow Actions · Lesson 12 of 27**

## What you'll learn

- How to sequence Create Record, Ask for Approval, Update Record, and Notify into one coherent flow
- How to decide which approval variant a real step actually needs
- How to spot which part of a flow is a genuine candidate for a custom reusable action
- How to walk through a flow end-to-end and justify every action's placement

## The scenario: New Hire Equipment Request

A new employee needs a laptop, a monitor, and a badge before their first day. HR submits an
Equipment Request through the Service Catalog. Your job in this lab is to design — on paper,
in writing — the action sequence for the flow that automates this request, and to decide which
of those actions would be worth extracting into a custom reusable action for reuse across other
onboarding flows.

## Step 1 — Create Record: open the asset request

The flow is triggered by the catalog submission (a Record trigger, from Lesson 3, on the
Request Item table). The first action is **Create Record**, which opens a formal Asset Request
record on the asset-management side — populated from data pills off the triggering Request Item:
employee name, start date, requested equipment list, and the requester's manager (resolved the
same way data pills resolved a manager in Lesson 10's approval example). This gives the
fulfillment team a dedicated record to work from, separate from the raw catalog submission.

## Step 2 — Ask for Approval: the manager signs off

Before IT provisions anything, the new hire's manager has to approve the request. This is a
single named approver, not a group — so the correct variant is **approval from a specific
individual**, with the approver resolved from the manager data pill created in Step 1. The flow
genuinely pauses here. A `sysapproval_approver` record is created, the manager sees it in their
own approvals list, and the flow does not proceed until that record resolves to approved or
rejected.

## Step 3 — If/Else: branch on the outcome

Exactly as Lesson 10 described, the approval action's outcome feeds directly into an **If/Else**
condition. If rejected, the flow runs a Notify action telling HR and the requester why, and stops.
If approved, the flow continues to Step 4.

## Step 4 — Update Record: mark the request approved

On the approved branch, **Update Record** changes the Asset Request record's state field to
"Approved," making it visible to the IT fulfillment queue as ready to work. This targets the
record Step 1 created — a clean example of Update Record acting on something other than the
flow's original trigger record.

## Step 5 — Notify: alert the fulfillment team

Finally, a **notification action** fires a Notification (reusing the existing template
infrastructure from Course 3) to the IT fulfillment team's group, referencing the now-approved
Asset Request record so they know exactly what to prepare and ship before day one.

## Which step should become a custom reusable action?

Look at Step 2 specifically: "resolve the requester's manager and run a single-approver approval
against them." Every onboarding flow in this organization — equipment requests, system access
requests, office-space requests — needs that exact same manager-approval pattern. That's the
textbook case from Lesson 11 for a custom action: build one "Get Manager Approval" action with an
employee reference as its Input and the approval outcome as its Output, and every onboarding flow
calls it instead of re-wiring the same manager lookup and approval step five separate times. Steps
1, 4, and 5, by contrast, are specific enough to this request type (asset records, this exact
notification) that duplicating a custom action for them wouldn't save much — they stay as
ordinary actions inside this one flow.

## Key terms

| Term | Meaning |
|---|---|
| Asset Request record | The record Create Record opens to track fulfillment, separate from the raw catalog submission |
| Specific-individual approval | The correct variant when exactly one named person (the manager) must decide |
| Approved/rejected branch | The If/Else logic that reads an approval action's real outcome |
| Reuse candidate | A step pattern (like manager approval) needed identically across multiple flows |

## Check yourself

You're ready for Lesson 13 when you can explain: in this lab's flow, why is Step 2's manager
approval a strong candidate for a custom reusable action, while Step 1's Create Record is not?
