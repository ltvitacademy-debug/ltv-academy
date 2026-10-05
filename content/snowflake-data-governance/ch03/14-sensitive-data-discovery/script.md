# Lesson 14 — Sensitive Data Discovery · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Built-in classification is smart, but it only knows what it's been taught. This lesson is about teaching it something new — custom classifiers.

## S2 · SCREENSHOT — An unrecognized format

Here's a PLACEKEY column — a real third-party location-identifier format. It looks structured and sensitive, but nothing built-in has any idea what to make of this pattern.

## S3 · CODE — Testing the regex

Before teaching this to a classifier, confirm the pattern actually matches, as a plain SELECT WHERE REGEXP.

## S4 · SCREENSHOT — Pattern confirmed

Thirteen thousand rows matched. Confirm the pattern works on its own before wiring it into anything else — much easier to debug here than inside a classifier.

## S5 · CODE — Building the custom classifier

A custom classifier is created in your own schema, then taught a pattern with ADD_REGEX: a semantic category you invent, a privacy category, the regex itself, a column-name hint, and a description.

## S6 · SCREENSHOT — Running it

Once registered, the custom classifier runs alongside Snowflake's built-in ones in the exact same SYSTEM$CLASSIFY call — just list it by name.

## S7 · CODE — Classify with the custom classifier

custom_classifiers takes a list — here, just placekey — and auto_tag writes the result immediately, same as any other classify call.

## S8 · SCREENSHOT — Discovery confirmed

And here's the proof: the PLACEKEY column now carries a SEMANTIC_CATEGORY tag of PLACEKEY. Same querying pattern as every other tag in this chapter — discovery complete, ready for whatever policy comes next.

## S9 · OUTRO

That's custom discovery — organization-specific formats, found and flagged with the same tooling as everything else in this chapter. Next up: the capstone lesson, tying roles, masking, and tags together.
