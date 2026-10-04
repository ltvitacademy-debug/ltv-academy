# Lesson 12 — Documenting Tables and Columns · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

SQL Server already tracks most of a dictionary entry's structural
fields automatically, queryable through INFORMATION_SCHEMA — no manual
documentation effort required for this part.

## S2 · CODE CARD (what the database already knows)

This single query gives you name, data type, length, nullability, and
default value for every column in a table — four structural fields,
generated automatically, with zero chance of being out of sync since
it's reading the live schema itself.

## S3 · STEPS CARD (what a human still has to add)

But INFORMATION_SCHEMA can tell you IsActiveFlag is a non-nullable BIT
with a default of zero. It cannot tell you what the column means — that
active means purchased in the last 90 days. That's business context,
and it has to be written by a person.

## S4 · CODE CARD (extended properties)

SQL Server lets you attach a human-written description directly to a
column using sp_addextendedproperty, so the documentation lives with
the object instead of in a separate spreadsheet that inevitably goes
stale. It shows up right in SSMS's Object Explorer, queryable back out
with sys.extended_properties.

## S5 · OUTRO CARD

That's Lesson 11's dictionary entry made concrete — half the fields
come free from the database, the other half still require a person to
write them once and keep them current. Next: data dictionary standards
— making every entry consistent, not just complete.
