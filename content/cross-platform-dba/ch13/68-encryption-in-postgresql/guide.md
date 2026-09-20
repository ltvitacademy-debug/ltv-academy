# Encryption in PostgreSQL

This lesson closes Chapter 13 with encryption, and the honest headline is the same shape as
the auditing lesson: PostgreSQL handles in-transit and column-level encryption with real,
solid tools, but it does **not** have built-in Transparent Data Encryption (TDE) the way
Oracle and SQL Server do. Knowing exactly what PostgreSQL does and doesn't provide natively —
and what real DBAs actually use to cover the gap — matters more than a vague "PostgreSQL
supports encryption" answer.

## What you'll learn

- SSL/TLS for encryption in transit, and how it's configured
- pgcrypto, the real extension for column-level encryption
- The honest gap: no built-in TDE, and what fills that role in practice

## Encryption in transit: SSL/TLS

PostgreSQL supports encrypting client-server connections with SSL/TLS, configured with real
settings in `postgresql.conf` plus certificate files:

```
# postgresql.conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

Enforcement happens in `pg_hba.conf`, where the `hostssl` connection type (instead of `host`)
requires SSL for matching connections, and `hostnossl` explicitly rejects unencrypted
connections on a given rule:

```
# TYPE     DATABASE  USER  ADDRESS       METHOD
hostssl    all       all   0.0.0.0/0     scram-sha-256
```

This is directly analogous to SQL Server's "Force Encryption" and Oracle's Net Services
encryption settings — the mechanism (TLS) is the same industry-standard technology every
platform in this course uses; only the configuration surface differs.

## Column-level encryption: pgcrypto

**pgcrypto** is the real, standard extension for encrypting specific column values at rest —
useful when only certain sensitive fields (like a national ID number or a payment token) need
encryption, not the whole database:

```sql
CREATE EXTENSION pgcrypto;

-- encrypt on insert
INSERT INTO customers (name, ssn_encrypted)
VALUES ('Jane Doe', pgp_sym_encrypt('123-45-6789', 'a_real_encryption_key'));

-- decrypt on read (requires the same key)
SELECT name, pgp_sym_decrypt(ssn_encrypted, 'a_real_encryption_key') AS ssn
FROM customers;
```

pgcrypto also provides one-way hashing functions (`crypt()`, `digest()`) commonly used for
password storage, and general symmetric/asymmetric encryption primitives. Key management is
the DBA's/application's responsibility — pgcrypto doesn't manage keys for you the way a
platform with built-in TDE and integrated key management typically does.

## The honest gap: no built-in TDE

Both Oracle (Transparent Data Encryption) and SQL Server (also called Transparent Data
Encryption) can encrypt an entire database's data files at rest, transparently, with no
application changes and no per-column work. **PostgreSQL core has no equivalent feature.**
The real, common way PostgreSQL deployments achieve at-rest encryption of the whole database
is **filesystem-level or full-disk encryption** — LUKS on Linux, BitLocker on Windows, or a
cloud provider's storage-level encryption (like AWS EBS encryption or Azure Disk Encryption
underneath a managed PostgreSQL service) — encrypting the entire volume the data directory
lives on, transparently to PostgreSQL itself, which has no idea the disk is encrypted.

This is a real architectural difference to be upfront about: it's not a missing feature to
work around with a clever trick, it's PostgreSQL's actual answer — full-disk/filesystem
encryption plus pgcrypto for the specific columns that need it plus SSL/TLS in transit, three
tools covering what Oracle/SQL Server TDE covers with one integrated feature. Some managed
cloud PostgreSQL services also advertise "encryption at rest" — that's almost always this
same filesystem/storage-level encryption underneath, not a PostgreSQL-native TDE feature.

## Key terms

| Term | Meaning |
|---|---|
| SSL/TLS (PostgreSQL) | Encrypts client-server connections; enforced via hostssl rules in pg_hba.conf |
| pgcrypto | Extension providing column-level encryption and hashing functions |
| TDE | Transparent Data Encryption — full database at-rest encryption; Oracle/SQL Server have it built in, PostgreSQL doesn't |
| Filesystem/full-disk encryption | The real PostgreSQL approach to whole-database at-rest encryption (LUKS, BitLocker, cloud storage encryption) |

## Check yourself

A manager asks you to enable "PostgreSQL's built-in TDE" for a database. What's the accurate,
honest answer, and what would you actually set up instead to achieve full at-rest encryption?
