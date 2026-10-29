# Lesson 4 — Deciding What Stays On-Prem and What Moves

**Chapter 1 · Hybrid Cloud Architecture Fundamentals · Lesson 4 of 4**

## What you'll learn

- A practical, repeatable decision framework for classifying a
  workload as "stays on-premises" or "moves to the cloud" — instead
  of defaulting to either "cloud-first" or "never touch it"
- The specific criteria that genuinely justify keeping a workload
  on-prem: regulatory/data-residency constraints, hard latency
  requirements, and legacy risk that doesn't clear the bar for
  migration
- The criteria that push a workload toward the cloud: variable or
  unpredictable demand, a need for managed services, and a genuine
  cost or agility benefit that outweighs migration risk
- Why this decision isn't a one-time exercise — and the common
  mistakes that turn a reasoned decision into either a stalled
  migration or a reckless one

## Turning three lessons into an actual decision

This chapter has built toward exactly this point. Lesson 1 explained
why enterprises end up hybrid in the first place. Lesson 2 covered how
on-prem and cloud networks and identity actually connect. Lesson 3
covered the control-plane technologies — Azure Arc and AWS
Outposts — that let you manage both sides as one estate. None of that
tells you, for a specific workload sitting in front of you right now,
whether it should stay where it is or move. That's what this lesson
is for: a concrete framework, not a vague "it depends."

## What genuinely justifies staying on-prem

Three criteria hold up, and only these three should really be doing
the work in this decision — everything else is usually a weaker
justification dressed up to sound like one:

- **Regulatory and data-residency constraints.** If a workload
  processes data a regulator or a jurisdiction requires to remain
  under direct physical custody, or within a specific geographic
  boundary that your target cloud region can't satisfy, that's not a
  preference — it's a hard constraint, and the workload stays.
- **Hard latency requirements.** If the workload's function depends
  on round-trip latency in the single-digit milliseconds — real-time
  control systems, certain trading systems, some manufacturing
  automation — and no available cloud region or Outposts-style local
  deployment can meet it, the workload has to stay physically close to
  where it's consumed.
- **Legacy risk that doesn't clear the bar.** If migrating a system
  carries real, substantiated risk (no remaining expertise, no
  reliable rollback path, a core business process with zero tolerance
  for the kind of disruption a migration can introduce) and the
  benefit of moving it is marginal, the honest answer is that it stays
  — not because migrating it is impossible, but because the
  cost/risk/benefit math doesn't support doing it now.

## What genuinely justifies moving to the cloud

The mirror image also has three real criteria:

- **Variable or unpredictable demand.** Workloads with real elasticity
  needs — seasonal spikes, unpredictable growth, batch jobs that need
  a burst of compute for a few hours a month — are expensive to
  provision for on fixed on-prem hardware and are exactly what cloud
  elasticity is built for.
- **A genuine need for managed services.** If a workload benefits
  meaningfully from a managed database, a managed Kubernetes control
  plane, serverless compute, or a first-party AI/ML service, and
  building the on-prem equivalent would mean maintaining that
  capability yourself indefinitely, the cloud's managed-service
  advantage is real, not theoretical.
- **A cost or agility case that survives scrutiny**, not just a
  starting assumption. "Cloud is cheaper" isn't automatically true —
  it has to be checked against the specific workload's usage pattern,
  egress costs, and the operational overhead it removes, the same way
  you'd evaluate any other infrastructure decision in this path.

## A workable checklist, not a vague gut call

For any specific workload, walk it through the same short list of
questions, in order, and stop at the first one that gives a definite
answer:

1. Is there a regulatory or data-residency requirement that
   categorically rules out one option? If yes, that decides it.
2. Is there a hard latency requirement no available cloud deployment
   can meet? If yes, it stays local (on-prem, or on provider hardware
   physically on-prem, like Outposts).
3. Is the legacy risk of migrating this specific system genuinely
   severe, with a migration benefit that's marginal at best? If yes,
   it stays — for now, not forever.
4. Does the workload have real elasticity needs, or would it
   meaningfully benefit from a managed service the business doesn't
   want to run itself? If yes, it moves.
5. If none of the above gives a clear answer, the decision comes down
   to cost and operational overhead specific to that workload — not a
   blanket policy.

## Pitfalls that undo good decisions

Two mistakes repeatedly turn a reasonable framework into a bad
outcome. The first is the **sunk cost fallacy in reverse** — treating
"we already have the hardware" as a reason to keep something on-prem
even after its actual justification (the regulatory constraint, the
latency need) no longer applies. The second is **treating the decision
as permanent**: a workload that correctly stayed on-prem three years
ago, because of a latency requirement an Outposts deployment couldn't
yet meet, might belong on Outposts today. This decision framework
should be revisited on a real cadence — architecture review, not
"whenever someone remembers" — because the inputs (regulation,
available cloud services, the business's own risk tolerance) change
over time even when the workload itself doesn't.

## Key terms

| Term | Meaning |
|---|---|
| Data-residency constraint | A legal/regulatory requirement that data remain within a specific jurisdiction or under direct physical custody |
| Latency-bound workload | A workload whose function depends on round-trip latency too low for a distant cloud region to satisfy |
| Elasticity | A workload's ability to benefit from scaling compute up and down with variable demand — a core cloud cost advantage |
| Sunk cost fallacy | Continuing a decision because of resources already invested, rather than re-evaluating it on its current merits |

## Check yourself

You're ready to move to Chapter 2 when you can walk a hypothetical
workload through the five-question checklist above out loud, and
explain why "we've always run it on-prem" is not, by itself, one of
the three legitimate reasons to keep it there.
