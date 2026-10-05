# Lesson 10 — Tag-Based Masking · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Three is about tags — and the single most useful thing a tag can do is carry a masking policy for you. This is tag-based masking.

## S2 · SCREENSHOT — Tag applied to PII columns

Here's the same `TASTY_PII` tag, applied once, to five columns on `customer_loyalty` — each with its own value: NAME, PHONE_NUMBER, EMAIL, BIRTHDAY. One tag, five columns, queried back with `TAG_REFERENCES_ALL_COLUMNS`.

## S3 · CODE — Create the tag

It starts with a plain `CREATE TAG`, with a constrained list of allowed values. Try to tag a column with a value outside that list and Snowflake rejects it — that's what keeps tagging consistent across a large account.

## S4 · CODE — Apply the tag to columns

Each column gets the same tag key but a different value, recording what kind of PII it actually holds. On its own, right now, this tag does nothing to the data. Nothing is masked yet.

## S5 · CODE — Attach the policy to the tag

This is the payoff statement. `ALTER TAG ... SET MASKING POLICY` — attached to the tag itself, not to any column. The moment this runs, every column carrying the tag is protected. Notice there are two policies here, one per data type, because a tag can only hold one masking policy per type.

## S6 · SCREENSHOT — Masking triggered by the tag

Query the table as a role without the unmask privilege, and everything protected comes back masked — not because a policy was ever set on these columns directly, but because they carry a tag, and that tag now has a policy attached.

## S7 · SCREENSHOT — Propagates to views

Same masking, now seen through a downstream analytics view. Because the tag lives on the base table's columns, every view built on top inherits the protection automatically.

## S8 · OUTRO

That's the scale argument for tags in one lesson. Next up: object tagging as a general-purpose feature, beyond just masking.
