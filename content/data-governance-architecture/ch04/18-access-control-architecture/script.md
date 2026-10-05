# Lesson 18 — Access Control Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson gets specific: the actual mechanisms that decide who can see what, and where they get evaluated.

## S2 · STEPS — RBAC vs ABAC

RBAC attaches privileges to roles, roles to users — simple to audit, but roles multiply fast once you need fine distinctions. ABAC decides access by evaluating attributes of the user, the data, and the context at request time — no new role needed per combination, but the logic gets harder to audit. Most real systems mix both: RBAC for the coarse grain, attribute-based rules layered on top for the fine grain.

## S3 · STEPS — Row and column-level security

Row-level security restricts which rows a query returns, based on who's asking. Column-level security restricts or masks specific columns, independent of which rows come back. They combine — the same table, different rows and different columns, depending on who's querying.

## S4 · STEPS — Where enforcement happens

Query-time enforcement means the engine itself rewrites the query based on policy, no matter what tool asked — a dashboard, a notebook, raw SQL, all get the same result. Application-time enforcement filters what's displayed after an unfiltered result comes back — weaker, because anyone with direct engine access bypasses it. Enforce as close to the engine as possible.

## S5 · STEPS — Tags as the bridge

A tag applied in the catalog becomes useful for security only once a policy is written against the tag itself, not a hardcoded column list — the active-metadata pattern from Lesson 16. A new column tagged the same way inherits the same enforcement automatically, no policy rewrite required.

## S6 · OUTRO

Next lesson: writing these policies as actual code — Azure Policy and Open Policy Agent, specifically.
