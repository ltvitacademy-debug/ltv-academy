# Encryption at Rest and in Transit in MySQL

This closes out MySQL's security chapter with the two encryption questions every DBA eventually
has to answer: is the data unreadable if someone steals the physical disk or a backup file
(at rest), and is the data unreadable if someone intercepts it on the network between client and
server (in transit)? MySQL has real, distinct answers for both, and they're configured
separately.

## What you'll learn

- InnoDB tablespace encryption: what it protects, and what it doesn't
- Enabling encryption on new and existing InnoDB tables
- TLS/SSL configuration for encrypting client-server traffic
- Requiring encrypted connections for specific accounts

## Encryption at rest: InnoDB tablespace encryption

MySQL supports encrypting InnoDB data files on disk using a two-tier key architecture: a master
encryption key, managed by a keyring plugin, encrypts a per-tablespace key, which in turn
encrypts the actual table data using AES. This protects data if the physical storage medium — a
disk, a snapshot, a backup file — is stolen or accessed outside the running server; it does
**not** protect against a legitimate, authenticated connection reading the data normally, since
MySQL decrypts transparently for any query that has the privilege to read the table.

```sql
-- Enable encryption on a new table
CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  email VARCHAR(255)
) ENCRYPTION = 'Y';

-- Enable encryption on an existing table
ALTER TABLE customers ENCRYPTION = 'Y';

-- Encrypt the entire InnoDB system tablespace and redo/undo logs
-- (set in my.cnf, requires a restart)
-- innodb_redo_log_encrypt = ON
-- innodb_undo_log_encrypt = ON
```

A keyring plugin — MySQL supports several, including a local file-based keyring for testing and
production-grade options backed by an external key management system — must be configured before
`ENCRYPTION = 'Y'` can be used; without one, the `CREATE TABLE`/`ALTER TABLE` statement fails.

## Encryption in transit: TLS/SSL

By default, MySQL client-server connections can run either encrypted or unencrypted, and a server
can be configured to require TLS. Certificates are generated (or supplied) and referenced in
`my.cnf`:

```ini
[mysqld]
ssl-ca=/etc/mysql/certs/ca.pem
ssl-cert=/etc/mysql/certs/server-cert.pem
ssl-key=/etc/mysql/certs/server-key.pem
require_secure_transport = ON
```

`require_secure_transport = ON` forces every connection to the server to use TLS, rejecting any
attempt to connect in plaintext. A client can also be required to present a valid certificate,
enabling mutual TLS for particularly sensitive connections. This is directly comparable to Force
Encryption in SQL Server or `sqlnet.ora`'s `SSL_CLIENT_AUTHENTICATION` in Oracle — the same
concept, MySQL's own configuration surface.

## Requiring TLS per account

Beyond a server-wide requirement, individual accounts can be required to use TLS specifically,
which is useful when only some accounts (say, ones connecting over the public internet) need to
be forced onto encrypted connections:

```sql
ALTER USER 'app_svc'@'10.0.4.%' REQUIRE SSL;
ALTER USER 'reporting'@'%' REQUIRE X509;
```

`REQUIRE SSL` mandates any TLS-encrypted connection. `REQUIRE X509` goes further, requiring the
client to present a valid certificate signed by a trusted CA — genuine mutual authentication, not
just an encrypted pipe.

## Key terms

| Term | Meaning |
|---|---|
| Encryption at rest | Protects data stored on disk (tablespace files, backups) from being read outside the running server |
| InnoDB tablespace encryption | AES encryption of table data files, using a keyring-managed key hierarchy |
| Keyring plugin | Manages the master encryption key used to encrypt per-tablespace keys |
| `require_secure_transport` | Server-wide setting forcing every connection to use TLS |
| `REQUIRE SSL` / `REQUIRE X509` | Per-account clauses forcing a specific account to connect only over TLS (X509 also requires a client certificate) |

## Check yourself

A company encrypts every InnoDB tablespace on their MySQL server but leaves `require_secure_transport`
off and never sets `REQUIRE SSL` on any account. What real risk remains despite the at-rest
encryption, and why does encryption at rest not cover it?
