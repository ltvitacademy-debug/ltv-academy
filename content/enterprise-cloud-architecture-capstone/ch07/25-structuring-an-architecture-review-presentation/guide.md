# Lesson 25 — Structuring an Architecture Review Presentation

**Chapter 7 · Presenting and Defending an Architecture · Lesson 1 of 4**

## What you'll learn

- Why a design review deck has a fixed, deliberate order — and what breaks
  when you reorder it
- The five sections a real architecture review expects, and the specific
  job each one does
- Where tradeoffs and risks belong in the deck (not buried at the end, and
  never omitted)
- Why a rollout plan is part of the architecture pitch itself, not a slide
  you bolt on afterward

## A review deck is an argument, not a tour

Everything in Chapters 1 through 6 gave you the material an architecture
review is actually about: pillar tradeoffs, landing zones, network
topology, DR posture, governance guardrails, and the ADR that records why
you chose what you chose. This lesson is about the last mile — turning
that material into a presentation a review board can follow, interrogate,
and approve in one sitting.

The mistake almost every first-time presenter makes is treating the deck
like a tour of the design: here's the network diagram, here's the compute
layer, here's the database. A tour shows what you built. A review board
doesn't need a tour — they need an **argument**: here is the problem, here
is what we considered, here is what we recommend and why, here is what it
costs us, and here is how we roll it out safely. Structure the deck as an
argument and the room follows your reasoning. Structure it as a tour and
the room reconstructs the argument themselves, out loud, in the middle of
your meeting — which is where review meetings go long and go sideways.

## The five sections, in this order, for a reason

**1. Problem & requirements.** State what you're solving before you state
how. Name the actual constraints — latency targets, compliance scope,
budget ceiling, team size, existing systems you can't break. If the room
doesn't agree on the problem, they can't evaluate your solution to it, and
you'll spend the rest of the meeting re-deriving requirements that should
have been settled in the first two minutes.

**2. Options considered.** Show at least two real alternatives to what
you're recommending, each with a one-line reason it didn't win. This isn't
decoration — it's credibility. A reviewer's first instinct is "did you
consider X?" Answering that before it's asked is the single highest-
leverage thing a review deck can do, and it's the direct output of the ADR
work from Chapter 6: the "Options" section of your ADR *is* this slide.

**3. Recommended design.** Now, and only now, the diagram and the
decision. Because the room already has the problem and the alternatives in
mind, the recommendation lands as a conclusion instead of an assertion.

**4. Tradeoffs & risks.** State plainly what you're giving up and what
could go wrong — in the pillar language from Chapter 1 ("we're accepting a
performance-efficiency cost for operational simplicity") and the blast-
radius language from Chapter 2. Naming your own weaknesses first is what
Lesson 27 builds on directly: you cannot defend a tradeoff you haven't
already put on the table.

**5. Rollout plan.** How this actually gets built, in what order, with
what rollback path if a stage fails. An approved design with no rollout
plan isn't actually approved — it's deferred until someone asks "okay, how
does this actually happen," which is a question every experienced review
board asks before signing off.

## What goes wrong when the order gets skipped

- **Leading with the design** before the problem is agreed produces a
  meeting that re-derives requirements live, usually disagreeing with what
  you assumed.
- **Burying tradeoffs** at the end, or leaving them out, doesn't hide them
  from an experienced board — it just means *they* surface the tradeoff,
  and now you're reacting instead of having already addressed it.
- **No rollout plan** reads as "we designed the end state but not the
  path to it," which is exactly the gap a review board exists to catch
  before money and migration effort gets committed.

## Key terms

| Term | Meaning |
|---|---|
| Design review | The structured meeting where an architecture is presented, interrogated, and approved, deferred, or sent back for revision |
| Options considered | The alternatives you evaluated and rejected, each with a stated reason — proof the recommendation was chosen, not just the only idea you had |
| Rollout plan | The staged path from current state to the recommended design, including the rollback path if a stage fails |
| Review board | The group evaluating the design — typically architects, security, and a cost/finance stakeholder, same roles the ADR in Chapter 6 was written for |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does
"options considered" come before "recommended design" in the deck, and
what specifically goes wrong in the room when tradeoffs are left until
the end instead of stated up front?
