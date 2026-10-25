# Lesson 13 — Transformations and Business Rules · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 12's chain drew every hop as a plain arrow. In a real system,
almost none of those arrows are a straight copy. A filter drops rows,
a join combines tables, a calculation derives a new column, a currency
gets converted, a status code gets mapped to a label — something
happens at every hop, and that something is where lineage's real
complexity lives.

## S2 · STEPS CARD (transformation anatomy)

A transformation has three parts worth naming separately: the input
columns it reads, the logic or rule it applies — a filter, a join, a
calculation, a mapping — and the output column it produces. Lineage
that only shows that StagingView feeds FactTable, without showing how,
tells you half the story: you can find what's connected, but not what
actually happens to the data in between.

## S3 · CODE CARD (business rule example)

Take a calculated field: Revenue equals Price times Quantity, minus
Discount. The multiplication is mechanical. But which Discount field —
the one entered at order time, or recalculated after returns? Does
Revenue include tax? Is a cancelled order's revenue zero, or excluded
entirely? Those are business rules, not arithmetic — usually decided
once, written into the transformation, and then forgotten.

## S4 · STEPS CARD (why structure alone isn't enough)

A rename is easy to document. A transformation change is harder to
see and more dangerous — the column name and location can stay exactly
the same while the business rule behind it quietly changes. Lineage
that only tracks structure misses exactly the kind of change most
likely to break a downstream report silently.

## S5 · STEPS CARD (tying back to the glossary)

Metadata Management and Business Glossary covered defining terms like
Revenue in a shared glossary. A transformation is where that
definition either gets honored in actual code, or doesn't. Checking
that a transformation's logic still matches its glossary definition is
part of documenting lineage well — a mismatch there is a common, quiet
source of numbers that don't reconcile between reports.

## S6 · OUTRO CARD

Next lesson: impact analysis — walking downstream from a proposed
change to find out, concretely, what breaks. It starts with exactly
the transformation logic this lesson covered: you can't know what
breaks until you know what a hop actually does to the data passing
through it.
