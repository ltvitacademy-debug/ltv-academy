# Lesson 6 — Working With Stakeholders

**Chapter 1 · Thinking Like a Technical Architect · Lesson 6 of 19**

## What you'll learn

- Why an architect typically answers to several different stakeholder types with conflicting priorities, not one
- How to read a stakeholder's actual concern, whether they state it in business, technical, or risk terms
- A simple way to adjust how the same design decision gets explained depending on who's in the room
- Why managing disagreement between stakeholders is part of the job, not a sign something has gone wrong

## Different stakeholders, different native languages

A single solution typically has to satisfy a business sponsor who cares about whether it delivers the outcome they asked for on time, an end-user community who cares about whether it's actually usable in their daily work, an IT or security team who cares about whether it introduces risk, and sometimes a finance or procurement stakeholder who cares about licensing and ongoing cost. None of these groups is wrong to care about what they care about — they're each accountable for a different outcome, and a design that satisfies only one of them while quietly damaging another hasn't actually succeeded. An architect's job includes being fluent enough in each stakeholder's own priorities to engage with them on their own terms, rather than expecting every stakeholder to engage on the architect's terms.

## Reading the concern behind the question

Stakeholders rarely phrase their actual concern as cleanly as "I'm worried about security." A sponsor asking "are we sure this will be ready by the board meeting" is really asking about delivery risk. An end user asking "do I really have to click through five screens for this" is really raising a usability concern that, left unaddressed, will show up later as low adoption. A security reviewer asking "who else can see this field" is really asking whether the design respects least privilege. Part of working with stakeholders well is translating the literal question into the underlying concern it represents, the same skill Lesson 2 built for requirements, now applied to an ongoing relationship rather than a single intake conversation.

## Adjusting the explanation, not the decision

The same design decision can and should be explained differently depending on the audience, without the underlying decision changing. Explaining a choice to use a scheduled batch job instead of a real-time trigger to a business sponsor might sound like: "updates will show up within about fifteen minutes instead of instantly, which keeps the system more reliable during your busiest hours." Explaining the same decision to a technical reviewer might sound like: "we avoided a real-time trigger here to stay well under governor limits during the daily peak load, and batching lets us handle partial failures with a simple retry instead of needing per-record error recovery." Same decision, same trade-off, two framings — each pitched at what that audience actually needs to evaluate or accept the decision. An architect who can only explain a decision one way, to one audience, will eventually lose a room that needed the other framing.

## Disagreement between stakeholders is normal, not a red flag

It is common, not exceptional, for two stakeholders to want genuinely incompatible things — a sponsor wants a feature live next week, a security reviewer wants more time to properly test the access model it depends on. This isn't a sign that something has gone wrong in the project; it's a sign that two people with different accountabilities are both doing their jobs correctly. An architect's role in that moment isn't to silently pick a side, and it isn't to let the loudest stakeholder win by default. It's to make the trade-off visible to both parties — "shipping next week means this access model ships without the full review it would otherwise get, here's specifically what risk that leaves open" — and let the actual decision-makers choose with that trade-off in view, rather than discovering it after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Stakeholder | Anyone accountable for, or materially affected by, how a solution turns out |
| Underlying concern | The real worry behind a stakeholder's literally-phrased question |
| Audience-adjusted explanation | Framing the same decision differently for different audiences without changing the decision itself |
| Stakeholder conflict | Two stakeholders wanting genuinely incompatible outcomes, each for a legitimate reason |

## Lab

You've decided to store a sensitive new field as encrypted (Shield Platform Encryption or an equivalent) rather than in plain text, which will prevent that field from being used in certain standard report filters and list view sorts. Write two short explanations of this same decision: one framed for a business sponsor who only cares about reporting capability, and one framed for a security reviewer who only cares about data protection. Keep the actual decision identical in both versions — only the framing should change.

## Check yourself

Can you name at least three different stakeholder types a solution typically has to satisfy, and what each one is actually accountable for? Can you give an example of translating a literally-phrased stakeholder question into its underlying concern? Can you explain why stakeholder disagreement is a normal part of the job rather than evidence of a project problem, and what an architect should do when it happens?
