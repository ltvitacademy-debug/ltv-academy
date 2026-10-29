# Lesson 31 — Case Study: A Multi-Cloud Strategy That Cost More Than It Saved

**Chapter 8 · Capstone: Designing a Hybrid/Multi-Cloud Architecture · Lesson 31 of 32**

## What you'll learn

- A realistic, clearly fictional scenario illustrating Chapter 2's warning: multi-cloud taken on
  as a blanket policy, rather than a decision tied to a specific workload need, tends to cost more
  than it saves
- Where the real costs actually accumulated — not in any single bad decision, but across
  duplicated tooling, duplicated skills, and egress fees that nobody had budgeted for
- Why "avoid vendor lock-in" sounds like risk management but, applied without discipline, is itself
  a source of risk and cost
- What a narrower, workload-by-workload multi-cloud decision would have looked like instead

## This is an illustrative scenario, not a real company

Brennick Retail Holdings is a fictional mid-size retail chain used here to walk through a pattern
this course has already named in Chapter 2 — it is not a real organization, and nothing in this
case study describes an actual reported incident. It's a composite of the kind of multi-cloud
outcome Lessons 7 and 8 warned about, written out as a story so the mechanism is easier to see than
a bullet list of risks.

## The decision: multi-cloud as a blanket policy

Three years ago, Brennick's new VP of Infrastructure arrived with a strong, simply-stated
conviction: "we will never be locked into one cloud provider." The policy that followed wasn't
scoped to any particular workload or any particular risk — it was architectural law, applied
everywhere, all at once: every new system, regardless of what it did, had to be designed to run on
both Azure and AWS, and ideally deployed to both simultaneously "for resilience." No cost model
backed the decision up front. It was adopted as a principle, the way a company might adopt a
security policy, not evaluated as a tradeoff the way Lesson 8 recommends.

## Where the cost actually accumulated

None of what follows was one bad decision. It was four ordinary ones, each individually
defensible, that compounded.

**Duplicated tooling.** Every platform team now maintained two of everything: Azure Monitor and
CloudWatch, Azure Policy and AWS Config, two separate CI/CD deployment targets for pipelines that
used to ship to one. None of these tools shared a learning curve — a dashboard built in Azure
Monitor didn't transfer to CloudWatch, so each one had to be built, and then maintained, twice.

**Duplicated skills.** Hiring and training followed the same pattern. Brennick's infrastructure
team grew not because the workload grew, but because every open role effectively needed to be
two roles — an engineer comfortable in Azure's IAM model and one comfortable in AWS's, because the
"avoid lock-in" policy meant nobody could specialize in just one cloud's way of doing identity,
networking, or deployment. Onboarding time for new engineers roughly doubled, since there were two
full platforms to learn instead of one.

**Egress fees nobody had modeled.** The multi-cloud policy's resilience goal pushed several teams
toward replicating data between Azure and AWS so each cloud's deployment of a service had its own
local copy to read from — exactly the "mirror everything to preserve an abstract cloud-agnostic
ideal" pattern Lesson 21 cautioned against. Nobody had priced that data gravity doesn't go away
just because a policy says it should: the recurring egress cost of keeping both copies current
turned into one of the largest line items on the infrastructure budget, dwarfing the cost of the
compute it was supporting.

**Workloads that never needed any of this.** Most tellingly, the majority of Brennick's systems —
internal reporting tools, a handful of low-traffic marketing microsites, an HR portal — had no
actual multi-cloud requirement at all. No regulatory reason to diversify, no realistic scenario in
which running on two clouds reduced a risk that mattered to the business. They were built
multi-cloud anyway, purely because the policy didn't distinguish between workloads, and each one
paid the full duplicated-tooling and duplicated-skill tax for a resilience benefit it never used.

## What the savings were supposed to be, and weren't

The stated goal — negotiating leverage against price increases, and protection against an outage
at a single provider — never materialized at anything close to the scale of the costs above.
Brennick's actual volume with either cloud wasn't large enough to extract meaningful pricing
leverage from threatening to leave, and in three years, there was no single-provider outage that
the multi-cloud architecture meaningfully protected against, while the duplicated tooling, staffing,
and egress costs recurred every single month regardless. The "insurance" premium was being paid
continuously; the claim it was insuring against essentially never came.

## What a narrower decision would have looked like

Lesson 8's actual advice — evaluate lock-in risk per workload, and accept a reasonable amount of
it where the switching cost is genuinely low — would have left most of Brennick's estate on one
cloud by default. A small number of workloads with a real, specific case for multi-cloud (a
customer-facing checkout flow where an outage has direct revenue impact, say) could have justified
the duplication deliberately, with its cost modeled up front and compared against the benefit it
was actually buying. Multi-cloud isn't the mistake in this case study — treating it as a
one-size-fits-all policy, applied without a cost model, to workloads that never needed it, is.

## Key terms

| Term | Meaning |
|---|---|
| Blanket multi-cloud policy | Requiring multi-cloud architecture for every workload regardless of actual need, instead of deciding per workload |
| Duplicated tooling cost | The recurring cost of building and maintaining separate monitoring, policy, and deployment tooling for each cloud a policy requires |
| Unmodeled egress cost | Cross-cloud data replication cost that accumulates every month but was never priced before the policy requiring it was adopted |
| Workload-by-workload lock-in decision | Lesson 8's actual recommendation: evaluate the switching-cost risk for each workload individually, rather than applying one rule everywhere |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: name the four places Brennick's
real cost accumulated, and what a workload-by-workload multi-cloud decision would have changed
about which systems actually got duplicated.
