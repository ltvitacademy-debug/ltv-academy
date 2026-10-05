# Lesson 15 — AWS Lake Formation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

AWS Lake Formation — permissions that understand databases, tables, and columns,
layered on top of IAM and the Glue Data Catalog.

## S2 · SCREENSHOT (grant resources)

The named resource method grants permissions by picking a specific database and
table directly, as opposed to granting against an LF-Tag expression.

## S3 · SCREENSHOT (table permissions)

Lake Formation has its own permission vocabulary — Alter, Insert, Drop, Delete,
Select, Describe. And Grantable permissions are tracked separately: using a
permission and being able to re-grant it to someone else are two different checkboxes.

## S4 · SCREENSHOT (data permissions)

Choosing Select unlocks data permissions — all data access by default, or narrowed
to specific columns, or down to cell-level filters combining column and row rules.

## S5 · CODE (GRANT statement)

Everything the console wizard collects maps onto a real GRANT statement — select
columns, which table, which role.

## S6 · OUTRO CARD

Chapter Four begins next: encryption and key management, Azure Key Vault and AWS
KMS side by side.
