# Lesson 4 — Case Study: Multi-Business-Unit CRM

**Chapter 1 · Application Case Studies · Lesson 4 of 16**

## What you'll learn

- Why "single org vs. multi-org" is a real architectural fork, not a default anyone should assume
- What a business-unit field can and cannot do on its own, without sharing rules behind it
- Why acquisitions tend to produce accidental multi-org estates rather than deliberate ones
- How to frame a consolidation-vs-autonomy decision as tradeoffs, not a right-or-wrong answer

## The scenario: Ferro Holdings

Ferro Holdings has grown by acquiring three smaller companies over five years: a tools distributor, a safety-equipment maker, and a logistics firm. Each came with its own Salesforce org, built independently, with its own fields, processes, and sales teams. Group leadership now wants "one view of the customer" across all three units, since some of Ferro's biggest customers buy from more than one unit and currently show up as three unrelated, disconnected accounts. The request sounds like a technology integration problem; it's actually a decision about how centralized Ferro wants to be, with the technology following from that decision rather than driving it.

## Single org vs. multi-org is a real fork, not a default

Consolidating to a single org gives Ferro what it's actually asking for most directly: one Account record per customer, one combined pipeline report, and shared infrastructure costs instead of three separate licenses, integrations, and admin teams. The cost is real too — each unit's distinct processes, which may differ for good reasons (the logistics firm's sales cycle and the tools distributor's sales cycle are genuinely different businesses), now have to be reconciled into shared objects, and any one unit's customization risk (a runaway automation, a bad deploy) now has blast radius across the whole combined org instead of being contained to that unit alone.

Staying multi-org, or some hybrid, keeps each unit's autonomy and isolates risk, but it keeps the exact problem Ferro is trying to solve: no single combined view of a customer who buys from two units, and every cross-unit report has to be built by joining data across org boundaries rather than within one. Neither answer is free, and an architect's job is to make that tradeoff explicit to Ferro's leadership rather than assuming consolidation is automatically correct just because "one view of the customer" sounds appealing on a slide.

## If consolidating, a business-unit field is the start of the design, not the whole thing

Say Ferro decides to consolidate into a single org. A **business-unit field** (a picklist or lookup on Account, Contact, and Opportunity identifying which of the three units a record belongs to) is the natural way to tag every record for reporting and filtering — but by itself, a field does nothing to control who can see what. A tools-distributor rep querying Opportunities with no further configuration would, under a sufficiently open organization-wide default, see every unit's deals, including the safety-equipment unit's confidential enterprise negotiations. The business-unit field has to be paired with a sharing mechanism — a criteria-based sharing rule keyed off that same field, or, where Ferro's three units need materially different page layouts and sales stages (likely, since they were independent businesses with independent processes before the acquisitions), record types per unit as covered in Lesson 1, with sharing rules layered on top of those.

This is the same two-part pattern from Lesson 1 applied at a bigger scale: the business-unit field (or record type) answers "what kind of record is this and which process does it follow," and the sharing rule answers "who gets to see it" — and a consolidation plan that only does the first half ships a reporting win alongside an access-control failure.

## Multi-org estates are usually accidents, not designs

It's worth naming directly: Ferro didn't end up with three orgs because an architect decided multi-org was the right call — it happened because each acquisition kept its existing org rather than migrating. That's the common path into a multi-org estate in practice, which matters for how this case gets presented to leadership: the current state isn't a deliberate architecture that needs defending, it's an unplanned byproduct of how the acquisitions happened, and the consolidation decision should be evaluated on its own merits now, not treated as undoing someone's earlier intentional choice.

## Key terms

| Term | Meaning |
|---|---|
| Single-org strategy | Running one Salesforce org for the whole enterprise, trading per-unit customization freedom for unified reporting and lower overhead |
| Multi-org strategy | Running separate orgs per business unit or region, trading unified visibility for isolation and autonomy |
| Business-unit field | A field tagging which business unit a record belongs to, used for reporting and as a sharing-rule criterion — but not a sharing mechanism by itself |
| Org consolidation | The migration project of merging multiple existing orgs' data and processes into one |

## Lab

Ferro's leadership, after seeing the consolidation tradeoffs, decides to consolidate but wants to keep each unit's pricing confidential from the other two units' sales reps, even after merging into one org. Write a short design note: (1) what OWD setting on Opportunity this requirement implies as the safe starting point, (2) what specific sharing rule, keyed on the business-unit field, would restore each unit's reps' visibility into only their own unit's deals, and (3) one reason a single combined pipeline report for group leadership still works under this design even though individual reps can't see across units.

## Check yourself

Can you explain why a business-unit field alone doesn't solve the access-control half of a multi-business-unit consolidation? Can you state, without looking back, the two concrete costs of consolidating to a single org that this lesson names, and the one specific problem staying multi-org fails to solve?
