# DevOps Metrics: DORA

How do you know if a CI/CD pipeline is actually making things better, rather than just different? Google's DevOps Research and Assessment (DORA) team spent years studying thousands of software organizations and found four metrics that reliably separate high-performing teams from the rest. This lesson introduces all four, and how Northbridge Retail would track them for its cart service.

## What you'll learn

- The four DORA metrics and exactly what each one measures
- Why DORA groups them into two pairs — speed metrics and stability metrics
- Roughly what "elite" performance looks like on each metric
- Why speed and stability move together on high-performing teams, not against each other

## The four DORA metrics

1. **Deployment Frequency** — how often an organization successfully releases to production. Elite teams deploy on demand, multiple times a day; low performers deploy less than once a month.
2. **Lead Time for Changes** — the time from a commit landing on `main` to that commit running in production. Elite teams measure this in under an hour; low performers take months.
3. **Change Failure Rate** — the percentage of deployments that cause a failure in production (an outage, a rollback, a hotfix). Elite teams keep this under roughly 15%; low performers see failure on half their deployments or more.
4. **Time to Restore Service** — when something does fail, how long it takes to recover. Elite teams restore service in under an hour; low performers can take a week or more.

## Two pairs, not four unrelated numbers

DORA groups these into **throughput** (Deployment Frequency and Lead Time for Changes — how fast you move) and **stability** (Change Failure Rate and Time to Restore Service — how safely you move). The single most important finding from DORA's research cuts against intuition: these two pairs are not a trade-off. Teams don't have to choose between "fast" and "safe." The highest-performing organizations in DORA's research are fast *and* stable at the same time, because the practices that make deployment safer — small changes, automated testing, fast rollback — are the same practices that make it faster.

## Tracking DORA at Northbridge Retail

Say Northbridge Retail's cart service ships a bad release that corrupts saved-for-later lists for a subset of users:

- **Deployment Frequency** for the cart service: it deploys roughly 8 times a day via the pipeline built in this course's later chapters — an elite-range number.
- **Lead Time for Changes**: the fix for the corruption bug goes from committed to live in 22 minutes, because the pipeline (not a person) runs every step.
- **Change Failure Rate**: this particular release failed; if 2 releases out of the last 40 caused incidents, that's a 5% change failure rate — solidly elite.
- **Time to Restore Service**: the team ships a fix, and the rollback strategies covered in Chapter 5 (Lesson 25) mean saved lists are restored within 18 minutes of the first alert.

Notice that none of these four numbers come from a single pipeline run — they're measured over weeks or months of real deployments, which is exactly why they're useful for judging whether a CI/CD investment is paying off, rather than judging any one release in isolation.

## Key terms

- **DORA (DevOps Research and Assessment)** — the research program (now part of Google Cloud) that identified these four metrics from studying real software organizations
- **Deployment Frequency** — how often an org releases to production
- **Lead Time for Changes** — time from commit to running in production
- **Change Failure Rate** — percentage of deployments causing a production failure
- **Time to Restore Service** — how long recovery takes after a failure
