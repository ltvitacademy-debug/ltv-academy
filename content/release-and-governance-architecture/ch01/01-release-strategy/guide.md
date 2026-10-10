# Lesson 1 — Release Strategy

**Chapter 1 · Release and Governance · Lesson 1 of 16**

## What you'll learn

- What a release strategy is and why it has to exist before any individual change gets scheduled
- The difference between a release strategy and a one-off deployment plan
- The main strategic choices an architect makes: cadence, environment path, and risk tolerance
- Why a release strategy has to absorb Salesforce's own mandatory platform release cycle, not just the org's internal changes
- How a weak or missing release strategy shows up later as rushed, risky deployments

## Why "just deploy when it's ready" doesn't scale

On a small Salesforce team with one admin and a handful of changes a month, releases can happen informally — build it, test it, deploy it. That approach breaks down the moment an org has more than one team touching metadata, more than one type of change (declarative admin work alongside Apex and integrations), or any real consequence to getting a deployment wrong. A **release strategy** is the standing set of decisions an organization makes once, in advance, about how change reaches production — so that every individual release doesn't have to re-litigate the same questions from scratch. It's a policy document and a set of defaults, not a single event.

A release strategy is distinct from a **deployment plan**, which is the specific, one-time plan for getting one particular release out (what's included, who approves it, when it goes). The strategy is the framework that makes writing each deployment plan fast and predictable, because the hard questions — how often do we release, what environments does a change pass through, who has to sign off — were already answered once at the strategy level.

## The core strategic choices

A release strategy has to make a small number of decisions explicit:

- **Cadence.** Does the organization release on a fixed schedule (weekly, biweekly, monthly) or continuously as changes are ready? A fixed cadence is predictable and easier to communicate and staff for; continuous delivery reduces batch size and risk per release but demands more mature automated testing and deployment tooling.
- **Environment path.** What sequence of sandboxes (or orgs) does a change move through before it reaches production, and what has to be true at each stage to proceed to the next? This is covered in depth in Lesson 7.
- **Risk tolerance and gating.** What level of change requires what level of scrutiny? A text-field label change and a new Apex trigger on Opportunity shouldn't go through an identical approval process — a release strategy defines the tiers and what triggers each one.
- **Declarative vs. programmatic treatment.** Because Salesforce lets admins make real, production-affecting changes (new fields, Flow logic, validation rules) without writing or deploying code, a release strategy has to decide early whether declarative changes follow the same change-control path as code, a lighter path, or some hybrid — this choice echoes through the rest of the course, starting in Lesson 4.

## The platform's own cadence is not optional

A Salesforce-specific wrinkle that a generic enterprise release strategy doesn't have to consider: the platform itself ships three mandatory seasonal releases a year (Spring, Summer, and Winter), each of which upgrades every org, sandbox and production alike, on a schedule Salesforce sets, not the customer. An org's internal release strategy has to be built to absorb this external, non-negotiable cadence — testing against the upcoming platform release in a preview window, tracking **Release Updates** that may require action, and never scheduling an org's own major release too close to a seasonal upgrade weekend. Lesson 2 covers this mechanism in detail; the strategic point here is that "how often do we release" always has to be answered as "our own cadence, layered on top of Salesforce's."

## A release strategy is a living document

A release strategy isn't written once and forgotten. It gets revisited when the organization's risk profile changes (a new regulated business unit, a new integration with a sensitive external system), when the team's size or structure changes (new teams means Lesson 8's multi-team problems), or when a retrospective on a failed or risky release reveals a gap the current strategy doesn't cover. Chapter 3 returns to this idea from the documentation side: Lesson 14 covers how a release strategy and the rest of an org's governance decisions should actually be written down and kept current.

## Key terms

| Term | Meaning |
|---|---|
| Release strategy | The organization's standing, in-advance decisions about cadence, environment path, and risk tiers for how change reaches production |
| Deployment plan | The specific, one-time plan for a single release, built quickly because the strategy already answered the hard questions |
| Cadence | How often an organization ships releases — fixed schedule vs. continuous |
| Seasonal release | Salesforce's mandatory, platform-wide upgrade shipped three times a year (Spring, Summer, Winter) |
| Release Update | A specific, trackable platform change (inside a seasonal release) that may require admin review or action before it's enforced |

## Lab

A mid-size Salesforce org has grown from one admin to three admins and two developers over the past year, all still deploying informally — whoever finishes a change pushes it to production when they feel ready. Write a short release strategy (half a page is enough) for this org covering: a cadence choice with a one-sentence justification, at least two risk tiers with an example change in each tier, and one sentence on how declarative admin changes will be treated differently (or not) from Apex changes. There's no single correct answer — the goal is to practice making these decisions explicit rather than leaving them implicit.

## Check yourself

Can you explain, in your own words, the difference between a release strategy and a deployment plan? Can you name the four core decisions a release strategy has to make explicit, and explain why Salesforce's seasonal release cadence has to be accounted for even though the organization doesn't control it?
