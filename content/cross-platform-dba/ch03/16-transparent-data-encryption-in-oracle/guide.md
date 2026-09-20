# Transparent Data Encryption in Oracle

SQL Server's Transparent Data Encryption encrypts an entire database using a certificate
protected by the Database Master Key. Oracle's TDE covers the same core promise — data
encrypted at rest, transparently, with no application changes required to read it — but
Oracle gives you a choice of *granularity*, and the key itself lives in a separate object
called a wallet (or keystore), not inside the database.

## What you'll learn

- The two levels TDE can operate at: tablespace and column
- What a wallet/keystore is, and why it has to exist outside the database
- What TDE protects against, and what it explicitly doesn't

## TDE requires a keystore before anything can be encrypted

Oracle never stores the master encryption key inside the database itself — it lives in an
external keystore (the "wallet"), so that even someone with a copy of the data files can't
decrypt them without also having the wallet and its password. You create and open it once
per database:

```sql
ADMINISTER KEY MANAGEMENT CREATE KEYSTORE '/u01/app/oracle/wallet'
  IDENTIFIED BY "W4lletPassw0rd!";

ADMINISTER KEY MANAGEMENT SET KEYSTORE OPEN
  IDENTIFIED BY "W4lletPassw0rd!";

ADMINISTER KEY MANAGEMENT SET KEY
  IDENTIFIED BY "W4lletPassw0rd!"
  WITH BACKUP;
```

A **software keystore** can be configured in two modes: password-protected (must be opened
manually, or via a script, after every instance restart) or **auto-login**, which opens
automatically so the database can start without manual intervention — a real operational
tradeoff between security and availability that every TDE deployment has to make explicitly.

## Tablespace encryption is the common, whole-tablespace approach

Once the keystore is open, encrypting an entire tablespace going forward is one clause:

```sql
CREATE TABLESPACE encrypted_data
  DATAFILE '/u01/app/oracle/oradata/orcl/enc_data01.dbf' SIZE 500M
  ENCRYPTION USING 'AES256'
  DEFAULT STORAGE (ENCRYPT);
```

Every object created in that tablespace is encrypted automatically — no per-table decision
needed. This is the recommended default approach for most databases: pick your encryption
algorithm once at the tablespace level and stop thinking about it.

## Column encryption is narrower and predates tablespace encryption

Oracle also supports encrypting individual columns, useful when only specific sensitive
columns need protection and the rest of the table doesn't:

```sql
ALTER TABLE hr.employees
  MODIFY (ssn ENCRYPT USING 'AES256' NO SALT);
```

Column encryption came first historically and is still valid, but tablespace encryption is
generally preferred for new work — it's simpler to administer (one setting instead of
tracking which columns across which tables are encrypted) and avoids column encryption's
restrictions, like not being able to use certain indexes efficiently on some encrypted
column types.

## TDE protects data at rest — it is not the whole security story

TDE encrypts data files, and by extension, backups taken of those data files and the
temporary/undo tablespaces the encrypted data flows through — real, valuable protection
against someone stealing a disk, a backup tape, or a decommissioned drive. But it does **not**
encrypt data in memory (the buffer cache holds decrypted blocks while the instance runs) or
data moving across the network to a client — that's a separate concern, **Oracle Native
Network Encryption**, configured independently. TDE also doesn't replace access control: a
user with `SELECT` privilege on an encrypted table sees plaintext through a normal query, the
same as always — encryption defends against someone bypassing the database entirely, not
against a legitimately authorized session.

## Key terms

| Term | Meaning |
|---|---|
| Wallet / keystore | External file storing the master encryption key, outside the database |
| Auto-login keystore | Keystore that opens automatically on instance start, trading some security for availability |
| Tablespace encryption | Encrypts every object in a tablespace automatically; the modern default approach |
| Column encryption | Encrypts specific columns only; older, narrower approach |
| `AES256` | The encryption algorithm commonly specified for both approaches |
| Native Network Encryption | Separate Oracle feature protecting data in transit, not covered by TDE |

## Check yourself

A manager asks whether TDE alone is sufficient to satisfy a compliance requirement that "no
one without authorization can view sensitive customer data." Explain what TDE actually covers
and what gap remains that TDE doesn't close.
