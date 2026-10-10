# Lesson 10 — Comparing Alternative Designs

**Chapter 2 · Working the Cases · Lesson 10 of 16**

## What you'll learn

- Why a credible architecture decision needs at least two real alternatives, not one design and a rubber stamp
- A concrete set of tradeoff dimensions to score alternatives against, instead of comparing them on vibes
- Why "which one is better" is the wrong question until "better at what" is answered first
- How to apply this comparison method to Ferro's single-org-vs-multi-org fork from Chapter 1

## One design isn't a decision

A design document that presents exactly one option and asks for approval isn't really offering a decision — it's asking for a rubber stamp on whatever the architect already decided. Every genuine architecture decision in Chapter 1 had at least one real alternative sitting next to the chosen design: Ferro could consolidate or stay multi-org; Veltrix could build a lightweight point-to-point handoff from CPQ to billing or adopt Revenue Cloud's integrated billing; Harlow could build program tracking as fully custom objects or adopt PMM on top of NPSP. A design review that only ever sees the winning option has no way to tell whether it actually won on its merits or just by being the only candidate in the room.

## Tradeoff dimensions worth scoring explicitly

Comparing two designs well means scoring them against the same explicit dimensions, not describing each one separately and hoping the right choice is obvious from the prose. Five dimensions recur across almost every architecture decision:

- **Time to value** — how soon does this design deliver the specific outcome the stakeholder needs, not how soon does it deliver *something*.
- **Total cost** — license cost, implementation effort, and the ongoing cost of maintaining the result (a heavier integration that needs a dedicated owner is a real ongoing cost, not a one-time one).
- **Risk and blast radius** — what happens if this design is wrong, and how contained is the damage (Ferro's single-org consolidation raises blast radius; staying multi-org contains it but at the cost of the unified view Ferro actually wants).
- **Flexibility for known future change** — not flexibility in the abstract, but flexibility for a change that's actually likely (Harlow's phased PMM rollout anticipated two more programs after tutoring; a design that made the second program materially harder to add would score poorly here).
- **Fit to the stated requirement** — the most important dimension and the easiest to lose track of once a design gets technically interesting: does this option actually satisfy the requirement from Lesson 9, or does it satisfy a more impressive-sounding requirement nobody actually asked for.

## "Better" has no meaning until "better at what" is answered

Two designs rarely dominate each other on every dimension at once — one is usually faster and cheaper, the other more flexible or lower-risk. That's not a sign the comparison failed; it's the normal shape of a real tradeoff, and it's exactly why "which is better" is the wrong question to start with. The right question is which dimensions matter most for this specific stakeholder's situation, asked and answered before scoring either design — Ferro's leadership, for instance, needs to decide how much they value unified reporting relative to each unit's process autonomy before the single-org-vs-multi-org comparison can produce a real recommendation rather than the architect's personal preference dressed up as analysis.

## Applying the method to Ferro's fork

Score Ferro's two options side by side: single-org consolidation scores well on fit to the stated requirement (one combined customer view, one pipeline report) and poorly on risk/blast radius and total cost (reconciling three units' processes is real, ongoing effort). Multi-org with a lighter integration layer (syncing just enough Account data across orgs to produce a combined view without a full merge) scores lower on fit — it doesn't fully deliver "one Account record" — but meaningfully better on risk and cost, since each unit's existing processes stay untouched. Writing this comparison out explicitly, dimension by dimension, is what lets Ferro's leadership make an informed tradeoff instead of being handed a single recommendation with no visibility into what was given up to get it.

## Key terms

| Term | Meaning |
|---|---|
| Alternative design | A genuinely different option considered and compared, not a strawman built to lose |
| Tradeoff dimension | An explicit criterion (time to value, cost, risk, flexibility, fit) used to score multiple designs consistently |
| Dominance | When one design scores at least as well as another on every dimension — rare in real comparisons |
| Fit to requirement | How well a design satisfies the specific, stated requirement, as opposed to a more technically interesting but unrequested one |

## Lab

Using the five tradeoff dimensions above, write a side-by-side comparison of Veltrix's two subscription-billing options from Lesson 6: (a) a custom-built, lighter-weight automated handoff from CPQ into the existing finance system, versus (b) adopting Revenue Cloud's integrated CPQ-and-billing capability. Score each option on all five dimensions, state which dimension you believe matters most for Veltrix specifically, and give your recommendation along with what Veltrix gives up by choosing it.

## Check yourself

Can you name the five tradeoff dimensions from memory and explain what each one is actually measuring? Can you explain why "which design is better" is an incomplete question until the relative importance of each dimension has been settled first?
