# Lesson 10 — Least-Privilege RBAC

**Chapter 3 · Security & Compliance · Lesson 10 of 26**

## What you'll learn

- The access-control gap every prior lesson in this chapter has quietly assumed was already fixed
- Built-in roles vs. object-level permissions, and which one actually belongs in Overlook's database
- The real `CREATE ROLE` / `GRANT` pattern this chapter uses
- How this closes Chapter 3, and sets up what Chapter 4 protects

## The gap this lesson actually closes

Lessons 7-9 protected data at rest, reduced casual exposure in results, and built a record of who
touched what. All three quietly assumed something this lesson hasn't built yet: that Overlook's
accounts only have the access they actually need in the first place. Before this lesson, Overlook's
accounts had whatever access got granted informally over time — exactly the "whoever happened to be
on call" problem Lesson 1 described. **Least privilege** means starting from nothing and adding
exactly what each account needs, instead of starting broad and hoping nothing sensitive gets
exposed later.

## Built-in roles vs. object-level permissions — the real decision

```sql
-- Option A: a built-in role — broad, fast, database-wide
ALTER ROLE db_datareader ADD MEMBER scheduling_app;

-- Option B: object-level permissions — narrow, deliberate, per-object
GRANT SELECT ON dbo.Appointments TO scheduling_app;
GRANT SELECT ON dbo.Patients TO scheduling_app;
```

Both let `scheduling_app` read data. They are **not** the same grant: Option A reads *every* table
in `OverlookDB`, forever, including a billing table added next year. Option B reads exactly the two
named tables the scheduling application actually needs, and nothing else, ever, unless someone
explicitly grants more. For a healthcare database where Lesson 8 already identified specific
sensitive columns, Option B — the narrower choice — is the one that matches the board's mandate.

## The real pattern this chapter uses

```sql
CREATE ROLE scheduling_app_role;
GRANT SELECT ON dbo.Appointments TO scheduling_app_role;
GRANT SELECT, INSERT ON dbo.Appointments TO scheduling_app_role;
ALTER ROLE scheduling_app_role ADD MEMBER scheduling_app;

CREATE ROLE reporting_role;
GRANT SELECT ON dbo.Patients TO reporting_role;
GRANT UNMASK TO reporting_role;
ALTER ROLE reporting_role ADD MEMBER ReportingServiceAccount;
```

A custom role, built from named `GRANT` statements, is the real-world version of "narrow, deliberate
access": `scheduling_app_role` can read and insert appointments and nothing else; `reporting_role`
can read patients *and* holds the `UNMASK` permission from Lesson 8 — the only role that sees
unmasked patient data, by design, not by accident.

## When a built-in role is still genuinely the right call

Least privilege doesn't mean every grant has to be object-level. A true backup/migration service
account, or a genuine database owner, really does need broad access — forcing that account into a
dozen narrow grants would just hide the fact that it needs broad access anyway. The decision from
Lesson 10's `azure-dba` reference material still applies here: use a built-in role when the account
genuinely needs the whole database; use named grants when it needs a known, fixed subset.

## Auditing what's actually granted

```sql
SELECT * FROM sys.database_permissions;
SELECT * FROM sys.database_role_members;
```

This isn't a one-time decision — Overlook's roles get checked against what's actually used, same
as Lesson 9's audit log gets checked against what's actually happening, not assumed.

## Chapter 3, closed

With TDE (Lesson 7), masking (Lesson 8), auditing (Lesson 9), and least-privilege roles (Lesson 10)
in place, Overlook's database is genuinely secured — encrypted at rest, exposed only to the degree
each account actually needs, with a tamper-resistant record of who touched what. Chapter 4 builds
HA/DR on top of exactly this now-secured foundation.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting exactly the access an account needs, starting from nothing, rather than starting broad |
| `CREATE ROLE` | Defines a custom database role that named accounts can be added to |
| `sys.database_permissions` | The system view for auditing what's actually been granted |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why does `reporting_role` get the
`UNMASK` permission while `scheduling_app_role` does not, and what would happen if that were
reversed?
