# Lesson 79 — Row-Level Security Fundamentals · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Row-level security restricts which rows a user sees — not which
columns, not which workspaces. Just rows, filtered by a role.

## S2 · STEPS: Define roles -> Publish -> Add members -> Validate

Four steps, always in this order. Define the role's DAX filter in
Desktop, publish it, add members to the role in the service, then
validate with Test as role before trusting it.

## S3 · CODE: Admin/Member/Contributor -> RLS skipped | Viewer -> RLS applies

The detail almost everyone misses: RLS only restricts the Viewer role.
Admins, Members, and Contributors have edit access, so RLS never
applies to them, no matter what role they're assigned.

## S4 · CODE: Rows filtered, not columns | Union, not intersection

Two more limits worth knowing. RLS filters entire rows, never
individual columns — that's a separate feature. And belonging to
multiple roles gives you the union of both, not just the overlap.

## S5 · OUTRO CARD

Lesson 80 gets hands-on: actually writing the DAX filter expressions
that define a role in Desktop.
