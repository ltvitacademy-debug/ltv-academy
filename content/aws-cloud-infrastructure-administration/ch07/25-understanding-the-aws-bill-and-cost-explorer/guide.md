# Lesson 25 — Understanding the AWS Bill and Cost Explorer

**Chapter 7 · AWS Cost Management · Lesson 25 of 32**

## What you'll learn

- Where the actual AWS bill lives in the console, and what it shows you
- What Cost Explorer is, and the dimensions you can slice spend by — service, linked account, Region, and tag
- How Cost Explorer's built-in forecast works, and what it's actually useful for
- A concrete example of using Cost Explorer to find out which service is driving a spend spike

## Billing and Cost Management: where the bill actually lives

Every AWS account has a **Billing and Cost Management** console. It's the
source of truth for "what am I actually spending, and on what" — the bill
itself, invoices, payment methods, and a running total for the current
billing period all live here. If Chapter 5's tagging discipline was applied
consistently across resources, this is also where that effort starts paying
off, because the console's cost tools can filter and group by those same tags.

## Cost Explorer: visualizing spend over time

**Cost Explorer** is the tool for actually understanding the bill rather than
just reading a total. It renders spend as a chart over time and lets you
**group or filter** by several real dimensions: **service** (EC2, S3, RDS,
and so on), **linked account** (useful once an AWS Organization has more than
one account), **Region**, and **tag** — the same key-value labels covered
back in Chapter 5's tagging lesson. Grouping by service answers "what's
actually costing money"; grouping by tag answers "which project or team is
driving that cost," which a service-only view can't answer once a project
spans EC2, S3, and RDS at once.

## Forecasting: not magic, just trend extrapolation

Cost Explorer also includes a **forecast**, shown by default alongside the
last several months of actual spend. It projects what the next period is
likely to cost based on historical usage patterns — it isn't aware of a
planned migration or a new project about to launch, it's extrapolating from
what's already happened. That makes it genuinely useful for catching "we're
on track to blow past last month's number" early, and completely useless for
predicting a deliberate change nobody's told it about yet.

## Example: tracing a spend spike to its source

A monthly bill jumps from roughly $600 to $1,100 with no obvious cause. In
Cost Explorer, group the current month's spend by **service** first — EC2
turns out to account for nearly all of the increase. Then filter to EC2 only
and group by **tag** — the `project: data-migration` tag accounts for most
of that EC2 spend. Two clicks go from "the bill is high" to "a specific
project's EC2 usage is the reason," without opening a single invoice line
by line.

## Key terms

| Term | Meaning |
|---|---|
| Billing and Cost Management | The console area showing the actual bill, invoices, and payment methods |
| Cost Explorer | A tool for visualizing AWS spend over time, filtered or grouped by service, account, Region, or tag |
| Forecast | Cost Explorer's projection of future spend, based on extrapolating past usage patterns |
| Tag | A key-value label (Chapter 5) that lets Cost Explorer group spend by project, team, or environment |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why is
Cost Explorer's forecast good at catching a spending trend early, but unable
to anticipate a brand-new project that hasn't started yet?
