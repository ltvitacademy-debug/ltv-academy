# Lesson 7 — Encryption at Rest With Transparent Data Encryption

**Chapter 3 · Security & Compliance · Lesson 7 of 26**

## What you'll learn

- What's already protecting Overlook's new database, with zero work from this chapter
- What TDE actually encrypts, and — just as important — what it does not
- Why "transparent" is the right word for what it does to Overlook's application
- How to confirm TDE is actually active on Overlook's database, in T-SQL

## The good news: this is already on

Chapter 2 deployed Overlook's Azure SQL server and database, with no mention of encryption at all.
That's because **Transparent Data Encryption (TDE)** is on by default for every new Azure SQL
Database — Overlook's `OverlookDB` has been encrypted at rest since the moment Lesson 6's
deployment finished. This lesson isn't about turning TDE on; it's about understanding precisely
what that default already buys the board's compliance mandate, and precisely what it doesn't.

## What TDE actually encrypts

TDE encrypts the database's data **at rest** — the physical data files, log files, and backups
sitting on Azure storage. It operates below the query engine entirely, using a **Database
Encryption Key (DEK)**: pages are encrypted on write to disk and decrypted on read back into
memory. None of that is visible to a query, a stored procedure, or Overlook's scheduling
application's own connection string — hence "transparent." Nobody had to change a line of
application code for this protection to exist.

```
Query runs normally →  SQL Server reads/writes pages  →  TDE encrypts/decrypts at the storage layer
                                                            (invisible to the query itself)
```

## What TDE does NOT protect against — and why that matters for patient data

This is the part a compliance officer will actually ask about, so it has to be stated precisely:

- **It does not protect data in memory or in transit.** Once a page is decrypted for a query, that
  patient record exists in plaintext in memory, and travels to Overlook's application over
  whatever transport encryption (TLS) is configured — TDE has nothing to do with either.
- **It does not stop a logged-in, authorized user from reading the data.** TDE protects against
  someone stealing the physical storage or a backup file and reading it directly, bypassing SQL
  Server's access controls entirely — not against an authorized scheduling-app account simply
  running `SELECT` against a patient's chart.
- **It is not a substitute for column-level protection or auditing** — Lessons 8 and 9 solve
  problems TDE was never designed to solve.

## Microsoft-managed keys vs. customer-managed keys (BYOK)

Every TDE-protected database has a DEK, itself protected by a second key — the **TDE protector**.
By default, Azure manages that protector with no setup required (**service-managed keys**), which
is what Overlook's database is using right now. The alternative is **Bring Your Own Key (BYOK)**:
generating or importing the TDE protector into **Azure Key Vault**, so Overlook — not Microsoft —
holds ultimate control, including the ability to revoke it. Overlook's compliance posture for this
capstone stays with the service-managed default; BYOK is a real option a stricter future compliance
framework could require, but it's not part of this board's current mandate.

## Confirming TDE is active with T-SQL

```sql
SELECT db.name, dek.encryption_state, dek.encryptor_type
FROM sys.dm_database_encryption_keys dek
JOIN sys.databases db ON dek.database_id = db.database_id;
-- encryption_state: 3 = Encrypted
```

Running this against `OverlookDB` and seeing `encryption_state = 3` is the first real, verifiable
line in Overlook's security posture — proof, not assumption, that patient data at rest is
encrypted.

## Key terms

| Term | Meaning |
|---|---|
| TDE | Transparent Data Encryption — encrypts data at rest (files, logs, backups), on by default |
| Database Encryption Key (DEK) | The key that actually encrypts the database's data files |
| TDE protector | The key that protects the DEK; service-managed by default, or customer-managed (BYOK) |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: if TDE is already on for
Overlook's database, what specific gap in protecting patient data still remains for Lesson 8 to
close?
