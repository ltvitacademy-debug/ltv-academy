# Lesson 1 — The Ask Becomes a Mandate: A Company-Wide Platform Review

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 1 of 26**

## What you'll learn

- Why a successful small project often leads to a much bigger mandate, not a pat on the back
- Who **Casey Lindqvist** (VP of Engineering) and **Dana Whitfield** (the new CTO) are, and why
  they're the sponsors of this next phase
- What a **company-wide platform review** actually produces, as a document
- Why "it worked for one app" is not the same claim as "it will work at scale," and why
  leadership is right to ask the difference be proven before the business bets on it

## Six months after the intermediate project

You're **Theo Bryant**. Six months ago you were a newly hired Cloud Engineer who migrated
Driftwood Outdoor Apparel's product-catalog app to Azure. Since then you containerized that app,
wrote the Terraform for it, stood up a CI/CD pipeline, added AWS as a backup target, and caught a
scaling misconfiguration and an open storage bucket before either one became a real incident. That
work got noticed. You're now a **Cloud Engineer on the Cloud Architect track** — still hands-on,
but increasingly the person in the room when the company decides how its infrastructure should
work, not just whether last week's deploy succeeded.

Driftwood has grown with it. The single containerized app you built is now one of a dozen services
engineering ships changes to every week, each one still running the way it was first stood up —
some on single VMs, some in ad hoc container setups, none of it coordinated. The company also just
hired its first CTO, **Dana Whitfield**, specifically to professionalize engineering ahead of a
much bigger holiday sale than Driftwood has ever run. Dana's first move is a **company-wide
platform review**, co-sponsored with **Casey Lindqvist**, the VP of Engineering you've been
reporting progress to since the first migration.

## What the review actually finds

Casey and Dana spend three weeks interviewing every team that owns a service, and the review comes
back with a short, blunt list:

- **No shared platform.** Every team's infrastructure is a one-off. There's no common way to
  deploy, scale, or monitor a service — each one is a fresh decision.
- **No real answer to "what will this cost us at 10x traffic."** Driftwood's biggest sale of the
  year is coming, and nobody can currently produce a credible capacity or cost forecast for it.
- **No shared visibility.** When something goes wrong, every team checks its own dashboard — if it
  has one — and there's no single place that shows the whole platform's health or spend.

The review's recommendation is the mandate you're about to own: migrate the company's
containerized services onto **Kubernetes at real scale**, across **both clouds** the company
already uses, with a shared **FinOps dashboard** that gives leadership one honest picture of cost
and capacity — and prove all of it under real load, during the actual sale, not in a tabletop
exercise.

## Why "it worked once" doesn't satisfy this review

It would be reasonable to point at the intermediate project and say "we already proved this
pattern works." Dana's pushback, delivered directly in the kickoff meeting, is the thesis of this
entire capstone:

> "One app, on one node, surviving one deploy is not the same claim as a dozen services, scaled out
> under real holiday traffic, staying inside budget. I need the second claim proven, not assumed
> from the first."

That distinction — a working pilot versus a platform that holds up at scale, under load, with
real money on the line — is exactly what separates this capstone from the ones before it. Nothing
here is about learning Kubernetes syntax for its own sake; it's about building a platform real
enough that its first true stress test is the biggest sale in company history, and being honest
about what you find when it is.

## What's not decided yet

This lesson is the mandate landing, not the plan. You don't yet know:

- Which services move to Kubernetes first, and which (if any) don't move at all
- Which cloud is primary and which is the backup — that's a real architectural decision, not an
  assumption
- What the FinOps dashboard actually measures, and at what level of granularity

All three are Lesson 2 and Lesson 3's job. This lesson's job is narrower: understand *why* the ask
grew from "fix your one app" into "build the platform," and who's now holding you accountable for
the answer.

## Key terms

| Term | Meaning |
|---|---|
| Platform review | A leadership-sponsored audit of how infrastructure is actually built and run across every team, used to justify a larger mandate |
| Mandate | Leadership-approved authority and expectation to do a specific, larger piece of work — stronger than a request, with named sponsors accountable for the outcome |
| FinOps dashboard | A shared view of cloud cost and capacity, built so cost conversations use the same numbers engineering uses for capacity conversations |
| Sponsor | A leader who has staked their own credibility on a project's outcome, and who expects to be kept honestly informed of it |

## Lab

1. Write a two-paragraph summary of the platform review's three findings (no shared platform, no
   cost/capacity forecast, no shared visibility) in your own words, as if you were explaining it to
   a teammate who missed the kickoff meeting.
2. Write one sentence distinguishing "a pattern that worked for one app" from "a platform proven at
   scale, under real load, on budget." You'll need this distinction again by Lesson 9.

## Check yourself

You're ready for Lesson 2 when you can name Casey Lindqvist's and Dana Whitfield's roles from
memory, state the platform review's three findings, and explain — without looking — why Dana
considers the intermediate project's success insufficient evidence that the bigger platform will
hold up.
