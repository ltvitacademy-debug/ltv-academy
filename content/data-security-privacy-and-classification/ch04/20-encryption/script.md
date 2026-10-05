# Lesson 20 — Encryption · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Tokenization and pseudonymization used substitutes. Encryption is
different: it's mathematically reversible with the right key. Three
places it applies — at rest, in transit, and in use.

## S2 · CODE CARD (TDE setup)

Transparent Data Encryption encrypts an entire database at rest. A master
key protects a certificate, the certificate protects a database
encryption key, and that key encrypts the actual data pages. Then ALTER
DATABASE SET ENCRYPTION ON turns it on for everyone, transparently.

## S3 · CODE CARD (cell-level encryption)

Sometimes one column is enough. Cell-level encryption uses a symmetric
key protected by a certificate. ENCRYPTBYKEY writes ciphertext into a
column; opening the key again and calling DECRYPTBYKEY gets the real
value back — genuinely reversible, unlike a token.

## S4 · STEPS CARD (Always Encrypted)

Both of those decrypt inside the database engine, so a DBA with enough
access can still see plaintext. Always Encrypted moves encryption to the
client driver — the database only ever holds ciphertext, never the key,
never the plaintext, not even for a sysadmin.

## S5 · OUTRO CARD

Next up: key management concepts — because every encryption scheme in
this lesson is only as strong as how well its keys are generated,
rotated, and protected.
