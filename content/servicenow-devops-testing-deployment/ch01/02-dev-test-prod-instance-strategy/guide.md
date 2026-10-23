# Lesson 2 — Dev/Test/Prod Instance Strategy

**Chapter 1 · Application Lifecycle Management · Lesson 2 of 26**

## What you'll learn

- A quick recap of the three-tier instance pattern from earlier in this path
- Why some organizations add a dedicated Build instance between Dev and Test
- How and why sub-production instances get refreshed from Production
- Why that refresh is exactly where data anonymization becomes operationally necessary

## A quick recap — then going deeper

Platform Fundamentals' instances-and-environments lesson already introduced the basic pattern:
Development, Test/QA, and Production, with changes promoted between them deliberately rather than
copied silently. That's the right starting mental model, but real organizations running real
applications at scale typically build more structure around it than just three boxes.

## Adding a dedicated Build instance

A common refinement is a **Build** instance (sometimes called an integration or construction
instance) sitting between Dev and Test. Individual developers do their day-to-day work in Dev,
where half-finished changes and experiments are normal and expected. Before anything is considered
ready for formal Test/QA validation, it's first promoted to Build, where multiple developers'
changes are merged and run together — catching integration problems (two developers touching the
same table in conflicting ways, for example) in an environment dedicated to exactly that, before
Test/QA testers ever see it. This isolates "does this work at all, together" from "does this work
correctly, for a real business tester," which are genuinely different questions deserving
genuinely different environments.

## Sub-production instances don't stay static — they get refreshed

Over time, a Dev or Test instance's data and configuration drift away from what Production
actually looks like — new fields, new records, new real-world edge cases pile up in Production
that Dev was never updated to reflect. The standard fix is a periodic **clone refresh**: at a
regular interval (quarterly is common), the organization clones Production's data into its
sub-production instances, so developers and testers are working against something that actually
resembles current reality, not a stale snapshot from months or years ago.

## Why anonymization becomes operationally critical right here

A clone refresh copies *everything* from Production — including every real customer's real name,
email address, and other personal data. That's exactly the scenario the Security & Access Controls
course's data anonymization lesson was built for: a dev or test instance has no legitimate business
need to hold real customer PII, and simply cloning it there anyway multiplies the number of people
and systems with access to it, with no real benefit. A disciplined refresh process applies
anonymization immediately after the clone lands, before any developer or tester ever opens the
instance — turning "we happened to copy real PII into Dev" into "Dev never actually held real PII
at all, by design."

## Key terms

| Term | Meaning |
|---|---|
| Build instance | An integration-testing instance between Dev and Test where multiple developers' changes are merged and run together |
| Sub-production instance | Any non-Production instance — Dev, Build, Test/QA, UAT — used for building and validating work |
| Clone refresh | Periodically copying Production's data into sub-production instances to keep them realistic |
| Anonymization at refresh | Applying permanent, irreversible PII replacement immediately after a clone lands, before anyone opens the instance |

## Check yourself

Without looking back: what specific problem does a dedicated Build instance solve that Dev alone
can't, and why does a quarterly clone refresh from Production create an operational requirement for
data anonymization, rather than anonymization just being a nice-to-have?
