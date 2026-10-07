# Environment Promotion & Approvals

Lesson 21 chained dev, staging, and production together with `needs:` — but a dependency chain only controls *order*. It says nothing about who, if anyone, has to sign off before a release moves from one environment to the next. That's what promotion and approvals add: a real human checkpoint, enforced by the pipeline itself rather than by a policy document nobody reads.

## What you'll learn

- The difference between "the pipeline can technically run" and "the pipeline is allowed to run"
- How to require a named approver before a deployment can reach an environment
- What a "check" is, beyond a human approval — automated gates that run before promotion too
- How a blocked promotion actually looks to the engineer waiting on it

## Promotion is a decision, not just a trigger

"Promoting" a release means moving the exact same artifact — the same pinned image from Chapter 4 — from one environment to the next, unchanged. Nothing gets rebuilt between staging and production; rebuilding would risk promoting something subtly different from what staging actually tested. What changes at each promotion is permission: does this specific release have the sign-off it needs to proceed to a more sensitive environment?

## Requiring an approval

In Azure DevOps, adding an approval to the `production` environment means any pipeline run targeting it pauses and waits:

![Screenshot of the Azure DevOps dialog for creating a new approval, with an approver field and instructions to approvers.](/courses/ci-cd-pipelines/ch05/22-environment-promotion-and-approvals/create-new-approval.png)
*A named approver (or group) is attached directly to the environment — every future run targeting it inherits the same requirement.*
Source: [Microsoft Learn — Define approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals)

At Northbridge Retail, the `production` environment requires sign-off from the on-call release manager; `staging` requires none at all. The exact same workflow file behaves differently depending on which environment a given job targets — the pipeline doesn't need an `if` statement asking "is this risky," because the environment's own configuration already answers that.

## Checks: approvals without a human

Not every gate needs a person. A **check** is an automated condition evaluated before a deployment proceeds — a business-hours restriction that blocks deploys outside a maintenance window, or a branch-control check confirming the deployment only runs from `main`. Both approvals and checks sit in the same place, attached to the environment itself:

![Screenshot of an environment's combined approvals and checks configuration panel.](/courses/ci-cd-pipelines/ch05/22-environment-promotion-and-approvals/approvals-and-checks.png)
*Human approvals and automated checks live side by side — a release can need both before it's allowed through.*
Source: [Microsoft Learn — Define approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals)

## What a blocked promotion looks like

When a run hits a required approval, it doesn't fail — it pauses. The job sits in a waiting state, visibly distinct from both "running" and "failed," until the named approver acts. A reviewer typically opens the pending release, looks at exactly what changed since the last production deployment (often the Chapter 4 artifact's commit history), and either approves it or rejects it with a reason. Only an explicit approval lets the job continue; it never times out into a silent yes.

## Why this matters more than it looks like

Without an enforced approval, "someone should review this before it goes to prod" is a norm — something a careful engineer remembers to do and a rushed one skips. Attaching the approval to the environment itself removes that option: GitHub Actions and Azure DevOps both simply won't execute the deployment step until the requirement is satisfied, no matter who's running the pipeline or how much of a hurry they're in.

## Key terms

| Term | Meaning |
|---|---|
| Promotion | Moving the same unmodified artifact from one environment to the next |
| Approval | A required human sign-off attached to an environment before a deployment can proceed |
| Check | An automated (non-human) condition an environment requires before a deployment proceeds |
| Pending state | A paused deployment waiting on an unmet approval or check, distinct from running or failed |
