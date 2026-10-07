# SLIs, SLOs & Error Budgets

"Is the service healthy?" sounds like a yes-or-no question, but every production system has some amount of failure happening right now — a few timeouts, a handful of 500s. The useful question isn't "is anything broken," it's "how much failure is acceptable, and are we within that budget?" SLIs, SLOs, and error budgets are the vocabulary that turns that fuzzy question into a number you can actually alert on and make decisions with.

## What you'll learn

- The precise difference between an SLI, an SLO, and an SLA
- How to calculate an error budget from an SLO, with real numbers
- Why error budgets change how teams decide whether to ship a risky release
- A worked example from Northbridge Retail's checkout service

## SLI: the measurement

A **Service Level Indicator (SLI)** is a specific, measured metric that reflects user experience — not everything you could measure, just the thing that matters. For Northbridge's checkout service, a natural SLI is "the percentage of checkout requests that complete successfully in under 2 seconds."

A good SLI is measured from the user's perspective wherever possible, not just from the server's internal view — a request the server considers "successful" but that timed out at the load balancer should still count as a failure.

## SLO: the target

A **Service Level Objective (SLO)** is the target value for an SLI over a time window: "99.9% of checkout requests complete successfully in under 2 seconds, measured over a rolling 30 days." The SLO is internal — it's the number your team commits to and designs around.

## SLA: the external promise, with consequences

A **Service Level Agreement (SLA)** is a contractual promise to a customer, usually with a looser target than your internal SLO and a financial or contractual penalty if you miss it. Teams deliberately set the SLO tighter than the SLA so they get warned and can react before they're in breach of a real contract.

## Error budget: the SLO, flipped into a spending allowance

If your SLO is 99.9% success, your **error budget** is the remaining 0.1% — the amount of failure you're explicitly allowed before you breach the objective. Error budgets turn reliability into something you can spend, which is the whole point.

**Worked example.** Northbridge's checkout SLO is 99.9% success over 30 days. In a 30-day window there are roughly 43,200 minutes. The error budget is 0.1% of that: about 43 minutes of full-downtime-equivalent failure for the month (in practice this is usually tracked as a percentage of failed requests, not minutes, but the arithmetic is the same idea — 0.1% of your total request volume is allowed to fail).

If Northbridge already burned 30 of those 43 minutes responding to this month's flash-sale incident, the team has 13 minutes of budget left before they breach the SLO. That's a very different conversation than "is anything broken right now" — it's "we have very little room left, so no risky deploys until next month's budget resets."

## Why this changes team behavior

Error budgets give teams a shared, numeric answer to "can we ship this risky change today?" If the budget is nearly exhausted, the answer is no — slow down, focus on reliability work. If the budget is healthy, the team has room to take calculated risks, ship faster, and experiment. This replaces an argument about feelings ("I think we should be careful") with a number everyone already agreed to.

## Key terms

- **SLI (Service Level Indicator)** — a specific measured metric reflecting user experience, e.g. percent of requests under 2 seconds
- **SLO (Service Level Objective)** — the internal target value for an SLI over a time window, e.g. 99.9% over 30 days
- **SLA (Service Level Agreement)** — a contractual, external promise with consequences for missing it, usually looser than the SLO
- **Error budget** — the allowed amount of failure (100% minus the SLO) that a team can "spend" before breaching the objective
