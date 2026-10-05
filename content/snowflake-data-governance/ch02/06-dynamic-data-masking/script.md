# Lesson 6 — Dynamic Data Masking · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter one answered who can get into a table. This chapter answers a
harder question — once someone's in, what do they actually see?
Dynamic data masking is the first tool for that.

## S2 · SCREENSHOT — Unmasked table

Here's the Tasty Bytes customer loyalty table, queried straight out of
the raw layer with no masking applied. Every column is plaintext —
name, email, phone, birthday, all exposed.

## S3 · CODE — Query as a lower-privileged role

Now the same table, queried by a lower-privileged test role instead of
an admin role. Nothing about the query itself changes — just which
role is running it.

## S4 · SCREENSHOT — Masked result

And here's what comes back. First and last name are fully masked,
phone number keeps only its first three digits, email keeps the real
domain but masks the local part, and birthday is bucketed into a
five-year range. The stored data never changed — Snowflake rewrote
what the query returned, based on the role running it.

## S5 · SCREENSHOT — Masking propagates downstream

And it's not something you can route around by querying through a
view. This is a downstream analytics view built on that same table,
queried by the same low-privileged role — still masked, with zero
extra configuration.

## S6 · OUTRO

Attach a masking policy once, at the base table, and it's enforced
everywhere that column's data flows. Next lesson: masking policies
themselves — the actual CREATE MASKING POLICY syntax behind what you
just saw.
