# Encryption at Rest & in Transit in MongoDB

Authentication and RBAC control who can connect and what they can do. Encryption protects
the data itself — both while it sits on disk and while it travels across the network — and
MongoDB draws a real, important licensing line between the two: one is a Community-edition
feature available to everyone, the other requires Enterprise or Atlas.

## What you'll learn

- Why encryption at rest and in transit are two separate concerns with different
  availability
- How the Encrypted Storage Engine protects data on disk
- How TLS/SSL protects data in transit, and why it's the one available everywhere

## Encryption at rest: the Encrypted Storage Engine

Encryption at rest means data files on disk are encrypted, so someone who steals the
physical disk (or an unencrypted backup, or a misconfigured cloud storage bucket) can't
read raw document data without the encryption key. In MongoDB, this is implemented as the
**Encrypted Storage Engine**, a WiredTiger option that encrypts data files using AES-256.

This is genuinely an **Enterprise/Atlas feature**, not available in Community Server —
enabled with settings like:

```
security:
  enableEncryption: true
  encryptionKeyFile: /etc/mongodb/keyfile
```

For production key management beyond a local key file, MongoDB Enterprise integrates with
a KMIP-compliant key management system, so encryption keys are managed centrally rather
than sitting next to the database they protect. Running on MongoDB Atlas, encryption at
rest is handled automatically as part of the managed service — you don't configure the
storage engine yourself at all.

## Encryption in transit: TLS/SSL

Encryption in transit protects data as it moves between the client and the server (or
between cluster members) — preventing anyone who can observe network traffic from reading
queries, results, or credentials in flight. Unlike encryption at rest, **TLS/SSL is
available in Community Server**, no Enterprise license required:

```
mongod --tlsMode requireTLS \
       --tlsCertificateKeyFile /etc/mongodb/server.pem
```

`tlsMode requireTLS` rejects any connection that doesn't use TLS at all — the setting you
actually want in production, as opposed to weaker modes that merely allow it. Clients then
connect with a matching flag:

```
mongosh --tls --host mydb.example.com
```

This is directly comparable to enabling `Force Encryption` and configuring a certificate
for a SQL Server instance — same goal, same mechanism (TLS), different product.

## Why the split matters

A relational DBA moving to MongoDB needs to know this split cold: you can get in-transit
encryption on any self-managed MongoDB deployment today, for free, with no license
upgrade. At-rest encryption, if required by a compliance standard, is a real reason an
organization ends up on Enterprise or Atlas rather than Community Server — it's not
something you can configure your way around on Community.

## Key terms

| Term | Meaning |
|---|---|
| Encryption at rest | Encrypting data files on disk; requires MongoDB Enterprise or Atlas |
| Encrypted Storage Engine | The WiredTiger feature implementing at-rest encryption, using AES-256 |
| Encryption in transit | Encrypting data as it moves over the network; available in Community |
| TLS/SSL | The protocol used for encryption in transit, configured via `tlsMode` |
| `tlsMode requireTLS` | Setting that rejects any connection not using TLS |

## Check yourself

A team on MongoDB Community Server needs to protect customer data both on disk and over
the network, but doesn't want to upgrade licensing yet. Per this lesson, which of those two
protections can they actually implement today, and which one requires Enterprise or Atlas?
