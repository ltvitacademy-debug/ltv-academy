# Lesson 17 — Handling Objections on Delivery and Governance

**Chapter 3 · Presenting and Defending · Lesson 17 of 21**

## What you'll learn

- The recurring objection patterns around timeline feasibility, release strategy, and org governance
- How to defend a phased delivery plan against a challenge that it's "too slow" or "too risky"
- How DevOps/ALM choices (change sets vs. a source-driven model) show up as a governance objection, not just a tooling detail
- How to apply model answers to delivery and governance objections drawn from earlier case studies

## Delivery and governance objections test whether the plan survives contact with reality

Where Lesson 16's objections probed whether a technical number holds up at scale, this lesson's objections probe whether the project itself — the people, the timeline, the release process, the ongoing operation of the org afterward — actually holds up. A technically perfect design that no team could realistically deliver on the stated timeline, or that leaves the org ungovernable six months after launch, fails a review board just as surely as a technically broken one.

## Objection pattern one: "your timeline is too aggressive" or "too conservative"

Meridian Outfitters' design (Lesson 1) explicitly rejected full org consolidation within the nine-month window as too risky, but a panelist might still push: "even your reduced-scope plan — Data Cloud, event sync, archive object — is ambitious for nine months with three uncoordinated regional teams. What's your actual delivery risk here?" The model answer doesn't claim the timeline is risk-free; it names the delivery risk explicitly (per Lesson 11's categories) and states the specific mitigation: "the biggest delivery risk is coordination across three teams that don't collaborate well today, so the plan sequences this specifically — the Data Cloud identity-resolution layer ships first and independently, since it needs the least cross-team coordination, with the event-driven inventory sync following once that foundation is proven, rather than attempting all three workstreams in parallel from day one." This answer treats the panel's skepticism as valid and responds with sequencing logic, not with false confidence that nine months was always comfortable.

## Objection pattern two: "how do you keep this org governable after launch"

A design can launch successfully and still create a governance problem months later if nobody planned for how changes get made safely afterward. For a dealer-network platform like Carrow Equipment's (Lesson 4), supporting both internal admin changes and ongoing B2B Commerce configuration updates, a panelist might ask: "how do changes get promoted through your environments without one team's commerce catalog update breaking another team's sharing-rule change?" A credible answer names a specific release discipline: a source-driven development model, where all metadata changes flow through a single tracked repository rather than being made ad hoc directly in production, with each environment's state traceable back to what was actually promoted and when — distinct from an older change-set-based approach where changes move between orgs without a shared, version-controlled source of truth, and conflicts between simultaneous changes are harder to catch before they collide in production.

## Objection pattern three: "what happens when the person who built this leaves"

This objection tests whether a design depends on tribal knowledge. For Fenwick State University's advising design (Lesson 7), built on EDA's relationship and affiliation objects, a fair challenge is: "if the person who configured your advisor-assignment logic leaves, can anyone else maintain it?" The strong answer points to using the platform's standard, documented extension points — building new advising-specific objects that reference EDA's existing affiliation and relationship model, rather than inventing an undocumented parallel structure — specifically because a design built on the platform's own standard patterns is maintainable by any admin or architect familiar with that standard pattern, not just by whoever happened to build it.

## Governance objections reward boring, standard answers

Unlike some technical objections where a clever, scenario-specific answer is genuinely the best one, delivery and governance objections usually reward the boring, standard, well-documented answer over a clever one: a source-driven release process over an ad hoc one, a design built on documented platform patterns over a custom one nobody else could pick up. A panel pushing on governance is testing whether the candidate understands that "clever and fragile" is a worse answer here than "standard and maintainable."

## Key terms

| Term | Meaning |
|---|---|
| Delivery sequencing | Ordering workstreams so the ones needing the least coordination ship first, reducing coordination risk |
| Source-driven development | A release model where all metadata changes flow through a tracked, version-controlled repository rather than ad hoc org changes |
| Tribal-knowledge risk | The risk that a design can only be maintained by the specific person who originally built it |
| Standard platform pattern | A documented, widely-understood extension point, preferred in governance contexts over a clever custom one |

## Lab

Write a model answer to this objection about Lesson 5's Public Sector Case Management design: "Three benefit programs, strict need-to-know sharing, and cross-program consent gates sound like a lot of interacting configuration. How does the department avoid one program's admin accidentally loosening another program's sharing rules during a routine update?" Name a specific governance mechanism, not just "careful testing."

## Check yourself

Can you explain why delivery and governance objections typically reward standard, well-documented answers over clever custom ones? Can you state, in one sentence, the difference between claiming a timeline is risk-free and naming the specific delivery risk with a sequencing mitigation?
