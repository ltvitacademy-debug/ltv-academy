# Lesson 8 — Ownership · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 8: ownership — the one principal that starts with every privilege on an object, by default.

## S2 · STEPS — The default principal

Every securable object has exactly one owner — by default, whoever created it. Owners automatically have all privileges on the object, including the right to grant privileges to others, with no GRANT statement required. And ownership compounds down the hierarchy: own a catalog, and you can manage every schema and table inside it, even ones you didn't create.

## S3 · CODE — Viewing and transferring ownership

DESCRIBE TABLE EXTENDED shows you who currently owns an object. Transferring ownership is one ALTER statement — ALTER TABLE, SCHEMA, or CATALOG, OWNER TO — and it works the same way across every securable type.

## S4 · STEPS — The privilege-escalation guardrail

There's one deliberate restriction. For views, functions, and models, only a metastore admin can transfer ownership to just anyone in the account. A regular owner can only transfer those three object types to themselves or to a group they're already in — not to an arbitrary third party. Tables, catalogs, and schemas don't carry that extra restriction.

## S5 · CODE — A common pattern: group ownership

Here's why that matters in practice: transferring a view's ownership to a group enables collaborative editing. Every member of that group can edit the view's definition, while the actual data it exposes is still governed by whatever privileges the group holds on the underlying tables.

## S6 · OUTRO

Next lesson: inheritance of permissions — why a single grant on a catalog reaches every table inside it, automatically.
