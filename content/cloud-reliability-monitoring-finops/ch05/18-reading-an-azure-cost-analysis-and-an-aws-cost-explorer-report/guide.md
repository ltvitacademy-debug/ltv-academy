# Lesson 18 — Reading an Azure Cost Analysis and an AWS Cost Explorer Report

**Chapter 5 · Cost Management & FinOps Fundamentals · Lesson 18 of 32**

## What you'll learn

- How to navigate **Azure Cost Management + Billing**'s Cost Analysis
  view, and what each grouping and filter actually shows you
- How to navigate **AWS Cost Explorer**, and how its grouping and
  filtering model maps onto the same questions Azure Cost Analysis
  answers
- How to group spend by service, by tag, and by linked account/
  subscription, and when each grouping is the right one to reach for
- How forecasting works in both tools, and what it is — and isn't —
  good for

## Two tools, the same job: answering "where is the money going?"

Lesson 17 named the Inform phase as the foundation everything else in
FinOps depends on. This lesson is Inform in practice: the two
cost-reporting surfaces you'll actually open when someone asks "why
did the bill go up" — **Azure Cost Analysis** (inside Azure Cost
Management + Billing) and **AWS Cost Explorer**. They look
different, but they're answering the same underlying questions, with
the same underlying levers: a date range, a grouping, and a set of
filters.

## Azure Cost Analysis

Azure Cost Analysis lives under **Cost Management + Billing** in the
Azure portal, scoped to whatever you select — a subscription, a
resource group, or a management group rolling up several
subscriptions. The main chart shows accumulated or daily cost over a
selected date range, and the real work happens in the controls above
it:

- **Group by** lets you re-slice the same spend by Service name
  (e.g. Virtual Machines, Storage), by Resource group, by Location,
  or — critically for cost allocation — by **Tag** (covered in depth
  in Lesson 19)
- **Granularity** switches the chart between daily and monthly
  buckets, which matters for spotting a spike versus a slow drift
- **Filter** narrows the view to a specific subscription, resource
  group, or tag value before you even group — useful when you already
  know which team's spend you're investigating

A typical FinOps workflow in this view: group by Service to see which
Azure service categories dominate spend (illustrative example —
compute and storage are commonly the largest two), then add a filter
for a specific tag value like `team:payments` to see that one team's
slice of the same chart. Azure Cost Analysis also includes a
**forecast** line, projecting the current month's spend forward based
on the trend so far — useful for spotting "we're on pace to blow
through budget" early, but it's a trend projection, not a guarantee,
and it reacts slowly to a brand-new workload that just got deployed.

## AWS Cost Explorer

**AWS Cost Explorer** is the AWS equivalent, and the mental model
transfers directly even though the UI looks different. Its core
controls are:

- **Group by** — Service, Linked Account (in an AWS Organization with
  multiple accounts), Region, or **Cost Allocation Tag**
- **Filter** — narrow to one linked account, one service, or one tag
  value, exactly like Azure's filter panel
- **Time range and granularity** — daily or monthly, same purpose as
  Azure's granularity control

The one AWS-specific detail worth knowing: **Cost Allocation Tags**
have to be explicitly **activated** in the Billing console before
Cost Explorer can group or filter by them — a tag applied to a
resource doesn't automatically appear as a grouping option until an
administrator turns it on. This is a common first speed bump for
anyone setting up cost allocation in AWS for the first time, and it's
a detail Lesson 19 returns to directly.

Cost Explorer also has its own **forecast** feature, built the same
way conceptually as Azure's — projecting forward from recent trend —
and its own **Savings Plans / Reserved Instance recommendations**
panel, which previews the kind of Optimize-phase work covered in
Chapter 6.

## Reading the same report two ways

Say an engineering lead asks, "did last month's new feature rollout
raise our bill, and by how much?" (illustrative example numbers
only — never treat a number like this as real company data unless
it's pulled live from your own account): group by Service first to
see if one category moved — say compute rose from roughly $4,000 to
$5,600 month over month in the example scenario — then add a tag
filter for that feature's project tag to confirm the increase lives
inside that team's resources rather than somewhere unrelated. That
two-step pattern — group broadly, then filter narrowly — is the same
in both tools, and it's the pattern you'll use constantly once
tagging (Lesson 19) makes that second step possible at all.

## Key terms

| Term | Meaning |
|---|---|
| Azure Cost Analysis | The reporting view inside Azure Cost Management + Billing for grouping, filtering, and forecasting spend |
| AWS Cost Explorer | AWS's equivalent reporting tool, with Group By, Filter, and a forecast feature |
| Cost Allocation Tag | An AWS tag that must be explicitly activated in Billing before Cost Explorer can group or filter by it |
| Forecast | A trend-based projection of future spend offered by both tools — directional, not a guarantee |
| Linked Account | An AWS Organizations member account; one of Cost Explorer's grouping dimensions |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: what
two controls do both Azure Cost Analysis and AWS Cost Explorer share
for re-slicing the same underlying spend data, and what AWS-specific
step has to happen before a tag can be used as a grouping dimension
in Cost Explorer?
