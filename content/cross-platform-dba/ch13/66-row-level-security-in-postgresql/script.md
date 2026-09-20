# Script — Row-Level Security in PostgreSQL

## Segment 1 (title)

Everything so far controlled access at the object level — a role can query a table or it can't. Row-Level Security controls access at the row level, a genuinely modern, built-in PostgreSQL feature since version 9.5.

## Segment 2 (code: enable and write a policy)

Enable it with ALTER TABLE ENABLE ROW LEVEL SECURITY, then define a policy. Here, the USING clause reads a session variable the application set after connecting, and becomes an implicit filter on every query app_user runs against that table.

## Segment 3 (code: USING vs WITH CHECK)

Policies can scope to specific commands. USING filters which existing rows are visible or affected. WITH CHECK validates rows being inserted or updated, so a role can't write a row into a state the policy wouldn't let it see afterward.

## Segment 4 (steps: who RLS applies to)

Table owners and superusers bypass RLS by default — policies apply to the roles named in them, not automatically to the owner. FORCE ROW LEVEL SECURITY changes that, applying the policy even to the owning role.

## Segment 5 (outro)

This is PostgreSQL's own take on database-enforced tenant isolation, increasingly common for multi-tenant SaaS. Next up: PostgreSQL auditing and pgAudit, because there's no built-in auditing the way Oracle has it.
