# Lesson 28 — Executive Presentation

**Chapter 5 · Deliverables · Lesson 28 of 33**

## What you'll learn

- How the executive presentation differs from the technical architecture document in audience and depth
- The specific slide structure LTV Global's CIO sponsor needs to carry this design to leadership
- Why the presentation leads with business outcomes, not architecture layers
- How this deliverable is the direct bridge into Chapter 6's Architecture Review Board defense

## A different document for a different audience

The technical architecture document (Lesson 27) is written for someone willing to read forty pages of detail. The **executive presentation** is written for someone who has fifteen minutes and needs to leave the room understanding what's being built, why it costs what it costs, and what risk they're accepting by approving it. Reusing the TAD's structure for this audience — walking through thirteen design areas in architecture-lesson order — would lose the room within the first three slides. The executive presentation needs its own structure, built around what an executive actually needs to decide.

## LTV Global's executive presentation structure

- **Slide 1-2: The business problem.** Lesson 3's business drivers (fragmentation, growth, cost, competitive pressure) — stated in business terms, not architecture terms, because this is the "why are we doing this at all" framing an executive needs before anything else.
- **Slide 3: The vision.** Lesson 5's target-state vision statement, nearly verbatim — it was written at exactly this altitude for exactly this reason.
- **Slide 4-5: What's being built, at a glance.** A simplified version of the integration landscape diagram (Lesson 24) and the single-org decision (Lesson 7), stated as outcomes ("one platform, one customer view") rather than architecture vocabulary.
- **Slide 6: Key risks and how they're managed.** Three or four of the highest-impact items from the formalized risk register (Lesson 25), stated in business consequence terms ("a mis-sized customer portal could mean unacceptable cost or slow performance for millions of users") rather than technical terms.
- **Slide 7: The roadmap, at a glance.** Lesson 26's five phases, compressed to a single timeline visual with no dependency detail — executives need to know when, not why that specific sequencing was chosen.
- **Slide 8: The ask.** What specifically is being requested of leadership right now (budget approval, a go/no-go decision, sign-off to proceed to the next phase).

## Why this leads with outcomes, not architecture

A technical audience wants to understand the reasoning that justifies a decision. An executive audience wants to understand the decision's consequence for the business, and trusts that the reasoning exists and has been vetted (which is exactly what Chapter 6's ARB defense is for) without needing to personally re-derive it. Leading with "we chose a single global org because of a specific trade-off analysis" loses an executive audience that mainly needs to hear "one platform means every business unit sees the same customer" — the trade-off reasoning still exists and still matters, but it belongs in the TAD, not on slide 4 of an executive deck.

## The bridge into Chapter 6

This presentation isn't a side deliverable — it's the artifact the CIO sponsor (Lesson 3's executive sponsor) uses to carry this design, through the architect, in front of the Architecture Review Board. Everything built in this chapter — the diagrams, the formalized risk register, the ADRs, the roadmap, the TAD, and now this presentation — exists specifically so that Chapter 6's defense has real material to draw on, rather than the architect improvising answers live for the first time.

## Key terms

| Term | Meaning |
|---|---|
| Executive presentation | A short, outcome-focused deck summarizing the architecture for a leadership audience |
| Business consequence framing | Stating a risk or decision in terms of its business impact, not its technical mechanism |
| The ask | The specific decision or approval a presentation is requesting from its audience |

## Lab

Take the risk register's Risk #4 (Experience Cloud scaling for millions of end-customer logins) and write its "Slide 6" version: one sentence stating the risk in business consequence terms an executive would understand, with no Salesforce-specific vocabulary (no "license type," no "sharing set") at all.

## Check yourself

Can you explain, in your own words, why the executive presentation uses a completely different structure from the TAD rather than a condensed version of the same outline? Can you state what makes this deliverable the direct bridge into Chapter 6, rather than just one more document produced in Chapter 5?
