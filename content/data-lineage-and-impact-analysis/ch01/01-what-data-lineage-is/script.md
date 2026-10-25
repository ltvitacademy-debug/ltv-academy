# Lesson 1 — What Data Lineage Is · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Metadata Management & Business Glossary gave you the vocabulary and the
inventory — what a column is called, what it means, who owns it, and
where it lives in the catalog. This course goes deep on the next layer:
lineage, the recorded path data takes from where it originates to
everywhere it ends up, through every transformation along the way.

## S2 · STEPS CARD (sharper definition)

A plain definition — "tracking where data comes from" — is accurate but
incomplete; it misses the every-transformation part, where most real
problems hide. The sharper version: lineage lets you answer, step by
step, exactly how a number got to be the number you're looking at, and
exactly what else would be affected if any step in that chain changed. A
revenue figure on a dashboard didn't appear from nowhere.

## S3 · STEPS CARD (package tracking analogy)

A shipped package gets scanned at every stage — pickup at the warehouse,
a sorting facility, a truck, delivery. The tracking page isn't the
package, it's the recorded path it took, hop by hop. Data lineage does
the same job: a source system, an extraction job, a transformation step,
a warehouse load, a semantic model, a dashboard. Each arrow is a hop —
the lineage equivalent of a package scan. If a number looks wrong, you
don't guess; you walk the hops backward until you find where it
diverged.

## S4 · STEPS CARD (three examples)

You already use lineage thinking. A bank wire's trail — sent from one
account, cleared through an intermediary, deposited to another — lets
anyone retrace exactly how funds moved. A document's version history,
like Track Changes in Word or Google Docs' revision history, records who
changed a paragraph, when, and what it looked like before. A food
label's sourcing trail — grown in one region, processed at one facility,
packaged at another — is farm-to-table lineage.

## S5 · STEPS CARD (two terms to lock in)

Two terms worth locking in now. A hop is one recorded step in a data's
path — an extraction, a transformation, or a load. A source system is
where a piece of data originates, before any lineage hop has happened to
it. Together they're the vocabulary the rest of this course builds on:
every lineage record is just a chain of hops starting from a source
system.

## S6 · OUTRO CARD

Over this course's five chapters, you'll go from these core concepts, to
tracing data through real system types, to using lineage for impact
analysis, to documenting it, and finally to applying all of it in
realistic scenarios. Next lesson: why lineage matters, and what actually
breaks without it.
