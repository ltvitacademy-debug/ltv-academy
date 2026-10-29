# Lesson 26 — Measuring Developer Experience, Not Just System Uptime

**Chapter 7 · Platform Observability and Developer Experience · Lesson 2 of 4**

## What you'll learn

- Why the DORA metrics from Lesson 25, on their own, can't tell you
  whether developers actually enjoy using your platform
- The SPACE framework — a real, published model for developer
  productivity that goes beyond a single activity number
- Concrete, measurable developer-experience signals: satisfaction
  surveys, time-to-first-deploy for a new hire, and cognitive load
- Why optimizing a single activity metric (like commit count) in
  isolation reliably backfires, and what to measure instead

## Delivery performance isn't the same thing as developer experience

The DORA metrics tell you how fast and how safely code moves through
your pipeline. They say nothing about whether the people generating
that code can stand their day-to-day work. A platform can post great
DORA numbers while developers quietly hate using it — maybe the
golden path from Chapter 1 works, but only if you follow it exactly;
step outside it and you're fighting the platform for a week. Platform
teams that only watch system-level metrics miss this entirely, because
nothing about deployment frequency or lead time captures how it
*felt* to get there.

## The SPACE framework

In 2021, researchers from Microsoft Research and GitHub — Nicole
Forsgren, Margaret-Anne Storey, and colleagues — published "The SPACE
of Developer Productivity," arguing that developer productivity can't
be reduced to one number and proposing five dimensions instead:

- **Satisfaction and well-being** — how fulfilled developers are with
  their work, tools, and team; whether they're burning out
- **Performance** — the outcome of the work (quality, reliability of
  what ships) rather than the activity that produced it
- **Activity** — counts of actions: commits, pull requests, deploys
- **Communication and collaboration** — how effectively people find
  information, review each other's work, and stay unblocked
- **Efficiency and flow** — how much a developer can work without
  interruptions, handoffs, or waiting on someone else

The point of SPACE isn't to track all five dimensions with equal
weight everywhere — it's that no single dimension, especially Activity
on its own, tells you anything trustworthy. A team with high commit
counts and low satisfaction is not a healthy team; SPACE is the model
that forces you to look at more than one axis before drawing that
conclusion.

## Three concrete signals worth actually collecting

**Survey-based satisfaction.** A short, recurring pulse survey — a
handful of questions, run quarterly or even monthly, often including
an eNPS-style ("would you recommend this platform to a colleague")
question — is the most direct way to capture the Satisfaction
dimension. It's qualitative data treated with the same rigor as a
metric: tracked over time, segmented by team, and watched for trend,
not just a single snapshot.

**Time-to-first-deploy.** How long does it take a brand-new engineer,
from their first day, to ship a real change to production? This one
metric compresses an enormous amount of platform quality into a
single number: onboarding docs, local dev setup, the golden path
templates from Chapter 1, CI pipeline reliability, and how much
tribal knowledge is required that isn't written down anywhere.

**Cognitive load.** How many distinct systems, dashboards, and
context switches does a developer have to hold in their head to ship
one ordinary change? This is harder to reduce to a single clean
number, but it's measurable indirectly — count the systems a new
golden path template requires touching, or ask directly in the pulse
survey ("how many different tools did you need to use to deploy this
week?").

## Why activity-only metrics backfire

If you measure developers purely on commit count or pull-request
volume, you'll get more commits and more pull requests — and little
else. People optimize for what's measured, not for what you actually
wanted, which is the classic failure mode this chapter keeps coming
back to. Activity metrics are useful as one input inside SPACE, next
to Performance and Satisfaction, but dangerous as a target on their
own.

## Key terms

| Term | Meaning |
|---|---|
| SPACE framework | A five-dimension model (Satisfaction, Performance, Activity, Communication, Efficiency) for developer productivity, published by Forsgren, Storey, and colleagues |
| Pulse survey | A short, recurring survey capturing satisfaction and well-being as structured, trackable data rather than anecdote |
| Time-to-first-deploy | How long a new engineer takes to ship their first real change to production; a compressed signal of onboarding and golden-path quality |
| Cognitive load | The number of systems, tools, and context switches a developer must juggle to complete ordinary platform work |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: name
the five SPACE dimensions, and explain why a team with a high Activity
score and a low Satisfaction score should worry a platform team more
than a dashboard full of green DORA numbers would suggest.
