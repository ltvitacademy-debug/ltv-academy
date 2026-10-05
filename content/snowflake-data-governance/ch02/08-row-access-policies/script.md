# Lesson 8 — Row Access Policies · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Masking policies change what a role sees inside a cell. A row access
policy does something different — it decides whether an entire row is
visible at all.

## S2 · CODE — The mapping table

Instead of hardcoding role names into the policy itself, this pattern
uses a real table — a mapping of role to city permissions. One row
says tb_test_role can see Tokyo. Adding a new role later is an insert,
not a policy rewrite.

## S3 · CODE — The policy and attaching it

Here's the policy itself — a boolean expression. A row passes if the
querying role is a privileged bypass role, or if the mapping table has
a row proving that role can see this particular city. ALTER TABLE ADD
ROW ACCESS POLICY is what actually attaches it, naming which column
the policy checks.

## S4 · SCREENSHOT — Filtered to Tokyo

Querying the table as the restricted role — every single row comes
back as Tokyo, nowhere else. And notice the names are masked here too
— row access and masking are independent mechanisms stacking on the
same table.

## S5 · SCREENSHOT — Propagates downstream

Same as masking, a row access policy travels downstream automatically.
This view spans every city in the base table, but grouped by city and
queried by the restricted role, only Tokyo shows up.

## S6 · OUTRO

Next lesson: secure views — hiding not just rows or values, but the
view's own definition from anyone who shouldn't see how it works.
