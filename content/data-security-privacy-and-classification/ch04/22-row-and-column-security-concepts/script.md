# Lesson 22 — Row and Column Security Concepts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This chapter's last control closes the loop on Lesson 13's GRANT and
DENY: restricting not just which tables a role can see, but which exact
columns, and now, which exact rows.

## S2 · CODE CARD (column-level GRANT)

GRANT already accepts a column list. HR gets EmployeeId, Name, and
Department on Employees — nothing else. Payroll separately gets
EmployeeId and Salary. Least privilege, scoped down to individual
columns, with no extra logic required.

## S3 · CODE CARD (RLS predicate and policy)

Row-Level Security goes further: same table, different rows per user.
A security predicate function defines the rule — does this TenantId
match the session's context. A security policy attaches that predicate
to the table and turns it on.

## S4 · CODE CARD (filter vs block predicate)

Once it's on, every query against Sales is silently filtered to the
matching tenant automatically. A filter predicate hides non-matching rows
on reads. A block predicate goes further, actively rejecting an INSERT
that would violate the rule.

## S5 · STEPS CARD (why the engine, not the app)

This lives in the database engine for the same reason masking does.
Application code is only as safe as every query path through it, forever.
A policy enforced by the engine applies no matter what wrote the query —
a report, an ad-hoc tool, or a bug that forgot the filter.

## S6 · OUTRO CARD

That closes Chapter 4 on protecting data — masking, tokenization,
encryption, key management, and now row and column security. Chapter 5
turns to the data lifecycle: retention, deletion, and the right to
erasure.
