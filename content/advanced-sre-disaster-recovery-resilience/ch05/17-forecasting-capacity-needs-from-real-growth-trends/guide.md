# Lesson 17 — Forecasting Capacity Needs from Real Growth Trends

**Chapter 5 · Capacity Planning and Performance Engineering · Lesson 1 of 4**

## What you'll learn

- Why a real capacity forecast starts with your own historical
  metrics, not a round number pulled from memory
- How to tell whether a system is growing linearly or
  compounding — and why picking the wrong model badly undercounts
  future need
- Why every forecast needs an explicit error margin and headroom
  buffer instead of a single point estimate
- How provisioning lead time turns a forecast number into an actual
  scaling action, and why forecasts go stale if you don't redo them

## Start from the data you already have

Capacity planning fails most often for a boring reason: someone
estimates next quarter's load from memory, or by rounding up last
quarter's peak, instead of pulling the actual time series. Every
system with real traffic already has the raw material for a forecast
sitting in its monitoring stack — request rate, CPU and memory
utilization, storage growth, queue depth, database connections —
usually retained for six to twelve months in a system like Prometheus
with long-term storage, Datadog, or a cloud provider's own metrics
service. The first real step in forecasting is never a spreadsheet
guess; it's exporting that history and looking at the actual shape of
the curve.

## Pick the growth model that matches the shape

Once you have the curve, the next decision is which growth model
actually fits it, because the two most common shapes require very
different math:

- **Linear growth** — load increases by roughly the same absolute
  amount each period. Typical of steady, headcount- or
  account-driven usage: each new sales rep or onboarded customer adds
  a predictable increment.
- **Compounding (exponential) growth** — load increases by roughly
  the same *percentage* each period, so the absolute increment itself
  grows over time. Typical of products with network effects, viral
  referral loops, or a feature that's actively being marketed.

Fitting a linear trend to data that's actually compounding is one of
the most common and most expensive capacity-planning mistakes: the
forecast looks fine for a quarter or two, then the real curve pulls
away from the straight line and capacity runs out faster than
anyone budgeted for. Plot the data first. If month-over-month
*percentage* growth is roughly constant rather than the
absolute increment being constant, you're compounding, and a linear
model will leave you short.

## Forecasts are ranges, not points

No forecast is exact, and treating it as a single number is how
capacity plans fail quietly. A real forecast is a trend line plus an
error band that widens the further out you project — normal
statistical behavior, not a flaw in the method. The discipline this
demands: plan capacity to cover the **upper bound** of that
confidence band at your planning horizon, not the midpoint. If the
midpoint forecast says you'll need 40,000 requests per second by
peak season but the upper bound of a reasonable confidence interval
says 52,000, the number that should drive your scaling decision is
52,000. Planning to the midpoint means you have roughly even odds of
running out of capacity exactly when it matters most.

## Headroom and lead time turn a number into an action

A forecast number is useless until it's translated into a concrete
scaling action with enough lead time to actually happen. Two things
have to layer on top of the raw forecast:

- **Headroom buffer** — a deliberate margin (commonly 20-30% above
  the forecasted peak, scaled to how volatile and business-critical
  the traffic is) that absorbs the forecast being wrong, a
  faster-than-expected growth month, or an unplanned event.
- **Provisioning lead time** — how long it actually takes to turn
  "we need more capacity" into capacity that exists: a cloud quota
  increase request, a reserved-instance or committed-use purchase,
  a database read-replica rollout, or in the slowest case, physical
  hardware procurement for an on-prem footprint. If quota increases
  take three weeks and your forecast horizon is only two, you are
  structurally unable to react in time no matter how accurate the
  forecast is.

Because growth trends shift, a forecast is not a document you write
once a year and file away — it's re-run on a cadence (monthly for
fast-growing or volatile systems, quarterly for stable ones) against
freshly pulled data, so headroom and lead time stay ahead of where
the system actually is, not where it was last time someone looked.

## Key terms

| Term | Meaning |
|---|---|
| Linear growth | Load increases by roughly the same absolute amount each period |
| Compounding growth | Load increases by roughly the same percentage each period, so the absolute increment itself grows |
| Confidence band | The range around a forecast's trend line that widens with distance from the data, reflecting forecast uncertainty |
| Headroom buffer | A deliberate capacity margin added above the forecasted peak to absorb forecast error and unplanned demand |
| Provisioning lead time | How long it actually takes to convert a capacity decision into capacity that exists in production |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
does fitting a linear model to a compounding growth curve produce a
forecast that looks fine at first and then fails badly later, and why
should a capacity plan target the upper bound of a confidence band
rather than its midpoint?
