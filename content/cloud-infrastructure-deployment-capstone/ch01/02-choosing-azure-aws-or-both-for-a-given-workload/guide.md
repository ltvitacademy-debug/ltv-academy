# Lesson 2 — Choosing Azure, AWS, or Both for a Given Workload

**Chapter 1 · Planning a Real Deployment · Lesson 2 of 32**

## What you'll learn

- The real factors that decide a cloud provider for a given workload — not brand preference
- Why "the platform your team already knows" is a legitimate, often decisive factor, not a cop-out
- The real, honest reasons some organizations run genuinely multi-cloud environments
- How to apply these factors to one specific workload instead of debating providers in the abstract

## There is no universally "better" provider

Azure and AWS both run production workloads for most of the world's largest companies. Neither
one is simply better than the other in the abstract — the question that actually matters, every
time, is which provider fits **this** workload, for **this** team, right now. That question has a
real, defensible answer built from five factors, not a coin flip and not brand loyalty.

## The five real factors

- **Existing team expertise** — if your engineers already know Azure deeply and have zero AWS
  production experience, that's not laziness, it's a real cost factor: ramp-up time, mistakes made
  while learning, and slower incident response on a new platform all have a dollar value.
- **Specific service capabilities** — sometimes one provider has a service the other doesn't match
  well, or offers a tighter integration with something you already run (an existing Microsoft 365
  / Active Directory estate pulls toward Azure; a workload needing a specific AWS-only managed
  service pulls the other way).
- **Compliance and data residency** — some contracts or regulations require data to stay in a
  specific country or region, and not every provider has a region there, or a mature-enough
  compliance certification for that workload's industry.
- **Cost** — not "which is cheaper in general" (that changes constantly and depends on usage
  pattern), but which is cheaper for *this specific* workload's shape of compute, storage, and
  data transfer.
- **Vendor lock-in** — how hard would it be to leave this provider in three years? Some teams
  accept lock-in deliberately in exchange for deeper integration; others design around it on
  purpose. Both are legitimate, as long as the choice is made on purpose.

## A worked example

Say a company has an internal reporting tool, built by a team that's run every other workload on
Azure for five years, touching no regulated data, with a modest and predictable load. Team
expertise alone makes Azure the pragmatic choice — there's no compliance or capability reason to
introduce a second platform and a second set of operational skills for a workload this
straightforward. Now change one detail: the same company acquires a startup whose entire
analytics pipeline already runs on AWS-specific services nobody wants to rebuild. That's a real
reason the combined company now runs both.

## When multi-cloud is a real decision, not a buzzword

Genuine multi-cloud setups usually trace back to one of a few honest reasons: redundancy across
providers for a workload where an outage is unacceptable, picking the single best service for a
specific job even if it means a second provider (best-of-breed), or — very commonly in practice —
inherited infrastructure from a merger or acquisition that nobody has had the time or budget to
consolidate. "Because we can" is not one of those reasons; multi-cloud adds real operational
complexity, so it has to earn its place.

## Key terms

| Term | Meaning |
|---|---|
| Team expertise | Existing staff skill with a platform — a real cost factor, not a soft excuse |
| Data residency | A requirement that data physically stay within a specific country or region |
| Vendor lock-in | How difficult and costly it would be to migrate away from a provider later |
| Best-of-breed | Choosing the strongest individual service for a job, even across providers |

## Check yourself

A workload needs a specific AWS-only managed service your team has never used, but every other
system the company runs is on Azure. Walk through the five factors — which ones pull toward AWS,
and which ones still matter even if AWS wins this decision?
