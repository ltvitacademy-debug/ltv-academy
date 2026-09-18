# Lesson 1 — What Is Cloud Computing?

**Chapter 1 · Cloud & Azure Concepts · Lesson 1 of 18**

## What you'll learn

- The real definition: on-demand computing resources, over the internet, paid for as you use them
- CapEx vs. OpEx — the financial shift that makes cloud different, not just "someone else's computer"
- The five characteristics that actually define cloud computing
- Where Azure fits, and what this course covers before any hands-on Azure work

## Not just "someone else's computer"

That joke undersells what actually changed. Before cloud computing,
running a database server meant buying physical hardware, racking
it, and hoping you sized it right for the next three years. **Cloud
computing** is renting that same compute, storage, and networking
from a provider like Microsoft, Amazon, or Google — available in
minutes, billed by actual usage, and resizable without buying
anything new.

```
On-premises:                    Cloud:
buy hardware upfront             use what you need, when you need it
size for peak load, forever      scale up for peak, scale down after
own it, maintain it              provider owns and maintains it
```

## CapEx vs. OpEx — the real shift

**Capital expenditure (CapEx)**: a large upfront purchase (a server,
a data center) that depreciates over years. **Operating expenditure
(OpEx)**: an ongoing, variable cost that scales with actual use — like
a utility bill. Cloud computing turns most infrastructure spending
from CapEx into OpEx. That's not just an accounting detail — it's why
a startup can run production infrastructure without raising capital
for hardware first, and why a company can shut off a project's
compute costs the same day it's cancelled.

## The five characteristics

Cloud computing is usually defined by five real, specific traits —
not vague marketing language:

| Characteristic | What it actually means |
|---|---|
| On-demand self-service | Provision a resource yourself, in minutes, no ticket to a hardware team |
| Broad network access | Reachable over the internet from anywhere, not just an internal network |
| Resource pooling | Many customers share the same physical hardware, isolated from each other |
| Rapid elasticity | Scale up for a traffic spike, scale back down after — pay for what you use |
| Measured service | Billed by actual consumption (compute-hours, GB stored), not a flat fee |

## Where Azure fits, and what's next

Azure is Microsoft's public cloud — one of the three major providers
alongside AWS and Google Cloud. This course doesn't compare all
three; it's a focused, AZ-900-aligned primer meant to sit *before*
any Azure-flavored path in this catalog (Azure Database Administrator,
Data Factory, and others all assume you already have this
foundation). Lesson 2 covers the three service models — IaaS, PaaS,
SaaS — that decide how much of the stack Microsoft manages for you
versus how much you manage yourself.

## Key terms

| Term | Meaning |
|---|---|
| Cloud computing | On-demand computing resources, over the internet, billed by usage |
| CapEx | A large upfront purchase that depreciates over time |
| OpEx | An ongoing, variable cost that scales with actual use |
| Elasticity | Scaling resources up or down to match real demand |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does shifting infrastructure spending from CapEx to OpEx matter to a
business, beyond just "it's cheaper"?
