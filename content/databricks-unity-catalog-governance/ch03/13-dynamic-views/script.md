# Lesson 13 — Dynamic Views · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Before row filters and column masks existed, Unity Catalog had one mechanism for fine-grained security — dynamic views. It still works today.

## S2 · STEPS — What makes a view dynamic

A dynamic view is an ordinary view whose SELECT statement contains the access-control logic itself — a CASE expression or WHERE clause that changes depending on who's running the query. Three functions make it work: is_account_group_member for account-level groups, the older is_member for legacy workspace-level groups, and session_user for identity-based logic.

## S3 · CODE — Column-level permissions

Here's the real pattern for redacting a column: a CASE expression inside the SELECT. Auditors group members see the real email address; everyone else gets the literal string REDACTED. Every other column passes through untouched.

## S4 · CODE — Row-level permissions

The same CASE pattern works inside a WHERE clause instead of a SELECT list. Only managers see transactions over a million dollars — everyone else's filter silently drops those rows. It's the dynamic-view equivalent of a row filter, written directly into the view.

## S5 · STEPS — When to still use this today

Dynamic views remain fully supported, but Databricks now recommends row filters and column masks for governing real tables — they attach to the table itself, so every consumer inherits the same protection. Dynamic views stay useful for legacy compatibility and ad hoc views, and the underlying raw tables should never be granted directly, only the view.

## S6 · OUTRO

Next lesson: attribute-based access control and governed tags — policies that apply automatically based on how data is tagged, instead of being written per table or per view.
