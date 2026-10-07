# Approval Workflows: Start and Wait for an Approval

Back in Lesson 3 you built a simple approval on a new SharePoint item without stopping to ask what was happening under the hood. This lesson opens that up: Castlebridge Logistics routes freight-damage claims over five thousand dollars through a real approval, and the action doing the work — **Start and wait for an approval** — has five distinct behaviors depending on how many approvers are involved and whether they need to agree.

## What you'll learn

- The three real approval actions, and why "Start and wait for an approval" is the one to reach for first
- The five approval types Power Automate supports, and which fits Castlebridge Logistics' claim-review process
- How to branch a flow on the approver's response using a Condition
- The Dataverse and licensing prerequisites approvals quietly depend on

## Three actions, one connector

The approvals connector exposes three actions. **Create an approval** starts a request and moves on immediately, leaving a separate **Wait for an approval** action to pause later for the response. **Start and wait for an approval** collapses both into one step — it starts the request and pauses the flow right there until someone responds, which is why it's the action nearly every approval scenario reaches for first.

![Screenshot of the actions Create an approval, Start and wait for an approval, and Wait for an approval.](/courses/power-automate/ch01/13-approval-workflows/list-approval-actions.png)
*Three actions, one purpose — most flows only ever need the middle one.*
Source: [Microsoft Learn — Get started with Power Automate approvals](https://learn.microsoft.com/en-us/power-automate/get-started-approvals)

## Five approval types

"Start and wait for an approval" isn't one behavior — it's five, selected from a dropdown on the action itself:

- **Approve/Reject – Everyone must approve** — every named approver has to respond before the flow continues; one rejection ends it
- **Approve/Reject – First to respond** — the first response of any kind finishes the request
- **Custom Responses – Wait for all responses** — you define the response options; everyone must answer
- **Custom Responses – Wait for one response** — you define the options; the first answer wins
- **Sequential approval** — approvers respond one at a time, in order, each one gating the next

Castlebridge Logistics uses **Approve/Reject – Everyone must approve** for freight-damage claims over five thousand dollars, requiring both the operations manager and finance to sign off. A routine driver schedule swap, by contrast, uses **Approve/Reject – First to respond**, so whichever dispatcher sees it first can clear it.

## Branching on the response

Once the action completes, its output includes the approver's decision. A Condition step reads that outcome and splits the flow — one branch for approved, one for rejected — exactly the pattern you'll use for every approval flow you build from here on.

## Prerequisites that are easy to miss

Approval flows save their data in Dataverse. The first time anyone in an environment uses the approvals connector, Power Automate provisions a Dataverse database automatically — in the default environment this is silent, but in any other environment the user running that first flow needs an administrator role, and the provisioning can take a few minutes. Any license that includes standard connectors (a Power Automate plan, Microsoft 365, or a qualifying Dynamics 365 license) is sufficient — no premium license is required for approvals themselves.

## Key terms

- **Start and wait for an approval** — the single action that requests and pauses for an approval response
- **Approve/Reject – Everyone must approve** — the approval type requiring every named approver to respond
- **Approve/Reject – First to respond** — the approval type that finishes on the first response of any kind
- **Sequential approval** — approvers respond one at a time, in a defined order
- **Dataverse** — the database approval flows save their requests and responses into, auto-provisioned on first use
