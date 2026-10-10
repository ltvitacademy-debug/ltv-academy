# Lesson 14 — Governance vs. Agility

**Chapter 2 · Tradeoffs in Depth · Lesson 14 of 20**

## What you'll learn

- How this tradeoff is the process-level version of centralized vs. decentralized design from Lesson 12
- Concrete Salesforce examples: change-management review gates, sandbox-to-production release pipelines, CI/CD automation
- Why governance that doesn't scale with the org becomes the org's biggest source of shadow IT
- The real criteria for sizing a governance process to the risk it's actually managing

## Governance is a tax on every single change, paid to prevent the expensive ones

Every governance step — a required architecture review before a new object is created, a mandatory testing phase before a release, a change advisory board that has to approve deployments to production — exists to catch a mistake before it reaches production, where fixing it costs far more than catching it would have. That's a genuinely valuable function. It's also, unavoidably, a tax paid on every change that goes through the process, including the overwhelming majority of changes that were never going to be the expensive mistake governance exists to catch. A one-line validation-rule tweak that's genuinely low-risk pays the exact same review-queue wait as a schema change that touches integrations across five systems, unless the governance process is specifically designed to tell those two cases apart.

This is the direct process-level version of Lesson 12's centralized-vs-decentralized tension: heavy governance centralizes risk-catching in a review process, and the agility cost is the same bottleneck lesson 12 described — teams waiting on a queue for changes that didn't need that level of scrutiny. The failure mode is also familiar: push governance too far past what the org's actual change volume and risk profile justify, and teams start finding ways around it. A sales-ops admin who can't get a simple list-view change through a six-week change advisory board cycle will build the same thing themselves outside the sanctioned process, in a sandbox nobody's tracking, or as a personal dashboard that quietly becomes the thing the whole team actually relies on. That's shadow IT, and it's not a discipline failure on the admin's part — it's a predictable response to governance that stopped matching the actual risk of the changes it was gating.

## Concrete Salesforce mechanisms on this axis

- **Change advisory boards and manual review gates.** A human review step before any production deployment, which catches context a purely automated check might miss, at the cost of being exactly as slow as the humans involved and their calendars.
- **Sandbox-to-production release pipelines.** A formal path — develop in a scratch org or sandbox, test in a staging sandbox, deploy to production through a tracked, repeatable process — that creates real traceability and a rollback path, at the cost of every change needing to move through that pipeline even when it's trivial.
- **CI/CD automation with automated tests and validation.** Automated test runs, static analysis, and deployment gates that catch many classes of mistake without needing a human reviewer for every change — this is the main lever for getting governance's risk-catching benefit without paying its full agility cost on every single change, because the computer doing the checking doesn't have a calendar to wait on.

## Sizing governance to actual risk

- **Tier changes by actual risk, not by uniform process.** A low-risk change (a report, a list view, a non-critical Flow update) can move through a lightweight, largely automated path. A high-risk change (anything touching shared data model, security settings, or cross-system integrations) justifies the full review gate. Treating every change identically is what creates the mismatch that produces shadow IT.
- **Invest in automation before adding more manual review steps.** A well-built CI/CD pipeline with real automated test coverage can catch more actual defects, faster, than an additional layer of human sign-off — and it does so without adding to anyone's wait time. The instinct to add governance by adding a review meeting is usually the wrong lever; adding governance by adding a test is usually the better one.
- **Watch for shadow IT as a direct governance-quality signal, not just a compliance problem to punish.** If teams are consistently routing around the sanctioned process, that's data about where the governance process doesn't match the actual risk of the changes it's gating — treat it as a prompt to re-tier the process, not only as a violation to crack down on.
- **Revisit the governance model as the org's change volume grows.** A process built for ten releases a month doesn't scale cleanly to a hundred without either becoming the bottleneck that produces shadow IT, or needing the automation investment that lets volume grow without the review queue growing in lockstep.

## Key terms

| Term | Meaning |
|---|---|
| Change advisory board | A manual review gate requiring human sign-off before a change is deployed to production |
| CI/CD pipeline | An automated build-test-deploy process that can catch many classes of defect without a human reviewer for every change |
| Shadow IT | Unsanctioned systems or workarounds teams build when the official governance process doesn't match the actual risk of the changes they need to make |
| Risk tiering | Sorting changes by actual risk level so governance intensity matches the change, rather than applying one uniform process to everything |

## Lab

An org's current process requires every single Salesforce change, from a one-field list-view tweak to a new integration touching customer financial data, to go through the same four-week change advisory board cycle. Teams have started building unsanctioned Flow automations outside the sanctioned backlog to get urgent fixes out faster. Using the criteria above, design a risk-tiered alternative: what tiers would you create, what moves through a lightweight/automated path versus the full review gate, and what would you tell leadership about the shadow IT that's already happening?

## Check yourself

Can you explain why governance is accurately described as "a tax paid on every change to prevent the expensive ones," and why that framing matters for sizing it correctly? Can you explain why shadow IT should be read as a signal about governance design rather than purely a compliance failure, and name the lever this lesson recommends pulling before adding more manual review steps?
