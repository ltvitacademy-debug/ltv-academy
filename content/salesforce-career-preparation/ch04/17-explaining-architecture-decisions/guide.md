# Lesson 17 — Explaining Architecture Decisions

**Chapter 4 · Presenting Your Work · Lesson 17 of 19**

## What you'll learn

- Why "best practice" is a weak answer on its own, and what to say instead
- A simple framework for explaining any technical decision: the tradeoff, not just the choice
- How to answer "what would you do differently?" without sounding like you made a mistake
- How this applies directly to decisions you already made on your capstone

## "Best practice" is a conclusion, not a reason

Saying "I used a permission set because that's best practice" tells an interviewer you followed a rule. It doesn't tell them you understand *why* the rule exists. The stronger version names the actual tradeoff the rule is resolving — in this case, permission sets let you grant additional access without creating a new profile for every combination of access a user might need, which keeps profile sprawl from becoming its own maintenance problem.

## A framework: option, reason, cost

For any decision worth explaining, structure the answer in three parts:

1. **What you chose.** Name it plainly — the object, the automation tool, the sharing mechanism.
2. **Why you chose it over the alternative.** What specific requirement or constraint made this the better fit — not "it's standard," but the actual reasoning.
3. **What it costs.** Every real decision trades something away. A Flow is more visible and maintainable than Apex, but less flexible for complex logic. A permission set is more flexible than a profile, but adds one more layer to audit. Naming the cost — even a small one — is what separates an engineer's answer from a sales pitch for your own choice.

## "What would you do differently?"

This question is not a trap, and it is not an invitation to confess a mistake. It's a question about scale and hindsight: what did this design assume that held true at the size you built it, and what would start to strain at ten times the size or complexity? A strong answer treats this as a continuation of the tradeoff framework, not a confession — "at this scale, X was the right tradeoff; past a certain point, I'd reconsider it because Y."

## Applying this to your own capstone

Go back through a handful of real decisions from the LTV Customer Management System and write out the three-part answer for each, in your own words, before the interview — not during it:

- Why you set the org-wide defaults the way you did, and what it would cost to change them later.
- Why a particular piece of logic became a validation rule instead of a Flow (or the reverse).
- Why a specific report or dashboard component exists, and what question it answers for a stakeholder.

Doing this in advance means the answer comes out as something you already know, not something you're constructing live under pressure.

## Key terms

| Term | Meaning |
|---|---|
| Tradeoff | What a decision gains, paired with what it costs — the core unit of an architecture explanation |
| Profile sprawl | The maintenance problem of too many near-duplicate profiles created to cover small access differences |
| Hindsight question | An interview question asking what you'd change with the benefit of more scale or experience, not a request for a confession |

## Check yourself

Why does the lesson say "it's best practice" is a weaker interview answer than naming the specific tradeoff the practice resolves?
