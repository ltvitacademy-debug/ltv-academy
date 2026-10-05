# Lesson 14 — Attribute-Based Access Control and Governed Tags · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Rather than writing a separate rule for every table, this lesson covers policies that key off how data is tagged — and automatically apply to new data too.

## S2 · STEPS — What makes a tag governed

An ordinary tag is just a key-value pair anyone with permission can set. A governed tag adds a tag policy — it restricts which values are allowed, and who can assign it, enforced consistently across every workspace in the account. Governed tags show up with a lock icon in the assignment UI; Databricks' own built-in system tags show a wrench instead.

## S3 · SCREENSHOT — Assigning a governed tag

This is the real tag-assignment dialog in Catalog Explorer. Marketing and pii are locked, governed tags — only users with the right permission can set their values. The sap.PersonalData and system tags carry a wrench: Databricks defines and maintains those, and nobody can edit them.

## S4 · SCREENSHOT — System tags out of the box

Some governed tags ship with Databricks and need no setup — system.certification_status marks data as certified or deprecated, and the class dot star family is what automatic data classification applies to sensitive columns, which the next lesson covers.

## S5 · SCREENSHOT — Tag inheritance

Tag a catalog once, and every schema and table inside it inherits that tag automatically. Columns are the one exception — they never inherit, so a column always needs its own direct tag.

## S6 · CODE — A real ABAC policy

Here's a real CREATE POLICY statement. It scopes to a catalog, masks any column tagged PII on any table tagged HR, for everyone except HR admins — and because it matches by tag instead of naming tables, it automatically covers tables created after the policy was written.

## S7 · OUTRO

Next lesson: sensitive data governance — how Databricks finds and tags the PII living in your tables automatically, instead of someone tagging it by hand.
