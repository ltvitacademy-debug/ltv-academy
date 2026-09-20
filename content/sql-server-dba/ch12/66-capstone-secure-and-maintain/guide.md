# Capstone: Secure & Maintain

The foundation is stable. Now you apply Chapters 5 and 6 — security fundamentals and
maintenance plans — to close the two biggest risks left on MERSQL01: an application logging
in as `sa`, and a database with zero automated maintenance behind it.

## What you'll learn

- How to retire a shared `sa` login for a dedicated, least-privilege application login
- How to set up server auditing so future changes leave a trail
- How to install Ola Hallengren's scripts and schedule real backup, integrity, and index jobs

## Retiring sa

You don't drop `sa` — it still has a role as a break-glass account for true emergencies — but
you rotate its password to something long and randomly generated, stored only in Meridian's
password vault, and you disable it day-to-day:

```sql
ALTER LOGIN sa WITH PASSWORD = '<long random value, stored in the vault>';
ALTER LOGIN sa DISABLE;
```

DispatchTrack gets its own dedicated login instead, scoped to exactly what the application
needs — not `sysadmin`:

```sql
CREATE LOGIN dispatchtrack_svc WITH PASSWORD = '<strong, app-specific password>', CHECK_POLICY = ON;
USE DispatchDB;
CREATE USER dispatchtrack_svc FOR LOGIN dispatchtrack_svc;
ALTER ROLE db_datareader ADD MEMBER dispatchtrack_svc;
ALTER ROLE db_datawriter ADD MEMBER dispatchtrack_svc;
GRANT EXECUTE ON SCHEMA::dbo TO dispatchtrack_svc;
```

The connection string gets updated to use `dispatchtrack_svc`, and the plaintext copy on the
shared drive is deleted once the new one is confirmed working from a staging terminal.

## Turning on auditing

Chapter 5 covered SQL Server Audit for exactly this situation — you want a durable record of
who logs in, who fails to log in, and who changes schema, without relying on anyone remembering
to check:

```sql
CREATE SERVER AUDIT MERSQL01_Audit
  TO FILE (FILEPATH = 'X:\Audit\');
ALTER SERVER AUDIT MERSQL01_Audit WITH (STATE = ON);

CREATE SERVER AUDIT SPECIFICATION MERSQL01_LoginAudit
  FOR SERVER AUDIT MERSQL01_Audit
  ADD (FAILED_LOGIN_GROUP), ADD (SUCCESSFUL_LOGIN_GROUP)
  WITH (STATE = ON);
```

## Installing real maintenance jobs

Chapter 6 named Ola Hallengren's scripts as the industry standard, and MERSQL01 is exactly the
server they're for: a database with FULL recovery, no integrity checks, and no index
maintenance, ever. You run his install script against `master`, which creates the standard job
set in `msdb`, and you schedule it against Meridian's actual RPO target of 15 minutes:

| Job | Schedule |
|---|---|
| `DatabaseBackup - USER_DATABASES - FULL` | Nightly, 1:00 AM |
| `DatabaseBackup - USER_DATABASES - LOG` | Every 15 minutes |
| `DatabaseIntegrityCheck - USER_DATABASES` | Weekly, Sunday 3:00 AM |
| `IndexOptimize - USER_DATABASES` | Weekly, Sunday 4:00 AM |

The log-backup job is the single change that fixes the runaway `DispatchDB_log.ldf` problem
from Lesson 64 for good — the log now gets truncated on a predictable schedule instead of
growing without bound. You point every job's output to an operator so failures actually get
noticed instead of silently rotting the way the old vendor job did.

## Key terms

| Term | Meaning |
|---|---|
| Break-glass account | An emergency-only credential, disabled day-to-day, used only when normal access is unavailable |
| Least privilege | Granting an account only the permissions it needs, not blanket admin rights |
| SQL Server Audit | A server-level feature that logs security-relevant events (logins, DDL) to a durable file |
| Ola Hallengren's scripts | The de facto industry-standard free maintenance solution for backups, integrity checks, and index maintenance |

## Check yourself

Why does the plan keep `sa` around, disabled, instead of dropping the login entirely — and why
does `dispatchtrack_svc` get `db_datareader`/`db_datawriter` instead of just being added to
`sysadmin` the way the old app connection effectively was?
