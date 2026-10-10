# Lesson 7 — Enterprise Deployment Planning

**Chapter 2 · Enterprise Deployment · Lesson 7 of 16**

## What you'll learn

- What an environment path is and why it exists as a sequence, not a single step
- How to design an environment strategy using the Salesforce sandbox types available
- What a release calendar is and how it accounts for both internal and platform-driven events
- The role of a go/no-go checkpoint before a deployment proceeds
- How enterprise-scale planning differs from a single admin pushing one change

## The environment path

An **environment path** is the sequence of orgs a change moves through, in order, before it reaches production — each stage designed to catch a different class of problem before it's expensive. A typical enterprise Salesforce environment path looks something like: a developer sandbox (or scratch org) for individual build work, an integration or QA sandbox where multiple developers' work is combined and tested together, a UAT (user acceptance testing) sandbox where actual business users validate the change against real workflows, and finally production. Each stage exists because catching a problem there is cheaper than catching it at the next stage — a bug found in a developer sandbox costs minutes; the same bug found after it reaches production, already acting on real customer data, can cost days and real business harm.

## Choosing sandbox types for the path

Salesforce offers several sandbox types with meaningfully different capabilities, and an environment strategy has to assign the right type to each stage rather than defaulting to whatever's cheapest or easiest:

- **Developer sandboxes** copy an org's metadata but only a small amount of sample data, refresh quickly (as often as once a day), and suit individual development work where realistic data volume doesn't matter.
- **Developer Pro sandboxes** work similarly but allow more sample data, suiting slightly larger team development or integration testing where a developer sandbox's data limit is too tight.
- **Partial Copy sandboxes** include a defined, templated subset of actual production data alongside all metadata, refresh on a multi-day cycle, and suit QA or UAT work where realistic (if not complete) data matters.
- **Full sandboxes** are a complete copy of production — all data, all metadata — refresh on a longer cycle (weeks), and suit final UAT, performance testing, or any validation where the test has to reflect production exactly.

The longer refresh cycle on Partial Copy and Full sandboxes is a real planning constraint: if a team needs current production data for a test and the sandbox was last refreshed weeks ago, that's a scheduling dependency a deployment plan has to account for, not discover the week of the release.

## Building the release calendar

A **release calendar** lays out, in advance, every scheduled internal release alongside every external, non-negotiable event that could interact with it — most importantly Salesforce's own seasonal release weekends and sandbox preview windows from Lesson 2. A mature release calendar marks change-freeze periods around seasonal upgrades, blocks out known high-traffic business periods (end-of-quarter for a sales org, a retail org's holiday season) where no team wants to be deploying risky changes regardless of platform events, and gives every team visibility into what else is landing near their own release, so Lesson 8's multi-team conflicts get caught on the calendar instead of in production.

## The go/no-go checkpoint

Before a change actually proceeds from one environment stage to the next — and especially before the final move into production — enterprise deployment planning includes an explicit **go/no-go checkpoint**: a deliberate decision point where the people accountable for the release (often informed by the CAB from Lesson 5) confirm that every precondition is actually met — testing is complete and passed, the rollback plan from Lesson 6 is ready, the right people are available during the deployment window — before saying yes. The value of making this an explicit, named step is that it forces a conscious decision rather than letting a deployment proceed by inertia just because it was already scheduled.

## Enterprise scale changes the planning problem

A single admin making one change can hold the whole environment path in their head. At enterprise scale — multiple teams, multiple concurrent changes, dependencies between them — the planning problem becomes coordinating many moving pieces against a shared calendar and a shared set of environments, which is exactly the subject Lesson 8 picks up next.

## Key terms

| Term | Meaning |
|---|---|
| Environment path | The sequence of orgs (sandbox types, then production) a change moves through, each stage catching a different class of problem |
| Release calendar | The advance schedule of internal releases alongside external, non-negotiable events like seasonal upgrades |
| Go/no-go checkpoint | An explicit decision point confirming every precondition is met before a deployment proceeds |

## Lab

Design an environment path for a mid-size Salesforce org building a new integration with an external billing system. Specify which sandbox type you'd use at each stage (individual development, combined integration testing, business user UAT) and justify each choice against this lesson's description of what each sandbox type actually offers. Then list three items that should be on the go/no-go checklist before this integration moves to production.

## Check yourself

Can you name the typical stages of an environment path and explain what each stage is meant to catch? Can you describe the practical difference between a Partial Copy and a Full sandbox, including their refresh-cycle implications for planning? Can you explain what a go/no-go checkpoint is for and why it needs to be an explicit, named step rather than an implicit assumption?
