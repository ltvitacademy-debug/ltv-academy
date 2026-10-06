# Lesson 31 — Governance Workflows and Approvals

**Chapter 6 · Governance Workflows · Lesson 31 of 35**

## What you'll learn

- The two categories of workflow Purview automates: data product access, and catalog curation/publishing
- How to find and start a new workflow from the Workflows authoring page
- The shape almost every workflow shares — trigger, approval step, condition, then a yes/no branch
- The difference between "Pending on all" and "Pending on any" approval types, and when each one is the right call

## Two jobs, one workflow engine

Lessons 28 and 29 covered policies and self-service access requests. A **workflow** is the automation layer sitting underneath both — the thing that actually routes a request or a change to the right person and waits for their decision, instead of a governance team manually watching for new requests to show up. Purview's workflow engine covers two distinct jobs:

- **Data product access workflows** — automate who approves a request to use a data product, building on exactly the access-request flow from Lesson 29.
- **Catalog curation (publish) workflows** — automate who has to sign off before a data product or glossary term actually goes live in the catalog, so a draft doesn't publish itself the moment someone finishes typing.

Both are built in the same place, with the same authoring experience — only the template and the outcome differ.

## Finding and starting a workflow

Every workflow a governance team has configured shows up in one list: its name, whether it's enabled, what it applies to, and its type.

![Screenshot of the Workflows page in Microsoft Purview, listing six workflows with their status, what they apply to, type, and last updated date.](/courses/microsoft-purview/ch06/31-governance-workflows-and-approvals/workflow-authoring-experience.png)

*Every configured workflow in one list — name, status, scope, and type.*

Starting a new one is a short form, not a blank canvas: a name, an optional description, then Continue into the actual authoring experience.

![Screenshot of the New data catalog workflow panel in Microsoft Purview, with a Name field filled in as "Approval workflow for Adatum" and a Description field, with a Continue button at the bottom.](/courses/microsoft-purview/ch06/31-governance-workflows-and-approvals/name-and-continue.png)

*Name it, describe it, then Continue — the canvas comes next.*

## The shape every workflow shares

Once a workflow is created, a base template loads into a canvas — and the same basic shape repeats across almost every Purview workflow, regardless of which template started it:

1. A **trigger** — the event that starts the workflow (a term creation request submitted, an access request sent).
2. A **Start and wait for an approval** step, naming who's assigned to approve it.
3. A **Condition** checking the approval outcome.
4. Two branches — **If yes** (the thing gets created, published, or granted, plus a notification) and **If no** (a rejection notification).

![Screenshot of the Microsoft Purview workflow authoring canvas, showing a trigger step, a Start and wait for an approval step, a Condition step, and If yes / If no branches with glossary term creation and email notification actions.](/courses/microsoft-purview/ch06/31-governance-workflows-and-approvals/workflow-authoring-canvas-inline.png)

*Trigger, approval, condition, branch — the pattern every workflow template is built from.*

A workflow admin can extend this default template with more steps, but the default alone already covers the common case: something is requested, someone approves or rejects it, and the requester finds out either way.

## Pending on all, or Pending on any

When a workflow names more than one approver, one setting decides how strict that approval actually is:

- **Pending on all** — every listed approver has to approve before the request moves forward. Use this when a decision genuinely needs multiple sign-offs — say, both a data steward and a privacy reviewer.
- **Pending on any** — the first approval settles it, and the rest of the approvers' input is no longer needed. Use this when any one of several qualified people (a team of data product owners, for instance) is enough to make the call.

Picking the wrong one has a real cost: "Pending on all" on a low-stakes request just slows everyone down waiting for someone who was never going to object; "Pending on any" on a high-stakes request means one distracted approver could wave through something that should have had a second set of eyes.

## Key terms

| Term | Meaning |
|---|---|
| Workflow | The automation that routes a request or change to an approver and acts on their decision |
| Data product access workflow | Automates approval for a request to use a data product |
| Catalog curation (publish) workflow | Automates approval before a data product or glossary term goes live |
| Pending on all / Pending on any | Whether every named approver must approve, or just the first one to respond |

## Lab

Sketch a workflow for a hypothetical "new glossary term" approval process at a small company: who's the trigger, who's the approver (or approvers), and whether you'd use Pending on all or Pending on any — with one sentence explaining your choice.

## Check yourself

Can you describe, from memory, the four-part shape almost every Purview workflow shares — and explain when you'd choose Pending on any over Pending on all?
