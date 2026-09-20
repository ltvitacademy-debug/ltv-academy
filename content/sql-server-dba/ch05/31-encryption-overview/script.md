# Script — Encryption Overview

## Segment 1 (title)

Encryption isn't one checkbox. SQL Server has three distinct encryption technologies, and each protects a different attack surface — knowing which one answers which question is the actual skill.

## Segment 2 (code: TDE)

Transparent Data Encryption protects the data and log files at rest. Set up with a master key, a certificate, and a database encryption key, then switched on with ALTER DATABASE SET ENCRYPTION ON. It's transparent to applications, but it doesn't stop anyone with a legitimate login — its threat model is a stolen disk or backup file.

## Segment 3 (code: Always Encrypted)

Always Encrypted encrypts specific columns client-side, before data ever leaves the application. The keys never reach the SQL Server instance, so even a sysadmin querying the table directly sees ciphertext, not plaintext. That's the tool when the threat model includes the DBA.

## Segment 4 (steps: three technologies, three threats)

Connection encryption, TLS, protects data moving over the network between client and server — configured through Configuration Manager, not T-SQL. It's orthogonal to the other two: a well-secured environment often runs all three at once, because they answer different questions.

## Segment 5 (outro)

Next up: auditing setup — SQL Server Audit, and how to build server and database audit specifications.
