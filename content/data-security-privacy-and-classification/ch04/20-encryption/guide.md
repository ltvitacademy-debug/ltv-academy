# Lesson 20 — Encryption

**Chapter 4 · Protecting Data · Lesson 20 of 30**

## What you'll learn

- The difference between encryption at rest, in transit, and in use
- Real T-SQL for Transparent Data Encryption (TDE) — encrypting an entire database at rest
- Real T-SQL for cell-level encryption of a single column, using a certificate and symmetric key
- Where Always Encrypted fits, and why it protects data even from database administrators

## Three places data needs protecting

Encryption shows up at three different points, and a mature program needs all three, not just one:

- **At rest** — data sitting in a database file, a backup, or on disk, protected so that someone who steals the physical file (or a backup) can't read it without the key
- **In transit** — data moving across a network, protected by TLS, so someone intercepting network traffic between an application and the database can't read it
- **In use** — data while it's actively being processed in memory, the hardest of the three to protect, and the newest area of active development (confidential computing, enclave-based processing)

This lesson focuses on at-rest encryption in T-SQL, since that's where SQL Server gives you the most direct, real syntax to work with.

## Transparent Data Encryption (TDE): the whole database

**TDE** encrypts an entire database's data and log files at rest, transparently — applications querying the database don't notice any difference, because SQL Server decrypts pages on the fly as they're read into memory. Setting it up follows a specific chain of keys and certificates:

```sql
-- 1. A master key protects everything else in the chain
USE master;
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'StrongUniquePassword!2026';

-- 2. A certificate, protected by the master key
CREATE CERTIFICATE TDE_Cert WITH SUBJECT = 'TDE Certificate for AdventureWorks';

-- 3. A database encryption key, protected by the certificate
USE AdventureWorks;
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE TDE_Cert;

-- 4. Turn encryption on for the database
ALTER DATABASE AdventureWorks SET ENCRYPTION ON;
```

Each layer protects the one below it: the master key protects the certificate, the certificate protects the database encryption key, and the database encryption key actually encrypts the data pages. **Back up the certificate and its private key immediately after creating it** — without that certificate, an encrypted database (and its backups) become permanently unreadable, even to the organization that encrypted them.

## Cell-level encryption: one column, by choice

Sometimes encrypting an entire database is more than the job calls for, and a single sensitive column needs protecting while the rest of the table stays queryable in plain text. **Cell-level encryption** uses a symmetric key, itself protected by a certificate:

```sql
-- A symmetric key, protected by a certificate
CREATE SYMMETRIC KEY SSN_Key
WITH ALGORITHM = AES_256
ENCRYPTION BY CERTIFICATE TDE_Cert;

-- Open the key for the session, then encrypt a value into a varbinary column
OPEN SYMMETRIC KEY SSN_Key DECRYPTION BY CERTIFICATE TDE_Cert;

UPDATE dbo.Customers
SET SSN_Encrypted = ENCRYPTBYKEY(KEY_GUID('SSN_Key'), SSN)
WHERE CustomerId = 1001;

-- Reading it back requires the key to be open again, and DECRYPTBYKEY
SELECT CustomerId, CONVERT(VARCHAR(11), DECRYPTBYKEY(SSN_Encrypted)) AS SSN
FROM dbo.Customers
WHERE CustomerId = 1001;

CLOSE SYMMETRIC KEY SSN_Key;
```

`ENCRYPTBYKEY` and `DECRYPTBYKEY` are genuinely reversible — unlike a token (Lesson 19), the ciphertext mathematically encodes the original value, and anyone who opens the right key can get it back.

## Always Encrypted: protection even from the DBA

Both TDE and cell-level encryption, above, decrypt *inside* the database engine — meaning a database administrator with enough access can still potentially see plaintext. **Always Encrypted** moves the encryption and decryption to the *client driver*, outside the database engine entirely. The database stores and processes only ciphertext; it never holds the key or sees plaintext, which means even a `sysadmin` querying the encrypted column directly sees only encrypted bytes. This is the strongest guarantee in SQL Server's encryption toolkit, specifically designed for the case where the database administrators themselves shouldn't be able to see certain columns — a real segregation-of-duties (Lesson 15) problem that TDE and cell-level encryption don't solve on their own.

## Key terms

| Term | Meaning |
|---|---|
| Transparent Data Encryption (TDE) | Encrypts an entire database's data and log files at rest, transparently to applications |
| Cell-level encryption | Encrypting a single column's values using a symmetric key, via ENCRYPTBYKEY/DECRYPTBYKEY |
| Always Encrypted | Client-driver-level encryption where the database engine itself never sees plaintext or the key |
| Encryption at rest / in transit / in use | The three points in a data's lifecycle where encryption applies |

## Lab

On a test database, walk through the cell-level encryption example end to end: create the master key, certificate, and symmetric key, encrypt one test value with `ENCRYPTBYKEY`, then decrypt it back with `DECRYPTBYKEY`. Note what the raw column looks like (via a plain `SELECT`) before and after you open the key.

## Check yourself

- Why must the TDE certificate and its private key be backed up immediately, separately from the database itself?
- What specific problem does Always Encrypted solve that TDE and cell-level encryption do not?
