# Lesson 3 — Metadata Standards · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Data Governance Foundations covered data standards — rules about the
data itself. Metadata standards are one level up: rules about how you
describe data consistently, so descriptions written by different teams,
years apart, still mean the same thing.

## S2 · STEPS CARD (one level up)

A data standard says account numbers must be 10 digits. A metadata
standard says every glossary entry must have a name, a definition, an
owner, and a status. Without that second kind of standard, you can't
build a reliable catalog out of wildly inconsistent entries.

## S3 · CODE CARD (ISO/IEC 11179 data element)

ISO/IEC 11179 is the most widely cited standard for this. Its core idea
is the data element, built from three parts: object class — the
real-world thing, like Customer; property — the specific characteristic,
like Date of Birth; and representation — how it's actually stored, a
DATE value in YYYY-MM-DD format. Together, that's one fully specified,
unambiguous data element.

## S4 · STEPS CARD (six core fields)

Regardless of which specific standard you adopt, mature practice
converges on the same six core fields: name, definition, data type,
owner, status, and last-reviewed date. An entry missing several of these
isn't wrong, exactly — it's incomplete, and incomplete entries are what
makes a catalog unreliable to search.

## S5 · OUTRO CARD

Data standards and metadata standards reinforce each other — a
well-named, well-typed column is much easier to document well than a
poorly named one. Next lesson: the metadata management lifecycle —
standards tell you the shape, the lifecycle tells you the process.
