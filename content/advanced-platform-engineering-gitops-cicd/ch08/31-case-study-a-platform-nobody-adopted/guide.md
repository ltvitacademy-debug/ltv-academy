# Lesson 31 — Case Study: A Platform Nobody Adopted

**Chapter 8 · Capstone: Building an Internal Developer Platform · Lesson 31 of 32**

## What you'll learn

- A realistic, illustrative scenario — not a real company — of a platform engineering team
  that built a technically excellent internal developer platform that almost nobody used
- How to recognize the three specific failures behind it: no feedback loop with the teams it
  was built for, adoption forced by mandate instead of earned, and a golden path that didn't
  actually match how real teams worked
- Why this is the direct, practical payoff of Chapter 1's "platform as a product" framing,
  not a new idea bolted on at the end of the course
- What a platform team would actually do differently, step by step, to recover from this

## The scenario

The following is an illustrative, fictional scenario, built to make a real and common failure
pattern concrete — not an account of any actual company or team.

**Northfield Retail**'s platform team spent two quarters building exactly what this course has
taught: a Backstage-style catalog, a golden-path scaffolder template with CI/CD and monitoring
pre-wired, GitOps-driven deploys through ArgoCD, and canary rollouts with automated rollback.
By every technical measure, it worked. The demo was clean. The architecture review praised it.
Six months after launch, fewer than 15% of the company's services had been onboarded onto it,
and most of those were onboarded because a director told the owning team to.

## Failure 1: no feedback loop

The platform team built the entire thing in isolation, based on what they believed developers
needed — a reasonable guess, assembled from their own experience running infrastructure, with
no structured input from the application teams who would actually use it. They never ran the
kind of developer-experience survey Chapter 7 covers, never looked at deployment frequency or
lead time for the teams they were targeting before building for them, and never sat an actual
application engineer down in front of the scaffolder before launch day. The first real feedback
the platform team got arrived six months late, as low adoption — the slowest, most expensive
signal available, and the one Chapter 7's instrumentation exists specifically to get ahead of.

## Failure 2: adoption by mandate, not by earning it

When onboarding stayed low after launch, platform leadership escalated — not by asking why, but
by asking a VP to require it. A few teams complied on paper, pointing their `catalog-info.yaml`
at the new system while quietly keeping their old deploy scripts running underneath, because the
mandate covered *registering* a service, not actually *using* the golden path day to day.
Mandated adoption measures compliance, not value. It produces a catalog that looks populated and
a platform that is, in practice, still mostly unused — the two numbers Chapter 1's "measuring
whether a platform is actually helping" lesson explicitly warned would diverge if adoption were
ever forced rather than chosen.

## Failure 3: a golden path that didn't match real work

The golden path itself turned out to be the deepest problem. It was designed around the stateless
Node.js services the platform team's own infrastructure background made comfortable — clean
fits for a scaffolder template, a standard pipeline, and a canary rollout. But a meaningful share
of Northfield's actual services were long-running batch jobs and a couple of services with
unusual compliance-driven deploy approval steps that didn't resemble any of that. For those
teams, the "self-service" path meant fighting a template that assumed the wrong shape of
service, then filing a ticket anyway — strictly worse than the ad hoc process it was supposed to
replace. A paved road that doesn't go where a team actually needs to drive isn't a shortcut.

## What actually would have prevented this

None of these three failures required new technology to fix — they required treating the
platform as a product from the start, the way Chapter 1 framed it:

- Interview a representative slice of the actual teams — including the batch-job and
  compliance-constrained ones, not just the easy stateless services — *before* building the
  first golden path, the way a product team would scope real user needs before shipping.
- Instrument the platform itself from day one, as Chapter 7 describes, so low early adoption
  shows up as a trend in week three, not as a surprising number in month six.
- Earn adoption with a golden path that's measurably faster and safer than the status quo for
  the teams it targets, and treat a mandate as a last resort that papers over a problem rather
  than a first lever that solves one.
- Treat teams whose services don't fit the first golden path as a signal to build a second
  template, not as teams to pressure into a bad fit.

## Key terms

| Term | Meaning |
|---|---|
| Feedback loop | Structured, ongoing input from the platform's actual users, gathered before and after launch — not inferred from adoption numbers alone |
| Mandated adoption | Onboarding driven by a top-down requirement rather than a team choosing the platform because it's genuinely better |
| Golden path mismatch | A paved road built around one team's assumptions about "typical" work, that doesn't fit how other real teams actually operate |
| Platform as a product | Chapter 1's framing: developers are the platform's customers, and adoption has to be earned, not assumed |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: which of Northfield's three
failures would Chapter 7's platform instrumentation have caught earliest, and why does a
mandate that increases catalog registrations not actually prove the platform is helping
anyone?
