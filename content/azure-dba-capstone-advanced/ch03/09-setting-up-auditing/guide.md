# Lesson 9 — Setting Up Auditing

**Chapter 3 · Security & Compliance · Lesson 9 of 26**

## What you'll learn

- The one compliance question nothing in Lessons 7-8 can answer
- What SQL Auditing actually records, and where it has to be written
- Server-level vs. database-level audit specifications, applied to Overlook
- Why Overlook's audit log can't live inside `OverlookDB` itself

## The question TDE and masking can't answer

TDE (Lesson 7) and Dynamic Data Masking (Lesson 8) both shape *what's protected* and *what's
visible*. Neither answers the question a real regulator actually asks after an incident: **"Who
accessed this patient's record, and when, and what did they do?"** That's a historical record of
actual activity, not a rule about what's currently allowed. **SQL Auditing** is what produces that
record — and it's the one piece of Lesson 1's compliance mandate none of this chapter has built
yet.

## What auditing records, and where it has to go

SQL Auditing captures database events — logins, permission changes, `SELECT`/`INSERT`/`UPDATE`/
`DELETE` against tracked objects, schema changes — and writes them to a configured target: an
**Azure Storage account**, **Log Analytics workspace**, or **Event Hub**. It deliberately does not
store its own records inside the audited database. For Overlook, that's not a technicality — a log
of who touched patient data shouldn't be alterable by the same accounts whose activity it records.

```sql
-- Server-level audit, writing to a storage account
ALTER SERVER AUDIT OverlookAudit
TO URL (
  PATH = 'https://overlookauditstorage.blob.core.windows.net/sqlauditlogs'
)
WITH (QUEUE_DELAY = 1000, STATE = ON);
```

## Server-level vs. database-level: what each one covers for Overlook

| Scope | Object | Covers |
|---|---|---|
| **Server audit** | `CREATE SERVER AUDIT` | The destination (Overlook's storage account) and the audit's overall on/off state |
| **Server audit specification** | `CREATE SERVER AUDIT SPECIFICATION` | Server-wide events: logins, server role changes |
| **Database audit specification** | `CREATE DATABASE AUDIT SPECIFICATION` | Database-specific events: `SELECT`/`UPDATE` on named tables like `dbo.Patients` |

```sql
CREATE DATABASE AUDIT SPECIFICATION PatientDataAudit
FOR SERVER AUDIT OverlookAudit
ADD (SELECT, UPDATE, DELETE ON dbo.Patients BY public)
WITH (STATE = ON);
```

Scoping the database audit specification directly at `dbo.Patients` — the table Lesson 8 just
masked — turns a generic logging feature into a directly compliance-relevant control: Overlook
isn't auditing everything indiscriminately, it's auditing exactly the table it already identified
as sensitive.

## What "who accessed this, and when" actually requires

A real answer, defensible to a regulator, needs four things in place at once: the audit correctly
scoped to the actual sensitive objects (not just logins); a destination outside the audited
database itself; retention long enough to matter for a real compliance window, not a storage
account's default; and someone who actually reviews it — an audit log nobody queries is a liability,
not a control.

## Checking what's configured

```sql
SELECT * FROM sys.database_audit_specifications;
SELECT * FROM sys.server_audit_specifications;
```

## Key terms

| Term | Meaning |
|---|---|
| SQL Auditing | Captures database events and writes them to Storage, Log Analytics, or Event Hub |
| Server audit specification | Server-wide audited events (logins, role changes) |
| Database audit specification | Database-specific audited events (SELECT/UPDATE on named tables) |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why does Overlook's audit log
have to write to a storage account outside `OverlookDB`, instead of a table inside the database
itself?
