# Lesson 1 — What Data Quality Is · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Data Quality Management. Before we touch a single SQL query, we need a working definition of the thing this whole course is about — and the definition most people reach for first is actually wrong.

## S2 · STEPS — Three definitions that sound right and aren't

Ask around, and you'll hear data quality defined as "no errors," "fully complete," or "matches reality." Each one sounds reasonable. Each one is only part of the picture — a table can ace all three and still fail the one thing the business actually needed it for.

## S3 · STEPS — Fitness for use

The field's real definition, from DAMA's Data Management Body of Knowledge, is fitness for use: the degree to which data is fit for its intended purpose. Fit for purpose is relative — a phone number missing an area code is useless for an SMS platform, completely fine for a support agent who already knows the region. Same data, two different verdicts.

## S4 · STEPS — Six dimensions, previewed

Quality isn't one number — it's six distinct dimensions: accuracy, completeness, consistency, validity, uniqueness, and timeliness. Notice "error-free" isn't on that list by itself. Lesson 2 gives each of these six a full, standalone treatment.

## S5 · STEPS — Who decides "fit"?

And here's the part that trips teams up: fitness for purpose is a judgment call made by the people who actually use the data, not a fixed checklist owned by whoever manages the database. Lesson 4 spends a whole lesson on exactly who holds that responsibility.

## S6 · OUTRO

Every lesson from here forward — profiling, the six dimensions, rules and checks, remediation — exists to answer one question for a specific, real use of the data: is this fit for purpose? Next up: a full tour of those six dimensions.
