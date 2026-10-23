# Lesson 19 — Capstone: Presenting Architecture Decisions

**Chapter 6 · Capstone: Wrap-Up & Presentation · Lesson 19 of 26**

## What you'll learn

- Why presenting Phase 1 to Meridian's board is a different skill than writing the ADR Lesson 18
  already produced
- How to translate this capstone's real decisions — the category compromise, the Prairie View
  integration, the staged go-live — into language a non-technical board can actually act on
- A presentation structure that leads with the business outcome, not the implementation detail
- How to anticipate each hospital system's specific concern inside one shared room, without
  building three separate presentations
- Why this translation skill, not the diagrams themselves, is what an implementation lead is
  actually paid for

## A different audience than the ADR's

Lesson 18 wrote three artifacts for people who build and maintain this capability: a go-live
checklist, a rollback plan, and an Architecture Decision Record documenting the Prairie View
integration choice — exactly the ADR habit course 13's Lesson 3 taught, applied to this chapter's
own real decision. Meridian's board is not that audience. A hospital system CFO, a chief medical
officer, a Lakeshore administrator representing frontline staff — none of them need to know what a
Script Include is, and every one of them needs to decide whether St. Catherine's pilot earned the
green light to roll Phase 1 out to Lakeshore and Prairie View next. Presenting to this room is not
reading Lesson 18's ADR aloud. It's a different document, built from the exact same facts, aimed at
a different decision.

## Lead with the outcome, then the decisions that got you there

A board presentation that opens with "we chose a scheduled pull over a webhook" has already lost
the room. It opens instead with the outcome: one Service Desk, live in pilot at St. Catherine's,
that respects every domain boundary the board already approved, built on a four-to-five-month
timeline inside the eighteen-month window. Only after the outcome lands does each decision get
named — and each one gets named as a tradeoff resolved, not a technical fact. "We built one routing
flow instead of three, because a single flow is the only version that proves a Lakeshore request
can never land in a St. Catherine's queue by accident" says the same thing Lesson 15's Script
Include does, in a sentence a board can evaluate.

## Translating the record, not reciting it

Lesson 18's ADR format — context, options, decision, consequences — survives the translation
almost exactly, with the vocabulary swapped out. The context becomes "Prairie View's system can't
notify us when something changes." The options become "build new capability under deadline
pressure, check in on a schedule, or run a manual process by hand." The decision becomes "we check
every fifteen minutes." The consequence becomes "worker data can be up to fifteen minutes behind
reality — acceptable for a help desk, not something we'd accept for payroll." Nothing about the
reasoning changes; only the words carrying it do.

## One room, three legitimate concerns

Lesson 13's interviews surfaced three different worries, and all three people are in this room at
once. St. Catherine's needs to hear that its multi-tier categories survived as subcategories under
the shared top level. Lakeshore needs to hear that it still controls its own subcategory list.
Prairie View needs to hear the sentence that matters most to them specifically: their legacy
process stays live and fully supported until their own go-live is confirmed working, and they pilot
last, not first, specifically because they asked for a say in sequencing, not for data structure.
Naming each concern by name, in the same room, is what makes one presentation work for three very
different audiences instead of requiring three.

## Key terms

| Term | Meaning |
|---|---|
| Executive translation | Restating a technical decision's reasoning in terms a non-technical stakeholder can evaluate |
| Outcome-first structure | Opening a presentation with the business result, before any individual decision is named |
| Audience-specific concern | A stakeholder's own stated worry, addressed by name rather than folded into a generic update |
| Decision record reuse | Building a presentation from the same context/options/decision/consequences facts an ADR already captured |

## Check yourself

A board member who sat through St. Catherine's interview in Lesson 13 asks why their detailed
category scheme wasn't just kept as-is instead of being "redesigned." Using Lesson 14's actual
category resolution, write the one sentence you'd say back to them in the room — in board language,
not Script Include language.
