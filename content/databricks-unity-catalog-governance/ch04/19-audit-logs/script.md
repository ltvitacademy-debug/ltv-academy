# Lesson 19 — Audit Logs · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

One table holds a row for nearly every auditable event in your account — table reads, grants, logins, job runs. This lesson is about reading it.

## S2 · STEPS — The real schema

system.access.audit has one row per event: event_time and event_date for when, user_identity for who, service_name and action_name for what happened, and request_params holding the specific details — like which table was touched.

## S3 · CODE — Who did what

Here's the basic pattern: filter on event_date, not event_time — that's what the table's own performance optimizations are built around — and you get a straightforward timeline of who did what, through which service.

## S4 · CODE — Narrowing to one table

Because request_params is a map, you can filter directly on a specific key — here, full_name_arg — to answer a much more specific question: who actually read this exact table in the last 30 days, and when. It's the audit equivalent of the lineage query from two lessons ago.

## S5 · STEPS — What's masked, and why

Some request_params keys hold full SQL definitions — view definitions, function bodies — and are masked from query results unless you're an account admin or in the databricks_pii_access group. Everything else in the table is unaffected. Audit logs are regional for workspace events, global only at the account level.

## S6 · OUTRO

Next lesson: monitoring and compliance — turning everything from lineage, classification, and audit logs into an ongoing practice instead of a one-time setup.
