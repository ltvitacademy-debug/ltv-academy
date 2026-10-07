# Securing CI/CD Pipelines

Every scan in Chapter 4 runs inside a pipeline. That makes the pipeline itself worth protecting — because a pipeline with standing access to deploy to production, pull secrets, and push container images is exactly the kind of target an attacker would rather compromise than any single service it builds. This lesson is about securing the thing that secures everything else.

## What you'll learn

- Why the pipeline is its own attack surface, separate from anything it builds or scans
- How GitHub Actions environments and required reviewers add a human checkpoint before a sensitive deploy
- How deployment protection rules can be bypassed, deliberately, and why that needs to be visible and audited
- How this lesson ties identity (Chapter 2), secrets (Chapter 3), and scanning (Chapter 4) into one enforcement point

## The pipeline is a target, not just a tool

A compromised pipeline can do everything a legitimate deploy can do: push a malicious image, exfiltrate every secret it has access to, or deploy straight to production without a human ever reviewing the change. Securing it means applying the same principles from earlier chapters directly to the pipeline's own configuration: least-privilege identity for the runner (Chapter 2's workload identity, not a long-lived personal access token), secrets pulled at runtime from a vault rather than stored as static pipeline variables (Chapter 3), and pinning third-party GitHub Actions to a specific commit SHA rather than a mutable tag, so a compromised action can't silently change behavior underneath you.

## Environments and required reviewers

GitHub Actions lets a repository define **environments** — named deployment targets like `staging` or `production` — each with its own protection rules. The most direct of these is **required reviewers**: a deploy job targeting that environment pauses and waits for an approval from a named person or team before it's allowed to run.

![Screenshot of a repository header showing the tabs, with the Settings tab highlighted](/courses/devsecops-fundamentals/ch05/22-securing-ci-cd-pipelines/repo-actions-settings.png)
*Environment protection rules for a repository live under Settings → Environments — the same place Northbridge Retail's platform team configures required reviewers for its production environment.*

At Northbridge Retail, the `production` environment for the checkout service requires approval from someone on the platform team before any deploy job runs against it — meaning even a fully green pipeline, with every Chapter 4 scan passing, still waits for a human sign-off before it touches the live environment.

## Bypassing protection rules — visibly, not silently

Sometimes a deploy genuinely needs to proceed without waiting on every configured protection rule — an urgent hotfix, for instance. GitHub Actions supports this directly, but makes the bypass itself a visible, logged action rather than a quiet workaround.

![Screenshot of the "Deployment protection rules" section with the "Start all waiting jobs" button outlined](/courses/devsecops-fundamentals/ch05/22-securing-ci-cd-pipelines/actions-bypass-env-protection-rules.png)
*Bypassing a waiting deployment protection rule is an explicit, visible action — "Start all waiting jobs" — not a silent skip, so there's always a record of who overrode the gate and when.*

This matters for the same reason an audit log matters in Chapter 6: a security control that can be silently bypassed isn't really a control. One that can only be bypassed visibly, by an authorized person, with a record left behind, still counts as one.

## Where this ties the course together

Required reviewers enforce a human checkpoint; branch protection rules (covered conceptually in Lesson 18's "fails before merge" pattern) enforce that Chapter 4's scans actually ran and passed; least-privilege workload identity from Chapter 2 limits what the pipeline can touch even if something still goes wrong. None of these individually is "pipeline security" — together, they are.

## Key terms

- **Environment** — a named deployment target in GitHub Actions (such as staging or production) that can carry its own protection rules
- **Required reviewers** — a protection rule requiring a named person or team to approve a deployment before it proceeds
- **Deployment protection rules** — the set of checks (reviewers, wait timers, branch restrictions) that gate whether a deploy job is allowed to run
- **Pinning by SHA** — referencing a third-party GitHub Action by its exact commit hash rather than a mutable tag, so its behavior can't silently change
