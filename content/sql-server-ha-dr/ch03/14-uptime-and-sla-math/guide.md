# Uptime & SLA Math

"Five nines" gets thrown around as a badge of honor, but almost nobody quotes what it actually
means in minutes — or what it costs to get there. Before comparing HA technologies in the next
lesson, it's worth doing the arithmetic once, carefully, so "99.9% vs. 99.99%" stops being an
abstract marketing phrase and becomes a real number of minutes a stakeholder can weigh against a
real budget.

## What you'll learn

- How to convert an availability percentage into actual allowed downtime per year
- Why each additional nine costs disproportionately more than the last
- How to use this math to have an honest conversation about SLA targets

## The nines, converted to real time

A year has 8,760 hours (525,600 minutes). Availability percentage tells you what fraction of that
time the system must be up; the rest is the downtime budget:

| Availability | Allowed downtime / year | Allowed downtime / month |
|---|---|---|
| 99% ("two nines") | ~3.65 days | ~7.3 hours |
| 99.9% ("three nines") | ~8.76 hours | ~43.8 minutes |
| 99.95% | ~4.38 hours | ~21.9 minutes |
| 99.99% ("four nines") | ~52.6 minutes | ~4.4 minutes |
| 99.999% ("five nines") | ~5.26 minutes | ~26 seconds |

The formula is simple: `downtime = (1 − availability) × total time`. Going from 99% to 99.9%
doesn't shave off a small slice — it's a 10x reduction in allowed downtime, and going from 99.9%
to 99.99% is another 10x on top of that.

## Why each nine costs disproportionately more

The jump from 99% to 99.9% might be solved by better patching discipline and a basic failover
plan. The jump from 99.9% to 99.99% usually requires real automatic failover — an AG with
automatic failover mode, or an FCI — because a human noticing an outage and manually failing over
inside 52 minutes a *year*, not per incident, is not a realistic target across dozens of possible
incidents. The jump to 99.999% typically demands redundancy at every layer — network, power,
storage, and often a second site — because 5.26 minutes a year leaves almost no room for a slow
DNS change, a delayed alert, or a manual intervention step. Each additional nine isn't a linear
cost increase; it's usually an order-of-magnitude jump in architecture, tooling, and operational
maturity.

## Using the math honestly with stakeholders

Someone asking for "99.99% uptime" for a database that currently runs on a single standalone
instance with nightly backups is really asking for automatic failover technology, tested runbooks,
and often a budget increase for Enterprise Edition licensing — not just "try harder." The nines
math gives a concrete number to anchor that conversation: "99.99% means this system can be down
for at most 52.6 minutes across the entire year — here's what it takes to actually hit that, and
here's what it costs."

## Key terms

| Term | Meaning |
|---|---|
| Availability percentage | Fraction of total time a system must be up, expressed as "nines" |
| Downtime budget | `(1 − availability) × total time` — the maximum allowed outage time in a period |
| Order-of-magnitude jump | Each additional nine of availability typically requires a fundamentally different architecture, not incremental effort |

## Check yourself

A stakeholder asks for "99.99% uptime, same as we have now" for a database currently running on a
single standalone SQL Server instance with manual failover taking about 30 minutes per incident.
Using the numbers above, is that target achievable with the current setup — and roughly how many
such incidents per year would already blow the budget?
