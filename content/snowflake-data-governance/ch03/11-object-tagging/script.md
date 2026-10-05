# Lesson 11 — Object Tagging · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Before Lesson 10's masking trick, there's the feature underneath it — the object tag itself. This lesson is about tagging as a general-purpose governance feature.

## S2 · CODE — Create the tag

A tag is a key, optionally with a constrained list of allowed values. On its own, right now, it does nothing — it's pure metadata. What a tag enables depends entirely on what gets wired up to react to it.

## S3 · SCREENSHOT — Manually tagged columns

Applied by hand, with ALTER TABLE, this is the most common case: a human decides a column holds PII and tags it accordingly.

## S4 · CODE — Applying the tag

Same tag key, different value per column, recording what kind of PII each one actually holds.

## S5 · CODE — Querying what's tagged

TAG_REFERENCES_ALL_COLUMNS is the query pattern that works no matter who — or what — applied the tag. Tags aren't limited to columns either — databases, schemas, and warehouses can all be tagged too, for things that have nothing to do with PII, like cost-center tracking.

## S6 · SCREENSHOT — System-applied tags

Not every tag is manual. This is one of Snowflake's own system tags, PRIVACY_CATEGORY, applied automatically by data classification — nobody wrote a CREATE TAG statement for this one.

## S7 · SCREENSHOT — Custom classifier tag

And a third origin: a tag applied by a custom classifier's own logic, which Lesson 14 covers in full. Same querying pattern confirms it, regardless of source.

## S8 · OUTRO

Three different origins, one consistent query pattern. Next up: what happens when tagging — and classification — gets applied at the scale of an entire schema.
