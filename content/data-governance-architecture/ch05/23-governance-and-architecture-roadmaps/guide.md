# Lesson 23 — Governance and Architecture Roadmaps

**Chapter 5 · Governance Strategy · Lesson 23 of 30**

## What you'll learn

- How a roadmap differs from the strategy it comes from, and why skipping straight to a roadmap usually fails
- A simple horizon structure (Now / Next / Later) for sequencing governance and architecture work
- How to tell a "quick win" from a "foundational investment," and why a roadmap needs both
- The dependency-mapping step most roadmaps skip, and what happens when they do

## From strategy to sequence

Lesson 22 established what a governance strategy has to answer: where you are, where you're going, what's first, and how it's funded. A roadmap is where "what's first" becomes a real, time-ordered sequence of initiatives that people can actually plan against — sprints, quarters, or budget cycles, not just a priority list.

A roadmap without a strategy behind it is just a backlog with dates attached. The strategy supplies the *why* (the business outcome being pursued) and the *what* (the priorities); the roadmap supplies the *when* and the *in what order*.

## A simple horizon structure: Now, Next, Later

Most governance roadmaps work best with three honest horizons rather than a dozen precisely-dated milestones that will inevitably slip:

- **Now (this quarter or two).** Work that is funded, staffed, and starting immediately — typically the foundational pieces everything else depends on, like naming data owners for the first in-scope domain or standing up the review board from Lesson 26.
- **Next (roughly two to four quarters out).** Work that is planned and sequenced but not yet started — often where catalog rollout, policy-as-code enforcement, or a second domain's onboarding lands.
- **Later (beyond that).** Directionally agreed but intentionally not detailed yet, because detailing it now would just mean redoing the plan when circumstances change.

## Quick wins versus foundational investments

A roadmap that's all foundational work loses executive patience before it shows value. A roadmap that's all quick wins never builds the underlying capability the strategy actually needs. Real roadmaps deliberately carry both:

- **Quick wins** — visible, valuable, achievable in weeks: publishing the first catalog entries for one high-visibility dataset, resolving one well-known "whose number is right" conflict.
- **Foundational investments** — slower, less visible, but what everything else depends on: the operating model decision from Chapter 2, the metadata architecture from Chapter 3, the access control architecture from Chapter 4.

## The dependency step most roadmaps skip

Before sequencing initiatives on a timeline, map what each one actually depends on. A catalog rollout depends on the metadata architecture being settled first (Lesson 12). A policy-as-code rollout depends on the access control architecture already being defined (Lesson 18). Skipping this step produces roadmaps where initiative three starts on schedule and immediately stalls because initiative one, which it silently depended on, isn't actually done.

## Key terms

| Term | Meaning |
|---|---|
| Roadmap | A time-ordered sequence of initiatives that turns a strategy's priorities into a plan people can staff and budget against |
| Horizon (Now / Next / Later) | A deliberately coarse time structure that avoids over-committing to dates far in the future |
| Quick win | A fast, visible initiative that builds momentum and trust early in a program |
| Foundational investment | Slower, less visible work that later initiatives depend on |
| Dependency mapping | Identifying what each roadmap initiative actually requires to already exist before it can start |

## Lab

Take the one-page strategy brief you wrote in Lesson 22's lab (or sketch a quick one now) and turn its "what's first" priorities into a Now / Next / Later roadmap. For each item, note one real dependency — something from an earlier chapter of this course — that has to be in place before it can start.

## Check yourself

Can you explain, in your own words, the difference between a quick win and a foundational investment, and why a roadmap that's missing dependency mapping tends to stall partway through?
