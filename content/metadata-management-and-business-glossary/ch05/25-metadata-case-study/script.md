# Lesson 25 — Metadata Case Study · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Hartwell Logistics, a fictional mid-sized freight company, has a
recurring problem: three different teams each maintain their own
spreadsheet defining on-time delivery, and the numbers in the monthly
executive report never quite match what any individual team reports
internally.

## S2 · STEPS CARD (Chapter 1 applied)

Chapter 1: the governance team identifies that on-time delivery has
business, technical, and operational metadata tangled together across
three teams, with no shared standard and no lifecycle discipline
keeping any of it current.

## S3 · STEPS CARD (Chapters 2-4 applied)

Chapter 2: they start a scoped glossary effort for exactly one domain,
delivery performance, and write one definition passing the four-part
test — on-time means arriving by the promised date, in the destination
time zone — approved with Operations as steward. Chapter 3: they
document the real column, pulling structural facts from
INFORMATION_SCHEMA and attaching the glossary-linked description.
Chapter 4: the column scores high on all four CDE criteria, so it gets
a named source system, a validation rule, and an escalation contact.

## S4 · STEPS CARD (Chapter 5 applied)

Chapter 5: the standardized definition and dictionary entry get
published into the catalog, combining an automated scan with the
curated business definition — and critically, the team embeds a link
directly inside the existing weekly operations dashboard, rather than
hoping people discover a new destination.

## S5 · OUTRO CARD

Three months later, all three teams reference the same catalog entry.
The number finally matches — not because anyone got better at math, but
because the metadata finally had one home. This closes Metadata
Management and Business Glossary. The path continues with Data Lineage
and Impact Analysis — tracing exactly how data moves, and what breaks
downstream if it changes.
