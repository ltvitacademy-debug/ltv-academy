# Lesson 6 — Staging

**Chapter 1 · Environments · Lesson 6 of 14**

## What you'll learn

- What a staging environment is for, and how it differs from the testing tier
- Why Full sandboxes are the standard fit for staging
- What a release rehearsal actually checks that earlier testing can't
- Why staging is where seasonal release testing happens
- The relationship between staging sign-off and the decision to actually deploy

## Staging is the dress rehearsal

If the testing tier (Lesson 5) answers "does this change work correctly," **staging** answers a different question: "if we deployed exactly this, right now, in exactly this way, would the release go smoothly?" Staging is the closest a non-production environment gets to being production itself — not just similar data, but the full data, the full configuration, and ideally the exact deployment process that will be used for the real release. It's the last checkpoint before a change is irreversible in the environment that actually matters.

This is a meaningfully different goal from testing. Testing tells you a Flow produces the right outcome. Staging tells you whether deploying that Flow, alongside everything else going out in the same release, in the same order, with the same deployment tooling, actually works end to end — including things testing often can't see, like how long the deployment itself takes, whether a data migration script completes cleanly against full-scale data, and whether two unrelated changes bundled into the same release accidentally conflict with each other.

## Why Full sandboxes fit this tier

A Full sandbox (Lesson 3) — matching production's data and storage completely — is the standard choice for staging precisely because staging's whole purpose is eliminating "it worked in testing but broke in production" as a possibility. A Partial Copy sandbox's sampled data is a reasonable stand-in for most testing, but a sample can hide problems that only appear at full data volume: a batch Apex job that comfortably finishes within governor limits against a sample of 10,000 records can behave completely differently against production's real 4 million. Staging exists to remove exactly that kind of surprise before it reaches the environment everyone depends on.

The trade-off, covered in Lesson 3, is real: Full sandboxes are the most expensive to maintain and the slowest to refresh (roughly every 29 days, per the refresh intervals covered in Lesson 8), which is part of why most environment strategies don't try to keep staging in a permanent state of perfect sync with production — they refresh it deliberately, on a cadence tied to the release calendar, not continuously.

## Seasonal release testing

Salesforce ships three major platform releases a year (commonly called Spring, Summer, and Winter), and each one can change platform behavior underneath an org's own customizations even if nobody on the team touched anything. Staging is where an architect plans to catch this kind of risk before it reaches production: by refreshing staging from production, enabling the upcoming release preview, and re-running the org's existing critical business processes and automated tests against it well before the release reaches production automatically. This is a recurring, calendar-driven responsibility, not a one-time setup task — every seasonal release deserves its own staging pass, because what passed cleanly against the last release isn't guaranteed to pass against the next one.

## Sign-off, not just a successful test run

Staging typically ends with a formal **sign-off** — a specific person or group (often a business stakeholder, not just IT) explicitly confirming the release is approved to go to production. This matters because staging blends technical validation with business judgment: a release can be technically flawless and still be the wrong thing to ship this week, if, say, it lands during a company's seasonal sales peak. Sign-off is the point where "this works" and "we should ship this now" both get confirmed, by someone with the authority to make that second call.

## Key terms

| Term | Meaning |
|---|---|
| Staging | The final pre-production tier, matching production as closely as possible, used to rehearse an actual release |
| Release rehearsal | Testing the full deployment process itself, not just the change's logic |
| Seasonal release testing | Re-validating an org against an upcoming Salesforce platform release before it reaches production |
| Sign-off | Formal approval, often from a business stakeholder, that a release is cleared to deploy |

## Lab

An org's batch Apex job that recalculates commission totals passed every test in a Partial Copy testing sandbox against a 10,000-record sample. In staging, run against a Full sandbox with production's real 4-million-record Opportunity table, it now fails to finish within governor limits. Explain why this specific failure could only have been caught at the staging tier and not at testing, and describe what should happen next — does this go back to Development, or is there a smaller fix that could happen directly in staging?

## Check yourself

Can you explain the difference between what testing validates and what staging validates? Can you explain why staging typically uses a Full sandbox rather than a Partial Copy, and why seasonal Salesforce releases specifically make staging a recurring, not one-time, responsibility?
