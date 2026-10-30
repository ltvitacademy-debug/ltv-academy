# Lesson 9 — A Cost Anomaly Appears

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 9 of 16**

## What you'll learn

- Why a real cost problem can surface with no incident, no outage, and no page at all
- How Azure Cost Analysis's forecast line turns "we think we're on budget" into a number you can
  actually check
- Why Azure Cost Management's built-in anomaly detection didn't catch this one automatically, and
  what that gap says about catching problems on brand-new workloads
- Why the right reaction to a cost anomaly is curiosity, not panic — the app itself is working fine

## Ten days in, nothing is on fire

Lesson 8 ended with Driftwood Outdoor Apparel's storefront app live in production on Azure —
containerized, provisioned by Terraform, deployed through the new CI/CD pipeline, backed up to
AWS. Ten days later, nothing about the app itself has changed. No alerts fired. No one paged
Theo Bryant overnight. The app is healthy, response times are normal, and if you only watched the
uptime dashboard, you'd think the project had landed cleanly and the story was over.

It's Monday morning, and Theo's habit — not a reaction to anything — is to open **Azure Cost
Analysis** for the storefront app's resource group as part of a routine check-in. That's where the
story actually continues.

## A forecast line that doesn't match the plan

Lesson 4's Terraform sizing work projected this app's run rate at roughly **$1,750 a month** once
it was live. Opening Cost Analysis and grouping by Service, one thing jumps out immediately:
**Azure Kubernetes Service** is the dominant and still-growing line item. The month-to-date
spend, read through Cost Analysis's **forecast** line, is pacing toward something closer to
**$2,460** for the month — about **40% over** the number the project was built against.

That's not catastrophic. It's not an incident. Nobody downstream has complained about anything.
But it is real, it is persistent across more than one day's noise, and it's exactly the kind of
"meaningfully higher than projected" signal that deserves a second look before it quietly becomes
next month's number too, and the month after that.

## Why didn't anomaly detection just flag this?

Driftwood's Azure subscription already has **Azure Cost Management anomaly detection** turned on
— a reasonable question is why it didn't catch a 40% overshoot automatically. The answer is in how
that detection actually works: it learns what "normal" looks like from a subscription or
resource's **own historical spend pattern**, and this app has only been in production for about
ten days. There isn't enough history yet for the model to know what normal even is for this
specific workload — so a real, sustained anomaly can run for a while on a brand-new resource
before any automated system has the baseline to recognize it as unusual.

That gap is the actual lesson here: anomaly detection is a real and useful safety net, but it
isn't a substitute for someone occasionally looking at the numbers directly, especially in the
first weeks after a new workload goes live. Theo caught this because he went looking, not because
anything paged him.

## What Theo does next

No incident ticket, no rollback, no all-hands. Just a question worth answering calmly: **why is
this app costing 40% more than it was sized for, ten days after a clean deploy?** Lesson 10 starts
tracing that number back to its actual source.

## Key terms

| Term | Meaning |
|---|---|
| Azure Cost Analysis | The Cost Management + Billing view for grouping, filtering, and forecasting spend on a subscription or resource group |
| Forecast line | A trend-based projection of the current month's total spend, based on the pace observed so far |
| Run rate | The projected ongoing monthly cost of a workload, used as the baseline a project is sized and judged against |
| Anomaly detection baseline | The historical spend pattern Azure Cost Management anomaly detection learns from before it can flag a deviation as unusual |

## Lab

Driftwood's Azure Budget for this resource group is set at $1,750/month with an alert threshold at
80% ($1,400). Given a forecast pacing toward $2,460, would that budget alert have already fired by
the time Theo checked Cost Analysis — and why does a forecast line still matter even once it has?

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why could Azure's own anomaly
detection fail to flag a real, sustained 40% cost overshoot on a workload that's only ten days
old, and why doesn't that mean the detection feature is broken?
