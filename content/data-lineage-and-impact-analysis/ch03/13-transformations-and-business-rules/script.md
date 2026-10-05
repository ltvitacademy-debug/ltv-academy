# Lesson 13 — Transformations and Business Rules · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 12's chain drew every hop as a plain arrow. In a real system,
almost none of those arrows are a straight copy — something happens
at every hop, and that something is where the real complexity of
lineage actually lives.

## S2 · STEPS CARD (transformation anatomy)

A transformation has three parts worth naming separately: the input
columns it reads, the logic or rule it applies — a filter, a join, a
calculation, a mapping — and the output column it produces. Lineage
that only shows the connection, without the logic, tells you half the
story.

## S3 · CODE CARD (business rule example)

Take a calculated field: Revenue equals Price times Quantity, minus
Discount. The multiplication is mechanical. But which Discount field?
Does Revenue include tax? Those are business rules, not arithmetic —
usually decided once, written into the transformation, and then
forgotten.

## S4 · STEPS CARD (why structure alone isn't enough)

A rename is easy to document. A transformation change is harder to
see and more dangerous — the column name and location can stay
exactly the same while the business rule behind it quietly changes.
Lineage that only tracks structure misses exactly the change most
likely to break a report silently.

## S5 · OUTRO CARD

Next lesson: impact analysis — walking downstream from a proposed
change to find out, concretely, what breaks. And it starts with
exactly the kind of transformation logic this lesson just covered.
