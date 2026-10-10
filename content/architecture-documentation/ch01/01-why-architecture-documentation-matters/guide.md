# Lesson 1 — Why Architecture Documentation Matters

**Chapter 1 · Documenting Architecture · Lesson 1 of 17**

## What you'll learn

- Why a solution that lives only in one architect's head is a business risk, not just an inconvenience
- The four concrete jobs architecture documentation does that a verbal explanation can't
- What "documentation debt" is and how it accumulates the same way technical debt does
- Where documentation fits in the Salesforce Certified Technical Architect (CTA) skill set

## The org that only one person understands

Every experienced Salesforce architect has inherited an org like this: dozens of custom objects, a web of Flows and triggers, three different integration patterns talking to the same external system, and a sharing model nobody can fully explain. The person who built it left the company eighteen months ago. Nothing is written down. Every question — "why does this Flow exist," "what calls this Apex class," "why is this field on two objects" — turns into an afternoon of digging through Setup and guessing at intent from code comments that may or may not still be accurate.

This is not a hypothetical. It's the default outcome of building without documenting, because Salesforce makes it so easy to build that documentation feels like the thing you'll get to later. The platform's low-code tools reward fast iteration; they do nothing to force an architect to explain *why* a decision was made. Architecture documentation is the deliberate, separate practice of writing that "why" down before it disappears along with the person who knew it.

## Four jobs documentation does that memory can't

**Knowledge transfer.** People leave projects — they change roles, move to new clients, retire. A design that exists only as tribal knowledge has a single point of failure: the one person who remembers it. Written documentation survives staff turnover.

**Decision traceability.** Six months after a design decision, someone will ask "why did we choose Platform Events instead of a scheduled batch job for this integration?" Without a record, the honest answer is often "we don't actually remember, but reversing it now feels risky." Documentation captures the reasoning, the alternatives considered, and the trade-offs accepted — not just the final choice. Lesson 6 covers the specific format architects use for this: the architecture decision record.

**Review and governance.** A Salesforce architecture review board — whether an internal governance committee or, at the top of the certification ladder, the CTA Review Board itself — evaluates a design by reading and questioning it, not by reading the architect's mind. Trailhead's own description of the Architect Review Board Evaluation and Exam centers on presenting and defending a solution against a panel of experienced architects. You cannot defend a design you can't first lay out clearly on paper.

**Scale.** One architect can hold an entire small org's design in their head. Nobody holds a 200-object enterprise org, three years of incremental changes, and four integrated external systems in their head. Past a certain size, documentation isn't a nice-to-have add-on to the architecture — it effectively *is* how the architecture continues to exist as a coherent thing at all, rather than a collection of disconnected decisions.

## Documentation debt

Technical debt is the gap between the quickest way to ship something and the way that will hold up over time. **Documentation debt** is the same idea applied to knowledge: every undocumented decision, every diagram that falls out of sync with the actual org, every "I'll write it up later" that never happens, is debt that accrues interest. The interest gets paid by whoever has to reverse-engineer the design later — often at the worst possible time, during an incident or a rushed handover.

Like technical debt, documentation debt is sometimes a reasonable short-term trade — a true emergency fix doesn't always get a design doc first. The problem is treating that exception as the default, so the debt never gets paid down and simply compounds project after project.

## Key terms

| Term | Meaning |
|---|---|
| Architecture documentation | The written artifacts (documents, diagrams, records) that capture a system's design and the reasoning behind it |
| Tribal knowledge | Design understanding that exists only in people's heads, not in any written form |
| Documentation debt | The accumulating cost of undocumented or stale decisions, paid later by whoever has to reconstruct them |
| CTA Review Board | The panel of experienced architects who evaluate a candidate's solution design as the final step of the Certified Technical Architect credential |

## Lab

Pick a Salesforce org you've worked in (a client org, a Trailhead playground you've customized, or a past project). Without opening Setup, write down from memory: every custom object and what it's for, every integration touching the org, and the reasoning behind one non-obvious configuration choice you remember making. Then open Setup and check your memory against reality. Note every place your memory was wrong, incomplete, or simply blank — that gap is exactly the documentation debt this lesson describes, made concrete.

## Check yourself

Can you name the four jobs documentation does that verbal explanation can't? Can you explain, in your own words, why a Salesforce CTA Review Board candidate must document a design clearly even though they're ultimately defending it live?
