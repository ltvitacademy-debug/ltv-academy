# Script — Transparent Data Encryption in Oracle

## Segment 1 (title)

SQL Server's TDE encrypts a whole database using a certificate under the Database Master Key. Oracle's TDE covers the same core promise, but gives you a choice of granularity, and the key lives in a separate object called a wallet, outside the database.

## Segment 2 (code: keystore)

Before anything can be encrypted, a keystore has to exist. You create it, open it, and set the master key — all protected by a wallet password. A software keystore can be password-protected or auto-login, trading security for availability.

## Segment 3 (code: tablespace vs column encryption)

Tablespace encryption is the recommended default — every object created in that tablespace is encrypted automatically. Column encryption is older and narrower, useful when only specific sensitive columns need protection.

## Segment 4 (steps: what TDE covers)

TDE protects data files, backups, and stolen disks. It does not protect data moving across the network or sitting decrypted in the buffer cache while the instance runs — and it doesn't replace access control at all.

## Segment 5 (outro)

Chapter Four begins next: Oracle Backup Fundamentals, the real distinction between logical backups with Data Pump and physical backups with RMAN, and when each one applies.
