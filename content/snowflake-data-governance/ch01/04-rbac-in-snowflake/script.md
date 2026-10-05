# Lesson 4 — RBAC in Snowflake · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE

You've seen the system roles and the hierarchy they sit in. Now let's
build a custom role from scratch and watch, screenshot by screenshot,
exactly what changes as privileges get granted.

## S2 · SCREENSHOT — ACCOUNTADMIN context

We start in ACCOUNTADMIN — you can see it in the worksheet's top-right
role badge. We'll only use it briefly, to hand off to the roles that
actually do this work.

## S3 · CODE — CREATE ROLE / GRANT warehouse+database

This is a real example straight from Snowflake's own Tasty Bytes
governance quickstart. USERADMIN creates the role — tb_test_role —
with nothing attached to it yet. Then we switch to SECURITYADMIN and
grant it USAGE and OPERATE on a warehouse, plus USAGE on a database
and its schemas. Notice the division of labor: USERADMIN creates the
role, SECURITYADMIN grants it privileges. That separation is
deliberate RBAC design, not an accident.

## S4 · SCREENSHOT — Role before grants

Here's what a brand-new role looks like before any grants land — this
particular screenshot comes from a different Snowflake quickstart
using its own demo role, junior_dba, but it shows the exact same
mechanism tb_test_role goes through: switch into a role with zero
privileges, and the object browser is nearly empty. A role has no
access until you explicitly grant it some — that's least privilege by
default.

## S5 · CODE — GRANT select + grant role to user

Back to tb_test_role: grant SELECT on the raw_customer and raw_pos
schemas, and on the analytics views. Then the step that's easy to
forget — GRANT ROLE tb_test_role TO USER, using CURRENT_USER so it
applies to whoever's running the script. Without that last line, the
role exists, it has privileges, but nobody can actually use it.

## S6 · SCREENSHOT — Databases visible after grant

And here's the payoff, same junior_dba demo role as before — after
granting USAGE on two databases, they're now visible in the object
browser, where a moment ago there was nothing. That's exactly what
GRANT USAGE ON DATABASE tb_101 does for tb_test_role: zero access
becomes visible access, immediately, the moment the grant runs.

## S7 · OUTRO

Next up: access control best practices — the principles behind every
grant statement you just watched happen, and how to keep an account's
privilege structure sane as it grows.
