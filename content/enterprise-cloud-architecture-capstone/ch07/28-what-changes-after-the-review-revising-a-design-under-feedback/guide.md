# Lesson 28 — What Changes After the Review: Revising a Design Under Feedback

**Chapter 7 · Presenting and Defending an Architecture · Lesson 4 of 4**

## What you'll learn

- The three realistic outcomes of a real architecture review, and what
  each one actually obligates you to do next
- How to tell the difference between feedback that changes the design and
  feedback that's just a question you already answered in the room
- How to revise a design around real feedback without losing the original
  intent the design was built to serve
- Why re-presenting a revised design means showing the delta, not
  rebuilding the whole deck from scratch

## A review rarely ends with a clean yes

Chapters 25 through 27 covered getting into the room with a well-
structured argument, prepared for the likely questions, and able to defend
a tradeoff you made on purpose. This lesson covers what happens once the
meeting actually ends — because a real review almost never produces a
simple "approved, go build it." It produces one of three outcomes, and
each one has a different, specific thing it obligates you to do next.

## Three realistic outcomes

**Approved.** The design proceeds as presented. This is the simplest
outcome and the least common one for anything non-trivial — most
substantive designs get at least one condition attached, even when the
underlying direction is accepted.

**Approved with conditions.** The direction is accepted, but specific
items must be addressed before or during build — "approved, but add a
documented rollback path before the first production deploy" or "approved,
contingent on a follow-up review of the data-retention design once the
compliance team weighs in." Conditions are not polite rejections; they're
the board doing its job of catching the gaps that a go/no-go vote can't
capture.

**Revise and return.** The direction needs real rework before the board
will approve it, usually tied to one specific, named concern — the blast
radius is too wide, the DR posture doesn't meet the stated RTO, the cost
model doesn't hold at the stated scale. This isn't a rejection of the
whole effort; it's the review process working as intended, catching a real
problem before it's built instead of after.

## Separating real feedback from noise

Not every comment in a review is a change request. Some of it is a
question you already answered, restated as if it were new — which is
normal; reviewers process information live, and a point you made in
passing sometimes needs to be heard twice. The useful discipline after a
review is sorting what was said into two piles: things that genuinely
weren't considered and change the design, and things that were already
addressed and just need to be restated more clearly next time, not
re-engineered.

Confusing the two is how a design loses its original intent. If you treat
every comment as equally binding, you end up revising the design around a
misunderstanding instead of around a real gap — and the next version
drifts away from the problem it was built to solve, one well-meaning but
unnecessary change at a time.

## Revising without losing the original intent

- **Go back to the problem statement from Lesson 25 before touching the
  design.** The feedback is only valid feedback relative to the problem
  you were solving — a comment that would solve a different problem than
  the one you stated isn't a reason to change course.
- **Change only what the specific feedback requires.** A condition about
  the rollback path doesn't justify redesigning the network topology too,
  just because you're already in the file.
- **Update the ADR, not just the diagram.** The "Consequences" section of
  the ADR from Chapter 6 is exactly where a post-review change belongs —
  it's the record of why the design looks the way it does now, including
  the review feedback that shaped it.

## Re-presenting: show the delta, not a new deck

When a revised design goes back to the board, the second presentation is
not a rebuild of the first one. It should open with: here's what you
asked for, here's exactly what changed in response, and here's why
everything else stayed the same. That's a short, focused conversation. A
full second pass through problem, options, and design — as if the first
review never happened — buries the one thing the board actually needs to
confirm: that their specific feedback was addressed, and nothing else
drifted in the process.

## Key terms

| Term | Meaning |
|---|---|
| Approved with conditions | A review outcome where the direction is accepted but specific items must be addressed before or during build |
| Revise and return | A review outcome requiring real rework, tied to a specific named concern, before the design can be approved |
| Delta presentation | Re-presenting a revised design by showing only what changed in response to feedback, not rebuilding the full deck |
| Original intent | The problem the design was built to solve, which revisions should stay anchored to even as specific details change |

## Check yourself

You're ready to move to the Chapter 8 capstone labs when you can name the
three review outcomes from memory, and explain why a delta-only
re-presentation serves the board better than a full second pass through
the whole deck.
