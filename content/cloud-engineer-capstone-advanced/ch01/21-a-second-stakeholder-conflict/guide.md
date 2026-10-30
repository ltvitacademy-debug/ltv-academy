# Lesson 21 — A Second Stakeholder Conflict: Speed vs. Cost

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 21 of 26**

## What you'll learn

- Why the capacity conversation Lesson 20 scoped out turns into a real disagreement, not
  just a planning detail
- How to state both sides of a stakeholder conflict fairly, in their own words, before
  trying to resolve either one
- Why "just split the difference" is usually a worse answer than it sounds
- What's actually missing from the room that both sides need before this gets resolved —
  which Lesson 22 supplies

## Two reasonable people, two different incentives

Casey Lindqvist and Dana Whitfield don't disagree because one of them is wrong. They
disagree because they're accountable for different things, and the incident two weeks ago
pulled those two accountabilities in opposite directions. Casey opens the planning call:

> "I don't want to have this conversation again next quarter. I want our node pools and our
> HPA ceilings set with real headroom — pin the capacity, don't make it fight an
> autoscaler's reaction time during the next sale."

Dana, who owns Driftwood's cloud budget and has been reading the FinOps reports Lesson 17
of the companion monitoring course covers, pushes back immediately:

> "We just spent two chapters building an autoscaler specifically so we don't pay for
> peak-sized capacity around the clock. If we pin everything at 'safe,' we've just rebuilt
> the exact over-provisioning problem FinOps exists to prevent — permanently, not for one
> sale."

## Stating Casey's position fairly

Casey isn't being reckless. The incident was real, it was visible to leadership, and
Engineering is the team that gets paged at 2am if it happens again. From that seat:

- A repeat incident costs more in trust, in on-call burden, and in leadership's confidence
  in the platform than almost any plausible amount of "wasted" compute spend.
- The autoscaler reacted correctly during the incident — new nodes *did* get added — but
  reacting isn't instant, and a scheduler making an AZ-blind bin-packing decision mid-scale
  was exactly where this incident actually came from.
- "Pin it high and stop worrying" is a simple, legible policy that doesn't depend on anyone
  reading a utilization chart correctly next quarter.

## Stating Dana's position fairly

Dana isn't being cheap for its own sake either. From the CTO seat, with budget
accountability attached:

- Autoscaling's entire cost case — covered in the companion monitoring course's FinOps
  material — is that fixed capacity sized for the worst hour of the week pays for that
  worst hour roughly 24 times over, every single day it isn't actually happening.
- A blanket "pin it high" policy doesn't target the actual problem. The incident wasn't
  caused by too little total capacity — it was caused by an *uneven distribution* of the
  capacity that already existed. More capacity, distributed the same unsafe way, doesn't
  obviously fix that.
- The FinOps framework names exactly this dynamic: Engineering has the ability to
  right-size or over-provision, Finance owns the budget impact, and neither side can
  responsibly decide this alone without the other's half of the picture.

## Why "just split the difference" doesn't actually work here

The tempting move is to average the two asks — pin capacity partway between today's levels
and Casey's "safe" number, and call it a compromise. That fails for a specific reason:
neither side's number is based on a measurement yet. Averaging two guesses doesn't produce
a right answer, it produces a slightly different guess that satisfies no one's actual
concern — Casey still doesn't have a guarantee against the *distribution* problem, and Dana
still doesn't have a defensible number for the next budget review.

## What's actually missing from this conversation

Both Casey and Dana are arguing from instinct and accountability, not from data — and the
data that would actually settle this already exists. The real sale produced real,
measured per-AZ peak-load numbers, captured in the FinOps dashboard's new per-AZ panel from
Lesson 16. Nobody in this conversation has pulled that data into the room yet. That's
exactly where Lesson 22 starts.

## Key terms

| Term | Meaning |
|---|---|
| Stakeholder conflict | A disagreement between people accountable for genuinely different outcomes, neither of whom is simply wrong |
| Pinned capacity | Fixed minimum/maximum replica or node counts set independent of measured demand, as opposed to autoscaled capacity |
| FinOps persona split | The framework's observation that Engineering, Finance, and Business/Product each hold a different, necessary piece of a cost decision |

## Lab

1. Write Casey's position and Dana's position each as a single fair sentence, without
   editorializing which one is "right."
2. Explain, in your own words, why pinning capacity higher doesn't actually address the
   root cause of the original incident.
3. Name the one piece of data that exists but hasn't been brought into this conversation
   yet.

## Check yourself

You're ready for Lesson 22 when you can state both Casey's and Dana's positions fairly, in
their own terms, and explain specifically why the real per-AZ load data from the incident —
not a guess from either side — is what actually resolves this.
