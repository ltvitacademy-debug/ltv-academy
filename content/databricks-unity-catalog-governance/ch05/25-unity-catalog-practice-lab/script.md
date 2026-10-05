# Lesson 25 — Unity Catalog Practice Lab · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This is the lab where you stop watching and start building. One
scenario, every chapter of this course, applied in sequence, in your
own workspace.

## S2 · STEPS CARD (four parts)

Four parts, in order. Foundations and permissions: a catalog, a schema,
a schema-level grant. Fine-grained security: a mask and a row filter on
one real table. Discovery and audit: comments, and a real query against
a system table. And Lakehouse governance: a share, a recipient, and a
revoke.

## S3 · CODE CARD (foundations + permissions)

Start with the catalog and schema, then grant at the schema level — USE
CATALOG, USE SCHEMA, SELECT — to a group, not a person. Any table you
add to lab-dot-sales later inherits this automatically.

## S4 · CODE CARD (fine-grained security)

One table, two audiences. SET MASK attaches a function that redacts the
email column for everyone except the group you choose. SET ROW FILTER
restricts which rows a group even sees. Same physical table underneath
both times.

## S5 · CODE CARD (sharing, then revoking)

Create a share, add a summarized view to it, create a recipient, and
grant it SELECT. Then — and this is the part people skip — actually
revoke it, and confirm with SHOW GRANTS that the access is really gone.

## S6 · STEPS CARD (self-check)

Four things to verify before you call this done: SHOW GRANTS ON SCHEMA
lists your group, DESCRIBE TABLE EXTENDED shows both the mask and the
filter attached, a system-table query returns your own activity, and
SHOW GRANTS ON SHARE comes back empty after your revoke.

## S7 · OUTRO CARD

That's the whole course — metastores, permissions, fine-grained
security, auditing, and sharing, all in one working lab. Well done. The
Data Governance path continues next with Snowflake Data Governance —
the same questions, answered with a different platform's roles, secure
views, and sharing model.
