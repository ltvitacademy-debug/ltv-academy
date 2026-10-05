# Lesson 9 — Discovering Sensitive Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Classification only works on data you know exists. Most organizations
have sensitive data scattered across systems nobody fully inventoried —
this lesson is about finding it.

## S2 · STEPS CARD (why it's scattered)

Old CSV exports from retired systems. Spreadsheets built for a one-off
analysis and never deleted. Backup copies in a forgotten storage bucket.
Log files that were only supposed to record errors but accidentally
captured a customer's data. None of it was classified, because nobody
knew it was there.

## S3 · STEPS CARD (three discovery approaches)

Real discovery tooling combines three techniques. Pattern and regex-based
scanning checks whether content is *shaped* like sensitive data — an
SSN-formatted number, a credit-card checksum. Keyword and metadata-based
discovery flags fields by name, like "ssn" or "dob." Sampling-based
scanning estimates sensitivity across a whole table from a representative
sample of rows.

## S4 · STEPS CARD (real named tools)

This isn't hypothetical. Microsoft Purview, AWS Macie, and Google Cloud
DLP all ship native sensitive-data-discovery features as part of major
cloud and data platforms. This lesson names them because they're real and
worth knowing exist — not as a feature walkthrough of any one of them.

## S5 · OUTRO CARD

Discovery is a precondition for classification, not an optional add-on —
a perfect scheme applied only to the data someone remembered still leaves
everything undiscovered completely unprotected. Next lesson: once you've
found it, how you actually apply a classification label in a real system.
