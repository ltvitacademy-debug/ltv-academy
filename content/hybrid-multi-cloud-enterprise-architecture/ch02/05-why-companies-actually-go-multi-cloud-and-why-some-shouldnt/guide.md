# Lesson 5 — Why Companies Actually Go Multi-Cloud, and Why Some Shouldn't

**Chapter 2 · Multi-Cloud Strategy · Lesson 1 of 4**

## What you'll learn

- The three honest reasons enterprises end up running more than one
  cloud provider on purpose
- Why "avoiding lock-in" on its own is almost never a good enough
  reason, and what it actually costs you when it's the only reason
- A simple test you can run on any proposed multi-cloud initiative
  before committing an architecture to it

## The honest reasons companies go multi-cloud

Multi-cloud isn't a strategy you adopt because it sounds safer. In
practice, the organizations that end up genuinely running more than
one cloud provider almost always got there for one of a short list of
concrete reasons — not because someone in architecture review decided
"two clouds is more resilient than one" in the abstract.

**An acquisition brought a different cloud with it.** This is the
single most common real-world path into multi-cloud. Company A runs
entirely on Azure. Company A acquires Company B, which built its
entire stack on AWS three years before anyone discussed a merger.
Nobody chose multi-cloud as a strategy — it arrived as a fact on
Day One of integration, and the architecture team's job becomes
deciding how much of Company B's AWS footprint to migrate, how much
to leave in place, and how to connect the two estates in the
meantime (the networking and identity patterns for exactly this
situation are covered in Chapters 4 and 5). This is multi-cloud by
inheritance, not by design, and it's extremely common.

**A specific best-of-breed service genuinely only exists — or is
genuinely only good — on one provider.** Sometimes a team needs a
capability that one cloud does meaningfully better than the others
for their specific workload: a particular managed data-warehouse
engine, a specific machine-learning platform with the right model
catalog and tooling for their use case, or a specialized service with
no real equivalent elsewhere. When the gap is real and the workload's
value justifies the integration cost, bringing in a second provider
for that one workload is a deliberate, defensible decision — not
"avoiding lock-in" but "picking the right tool."

**Genuine disaster-recovery independence is a real, if expensive,
reason.** A small number of organizations — usually ones with
regulatory requirements, or workloads where an extended outage is
existential — decide that provider-level independence matters enough
to justify running critical systems on two providers so that an
outage, billing dispute, or account suspension at one provider can't
take down the whole business. This is legitimate. It is also
genuinely expensive, which is exactly why it should be reserved for
the workloads where the cost is actually justified, not applied
blanket-wide "to be safe."

## The bad reason: a vague fear of lock-in

Contrast those three with the reason that shows up constantly in
architecture decks and almost never survives contact with an honest
cost analysis: "we don't want to be locked into one vendor." Said on
its own, with no specific workload, no specific capability gap, and
no specific disaster scenario attached, this isn't a reason — it's an
anxiety. And architecture built around an anxiety instead of a
requirement tends to produce exactly the outcome Lesson 7 walks
through in detail: real, ongoing operational cost (duplicated
tooling, duplicated skills, duplicated security and monitoring
posture) purchased in exchange for a risk that, for most
organizations, was never concretely going to materialize.

The giveaway question to ask whenever "avoid lock-in" is offered as a
justification: lock-in to *what*, specifically, and what's the actual
plan if that happens? If nobody in the room can answer with a
specific service, a specific scenario, and a specific cost
comparison, the proposal is fear dressed up as strategy, and Lesson 8
gives you the pragmatic alternative — favoring portability where it's
genuinely cheap, rather than building a second cloud's worth of
infrastructure against a risk nobody has actually quantified.

## A simple test before you commit to multi-cloud

Before any workload gets a second provider, make the proposer answer
three questions in writing:

1. **What specific capability, constraint, or event is driving this**
   — a named acquisition, a named service gap, a named regulatory
   requirement, or a named disaster scenario? ("Lock-in" by itself
   fails this question.)
2. **What does running this on two providers cost**, not just in
   infrastructure spend, but in duplicated tooling, duplicated
   on-call skill, and duplicated security/monitoring posture? (Lesson
   7 is the worked-through version of this calculation.)
3. **Is there a cheaper way to get the same protection** — a portable
   pattern like Kubernetes or Terraform, a single-cloud multi-region
   design, or a contractual/financial hedge instead of an
   architectural one?

If the answer to question 1 is concrete and the math in question 2
still comes out favorable, multi-cloud for that specific workload is
a sound decision. If question 1 can't be answered concretely, you
have your answer already.

## Key terms

| Term | Meaning |
|---|---|
| Multi-cloud by inheritance | Multi-cloud that exists because of a merger/acquisition, not because of a deliberate architecture choice |
| Best-of-breed driver | A genuine, named capability gap that only one provider closes for a specific workload |
| DR independence | Running critical systems on two providers so a single provider's outage or account issue can't take down the business |
| Lock-in anxiety | A vague, unquantified fear of vendor dependence used to justify multi-cloud without a specific driver behind it |

## Check yourself

You're ready for Lesson 6 when you can name, from memory, the three
legitimate drivers of real-world multi-cloud and explain why "we
don't want to be locked in" fails the three-question test on its own.
