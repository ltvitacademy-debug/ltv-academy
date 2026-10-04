# Lesson 14 — Building a Data Dictionary · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This lesson is a concrete, repeatable process for building a
dictionary, mirroring Lesson 10's glossary process.

## S2 · STEPS CARD (six steps)

Six steps. Pull the schema first, don't start from a blank page —
INFORMATION_SCHEMA gives you real columns for free. Prioritize the
tables people actually query. Write descriptions, enforcing last
lesson's three standards. Attach them with extended properties. Link to
the glossary wherever a column implements a business concept. And
publish it somewhere searchable.

## S3 · CODE CARD (worked mini-dictionary)

Here's a worked mini-dictionary for three columns from dbo.Customer.
CustomerId, an INT, not null, unique identifier, primary key.
IsActiveFlag, a BIT, linked to the Active Customer glossary term,
recalculated nightly. LastPurchaseDate, nullable, the customer's most
recent completed order.

## S4 · STEPS CARD (what to document first)

Facing an entire database with hundreds of tables, use this priority
order: tables referenced in existing reports first, then tables with
the most confusing column names, then everything else roughly by how
often it actually gets queried. A table nobody's touched in two years
can wait.

## S5 · OUTRO CARD

A real, trustworthy three-column dictionary beats an aspirational
hundred-table one that's half-finished and half-wrong. Next lesson:
keeping dictionaries current — building it is only half the job.
