# Lesson 17 — Data Quality Rules

**Chapter 4 · Rules and Checks · Lesson 17 of 30**

## What you'll learn

- What a "data quality rule" is, formally, and how it's different from
  an ad-hoc query you happen to run once
- The anatomy of a well-written rule: scope, condition, severity, and
  owner
- How each of Chapter 3's six dimensions maps to a type of rule
- How to document a rule so someone else could implement and maintain
  it without asking you questions

## From one-off query to formal rule

Every query in Chapter 3 answered a question once. A **data quality
rule** is the same logic, but written down so it can be run
*repeatedly*, by *anyone*, with a *known meaning* when it fails. The
difference isn't the SQL — it's everything around the SQL.

A rule that only lives in one person's head, or in a query they ran
once and forgot about, isn't a rule yet. It becomes one when it's
written down with enough context that someone else on the team could
pick it up, run it, and know exactly what a failure means.

![SQL Server Management Studio open with Object Explorer showing a connected server, the AdventureWorks database expanded, and the SQL Server Agent node visible — the environment every rule in this chapter eventually runs in.](/courses/data-quality-management/ch04/17-data-quality-rules/ssms.png)
*SSMS — the tool every rule in this chapter is written and tested in before it's automated (Lesson 22).*

## The anatomy of a rule

A well-documented data quality rule has four parts:

| Part | Question it answers | Example |
|---|---|---|
| **Scope** | What table/column(s) does this apply to? | `dbo.Customers.Email` |
| **Condition** | What makes a row pass or fail? | `Email IS NOT NULL AND Email LIKE '%_@_%._%'` |
| **Severity** | How bad is a failure? | Critical / Warning / Informational |
| **Owner** | Who gets notified, and who decides what "fixed" means? | Customer Data team |

Skipping any of these four turns a rule back into a one-off query. A
condition without a severity means every failure looks equally urgent.
A rule without an owner means failures pile up with nobody responsible
for them.

## Mapping dimensions to rule types

Each dimension from Chapter 3 corresponds to a recognizable *type* of
rule — recognizing the type tells you immediately what kind of SQL
pattern to reach for:

- **Accuracy rule** — compares against a reference/source of truth
- **Completeness rule** — checks for `NULL`/blank/sentinel values
- **Consistency rule** — compares related columns or systems
- **Validity rule** — checks type, format, range, or domain
- **Uniqueness rule** — checks for duplicate keys
- **Timeliness rule** — checks age or latency against a threshold

Naming the type isn't just tidiness — it tells the next person what
kind of fix is even possible. A failed validity rule might be fixable
with a `CHECK` constraint. A failed accuracy rule never is; you can
only detect it, never auto-prevent it, because it depends on the
outside world.

## Writing a rule as runnable SQL

A rule document should include the actual query that implements it —
not just a prose description. Prose drifts from reality; SQL doesn't:

```sql
-- RULE: CUST-004 — Customer email must be present and well-formed
-- SCOPE: dbo.Customers.Email
-- SEVERITY: Critical
-- OWNER: Customer Data team
SELECT CustomerId, Email
FROM dbo.Customers
WHERE Email IS NULL
   OR Email NOT LIKE '%_@_%._%';
```

Comment the rule ID, scope, severity, and owner directly above the
query. When this rule gets automated in Lesson 22, that header is what
turns into the job's name, description, and alert routing.

## Key terms

| Term | Meaning |
|---|---|
| Data quality rule | A documented, repeatable check with known scope, condition, severity, and owner |
| Severity | How urgent a rule failure is — typically Critical, Warning, or Informational |
| Rule owner | The person or team responsible for acting on a rule's failures |

## Lab

1. Pick any one SQL check you wrote in Chapter 3 (any dimension).
2. Rewrite it as a documented rule with all four parts: a rule ID, a
   one-line scope, the SQL condition, a severity you choose and
   justify in a comment, and an owner (a role, even if you're working
   solo — e.g. "Inventory team").
3. Write a second rule from scratch for a dimension you haven't
   practiced yet in this format.

## Check yourself

- What's the minimum that turns a query into a rule?
- Why does naming a rule's dimension type matter for deciding how
  (or whether) it can be auto-prevented vs. only detected?
- What breaks on a team if a rule has a condition but no owner?
