# Lesson 13 — Data Classification · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Every tag so far in this chapter started with a human deciding what's sensitive. This lesson is about Snowflake doing that work for you — automatic data classification.

## S2 · SCREENSHOT — Unclassified data

Here's a raw, untagged customer table. A person looking at this can obviously see PII — names, emails, birthdates. But nothing has formally classified it yet. Nothing downstream knows to treat it differently.

## S3 · CODE — Running SYSTEM$CLASSIFY

SYSTEM$CLASSIFY analyzes column names, data patterns, and metadata, and recommends what's sensitive. It's a recommendation-and-tagging engine, not a masking engine by itself.

## S4 · SCREENSHOT — The recommendation

Here's what comes back for BIRTHDAY_DATE: a privacy category of QUASI_IDENTIFIER, a semantic category of DATE_OF_BIRTH, and HIGH confidence. Every column gets its own recommendation object like this.

## S5 · CODE — Confirming the tags

Query TAG_REFERENCES_ALL_COLUMNS to see what actually got written.

## S6 · SCREENSHOT — Tags applied

And there they are — PRIVACY_CATEGORY tags across first name, last name, email, phone, city, country, and more. Auto_tag true didn't just recommend, it wrote these immediately.

## S7 · OUTRO

Classification labels — it doesn't mask by itself. Those tags can be wired to a masking policy exactly like Lesson 10, or just used for discovery. Next up: custom classifiers, for the sensitive formats Snowflake doesn't recognize out of the box.
