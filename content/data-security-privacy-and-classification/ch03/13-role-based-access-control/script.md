# Lesson 13 — Role-Based Access Control · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Access governance told us who requests, approves, provisions, and audits
access. Role-based access control is how most organizations actually
implement it: permissions attach to roles, roles attach to people.

## S2 · STEPS CARD (core idea)

Instead of one-off grants per employee, RBAC splits the problem in two.
What permissions does the Sales Analyst role need? And which people are
Sales Analysts? Change the role once, and every member inherits the change
immediately.

## S3 · CODE CARD (create role + grant)

In SQL Server, you create a role, then grant permissions to the role, never
to an individual. CREATE ROLE SalesAnalystRole. Then GRANT SELECT on Orders,
on Customers, and SELECT, INSERT, UPDATE on SalesNotes — all to the role.

## S4 · CODE CARD (add/drop member, GRANT/DENY/REVOKE)

ALTER ROLE ADD MEMBER puts a person in the role — a Joiner or Mover event.
DROP MEMBER takes them out. And GRANT, REVOKE, and DENY aren't synonyms:
DENY explicitly blocks a permission, and it always wins, even over a GRANT
from a different role.

## S5 · STEPS CARD (why it scales)

The payoff: an auditor answers "who can see customer SSNs" by reading a
handful of role permission lists, not every login in the company. An
access review becomes "check the role, then check its membership" instead
of starting from zero for every person.

## S6 · OUTRO CARD

Next up: least privilege — the principle that decides exactly how narrow
each role's permission list should actually be.
