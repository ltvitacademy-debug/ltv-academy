# Lesson 3 — Golden Paths: Paved Roads Instead of Infinite Choice

**Chapter 1 · Platform Engineering Fundamentals · Lesson 3 of 4**

## What you'll learn

- What a **golden path** (or "paved road") actually is, precisely —
  and the two things it has to be true of to earn that name
- Why unlimited freedom in how teams deploy services doesn't scale into
  ten good decisions, it scales into ten expensive, divergent ones
- The real distinction between a golden path and a mandate: supported
  default versus compulsory rule
- Where good golden paths actually come from, and why security and
  compliance belong baked into the template rather than bolted on after

## What a golden path actually is

A **golden path** — also called a **paved road** — is the first
concrete thing a platform, run as a product, ships: an opinionated,
supported, well-documented default way to build and deploy a service.
"Opinionated" means it makes real decisions for you instead of
presenting a menu of equally-valid options. "Supported" means the
platform team actually maintains it and answers for it when it breaks
— it isn't a script someone wrote once and abandoned. And "well
documented" means a team can follow it without needing a Slack thread
with the platform team just to get started.

Put those together and you get the property that actually matters: a
golden path should be **easy to follow and hard to misuse**. Easy to
follow, because the default path for provisioning a new service, wiring
up its pipeline, and getting it into production is genuinely the path
of least resistance — not technically possible but practically
painful. Hard to misuse, because the guardrails that keep a service
secure and observable are built into the path itself, not left as
optional steps a rushed team can skip.

## What unlimited freedom actually produces at scale

It's tempting to think more autonomy is strictly better — let every
team choose its own tools, its own deployment pattern, its own way of
handling secrets. In a world of one team, that's true. At the scale
this course assumes — many teams, shared security and compliance
obligations, a platform team responsible for all of it — unlimited
freedom doesn't produce ten good, independently-optimal decisions. It
produces ten **snowflake systems**, each a little different, each
requiring its own mental model to operate, each needing its own
security review because none of them can be assumed to work like any
other. The organization pays for that fragmentation in onboarding time,
in incident response (nobody outside the owning team can safely debug
it), and in the platform team's own ability to improve anything, because
"the platform" isn't one thing to improve — it's ten things pretending
to be one.

A golden path is the direct countermeasure: instead of every team
inventing its own answer to "how do I get a service into production
safely," there's one well-supported answer that already accounts for
the organization's real security and compliance requirements.

## Paved road, not a walled garden

The critical distinction this lesson draws is between a golden path
and a mandate. A golden path is the **supported default that remains
the easiest option** — but teams aren't technically blocked from
deviating when they have a real, specific reason to. The difference is
that going off the path means taking on the support burden the platform
was carrying for free: that team now owns its own security review, its
own on-call burden for anything platform-standard tooling would have
handled, its own answer when something breaks in a way the platform
team has never seen. That asymmetry — supported by default, on your
own if you deviate — is what keeps the golden path the path most teams
actually choose, without anyone having to forbid the alternative
outright. It's a paved road, not a walled garden: you can leave it, but
you feel the gravel.

## Where good golden paths come from

Golden paths that actually work are rarely invented from scratch by a
platform team in a vacuum. They're almost always **patterns that
already work well somewhere in the organization**, generalized and
packaged so every other team can reuse them — a deployment setup one
strong team already built well, a CI pipeline structure that's already
survived a real incident, a service template that already has logging,
tracing, and basic security scanning wired in because one team needed
exactly that and did it right. The platform team's job is less "design
the ideal path from theory" and more "find what's already working, and
make it available to everyone else." This is also why baking security
and compliance into the template pays off disproportionately: a service
built on the golden path inherits those controls automatically, instead
of each team re-implementing — or quietly skipping — them on its own.

## Key terms

| Term | Meaning |
|---|---|
| Golden path / paved road | An opinionated, supported, documented default way to build and deploy a service — easy to follow, hard to misuse |
| Snowflake system | A one-off, team-specific setup that diverges from any shared standard, expensive to secure and support in isolation |
| Paved road, not walled garden | Teams can deviate from the golden path for a real reason, but take on the support burden the platform was carrying for free |
| Baked-in guardrails | Security and compliance controls built into the golden path template itself, inherited automatically rather than re-implemented per team |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what
two properties does a path need before it earns the name "golden
path," and why does deviating from it cost a team more than just
"doing things differently" — what support, specifically, do they give
up?
