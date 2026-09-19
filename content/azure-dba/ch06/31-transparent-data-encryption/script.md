# Script — Transparent Data Encryption (TDE)

## Segment 1 (title)

TDE encrypts an Azure SQL database's data at rest — the files, logs, and backups on storage — invisibly to any query or application. It's on by default, and it's called transparent because nothing above the storage layer ever has to change.

## Segment 2 (code: what it does and doesn't protect)

TDE stops someone who steals the physical storage or a backup file from reading it directly. It does not protect data once it's decrypted into memory, does not cover transport encryption, and does not stop an authorized user from simply running SELECT.

## Segment 3 (screenshot: TDE settings page)

Every TDE-protected database has a Database Encryption Key, itself protected by a TDE protector. That protector's settings — service-managed by default, or switched to customer-managed — live on this page.

## Segment 4 (steps: two ways to hold the key)

Service-managed keys are the default — Azure handles everything, no setup required. Customer-managed keys, bring-your-own-key, put the TDE protector in your own Key Vault, which matters when compliance requires you, not the cloud provider, to hold ultimate control.

## Segment 5 (outro)

TDE solves exactly one problem — data at rest — and was never meant to solve masking, row filtering, or auditing. Next up: Always Encrypted, which protects data even in memory, where TDE stops.
