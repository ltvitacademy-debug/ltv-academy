# Stakeholder Interviews and Workshops

Requirements don't appear in a document by themselves — someone has to extract them from the people who actually do the work. This lesson covers the two main techniques a functional consultant uses to do that: one-on-one interviews and group workshops, plus the discipline needed to keep both productive.

## What you'll learn

- When to use a one-on-one interview versus a group workshop
- How to structure a requirements workshop so it doesn't run in circles
- The "parking lot" technique and why it matters
- How sign-off actually closes out a requirements session

## Interviews versus workshops

A **one-on-one interview** works well for a single process owner who can speak authoritatively about one area — the Cash Manager explaining today's reconciliation process end to end, for example. It's slower per topic but produces depth and lets a quieter SME speak freely.

A **group workshop** brings multiple stakeholders together — AP and Treasury staff in the same room discussing how a supplier payment eventually gets reconciled, for example — so that conflicts between departments surface immediately instead of in a design review weeks later. Workshops take more coordination (calendars, a room or video link, a facilitator) but are far more efficient when a process crosses departments, which most finance processes do.

## Structuring a workshop

A well-run requirements workshop has an **agenda** distributed in advance, a **facilitator** (often the functional consultant) who keeps discussion on topic, a **scribe** capturing decisions and requirement IDs in real time, and defined **objectives** for the session — walking out with answers to specific open questions, not a general conversation. Oracle Modern Best Practice process flows are often used as a visual aid during the workshop: the facilitator walks the group through the standard flow and asks, at each step, "does this work for us, or is this a gap?"

## The parking lot

Workshops drift. A tangent about a legacy system quirk, or a decision that needs someone who isn't in the room, can derail the agenda if the facilitator tries to resolve everything on the spot. The standard discipline is a **parking lot**: a visible running list of off-topic or unresolved items, captured so the group feels heard, assigned an owner, and followed up after the workshop — without burning the remaining agenda time.

## Closing out: sign-off

A workshop or interview isn't done when the meeting ends — it's done when the resulting requirements are written up, sent back to the stakeholders who provided them, and **signed off** as an accurate reflection of what was said. This step matters because it's the business's chance to catch a misunderstanding before it becomes a funded design decision. Skipping sign-off is one of the most common sources of late-stage rework on an implementation.

## Brightfield Industrial Group: a workshop in practice

Brightfield runs a Cash Management workshop with the Treasury Manager, the AP Manager, and the Cash Management functional consultant. Walking through Oracle's standard bank reconciliation flow surfaces a gap: Brightfield currently manually matches wire transfers against three regional bank accounts using a spreadsheet, a process that doesn't map directly onto Oracle's automatic reconciliation rules. That open question goes to the parking lot, assigned to the functional consultant to investigate — and becomes the seed of a fit-gap item in Chapter 2.

## Key terms

| Term | Meaning |
|---|---|
| Interview | One-on-one requirements-gathering with a single process owner |
| Workshop | Group session surfacing cross-department requirements and conflicts |
| Parking lot | A tracked list of off-topic or unresolved items raised during a workshop |
| Sign-off | Stakeholder confirmation that written-up requirements accurately reflect what was discussed |

## Recap

Interviews go deep with one stakeholder; workshops surface cross-department conflicts early. A good workshop has an agenda, a facilitator, a scribe, and a parking lot for anything that would otherwise derail it — and nothing is final until stakeholders sign off on the write-up. Brightfield's reconciliation gap, caught in a workshop, heads straight into fit-gap analysis. Next up, Chapter 2: turning everything gathered so far into a formal fit-gap analysis.
