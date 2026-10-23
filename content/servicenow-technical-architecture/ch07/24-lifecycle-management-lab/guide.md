# Lesson 24 — Lifecycle Management Lab

**Chapter 7 · Platform Lifecycle & Release Management · Lesson 24 of 32**

## What you'll learn

- How to apply upgrade triage, release governance, and technical debt prioritization together on one realistic scenario
- How to identify an organization's highest-risk customization and justify why it gets tested first
- How to negotiate a release freeze window across teams who don't share a cadence
- How to write the kind of decision memo a technical architect would actually produce for this situation

## The scenario

A ServiceNow platform upgrade is scheduled four months from today. You are the technical architect responsible for getting the instance through it cleanly. The instance supports three delivery teams:

- **Team Facilities** ships weekly. They own a small, low-usage scoped application for room-booking requests.
- **Team Fulfillment** owns `x_abc_order_mgmt`, a heavily-used scoped application that every fulfillment agent touches dozens of times a day, processing several thousand records weekly. It relies on a GlideRecord query pattern against a platform API that ServiceNow's release notes for the upcoming version flag as deprecated, with removal planned for a release after next. Team Fulfillment currently ships quarterly.
- **Team Partner Integrations** ships whenever their external logistics partner changes its API, which is unpredictable — sometimes twice a month, sometimes not for a quarter.

You have four months. Walk through the decisions in order.

## Step 1 — Identify the highest-risk customization

Three real criteria from this chapter apply here. Usage volume: `x_abc_order_mgmt` is touched constantly, by far the most heavily used of the three. Deprecated-dependency risk: it relies on an API already flagged for removal, which is exactly the Lesson 23 technical-debt pattern — a shortcut (or at least an aging dependency) that gets riskier with every release it survives. Blast radius: if it breaks, fulfillment operations stop, which is a direct business-operations impact, not a minor inconvenience.

Team Facilities' room-booking app and Team Partner Integrations' connector are both lower-usage and lower-blast-radius by comparison — not risk-free, but clearly not where testing bandwidth should go first. The decision: `x_abc_order_mgmt` is this organization's highest-risk customization heading into the upgrade, for the exact reason Lesson 23 described — a deprecated-API dependency compounding a high-usage, high-blast-radius surface.

## Step 2 — Prioritize pre-upgrade sandbox testing

Following Lesson 21's triage approach, `x_abc_order_mgmt` goes into the high-risk tier and gets tested first, as soon as the pre-upgrade sandbox is available — ideally with existing ATF coverage run against it, plus manual regression testing focused specifically on the code paths touching the deprecated API. The goal of testing it first, rather than last, is simple: if it reveals a real blocker, there's maximum runway left to fix it before the upgrade date. Finding that blocker in the final week would leave no time to respond.

Team Facilities' booking app goes into the low-risk tier and gets a lighter spot-check later in the cycle. Team Partner Integrations' connector gets evaluated case by case — if their API hasn't changed recently, a moderate-effort check is enough; if it has, it moves toward the higher-risk tier for this cycle specifically.

## Step 3 — Negotiate the release freeze window

Following Lesson 22's release governance approach, the architect doesn't unilaterally impose a freeze. Instead: propose a two-week change freeze window immediately before the upgrade's final go/no-go decision, publish it on the shared release calendar as soon as the four-month window opens (not two weeks before), and meet individually with each team about what the freeze actually costs them.

Team Facilities' weekly cadence pauses for two weeks — low cost, since their changes are low-risk and easy to reschedule. Team Fulfillment's quarterly release gets scheduled to land several weeks *before* the freeze window specifically, so their batched changes don't compete with upgrade validation for the same testing bandwidth — this is a release-calendar decision made months in advance, not a freeze exception negotiated at the last minute. Team Partner Integrations gets an agreement that any partner-driven emergency change during the freeze goes through an expedited, documented critical-fix path rather than a full release — because an external partner's API change isn't something this organization controls the timing of.

## Step 4 — Communicate on a real timeline

Per Lesson 21: at month four (now), stakeholders across all three teams and the business owners of `x_abc_order_mgmt` get the upgrade date, the freeze window dates, and the rationale for why that application is the testing priority. At month one, the sandbox is upgraded and Team Fulfillment's testing begins. In the final two weeks, the freeze is active, the lighter-tier spot-checks wrap up, and a named go/no-go decision gets documented with Team Fulfillment's test results as the primary evidence.

## The outcome

No team's cadence gets silently steamrolled. The highest-risk customization gets the testing attention its deprecated-API dependency and usage volume actually warrant. The freeze window is negotiated and scheduled months ahead, not discovered the week it starts. That's what turns Lessons 21 through 23 from three separate concepts into one coherent lifecycle management decision.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | How many people or processes are affected if a given customization breaks |
| High-risk tier | Customizations prioritized for thorough pre-upgrade testing due to usage volume and dependency risk |
| Negotiated freeze window | A release-pause period scheduled with input from every affected team, not imposed unilaterally |
| Decision memo | The documented rationale an architect produces to justify testing priority and freeze timing |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why does `x_abc_order_mgmt` get tested first in this scenario, and why does Team Fulfillment's quarterly release get scheduled *before* the freeze window rather than simply paused during it?
