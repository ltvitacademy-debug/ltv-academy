# Lesson 3 — Data Governance vs. Data Management vs. Data Quality

**Chapter 1 · What Data Governance Is · Lesson 3 of 30**

## What you'll learn

- A precise, non-overlapping definition of governance, management, and quality
- How DAMA-DMBOK frames the relationship between the three
- Why conflating them causes real, specific organizational dysfunction
- A quick test you can apply to tell which one a given problem actually is

## Three words, three different jobs

These three terms get used interchangeably in meetings constantly, and it causes real confusion about who should fix what. Here's the distinction this course uses, consistent with DAMA-DMBOK's framing (Lesson 7 covers DAMA-DMBOK in full):

- **Data governance** sets the rules: who decides, who's accountable, what the policy is. It answers "who gets to say what 'active customer' means, and how do we enforce that definition?"
- **Data management** is the doing: the technical and operational work of acquiring, storing, moving, and processing data. It answers "how do we actually store, pipe, and process this data day to day?"
- **Data quality** is a measurable outcome: how accurate, complete, consistent, and timely the data actually is. It answers "is this specific dataset actually correct, right now?"

Governance is the *rulebook*. Management is the *operation*. Quality is the *scorecard*. You need all three, and they depend on each other — but they are not the same job, and treating them as interchangeable is exactly how organizations end up with governance programs that are actually just IT projects, or quality initiatives with no authority to enforce a fix.

## How DAMA-DMBOK frames this relationship

DAMA International's DAMA-DMBOK — the most widely cited body of knowledge in this field — places data governance at the center of its famous "wheel" diagram (shown in Lesson 7), with everything else, including data quality management, arranged as knowledge areas around it. The framing is deliberate: governance isn't one knowledge area competing with the others, it's the thing that gives the other ten areas their authority and consistency. Data quality management, in DAMA's own definition, is "planning, implementation, and control of activities that apply quality management techniques to data" — a specific, operational discipline, not a synonym for governance itself.

## Why the confusion is expensive

Three real failure patterns come directly from blurring these lines:

1. **A "governance program" that's actually a tooling project.** A company buys a data catalog or data quality tool, calls it "governance," and is confused when conflicting metric definitions persist — because the tool never answered the actual governance question of *who decides*.
2. **A data quality initiative with no teeth.** An analyst identifies bad data and proposes a fix, but has no governance authority to make the fix stick organization-wide, so the same error reappears in the next report cycle.
3. **A management team blamed for a governance failure.** IT gets blamed for "bad data" when the actual problem is that no one ever defined what correct data was supposed to look like — a governance gap, not an execution gap.

## A quick test

When a data problem shows up, ask: is this a disagreement about rules (governance), a breakdown in how data is handled day to day (management), or a factual defect in a dataset (quality)? The answer tells you who should actually be in the room to fix it.

## Key terms

| Term | What it answers |
|---|---|
| Data governance | Who decides, and what's the rule? |
| Data management | How do we actually do it, day to day? |
| Data quality | Is this specific data correct, right now? |

## Lab

Think of one recent "data problem" you witnessed or heard about at work. Write two or three sentences classifying it as primarily a governance issue, a management issue, or a quality issue — and explain which team was actually asked to fix it versus which team the quick test above says should have been.

## Check yourself

Without looking back, can you give a one-sentence definition of each of the three terms, and explain why DAMA-DMBOK places governance at the center of its wheel rather than as just another spoke?
