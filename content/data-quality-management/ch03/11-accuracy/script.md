# Lesson 11 — Accuracy · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter three is where we stop talking about data quality in the
abstract and start naming the specific dimensions you'll actually
measure. First up: accuracy.

## S2 · SCREENSHOT — SSMS

Every example from here on runs in SQL Server Management Studio — a
query window, a result grid. Nothing new to install, nothing new to
learn about the tool itself. Just new questions to ask of the data.

## S3 · STEPS — What accuracy means

Accuracy is how closely a value reflects the real-world fact it's
supposed to represent. And here's the distinction that trips people up
most: accuracy is not the same as validity. A value can be perfectly
well-formatted and still be wrong. Validity checks a rule. Accuracy
checks the truth.

## S4 · STEPS — Accuracy in practice

A phone number is accurate if it actually reaches that customer. An
inventory count is accurate if it matches what's really on the shelf.
A price is accurate if it matches what the business actually charges.
None of that is about format — it's about whether the data matches
reality.

## S5 · CODE — Compare against a reference

Because accuracy is about truth, you need something to compare
against — a trusted reference table, a system of record, an external
verification source. Here, we join the table we're checking to a
reference table and pull back every row where the two disagree.

## S6 · STEPS — How to measure it

Four common sources of truth: the system of record where the value
actually originates, an external verification service, physical or
manual confirmation, and a trusted reference table your organization
already maintains.

## S7 · CODE — Sample-based accuracy rate

When you don't have a full reference table — only a smaller audited
sample — you can still get a number. Join the sample to the target
table, flag mismatches, and aggregate into an accuracy rate you can
track release over release.

## S8 · OUTRO

Accuracy needs truth to compare against. Next up: completeness — what
happens when the data isn't wrong, it's just not there at all.
