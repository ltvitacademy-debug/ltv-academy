# Lesson 9 — Extracting Requirements From Ambiguity

**Chapter 2 · Working Ambiguous Requirements · Lesson 9 of 21**

## What you'll learn

- The three categories a real-world or exam-style prompt mixes together, and how to sort them fast
- Why some details in a prompt are deliberately decorative, and how to recognize them without dismissing something important
- A repeatable five-minute read-through technique for a new scenario, before any design work starts
- How to apply this technique to a brand-new, never-seen scenario under time pressure

## Why ambiguity is the point, not a flaw

Every case study in Chapter 1 started from a prompt that mixed clear requirements with details that only mattered once you looked for them — the CIO's private admission in Lesson 1, the "no single RM approves alone" rule buried in a compliance sentence in Lesson 2. This isn't a quirk of how this course wrote its scenarios; it's how real client engagements and real CTA board prompts work. Nobody hands an architect a fully-specified requirements document with every constraint labeled. Reading ambiguity accurately — separating what actually constrains the design from what's just color — is a skill the review-board format tests directly, because it's the same skill the job requires every day.

## Three categories, sorted on the first read

A dense scenario prompt mixes three kinds of information, and naming them explicitly is faster than trying to design while still parsing the prompt:

**Explicit requirements** are stated directly and usually have a number, a name, or a hard rule attached — "real-time inventory visibility," "no RM approves above the threshold alone," "citizen data must stay within the state's borders." These are rarely ambiguous once spotted; the risk is skimming past one because it's phrased casually instead of as a bullet point.

**Implied constraints** are not stated as requirements but follow necessarily from something that is — if dealers are described as "often competing with each other in overlapping territories," a sharing model that lets Dealer A see Dealer B's records is implicitly disqualified, even though no sentence says "Dealer A must not see Dealer B's data." Implied constraints are the ones candidates miss most often, because they require inference rather than literal reading.

**Decorative or scene-setting detail** doesn't constrain the design at all — it establishes realism or context. Not every fact in a well-written scenario needs to show up in your blueprint; a prompt that mentions the company was founded in 1987 is probably not asking you to design around that fact. The skill isn't just finding constraints, it's also correctly recognizing when a detail is scenery, so you don't waste design effort "solving" something nobody asked you to solve.

## The trap: treating a decorative detail as a requirement

Over-indexing on an irrelevant detail is its own failure mode, not a safer alternative to missing a real constraint. A candidate who spends presentation time explaining how their design accounts for the company's 1987 founding, instead of spending that time on the actual security and integration decisions, has wasted scarce minutes a panel will notice went somewhere that didn't matter. Telling the difference between decorative detail and an implied constraint gets easier with one question: does changing or removing this detail change what a correct design would look like? If removing "founded in 1987" doesn't change a single design decision, it was decorative. If removing "dealers often compete in overlapping territories" would let a much simpler sharing model work, it was an implied constraint doing real work.

## A five-minute read-through technique

Before any design work starts, read the full scenario once for comprehension only — no designing yet. On the second read, mark every sentence into one of the three categories above, out loud or in writing if time allows. Scenarios reward a specific kind of attention: facts stated once, in passing, inside a sentence about something else (the CIO's private admission about uncoordinated teams in Lesson 1 is a good example) are exactly where implied constraints and hidden risk factors tend to hide. A prompt that wanted you to notice something would usually make it a bullet point; the ones trained to make you miss something put it in a subordinate clause.

## Applying it cold

The only way this skill actually transfers to a timed board or a live client meeting is practicing it on material you haven't pre-analyzed. Re-reading Chapter 1's own case studies doesn't build this skill anymore, since you already know their constraints — this lesson's lab asks you to apply the technique to a scenario you're seeing for the first time.

## Key terms

| Term | Meaning |
|---|---|
| Explicit requirement | A directly stated, usually clearly flagged constraint or requirement in a scenario |
| Implied constraint | A constraint that follows necessarily from a stated fact, without being stated as a requirement itself |
| Decorative detail | Scene-setting information that doesn't actually constrain the design |
| Removal test | Asking whether removing a detail would change a correct design, to tell implied constraints from decorative ones |

## Lab

Read this new scenario once, then mark every sentence as explicit requirement, implied constraint, or decorative detail: *"Ferron Logistics operates a fleet of 400 delivery trucks and has used the same dispatch software since the company's founding by two brothers in 1994. Drivers need real-time delivery-status updates visible to dispatchers, but dispatchers in different regional hubs should not see each other's driver assignments, since the hubs operate as semi-autonomous business units with separate P&Ls. The CFO has mentioned, almost as an aside, that the current dispatch software's vendor is being acquired and support may end within a year."* Apply the removal test to each marked item and justify your category for the two hardest calls.

## Check yourself

Can you state the removal test in one sentence? Can you name, from the lab scenario, one implied constraint that isn't phrased as a requirement at all?
