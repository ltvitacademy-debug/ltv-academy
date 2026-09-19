# Lesson 36 — SQL Auditing & Compliance Monitoring

**Chapter 6 · Data Security & Compliance · Lesson 36 of 95**

## What you'll learn

- What SQL Auditing actually records, and where it writes those records
- Server-level vs. database-level audit specifications
- The real question a compliance audit needs answered — and why auditing is what answers it
- How auditing ties together everything else this chapter covered

## The question none of Lessons 31-35 can answer by themselves

TDE, Always Encrypted, DDM, RLS, and classification all shape *what's protected* and *how*. None of
them, by themselves, answer the question a real compliance investigation actually asks: **"Who
accessed this specific table, and when, and what did they do?"** That's a historical record of
actual activity, not a rule about what's currently allowed. **SQL Auditing** is the feature that
produces that record.

## What auditing records, and where it goes

SQL Auditing captures database events — logins, permission changes, `SELECT`/`INSERT`/`UPDATE`/
`DELETE` statements against tracked objects, schema changes, and more — and writes them to a
configured target: an **Azure Storage account**, **Log Analytics workspace**, or **Event Hub**. It
does not store audit logs inside the database itself, which matters for exactly the reason you'd
expect: a record of who touched sensitive data shouldn't be alterable by the same principals whose
activity it's recording.

```sql
-- Server-level audit, writing to a storage account
ALTER SERVER AUDIT ServerAudit_Storage
TO URL (
  PATH = 'https://mystorageaccount.blob.core.windows.net/sqlauditlogs'
)
WITH (QUEUE_DELAY = 1000, STATE = ON);
```

## Server-level vs. database-level audit specifications

| Scope | Object | Covers |
|---|---|---|
| **Server audit** | `CREATE SERVER AUDIT` | The destination (storage/Log Analytics/Event Hub) and the audit's overall on/off state |
| **Server audit specification** | `CREATE SERVER AUDIT SPECIFICATION` | Server-wide events: logins, server role changes, `DBCC` events |
| **Database audit specification** | `CREATE DATABASE AUDIT SPECIFICATION` | Database-specific events: `SELECT`/`UPDATE` on specific tables, schema changes |

```sql
CREATE DATABASE AUDIT SPECIFICATION SensitiveTableAudit
FOR SERVER AUDIT ServerAudit_Storage
ADD (SELECT, UPDATE, DELETE ON dbo.Customers BY public)
WITH (STATE = ON);
```

Checking what's currently configured:

```sql
SELECT * FROM sys.database_audit_specifications;
SELECT * FROM sys.server_audit_specifications;
```

Targeting the audit specifically at classified columns (Lesson 35) — auditing every touch of a
`Highly Confidential`-labeled table — turns a generic logging feature into a directly compliance-
relevant control: you're not auditing everything indiscriminately, you're auditing what you've
already identified as sensitive.

## What "who accessed this table, and when" actually requires

A real answer to that question, defensible to an auditor, needs:

1. **The audit itself enabled and correctly scoped** — covering the actual sensitive objects, not
   just logins.
2. **A tamper-resistant destination** — Storage or Log Analytics, outside the reach of the same
   database principals being audited (this is why audit logs never live in the audited database
   itself).
3. **Retention long enough to matter** — a compliance window is often measured in months or years,
   not days; storage lifecycle policies need to match that requirement, not the storage account's
   default.
4. **Someone actually reviewing it** — an audit log nobody ever queries is a compliance liability,
   not a control; Azure SQL can also feed Microsoft Defender for SQL / Azure Monitor alerts off
   audit data for real-time anomaly detection, not just after-the-fact review.

## Key terms

| Term | Meaning |
|---|---|
| SQL Auditing | Captures database events and writes them to Storage, Log Analytics, or Event Hub |
| Server audit specification | Server-wide audited events (logins, role changes) |
| Database audit specification | Database-specific audited events (SELECT/UPDATE on named tables) |
| Tamper-resistant destination | An audit target outside the database itself, so audited principals can't alter their own record |

## Lab

1. Create a server audit writing to a storage account, then a database audit specification auditing
   `SELECT` and `UPDATE` on one sensitive table.
2. Run a few queries against that table as different logins, then query the audit logs (via the
   Portal's audit log viewer or `sys.fn_get_audit_file`) to confirm each access is recorded with the
   correct principal and timestamp.
3. Write one sentence explaining why the audit log's storage account, not the audited database
   itself, is the correct place for that log to live.

## Check yourself

You're ready for Lesson 37 when you can explain, without looking: why can't Row-Level Security or
Dynamic Data Masking answer the question "who accessed this table last Tuesday," even though both
control access to that same table?
