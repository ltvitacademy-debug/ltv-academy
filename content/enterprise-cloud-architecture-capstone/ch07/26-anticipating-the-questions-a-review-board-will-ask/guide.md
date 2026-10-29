# Lesson 26 — Anticipating the Questions a Review Board Will Ask

**Chapter 7 · Presenting and Defending an Architecture · Lesson 2 of 4**

## What you'll learn

- The small number of question *categories* that cover almost every real
  architecture review, regardless of the system being reviewed
- Why "what happens when X fails" is the single most predictable question
  a board will ask, and how to prepare for it before you're asked
- How cost-at-scale and security-blast-radius questions connect directly
  back to Chapter 4 (resilience) and Chapter 2 (account boundaries)
- Why "what's the simplest version of this" is a real, serious question —
  not an attack on your design

## Review boards are more predictable than they feel

The first time you present to a real review board, the questions feel
unpredictable — like the room could ask literally anything. In practice,
an experienced reviewer's questions cluster into a small number of
recurring categories, because their job is to probe the same handful of
failure classes in every design they review. Learn the categories and you
stop being surprised by the meeting; you start walking in already knowing
roughly what's coming, which is most of what "being prepared" actually
means.

## The four categories that cover almost everything

**"What happens when X fails?"** This is the resilience question from
Chapter 4, asked about your specific design. Pick the component most
likely to fail — the database, the single region, the third-party
dependency — and ask yourself this question before anyone else does. If
your honest answer is "the whole system goes down," that's not a reason to
hide the question; it's a reason to either fix it before the review or
walk in ready to explain why that risk is accepted and what the mitigation
plan is.

**"What does this cost at 10x scale?"** Review boards ask this because
designs that look fine at pilot scale often hide a cost curve that bends
badly — a per-request charge that's negligible at 1,000 requests a day and
brutal at 10,000,000. Know your unit economics: what's the marginal cost
per request, per user, per gigabyte, and does that cost scale linearly,
or does it have a cliff (a tier boundary, an egress charge, a licensing
seat count)?

**"What's the security blast radius?"** This is the Chapter 2 account-
boundary question, asked in the review room: if this component is
compromised, what else is reachable from it? A design that keeps a
compromised workload boxed into one subscription, one VPC, one set of
scoped credentials has a small, defensible answer. A design where
everything shares one identity and one network segment has a much harder
conversation ahead of it.

**"What's the simplest version of this?"** Don't mistake this for an
attack on your design's sophistication — it's usually a sincere operational
question. Complexity has an ongoing cost: more moving parts to monitor,
more failure modes to reason about, more onboarding time for the next
engineer who has to maintain it. A good answer explains specifically what
the simpler version would give up, and why that tradeoff wasn't the one
you made — which only works if you can actually describe the simpler
version, not just insist your version is necessary.

## Preparing for questions you can't fully predict

You can't anticipate every question, but you can anticipate the shape of
them. Before a review:

- Run your own "pre-mortem": for each major component, ask "what happens
  when this fails" out loud, in the room with your own team, before the
  real review.
- Know your numbers cold — unit cost, current scale, and the scale factor
  where the design's assumptions start to break.
- Build two or three appendix slides for the likely deep-dive questions
  (a detailed cost breakdown, a network diagram at the subnet level) and
  keep them out of the main deck so the presentation stays tight but the
  answer is one click away when asked.

## Key terms

| Term | Meaning |
|---|---|
| Failure-mode question | "What happens when X fails" — the most predictable question in any architecture review, tied to the resilience work in Chapter 4 |
| Cost-at-scale | How a design's cost curve behaves as load grows, including any cliffs from tiering, egress, or licensing, not just its cost today |
| Blast radius | What else is reachable or affected if one component is compromised or fails — governed by the account and network boundaries from Chapters 2 and 3 |
| Pre-mortem | Rehearsing the hard questions against your own design, with your own team, before the real review happens |

## Check yourself

You're ready for Lesson 27 when you can state, from memory, the four
question categories in this lesson, and explain why "what's the simplest
version of this" deserves a real answer rather than a defensive one.
