# Lesson 22 — Resolving the Conflict with Data, Not Opinion

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 22 of 26**

## What you'll learn

- How to pull the real per-AZ load numbers the incident already produced, instead of
  letting Casey's and Dana's instincts stay unresolved
- How to turn those numbers into a specific autoscaling ceiling and a per-AZ guarantee,
  rather than a single "safe-sounding" replica count
- Why the actual compromise separates "always-on floor" from "sale-window ceiling" —
  satisfying both Casey's safety concern and Dana's cost concern, for different reasons
- How to present a data-backed number to two stakeholders who were arguing from opinion

## Pulling the real numbers

Lesson 21 ended on the same observation twice: neither Casey's "pin it high" nor Dana's
"don't over-provision" was based on an actual measurement. Theo starts Lesson 22 by
pulling up the exact numbers Lessons 12 and 14 already established — no new data
collection needed, just the two tables that diagnosed and then validated the original fix:

| Availability zone (`eastus2-*`) | Peak utilization *before* the fix (Lesson 12) | Peak utilization *after* the fix (Lesson 14) |
|---|---|---|
| eastus2-1 | ~24% | ~48% |
| eastus2-2 | **~96%** (the overloaded zone) | ~46% |
| eastus2-3 | ~24% | ~47% |

Two things in this table do real work. First, the "before" column is the exact imbalance
Lesson 12 found: `eastus2-2` running nearly pegged at 96% while the other two zones sat at
a quarter of that, blending into the cluster-wide average of ~72% that looked completely
fine on the old dashboard. Second, the "after" column is Lesson 14's validated result:
once `topologySpreadConstraints` spread the same twelve replicas evenly, all three zones
landed within about a 2-point band of each other, each one roughly half-utilized. That's
the evidence that the fix solved the *distribution* problem Dana kept pointing at — not a
guess that it probably helped.

## What the data actually settles, and what it doesn't

The post-fix numbers answer Dana's underlying question directly: the fix already
corrected the imbalance, so "more total capacity" was never actually the missing piece —
twelve replicas, evenly spread, comfortably absorbed the same sale traffic that had one
zone pegged at 96% before. But they don't fully answer Casey's concern on their own —
~46–48% utilization under last quarter's sale traffic doesn't guarantee headroom for a
*bigger* sale next time, and Casey is right that the business expects growth quarter over
quarter.

## The actual compromise: a measured ceiling, not a pinned floor

Theo brings both stakeholders a specific proposal built from the measured numbers, not
from a number either side suggested first:

- **Autoscaling ceiling (`maxReplicas`), raised with evidence** — the post-fix baseline is
  twelve replicas holding each zone at roughly 46–48% under last quarter's actual peak.
  Theo proposes raising the sale-window ceiling from 12 to 16 replicas — enough headroom
  to keep each zone at or below ~60% even if next quarter's sale traffic runs 30% past
  this quarter's validated peak, calculated from the real post-fix numbers instead of an
  arbitrary multiplier.
- **A per-AZ guarantee, not just a bigger pool** — `topologySpreadConstraints` with
  `maxSkew: 1` stays in the deployment spec permanently, so a bigger ceiling actually gets
  distributed evenly instead of just giving the scheduler more room to repeat the original
  mistake at a larger scale.
- **Scale-to-minimum off-hours, kept** — the ceiling only needs to be reachable during
  the sale window itself. Outside of it, the existing off-hours minimum (covered in the
  companion monitoring course's autoscaling-as-a-cost-lever material) stays in place, so
  the higher ceiling doesn't mean higher cost around the clock.
- **A scheduled, pre-sale ceiling bump, not a permanent one** — the maximum is raised on a
  known schedule ahead of each sale window and allowed to fall back afterward, the same
  scheduled-scaling pattern used for off-hours minimums, run in the opposite direction.

## Why this satisfies both stakeholders, for different real reasons

- **Casey gets real headroom** — four more replicas than the post-fix baseline needed,
  calculated from the actual post-fix peak plus a defined growth margin, available during
  the exact window it's needed — not a hope that the autoscaler reacts fast enough, and
  not a guess dressed up as a round number.
- **Dana gets a defensible number for the budget review**, because the ceiling is backed
  by measured data and bounded to the sale window instead of running as permanently pinned
  capacity. The FinOps "Inform" phase — real, attributed data — is what makes the
  "Optimize" phase's number defensible, not an argument won by whoever was more
  persuasive in the room.

## Presenting it back

Theo brings the table above, the proposed ceiling and its math, and the scheduled-bump
approach back to Casey and Dana together, not separately — the same data, presented once,
so neither stakeholder can reasonably argue the other got a better deal. Both sign off,
because the proposal answers the specific concern each of them actually raised.

## Key terms

| Term | Meaning |
|---|---|
| Measured ceiling | An autoscaling maximum set from real observed peak data plus a defined margin, instead of an arbitrary multiplier |
| maxSkew | The `topologySpreadConstraints` setting controlling how unevenly pods may be distributed across zones; `1` keeps the spread tight |
| Scheduled capacity bump | Temporarily raising an autoscaling ceiling ahead of a known high-traffic window, then letting it fall back afterward |

## Lab

1. Using the table above, explain how Theo arrives at a sale-window ceiling of 16
   replicas from a post-fix baseline of 12 replicas running at ~46–48% per zone and a
   30% growth margin.
2. Explain, in one sentence, why the per-AZ guarantee (`maxSkew: 1`) still matters even
   after the ceiling is raised.
3. Write one sentence each for why Casey and why Dana would actually sign off on this
   specific proposal, grounded in what each of them raised in Lesson 21.

## Check yourself

You're ready for Lesson 23 when you can explain why a measured, sale-window-scoped ceiling
satisfies both a safety concern and a cost concern that a single permanently pinned number
could not have satisfied at the same time.
