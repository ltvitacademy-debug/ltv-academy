# Lesson 17 — Development, Test and Production Workspaces

**Chapter 4 · Lifecycle and Enterprise BI · Lesson 17 of 20**

## What you'll learn

- How a real workspace gets assigned to each of a pipeline's three stages
- What a fully connected, deployed pipeline actually looks like
- How Power BI compares items between stages before you deploy anything
- What the deploy action itself shows you, and the safety switch it offers

## Assigning the workspaces

Lesson 16 ended with three empty, named stages. The next step is connecting each one to a real workspace.

![Screenshot of three deployment pipeline stages — Development, Test, Production — each with a "Choose a workspace to assign to this stage" prompt and a Select dropdown.](/courses/power-bi-governance/ch04/17-development-test-and-production-workspaces/navigate-stages.png)
*Before anything can deploy, each of the three stages needs its own real workspace assigned to it.*

Most teams point Development at a workspace that already exists and is actively being built in. Test and Production are usually created fresh, specifically for the pipeline, so they start with nothing in them but what the pipeline deploys.

## What a connected pipeline looks like

Once every stage has a workspace, the pipeline canvas stops being empty placeholders and starts showing real content, refresh times, and deployment status.

![Screenshot of a fully connected deployment pipeline with Development, Test, and Production stages, each showing a named item and a successful deployment status.](/courses/power-bi-governance/ch04/17-development-test-and-production-workspaces/navigate-stages-new.png)
*Once assigned, the three stages show real content and refresh times — Development feeding Test feeding Production.*

This is the view a governance reviewer actually cares about day to day: at a glance, is Production current with what's already been validated in Test, or has it drifted?

## Comparing before you deploy

Before deploying anything, Power BI compares the destination stage's items against the source stage's — item by item.

![Screenshot of a comparison table between Test and Development stages, listing each item's type and whether it's the same as source, with one dataflow marked "Only in source."](/courses/power-bi-governance/ch04/17-development-test-and-production-workspaces/paired-items-new.png)
*Before deploying, Test's items are compared against Development's — same, new, or only in the source.*

That "Only in source" row matters: it's a new item that exists in Development but hasn't been deployed to Test yet. A governance reviewer scanning this table before approving a deployment is answering a very specific question — am I about to introduce something nobody has validated downstream yet?

## The deploy action itself

Deploying surfaces exactly what's about to change, with a safety option if one item fails.

![Screenshot of a "Deploy to this stage" confirmation dialog, showing items that are different and new, a note field, and a checkbox to continue deployment if one or more items fail.](/courses/power-bi-governance/ch04/17-development-test-and-production-workspaces/confirm-deploy.png)
*Deploying from Test to UAT lists exactly what's different and what's new, with the option to continue even if one item fails.*

The "Continue deployment in case 1 or more items fail" checkbox is a deliberate governance choice, not a default to leave unexamined — for a small, low-risk update that's a reasonable convenience; for a batch including a certified dataset, most teams leave it unchecked so one failure doesn't silently let a broken item through alongside nine good ones.

## Key terms

| Term | Meaning |
|---|---|
| Assign a workspace | Connecting a real Power BI workspace to one stage of a pipeline |
| Compared to source | Per-item status (same as source, only in source, new) shown before a deployment |
| Deploy | The action that pushes items from one stage's workspace into the next stage's workspace |

## Lab

Using the three-stage pipeline you sketched in Lesson 16's lab, write out what you'd expect the "Compared to source" column to show for a brand-new report you just built in Development, before you've deployed it anywhere. Then describe what it should show immediately after you deploy it to Test.

## Check yourself

Without looking back, can you explain what an "Only in source" status means, and why a governance reviewer should treat it differently from "Same as source" before approving a deployment?
