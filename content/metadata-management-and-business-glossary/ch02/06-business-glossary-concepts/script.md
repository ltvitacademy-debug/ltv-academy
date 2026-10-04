# Lesson 6 — Business Glossary Concepts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A business glossary is a curated, approved list of business terms and
their definitions — the shared vocabulary an organization agrees to use.
Active Customer, Net Revenue, Churn — each gets exactly one official
definition that everyone is expected to use instead of inventing their
own.

## S2 · STEPS CARD (one term, one definition)

The glossary entry for Active Customer says what the term means in
business terms — a customer with a purchase in the last 90 days. It
deliberately doesn't say which column or query calculates it. That
implementation detail belongs in the data dictionary, Chapter 3.

## S3 · CODE CARD (glossary vs. technical entry)

This is the business-versus-technical metadata split from Lesson 2,
applied specifically here. A glossary term like Active Customer is
owned by a business steward and answers what it means. A technical
entry like IsActiveFlag is owned by the system and answers what it
structurally is.

## S4 · STEPS CARD (what a real entry contains)

A minimal, usable glossary entry includes the term itself, a
plain-language definition, an owner accountable for keeping it accurate,
a status — approved, draft, or deprecated — and related terms. This maps
directly onto the six core metadata fields from Lesson 3.

## S5 · OUTRO CARD

The most common mistake: building a glossary one table at a time, so it
just restates the schema. A good glossary is organized around what the
business actually talks about, regardless of how many tables implement
it. Next lesson: writing good definitions — the hardest part of a
glossary isn't the list, it's the wording.
