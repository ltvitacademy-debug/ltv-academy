# Lesson 26 — Setting an SLO That the Business Actually Agrees With

**Chapter 7 · Site Reliability Engineering Fundamentals · Lesson 2 of 4**

## What you'll learn

- Why picking an SLO number is a negotiation, not a calculation
- How to use real, current performance as the starting point instead
  of guessing at a target from scratch
- Why you don't write one SLO for an entire service — you write one
  per user journey that actually matters
- How to run the conversation with product and business stakeholders
  so the SLO survives contact with the next incident

## An SLO is a negotiation, not a formula

The math in the last lesson — SLI, SLO, error budget — is simple once
the target exists. The hard part is picking the target in the first
place, and that's not an engineering decision made in isolation. Set
it too loose, and the service feels unreliable to users while
engineering coasts on a budget it never has to defend. Set it too
tight — reflexively reaching for "five nines" because it sounds
serious — and you've handed engineering an error budget so small that
shipping anything new becomes terrifying, for reliability gains most
users will never notice. The right SLO sits at the point where
*further* reliability stops being worth what it costs to get there.
Finding that point is a conversation, and it belongs to engineering
*and* the business together, not to either one alone.

## Start from what the service already does

Never invent an SLO target out of thin air before measuring anything.
The first real step is pulling actual historical data on the SLI
you're about to set a target for — 90 days of real latency and
availability numbers, if you have them. Two things usually fall out of
that exercise immediately: first, you often discover the service is
already running close to some natural ceiling (maybe 99.95%
availability), which tells you a target above that is either
unrealistic given the current architecture, or will require real
investment to reach. Second, the *users themselves* give you the other
half of the picture — if nobody has complained about reliability at
the level you're already delivering, that's a strong signal the
current level is close to "enough," and chasing further nines may be
solving a problem nobody has.

## One SLO per user journey, not one for the whole service

A common mistake is writing a single SLO for an entire system. Real
services have multiple user journeys with very different reliability
expectations. Consider an e-commerce platform, as an illustrative
example: a user *browsing* a product catalog tolerates a slow page far
more easily than a user in the middle of *checkout*, where a failure
means lost revenue and a frustrated customer mid-payment. That
difference means browse and checkout deserve separate SLOs — checkout
might reasonably target 99.95% with a tight latency bound, while
browse might sit at 99.9% with more latency tolerance. Writing one
blended number for "the platform" hides exactly the distinction that
matters for where engineering effort should go.

## The conversation that makes the number stick

An SLO that engineering sets unilaterally and announces to the
business tends not to survive the first serious incident — because
nobody outside engineering agreed to it, nobody feels ownership of it,
and it gets renegotiated under pressure instead of calmly. The
conversation that actually works, illustrated here rather than quoted
from any real meeting, runs roughly like this:

- **Engineering brings data, not an opinion.** "Over the last quarter
  checkout succeeded 99.94% of the time. Getting to 99.99% means
  roughly 4x the on-call load and a six-week project on retry logic.
  What's that worth to the business?"
- **The business brings the actual stakes.** "A checkout outage during
  a flash sale costs real revenue and shows up in support tickets
  immediately; a browse slowdown mostly doesn't get noticed." That's
  the input engineering can't generate on its own — only the business
  side knows what a specific failure actually costs downstream.
- **They land on a number together, with an owner.** The SLO gets
  written down with its target, its window, which SLI it's measured
  against, and who signs off if it needs to change — typically an
  engineering lead and a product or business sponsor, together.

## Review it on a cadence, not never

An SLO set once and never revisited drifts out of relevance as the
service, its traffic, and the business's priorities change. Put it on
a quarterly or semiannual review: look at whether the error budget has
been comfortably unspent (a sign the target might be too loose, or
engineering is sandbagging) or chronically exhausted (a sign the
target may be unrealistic for the current architecture, or that real
investment in reliability is overdue). Either outcome is useful
information — the point of the review isn't to defend the original
number, it's to keep the number honest.

## Key terms

| Term | Meaning |
|---|---|
| Baseline | A service's actual historical SLI performance, used as the honest starting point for setting a target instead of guessing |
| User journey | A distinct flow through a product (e.g. browse vs. checkout) that may warrant its own SLO rather than one blended target |
| SLO owner / sponsor | The named engineering lead and business stakeholder who jointly agreed to an SLO and who must jointly agree to change it |
| SLO review cadence | A recurring (quarterly/semiannual) check of whether the error budget is being spent as expected, to catch a target that's gone stale |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
would a single checkout-and-browse e-commerce platform want two
separate SLOs instead of one, and what's the risk of an engineering
team picking an SLO number without the business in the room?
