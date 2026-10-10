# Lesson 9 — Requirements Extraction Practice

**Chapter 2 · Working the Cases · Lesson 9 of 16**

## What you'll learn

- A repeatable method for turning a vague stakeholder ask into a stated, checkable requirement
- Why every case study in Chapter 1 started with a sentence that wasn't actually a requirement yet
- How to tell the difference between a requirement, an assumption, and a solution disguised as a requirement
- How to practice this extraction skill against all eight Chapter 1 cases in one pass

## Every case in Chapter 1 started with the same problem

Look back across Chapter 1 and a pattern repeats eight times: a stakeholder hands the architect a sentence that sounds like a requirement and isn't one yet. "Fix the routing." "One portal." "Track everything about everyone in one system." "Standardized and enforced." Each of these is a real signal that something is wrong, stated at a level of abstraction too high to design against directly. The skill this lesson isolates — because it's the one skill every single case study quietly depended on before any object, sharing rule, or license decision got made — is turning that sentence into something specific enough to build.

## A repeatable extraction method

Four questions, asked in order, turn a vague ask into a stated requirement:

1. **Who said this, and what are they actually experiencing?** The VP of Sales at Harrow didn't experience "the system doesn't fit" directly — three different segment leads experienced three different specific frictions, which the VP's sentence compressed into one complaint. Find the person closest to the actual pain, not just the person who escalated it.
2. **What would "fixed" look like, concretely, to that person?** Not "better," not "standardized" — a specific, observable outcome. Corvell's support director didn't just want routing "fixed"; what they wanted, stated concretely, was fewer milestone breaches on specific case categories.
3. **What's being assumed that hasn't been said out loud?** Renwick's "one portal" assumed one undifferentiated experience for two audiences — an assumption that, once surfaced and questioned, turned out to be wrong and expensive if left unchallenged.
4. **Is there a solution hiding inside the ask?** "Move to Salesforce Field Service" is a technology choice, not a requirement — the actual requirement underneath it (stop double-booking technicians, stop sending uncertified techs to jobs) could in principle be satisfied by more than one technology, and naming the underlying requirement separately from the named solution is what lets an architect evaluate whether the proposed solution actually addresses it.

## Requirement, assumption, and solution-in-disguise are three different things

A common mistake is treating all three of these as interchangeable "requirements" once they're written down on the same list. A **requirement** is a stated, checkable need ("the combined dataset's classification must reflect its highest-sensitivity source" is the kind of sentence that can be verified true or false against a design). An **assumption** is something the design is relying on without having confirmed it — Ferro's consolidation plan assumed leadership wanted unified reporting badly enough to accept the cost of reconciling three units' processes, which is a real assumption that should get explicitly validated with leadership, not quietly baked into the design. A **solution disguised as a requirement** names a specific mechanism ("use Omni-Channel," "use Experience Cloud") before the underlying need has even been separately stated — which forecloses alternative designs before anyone's checked whether the named solution actually fits.

Separating these three on paper, every time, is what keeps a design review honest: a reviewer can challenge an assumption, question whether a named solution is really the best fit for the underlying requirement, and hold the requirement itself as the one thing that shouldn't move without the stakeholder agreeing it should.

## Key terms

| Term | Meaning |
|---|---|
| Requirement | A stated, checkable need a design can be verified against |
| Assumption | Something a design relies on without explicit confirmation from the stakeholder |
| Solution disguised as a requirement | A named mechanism presented as if it were the underlying need, foreclosing alternatives |
| Requirements extraction | The practice of turning a vague stakeholder statement into stated requirements, assumptions, and named (but separately evaluated) solutions |

## Lab

Pick any two of the eight Chapter 1 case studies. For each one, write out: (1) the original vague ask as given in the case, (2) the requirement(s) you can extract using the four-question method above, (3) at least one assumption the case's design relied on that wasn't explicitly stated by the stakeholder, and (4) one place in the case where a solution was named before the underlying requirement was separately stated.

## Check yourself

Can you state the four extraction questions from memory, and explain what each one is actually checking for? Can you give one concrete example, from any Chapter 1 case, of an assumption that should have been explicitly confirmed with the stakeholder rather than silently built into the design?
