# Lesson 9 — Secure Views · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Everything so far in this chapter controls data — masking, row
access. A secure view controls something different: the view's own
definition.

## S2 · SCREENSHOT — A view object in Snowsight

By default, a view's SELECT statement is visible to anyone who can run
SHOW VIEWS against it, even without access to the underlying table.
This is what a view's detail page looks like generally — a secure
view looks identical here. The difference only shows up in what other
roles can see about its logic.

## S3 · CODE — CREATE SECURE VIEW

The syntax is just CREATE SECURE VIEW instead of CREATE VIEW. This is
a real multi-tenant pattern — a WHERE clause decides which rows each
role can see. Making it secure means a role without the right
privilege can't see this WHERE clause or the table names it
references — they only get query results, same as anyone else.

## S4 · CODE — Checking and toggling SECURE

SHOW VIEWS reports an IS_SECURE column so you can confirm status
without re-reading the full definition. ALTER VIEW SET SECURE and
UNSET SECURE toggle it after the fact.

## S5 · CODE — The optimizer trade-off

Secure views aren't free. A regular view's query text is visible to
the optimizer in ways that enable better execution plans — a secure
view trades some of that away for the privacy guarantee. Use it where
that guarantee actually matters, not as a default on every view.

## S6 · OUTRO

Next lesson: tag-based masking — attaching the policies from this
chapter to a tag once, instead of to every column by hand.
