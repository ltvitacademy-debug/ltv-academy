# Encryption Overview

## What you'll learn

- The three encryption technologies SQL Server offers, and what each actually protects against
- Why they're not interchangeable — each closes a different threat
- The real setup shape for each, at a conceptual level

## Encryption isn't one feature — it's three, for three different threats

A common mistake is treating "encryption" as a single checkbox. SQL Server has three distinct
encryption technologies, and each protects a different attack surface. Knowing which one answers
which question is the actual skill here.

## Transparent Data Encryption (TDE): protects data at rest

TDE encrypts the data and log files on disk. If someone steals the physical `.mdf`/`.ldf` files,
or a backup file, they get unreadable bytes without the certificate that protects the database
encryption key.

```sql
USE master;
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'Str0ng!MasterKeyPass';
CREATE CERTIFICATE TDECert WITH SUBJECT = 'TDE Certificate';

USE InventoryDB;
CREATE DATABASE ENCRYPTION KEY
    WITH ALGORITHM = AES_256
    ENCRYPTION BY SERVER CERTIFICATE TDECert;

ALTER DATABASE InventoryDB SET ENCRYPTION ON;
```

TDE is transparent to applications — no query or connection-string changes. What it does
**not** protect: data in memory, data in a query result set, or anyone with a legitimate login
and permissions. A DBA with `sysadmin` reads TDE-encrypted data just fine once connected — TDE's
threat model is a stolen disk or backup file, not an authorized-but-untrusted insider.

## Always Encrypted: protects specific columns, even from the DBA

Always Encrypted encrypts data at the column level, client-side, before it ever leaves the
application. The encryption keys never live on the SQL Server instance — only the client
application (via a driver that supports Always Encrypted) can decrypt the values. This means
even a `sysadmin` querying the table directly sees ciphertext, not plaintext.

```sql
-- Conceptual: column is defined with an encryption spec tied to a
-- column encryption key, itself protected by a column master key
-- that lives outside SQL Server (e.g., Windows Certificate Store, Key Vault)
CREATE TABLE dbo.Customers (
    CustomerID INT PRIMARY KEY,
    SSN CHAR(9) ENCRYPTED WITH (
        COLUMN_ENCRYPTION_KEY = CEK_Auto1,
        ENCRYPTION_TYPE = Deterministic,
        ALGORITHM = 'AEAD_AES_256_CBC_HMAC_SHA_256'
    )
);
```

This is the tool for genuinely sensitive columns — SSNs, payment data — where the threat model
includes a malicious or compromised DBA, not just a stolen disk.

## Connection encryption (TLS): protects data in transit

TLS encrypts traffic between the client and the server over the network, so anyone sniffing the
wire between an application and the instance can't read query text or result sets. This is
configured with a certificate bound in SQL Server Configuration Manager (or `Force Encryption`
server-level setting), not with T-SQL DDL. It's orthogonal to TDE and Always Encrypted — TLS
protects data moving over the network; the other two protect data sitting on disk or living in a
specific column.

## Picking the right one — honestly

- Worried about a stolen laptop, disk, or backup file? **TDE.**
- Worried about a DBA or anyone with `sysadmin` seeing specific sensitive columns? **Always
  Encrypted.**
- Worried about someone sniffing network traffic between app and server? **TLS / connection
  encryption.**

They're not mutually exclusive — a well-secured production environment often runs all three at
once, because they answer different questions.

## Key terms

| Term | Meaning |
|---|---|
| TDE (Transparent Data Encryption) | Encrypts data and log files at rest; transparent to applications |
| Always Encrypted | Client-side, column-level encryption; keys never reach the SQL Server instance |
| Connection encryption (TLS) | Encrypts traffic between client and server over the network |
| Column master key | The key protecting Always Encrypted's column encryption keys, stored outside SQL Server |

## Check yourself

A compliance requirement says SSN data must be unreadable even to your own DBAs. Which of the
three technologies actually satisfies that, and why do the other two fall short of it?
