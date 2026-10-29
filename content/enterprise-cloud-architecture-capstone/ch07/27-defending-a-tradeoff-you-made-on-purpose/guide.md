# Lesson 27 — Defending a Tradeoff You Made on Purpose

**Chapter 7 · Presenting and Defending an Architecture · Lesson 3 of 4**

## What you'll learn

- The difference between a tradeoff you overlooked and a tradeoff you
  made on purpose — and why a review board needs to hear which one it is
- A three-part pattern for defending a deliberate tradeoff: restate the
  constraint, name the alternative and its cost, invite the counter-proposal
- The specific defensive habits that make a sound tradeoff look weak in
  the room, and how to avoid them
- Why conceding every pushback is not the same as being collaborative

## Two very different sentences

"We didn't think about failover for that service" and "we chose not to
build failover for that service, because the service is non-critical and
the engineering cost didn't justify it" describe the same technical fact —
no failover — but they are completely different sentences to say in a
review. The first is a gap. The second is a decision. Lesson 26 covered
anticipating the question; this lesson is about what you say once the
question lands on a tradeoff you actually chose, deliberately, for a
stated reason.

A review board cannot tell the difference between a gap and a decision
from the diagram alone — the architecture looks identical either way.
The only thing that distinguishes them is what you say when it's asked
about, which is exactly why Chapter 6's ADR work matters here: if the
tradeoff is written down with its reasoning at decision time, you're not
inventing a defense under pressure, you're reading one back.

## A three-part pattern for defending a deliberate tradeoff

**1. Restate the constraint that drove the decision.** Don't start by
defending the choice — start by naming the actual pressure you were
weighing against. "We were optimizing for time-to-market on a feature
with a hard launch date" or "the data volume didn't justify the
operational overhead of a multi-region write path." This reframes the
conversation from "is this choice defensible in isolation" to "given this
real constraint, was this a reasonable call" — which is the question a
good reviewer actually wants answered.

**2. Name the alternative and its specific cost.** Say what you *didn't*
do, and why it would have cost more than it was worth — in concrete terms,
not vague ones. "We could have built active-active across two regions,
which would have added roughly 40% to the infrastructure cost and several
weeks of engineering time, for a workload with a 99.9% availability
target that a warm-standby design already meets." This is the pillar
language from Chapter 1 made concrete, and it shows the board you
considered the more expensive option and had a reason to reject it, not
that you didn't know it existed.

**3. Invite the counter-proposal.** Close with something like "if the
requirements have changed — if this workload is now more critical than it
was when we made this call — I want to hear that, because the decision
was based on a specific set of constraints that might not hold anymore."
This does two things: it shows you're not married to the decision for its
own sake, and it puts the burden back on the board to name what's actually
changed, rather than asking you to re-justify a sound decision against a
vague feeling of discomfort.

## Habits that make a sound tradeoff look weak

- **Getting defensive.** Treating a question about the tradeoff as an
  attack invites the room to dig in, even when the underlying decision was
  reasonable.
- **Relitigating from scratch.** Walking back through every option you
  ever considered, live, instead of stating the one reason that mattered
  most, buries the actual answer in noise.
- **Conceding everything to avoid conflict.** Agreeing to "reconsider" a
  sound decision just to end the discomfort of being questioned isn't
  collaboration — it trains the room to treat every deliberate tradeoff as
  negotiable, and it undermines the next deliberate tradeoff you present.

Being collaborative means engaging with new information if it's actually
offered — not abandoning a reasoned decision just because it was
questioned. A question is not automatically evidence that the decision was
wrong.

## Key terms

| Term | Meaning |
|---|---|
| Deliberate tradeoff | A design choice made with a known cost, for a stated reason, as opposed to a gap the team simply didn't consider |
| Constraint | The real pressure (time, budget, data volume, team size) that drove a specific tradeoff decision |
| Counter-proposal invitation | Explicitly asking the board to name what's changed, rather than re-justifying a sound decision against vague discomfort |
| Defensiveness | Treating a legitimate question as an attack, which tends to make a sound decision look weaker than it is |

## Check yourself

You're ready for Lesson 28 when you can walk through the three-part
pattern — constraint, alternative and cost, counter-proposal invitation —
using a tradeoff from your own capstone design, out loud, without
sounding defensive.
