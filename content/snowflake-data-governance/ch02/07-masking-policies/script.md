# Lesson 7 — Masking Policies · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Last lesson showed you what masking looks like from the querying side.
This lesson is about writing the policy object itself.

## S2 · SCREENSHOT — Columns need different policy types

Different columns need different policies. Name, e-mail, and phone are
all string-typed. Birthday is date-typed. Snowflake requires a
policy's RETURNS type to match the column it's attached to — you
can't mix them.

## S3 · CODE — The two real policies

Here are both real policies side by side. Privileged roles exit
immediately with the real value. Everything else falls through to a
tag check — phone gets partial masking, email keeps its domain,
everything else is fully masked. The date policy follows the same
shape, just with a bucketing expression instead of string logic.

## S4 · SCREENSHOT — Date masking result

Here's what the date policy actually produces — birthday bucketed to
the first of a five-year window — sitting right next to the
string-masked columns, which come from a completely separate policy
object.

## S5 · CODE — Managing policies

Once a policy exists, you manage it like any other object. SHOW lists
every policy in a schema, DESCRIBE prints one policy's exact
definition, and SET or UNSET MASKING POLICY on ALTER TABLE attaches or
removes it directly from a column — no tag required.

## S6 · SCREENSHOT — Assignment is invisible at query time

Whether a policy reached a column directly or through a tag, the
querying role can't tell the difference, and doesn't need to — only
the masking behavior itself is visible.

## S7 · OUTRO

Next lesson: row access policies — the row-level counterpart to
everything you just saw at the column level.
