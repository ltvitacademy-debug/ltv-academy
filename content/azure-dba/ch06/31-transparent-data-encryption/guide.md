# Lesson 31 — Transparent Data Encryption (TDE)

**Chapter 6 · Data Security & Compliance · Lesson 31 of 95**

## What you'll learn

- What TDE actually encrypts, and what it deliberately does not protect against
- Why "transparent" means applications need zero code changes
- Microsoft-managed keys (the default) vs. customer-managed keys (BYOK) in Azure Key Vault
- Where to check and configure TDE in the Azure Portal

## What TDE actually encrypts

**Transparent Data Encryption** encrypts an Azure SQL database's data **at rest** — the physical
data files, log files, and backups sitting on storage. It's on by default for every new Azure SQL
Database and Managed Instance database, and it operates below the query engine entirely: pages are
encrypted on write to disk and decrypted on read back into memory, using a **Database Encryption
Key (DEK)**. None of that is visible to a query, a stored procedure, or an application connection
string — hence "transparent."

```
Query runs normally →  SQL Server reads/writes pages  →  TDE encrypts/decrypts at the storage layer
                                                            (invisible to the query itself)
```

## What TDE does NOT protect against

This is the part every DBA needs to say precisely, because it's commonly overstated:

- **It does not protect data in memory or in transit.** Once a page is decrypted for a query, that
  data exists in plaintext in memory, and travels to the client over whatever transport encryption
  (TLS) is configured — TDE has nothing to do with either of those.
- **It does not stop a user with legitimate query access from reading the data.** TDE protects
  against someone stealing the physical storage or a backup file and reading it directly without
  going through SQL Server's normal access controls (Chapter 4) at all — not against a logged-in,
  authorized user simply running `SELECT`.
- **It is not a substitute for row-level security, masking, or auditing** — those are Lessons 32-36,
  and each solves a different problem TDE was never designed to solve.

## Microsoft-managed keys vs. customer-managed keys (BYOK)

Every TDE-protected database has a Database Encryption Key, which is itself protected by a second
key — the **TDE protector**. By default, Azure manages that protector for you with no setup required
(**service-managed keys**). The alternative is **Bring Your Own Key (BYOK)**: you generate or import
the TDE protector into **Azure Key Vault**, and Azure SQL uses that customer-managed key instead.

| | Service-managed | Customer-managed (BYOK) |
|---|---|---|
| Where the key lives | Managed internally by Azure | Your Azure Key Vault |
| Setup effort | None — on by default | Requires Key Vault, access policy, key rotation plan |
| Who can revoke access | Not applicable to you directly | You can revoke Key Vault access, effectively disabling the database |
| Typical driver | Default posture, most workloads | Compliance requirements mandating customer key control |

BYOK matters for compliance frameworks that specifically require the *customer*, not the cloud
provider, to hold ultimate control over the encryption key — including the ability to revoke it.
That's a real, deliberate capability: revoking Key Vault access to a BYOK-protected database's key
makes the database inaccessible, by design.

## Where this lives in the Azure Portal

TDE's settings — including whether service-managed or customer-managed keys are in use — live on
the server or database's **Transparent data encryption** page:

![Azure Portal Transparent Data Encryption settings screen showing the BYOK / customer-managed key option](/courses/azure-dba/ch06/31-transparent-data-encryption/tde-byok-support.png)
*The TDE settings page — switching from the service-managed default to a customer-managed key in Key Vault.*

## Checking TDE status with T-SQL

```sql
SELECT db.name, dek.encryption_state, dek.encryptor_type
FROM sys.dm_database_encryption_keys dek
JOIN sys.databases db ON dek.database_id = db.database_id;
-- encryption_state: 3 = Encrypted
```

## Key terms

| Term | Meaning |
|---|---|
| TDE | Transparent Data Encryption — encrypts data at rest (files, logs, backups), on by default |
| Database Encryption Key (DEK) | The key that actually encrypts a database's data files |
| TDE protector | The key that protects the DEK; either service-managed or customer-managed (BYOK) |
| BYOK | Bring Your Own Key — customer-managed TDE protector stored in Azure Key Vault |

## Lab

1. On a test database, run the `sys.dm_database_encryption_keys` query above and confirm
   `encryption_state = 3`.
2. In the Portal, open the database's **Transparent data encryption** page and identify whether it's
   using service-managed or customer-managed keys.
3. Write one sentence explaining why TDE alone would not stop an authorized user with `SELECT`
   permission from reading sensitive column data in plaintext.

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: what specific attack does TDE
defend against, and what does it explicitly not defend against?
