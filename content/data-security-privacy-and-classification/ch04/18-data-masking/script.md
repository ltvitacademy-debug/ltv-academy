# Lesson 18 — Data Masking · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter 4 shifts from who can reach the data to protecting the data
itself. First up: data masking — hiding sensitive values from a query's
results without changing what's actually stored on disk.

## S2 · CODE CARD (applying masks)

SQL Server's Dynamic Data Masking applies right on the column. ALTER
TABLE Customers, ALTER COLUMN SSN, ADD MASKED WITH FUNCTION partial. Same
for Email with the email function, and AnnualIncome with a random range.
No application code changes — the engine does it.

## S3 · STEPS CARD (four functions)

Four built-in functions. Default swaps in a type-appropriate placeholder.
Partial keeps a prefix and suffix, hiding the middle. Email keeps an
email-shaped pattern. Random replaces a number within a range you choose.

## S4 · CODE CARD (UNMASK)

One more piece: the UNMASK permission. GRANT UNMASK TO
FraudInvestigationRole lets that specific role see real values despite
the mask — least privilege and masking working together, narrow by
default.

## S5 · STEPS CARD (the real limit)

Masking is a presentation-layer control, not a security boundary. A
determined user with query access can sometimes infer a masked value
indirectly. Microsoft's own docs say this limits casual exposure — it
doesn't replace encryption or tight permissioning.

## S6 · OUTRO CARD

Next up: tokenization and pseudonymization — two more ways to protect a
sensitive value, and how they actually differ from both masking and
encryption.
