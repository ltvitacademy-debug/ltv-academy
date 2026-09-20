# Backup Compression & Encryption

Lesson 2 designed *when* full, differential, and log backups run. This lesson is about what
happens to the bytes those backups produce: compressing them so they're cheaper to store and
move, and encrypting them so they're safe to store and move somewhere a backup file
shouldn't be readable by just anyone who finds it.

## What you'll learn

- The real `WITH COMPRESSION` syntax and its CPU-for-size tradeoff
- How to set compression as the server-wide default
- The real steps required before a backup can be encrypted — a certificate has to exist first
- When compression and encryption actually matter, versus when they're just overhead

## Compression: smaller backups, more CPU during the backup

Adding `COMPRESSION` to a `BACKUP` statement is a one-word change with a real, immediate
effect on the resulting file:

```sql
BACKUP DATABASE Sales
TO DISK = N'D:\Backup\Sales_Full.bak'
WITH COMPRESSION, STATS = 10;
```

The backup file is typically 50–70% smaller than an uncompressed backup of the same
database, because SQL Server compresses the data as it writes it. That comes at a real
cost: compression is CPU-bound work, and it happens on the same server running production
queries, so a CPU-constrained server can see backup times *increase* even though the
resulting file is smaller and I/O to disk is reduced. The right call depends on which
resource is actually scarce — disk and network I/O, or CPU.

Compression can also be made the server-wide default so every backup uses it unless told
otherwise:

```sql
EXEC sp_configure 'backup compression default', 1;
RECONFIGURE;
```

## Encryption: a certificate has to exist first

Backup encryption isn't a flag you can just add — SQL Server requires a certificate or
asymmetric key to already exist in the target database (`master`, typically) before any
backup can reference it:

```sql
USE master;
CREATE CERTIFICATE BackupCert
    WITH SUBJECT = 'Sales Database Backup Encryption Certificate';
```

Once the certificate exists, the backup statement references it directly:

```sql
BACKUP DATABASE Sales
TO DISK = N'D:\Backup\Sales_Full.bak'
WITH COMPRESSION,
     ENCRYPTION (ALGORITHM = AES_256, SERVER CERTIFICATE = BackupCert),
     STATS = 10;
```

`AES_256` is the recommended algorithm — older options like `TRIPLE_DES_3KEY` exist for
compatibility but shouldn't be a new choice today. Compression and encryption combine in one
statement, and SQL Server compresses *before* encrypting, so encryption doesn't undo the
size savings.

## The step nobody can skip: back up the certificate itself

The certificate used to encrypt a backup is the *only* thing that can decrypt it later. If
that certificate is lost — server rebuilt, master database corrupted, certificate never
backed up — every encrypted backup protected by it becomes permanently unrestorable, even
though the `.bak` file itself is perfectly intact:

```sql
BACKUP CERTIFICATE BackupCert
TO FILE = N'D:\Backup\BackupCert.cer'
WITH PRIVATE KEY (
    FILE = N'D:\Backup\BackupCert.pvk',
    ENCRYPTION BY PASSWORD = 'StrongP@ssw0rd!'
);
```

That certificate backup has to be stored somewhere other than next to the database backups
it protects — otherwise a single lost location takes out both the encrypted backup and the
only key that could ever open it.

## When each one actually matters

- **Compression** earns its cost whenever a backup destination is network-bound — a share,
  a remote datacenter, cloud storage — where a smaller file transfers meaningfully faster,
  or when local disk space for retaining backups is genuinely tight.
- **Encryption** earns its cost whenever a compliance requirement (PCI DSS, HIPAA, a
  contractual data-protection clause) demands that data at rest — including backup files —
  be unreadable without a key, or whenever backups leave a controlled environment (offsite
  storage, a third-party backup vendor).

Neither is free, and neither is needed everywhere — a small internal reporting database
backing up to local disk with no compliance obligation gains little from either.

## Key terms

| Term | Meaning |
|---|---|
| `WITH COMPRESSION` | Backup option that shrinks the file at the cost of CPU during the backup |
| `backup compression default` | Server configuration option that makes compression the default for all backups |
| `WITH ENCRYPTION (ALGORITHM = ..., SERVER CERTIFICATE = ...)` | Backup option requiring a pre-existing certificate or asymmetric key |
| `BACKUP CERTIFICATE` | Backs up the certificate/private key itself — without this, an encrypted backup can become permanently unreadable |

## Check yourself

A DBA encrypts a database's backups using a certificate created that same day, but never
runs `BACKUP CERTIFICATE`. Six months later the server is rebuilt from scratch. What happens
when they try to restore one of those encrypted backups onto the new server?
