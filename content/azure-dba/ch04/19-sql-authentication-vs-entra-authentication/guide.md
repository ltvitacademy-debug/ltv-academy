# Lesson 19 — SQL Authentication vs. Microsoft Entra Authentication

**Chapter 4 · Authentication & Authorization · Lesson 1 of 7**

## What you'll learn

- SQL authentication — username and password stored inside the database engine itself
- Microsoft Entra authentication — identity federated from Entra ID
- Why Microsoft's recommended direction is Entra, not SQL auth
- What "authentication" answers vs. what "authorization" (Lessons 21-23) answers next

## If you took Azure Fundamentals, start here

Azure Fundamentals' Lesson 9 covered what Entra ID is, and Lesson 11
covered identity and access management generally. This lesson doesn't
re-teach Entra ID — it applies what you already know specifically to
**how a SQL connection proves who it is**. Everything here is about
the authentication step, before any GRANT/DENY permission (Lessons
21-23) is even checked.

## SQL authentication — the credential lives in the database

```sql
CREATE LOGIN app_user WITH PASSWORD = 'StrongP@ssw0rd123!';
```

A SQL login's username and a hash of its password are stored **inside
the SQL Server/Azure SQL engine itself**. The application connects
with that username and password directly. This is the older, simpler
model — and it comes with the exact problems that model always has:

- The password has to be **managed, rotated, and secured
  somewhere** — usually in application config or a secrets store you
  now have to maintain.
- There's **no built-in multi-factor authentication** — a stolen
  password is a stolen login, full stop.
- Every system with its own SQL logins is **its own separate identity
  silo** — disabling someone's access means finding and disabling
  every SQL login they have, individually, everywhere.

## Microsoft Entra authentication — identity federated in

```sql
CREATE LOGIN [alex@ltvacademy.com] FROM EXTERNAL PROVIDER;
CREATE USER [alex@ltvacademy.com] FROM EXTERNAL PROVIDER;
```

`FROM EXTERNAL PROVIDER` means the identity isn't stored in SQL Server
at all — it's a reference to an identity that already exists in
**Microsoft Entra ID**. Authentication happens against Entra, using
whatever Entra already enforces for that identity:

- **Multi-factor authentication (MFA)** — enforced by Entra's
  conditional access, with no extra work on the SQL side.
- **Centralized management** — disable the person in Entra ID once,
  and every Entra-authenticated login they had across every database
  stops working immediately.
- **No password to steal from SQL Server** — because SQL Server never
  held one.
- Works for **users, groups, service principals, and managed
  identities** — an Azure resource itself (like a Function App) can
  authenticate with no credential at all via managed identity.

## Why Entra is Microsoft's recommended direction

Every problem SQL authentication has — password sprawl, no MFA,
decentralized access control — is a problem Entra authentication
removes by design, not by extra configuration. Microsoft's own
guidance across Azure SQL, Managed Instance, and even Arc-enabled SQL
Server (Lesson 18) all point the same direction: use Entra
authentication wherever the client supports it, and treat SQL
authentication as a fallback for legacy tools that genuinely can't.

## Authentication vs. authorization — don't blur these

This lesson is entirely about **authentication**: proving who's
connecting. It says nothing yet about **what that identity is allowed
to do** once connected — that's authorization, and it's exactly what
Lessons 21 through 23 cover: users, roles, and `GRANT`/`DENY`/`REVOKE`.
A successful login is step one, not the whole story.

## Key terms

| Term | Meaning |
|---|---|
| SQL authentication | Username/password credential stored and checked inside the database engine |
| Microsoft Entra authentication | Identity federated from Entra ID; `FROM EXTERNAL PROVIDER` in T-SQL |
| Managed identity | An Azure resource authenticating as itself, with no stored credential at all |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking:
where is a SQL login's password actually stored, where is an Entra
login's identity actually stored, and why does that difference matter
for MFA and centralized access removal?
