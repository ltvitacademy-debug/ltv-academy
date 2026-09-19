# Script — Always Encrypted & Secure Enclaves

## Segment 1 (title)

TDE decrypts pages the moment a query touches them, so the data sits in plaintext in memory. Always Encrypted closes that gap for specific columns — encrypted at rest, in memory, and in transit, decrypted only client-side, by an application holding the key.

## Segment 2 (code: where each one decrypts)

With TDE, memory holds plaintext the instant a query runs. With Always Encrypted, memory still holds ciphertext — SQL Server never has the key, so even a sysadmin or someone who restored a stolen backup can't read the real values without the Column Master Key too.

## Segment 3 (code: defining an encrypted column)

An Always Encrypted column is defined with a Column Encryption Key and an encryption type, deterministic or randomized. The Column Master Key protecting it lives outside SQL Server entirely — Key Vault or a certificate store.

## Segment 4 (steps: what each mode actually allows)

Deterministic encryption allows equality comparisons and joins, but not LIKE or ranges. Randomized is more secure but doesn't even support equality server-side. Secure enclaves change the trade — a protected memory region where code can briefly see plaintext for richer operations, invisible to everyone outside it, including the DBA.

## Segment 5 (outro)

Always Encrypted trades server-side computation for a much stronger guarantee — the server never needs to be trusted with the plaintext at all. Next up: Dynamic Data Masking, which solves a completely different problem — hiding results from ordinary, unprivileged queries.
