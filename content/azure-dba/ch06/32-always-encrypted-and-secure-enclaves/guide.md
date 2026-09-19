# Lesson 32 — Always Encrypted & Always Encrypted with Secure Enclaves

**Chapter 6 · Data Security & Compliance · Lesson 32 of 95**

## What you'll learn

- What Always Encrypted protects that TDE explicitly does not: data in memory and in use
- Why the encryption/decryption happens client-side, and what that means for SQL Server itself
- The real limitation classic Always Encrypted has on server-side computation
- How Secure Enclaves change that trade-off, and what they still don't give up

## The gap TDE leaves open

Lesson 31 was explicit: TDE decrypts pages as they're read into memory, which means once a query
touches the data, it exists in plaintext in SQL Server's memory and in the query results returned to
the client. **Always Encrypted** exists specifically to close that gap for a defined set of
sensitive columns — the data stays encrypted **at rest, in memory, and in transit**, and is only ever
decrypted **client-side**, inside an application that holds the right key.

```
TDE:              disk (encrypted) -> memory (PLAINTEXT) -> client (plaintext over TLS)
Always Encrypted: disk (encrypted) -> memory (STILL ENCRYPTED) -> client (decrypts locally, with the key)
```

## Client-side encryption — and what that means for SQL Server

Always Encrypted's defining property: **SQL Server itself never has the key**, and therefore never
sees the plaintext for an Always-Encrypted column. Encryption and decryption happen inside a
client-side driver (an Always Encrypted-enabled ADO.NET, JDBC, or ODBC driver) using a
**Column Encryption Key**, which is itself protected by a **Column Master Key** stored somewhere SQL
Server cannot reach — typically Azure Key Vault or a local certificate store, not the database
itself.

This means even a sysadmin on the SQL Server instance, or someone who stole a full backup and
restored it elsewhere, cannot read an Always-Encrypted column's real values without also having
separately obtained the Column Master Key. That's a materially different threat model than TDE,
which protects against storage theft but assumes the database engine itself is trusted.

```sql
-- Setting up a column encryption uses the Portal wizard or SSMS's
-- Always Encrypted wizard in practice; the resulting column definition looks like:
CREATE TABLE dbo.Customers (
  CustomerID INT PRIMARY KEY,
  SSN CHAR(11)
    ENCRYPTED WITH (
      COLUMN_ENCRYPTION_KEY = CEK_SSN,
      ENCRYPTION_TYPE = DETERMINISTIC,
      ALGORITHM = 'AEAD_AES_256_CBC_HMAC_SHA_256'
    ) NOT NULL
);
```

## The real limitation: classic Always Encrypted can't compute on the data

Because SQL Server never has the plaintext, it can't do much with an Always-Encrypted column beyond
storing it and returning it. **Deterministic** encryption (same plaintext always produces the same
ciphertext) allows equality comparisons and joins on that column — but not `LIKE`, ranges,
`ORDER BY`, or any function that needs to interpret the value. **Randomized** encryption is more
secure (same plaintext produces different ciphertext each time) but doesn't even support equality
comparisons server-side. Either way, any real computation — pattern matching, aggregation,
substring searches — has to happen after decrypting client-side, which is often impractical for
anything beyond simple point lookups.

## Secure Enclaves: the newer approach

**Always Encrypted with secure enclaves** changes this trade-off. A **secure enclave** is a
protected region of the server's memory that even the database engine's own processes can't inspect
from outside it — but code running *inside* the enclave can access plaintext temporarily, perform
richer operations (pattern matching, range comparisons, even in-place cryptographic operations), and
return only encrypted or aggregated results back out. The server hosts the enclave, but the server's
own operators still can't see inside it.

```
Classic Always Encrypted:        server never sees plaintext at all, so only equality (deterministic)
With secure enclaves:            server hosts a protected memory region; code IN the enclave can
                                  briefly see plaintext to do richer operations, but nothing outside
                                  the enclave — including the DBA — can inspect it
```

This is why secure enclaves exist: they let you keep the strong "even the server operator can't read
this" guarantee while supporting operations classic Always Encrypted simply couldn't do server-side,
like rich pattern searches or in-place encryption changes without a full round-trip through a client
application.

## Key terms

| Term | Meaning |
|---|---|
| Always Encrypted | Encrypts specified columns client-side; SQL Server never holds the key or sees plaintext |
| Column Master Key | Protects the Column Encryption Key; stored outside SQL Server (Key Vault, certificate store) |
| Deterministic encryption | Same plaintext → same ciphertext; supports equality/joins, not ranges or LIKE |
| Secure enclave | A protected memory region where code can briefly access plaintext for richer operations, invisible to the server operator |

## Lab

1. Identify one column in a real or hypothetical schema (e.g., SSN, credit card number) that would
   be a strong candidate for Always Encrypted, and explain why TDE alone wouldn't be sufficient for it.
2. Write out which encryption type — deterministic or randomized — you'd choose for that column, and
   justify it based on whether the application needs to search or join on it.
3. Explain in one paragraph why a secure enclave doesn't give the DBA (or anyone else server-side)
   the ability to read the plaintext, even though computation happens on the server.

## Check yourself

You're ready for Lesson 33 when you can explain, without looking: why can't classic Always Encrypted
support a `LIKE '%smith%'` search on an encrypted column, and what changes if secure enclaves are used
instead?
