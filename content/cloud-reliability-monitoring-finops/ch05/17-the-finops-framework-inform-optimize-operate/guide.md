# Lesson 17 — The FinOps Framework: Inform, Optimize, Operate

**Chapter 5 · Cost Management & FinOps Fundamentals · Lesson 17 of 32**

## What you'll learn

- What FinOps actually is, and why it's a cultural/operational practice
  rather than a tool you install
- The three phases of the FinOps Foundation's framework —
  **Inform, Optimize, Operate** — and what each one is actually
  responsible for
- Why FinOps runs as a continuous loop rather than a one-time
  cost-cutting project
- Who the three personas (Finance, Engineering, and Business/Product)
  each bring to that loop, and why none of them can run it alone

## FinOps isn't a product — it's an operating model

By the time a team reaches this point in the Cloud Engineer →
Cloud Architect path, they've built real infrastructure with
Terraform, run real workloads on Kubernetes, and instrumented it with
logs, metrics, and traces. All of that infrastructure costs real
money every hour it runs, whether or not anyone is watching the bill.
**FinOps** (short for "Cloud Financial Operations") is the discipline
built around that fact: bringing financial accountability to the
variable, on-demand spending model of the cloud, the same way DevOps
brought operational accountability to deployment.

The nonprofit **FinOps Foundation** (part of the Linux Foundation)
maintains the industry's reference framework for this, and it's worth
learning by name because the vocabulary — Inform, Optimize, Operate,
and the "Crawl, Walk, Run" maturity model — shows up in job postings,
vendor documentation, and Azure/AWS's own cost-management product
pages. It is not tied to one cloud; it applies equally to an
Azure Cost Management view and an AWS Cost Explorer report, which is
exactly what the next lesson walks through.

## The three phases

The framework organizes FinOps work into three phases that repeat in
a continuous cycle, not a line you cross once:

### 1. Inform

Before anyone can optimize anything, the organization needs visibility
into **where the money is actually going** and **who is accountable
for it**. Inform work includes:

- Building real-time (or near-real-time) visibility into current and
  forecasted spend
- Allocating cost to the team, project, or feature that generated it
  — which only works if resources are tagged consistently (Lesson 19
  covers this in depth)
- Benchmarking spend against budgets and against the value the
  spend is producing (cost per customer, cost per transaction, etc.)

Nothing downstream works without this phase. A team cannot optimize
spend it cannot see, and cannot hold anyone accountable for spend it
cannot attribute.

### 2. Optimize

Once spend is visible and attributed, the Optimize phase is about
**acting on that visibility** to reduce waste and improve the
value received per dollar spent:

- Identifying idle or oversized resources (a VM sized for peak load
  that never sees peak load)
- Evaluating commitment-based discounts — Reserved Instances,
  Savings Plans, Azure Reservations (covered in depth in Chapter 6)
- Right-sizing compute and storage against actual observed usage,
  not against the original provisioning guess

This is the phase most people picture when they hear "cost
optimization," but the framework is explicit that it can't happen in
isolation — it depends entirely on the Inform phase having already
produced trustworthy, attributed data.

### 3. Operate

Operate is where FinOps becomes a continuous business process instead
of a one-time cleanup project:

- Setting and tracking organizational goals and KPIs for cloud spend
- Defining who owns what — which team approves a new resource type,
  which team owns a budget, which team gets paged on an anomaly
- Continuously improving the processes from the other two phases as
  the organization's cloud footprint grows and changes

Operate is also where the three phases connect back into a loop:
operating well produces better data for the next Inform cycle, which
surfaces new optimization opportunities, which changes what needs to
be operated. This is why the FinOps Foundation draws the framework as
a circle, not a left-to-right pipeline, and why mature organizations
describe their FinOps practice as "crawl, walk, run" — the same three
phases, executed with increasing automation and organizational reach
over time.

## Three personas, one loop

The framework also names three personas who each own part of this
loop, and none of them can do it alone:

| Persona | What they bring |
|---|---|
| **Finance** | Budget ownership, forecasting, and translating cloud spend into the business's financial reporting |
| **Engineering** | The actual ability to right-size, re-architect, or shut down a resource — Finance can't do this |
| **Business/Product** | Context on what spend is actually worth — a cost increase tied to real revenue growth is not the same problem as waste |

A FinOps practice that's only Finance sending spreadsheets to
Engineering, with no shared visibility and no product context, tends
to produce exactly the adversarial "cost police vs. engineers" dynamic
the framework is designed to avoid.

## Key terms

| Term | Meaning |
|---|---|
| FinOps | Cloud Financial Operations — the practice of bringing financial accountability to variable cloud spend, maintained by the FinOps Foundation |
| Inform | The phase focused on visibility and cost allocation: seeing spend and attributing it correctly |
| Optimize | The phase focused on acting on that visibility: eliminating waste, right-sizing, using commitment discounts |
| Operate | The phase focused on continuous process: goals, KPIs, ownership, and feeding improvements back into the next Inform cycle |
| Crawl, Walk, Run | The FinOps Foundation's maturity model describing increasing automation and reach within each phase over time |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
can't the Optimize phase succeed if the Inform phase hasn't produced
trustworthy, attributed cost data first, and why is the framework
drawn as a loop rather than a one-time, left-to-right project?
