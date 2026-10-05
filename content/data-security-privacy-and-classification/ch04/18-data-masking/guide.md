# Lesson 18 — Data Masking

**Chapter 4 · Protecting Data · Lesson 18 of 30**

## What you'll learn

- What data masking does, and how it differs from encryption
- Real T-SQL for SQL Server's Dynamic Data Masking feature
- The four built-in masking functions and when to use each
- Why masking is a UI-layer control, not a storage-layer one — and what that means for its limits

## What masking actually does

**Data masking** hides sensitive values from people who query a table, without changing the value actually stored on disk. The underlying data is untouched — what changes is what a non-privileged user *sees* when they run a `SELECT`. This is a different job from encryption (Lesson 20), which protects data from anyone who doesn't hold the right key, including someone with raw file access. Masking's threat model is narrower and more specific: a legitimate, authenticated user who's allowed to query the table but shouldn't see the column's true value — a support rep who needs to confirm a customer record exists, without needing to see the customer's full SSN.

## Dynamic Data Masking in T-SQL

SQL Server's **Dynamic Data Masking** feature applies a mask directly on a column, defined once as part of the column's definition:

```sql
-- Mask an existing column
ALTER TABLE dbo.Customers
ALTER COLUMN SSN ADD MASKED WITH (FUNCTION = 'partial(1,"XXX-XX-",4)');

ALTER TABLE dbo.Customers
ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()');

ALTER TABLE dbo.Customers
ALTER COLUMN AnnualIncome ADD MASKED WITH (FUNCTION = 'random(30000, 150000)');
```

Any ordinary `SELECT * FROM dbo.Customers` run by a user without the `UNMASK` permission now returns masked values in those three columns automatically — no application code changes required, because the masking happens in the database engine itself.

## The four masking functions

- **`default()`** — replaces the value with a type-appropriate placeholder: `XXXX` for strings, `0` for numbers, `1900-01-01` for dates
- **`partial(prefix, padding, suffix)`** — keeps a specified number of characters at the start and end, replacing the middle, exactly like the SSN example above (`partial(1,"XXX-XX-",4)` keeps the first digit and last four, as a real SSN mask would)
- **`email()`** — masks an email address to a fixed pattern (`aXXX@XXXX.com`) while keeping it recognizably email-shaped
- **`random(low, high)`** — replaces a numeric value with a random number within a specified range, useful for columns like salary where the exact value matters less than roughly knowing it exists

## Granting the ability to see real data

Masking has one more piece: the `UNMASK` permission, which lets a specific role or user see the real, unmasked value despite the column having a mask defined:

```sql
-- Let a specific role bypass masking and see real values
GRANT UNMASK TO FraudInvestigationRole;
```

This is RBAC (Lesson 13) and least privilege (Lesson 14) working together with masking: the mask is the default for everyone, and `UNMASK` is granted narrowly, to the specific role that genuinely needs the real value for its job.

## Masking's real limit: it's a presentation-layer control

Dynamic Data Masking is **not** a security boundary against a determined attacker. A user with enough permission to run arbitrary queries can often work around a mask — inferring a masked numeric value with a clever `WHERE` clause and binary search, for instance, since the underlying data and its real distribution are still there to query against indirectly. Microsoft's own documentation is explicit that Dynamic Data Masking is designed to limit casual, accidental exposure for users without direct table access to the raw data, not to stop a privileged or determined adversary — that job belongs to encryption (Lesson 20) and tight permissioning (Lesson 13), with masking layered on top as an additional, convenient control, not a replacement for either.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic Data Masking | A SQL Server feature that obscures column values in query results without changing the stored data |
| UNMASK permission | The permission that lets a specific role or user see real, unmasked values on a masked column |
| partial() | A masking function that keeps a defined prefix and suffix, replacing the middle |
| Presentation-layer control | A control that changes what's displayed to a query, not what's stored — masking's actual scope |

## Lab

On a test database, create a table with a fake SSN and email column, populate a few rows, then apply `partial()` masking to the SSN and `email()` masking to the email column. Query the table as the table owner (who typically bypasses masking) and then as a lower-privileged test user, and compare the two result sets.

## Check yourself

- Why is masking described as a different control from encryption, even though both "protect" sensitive data?
- Name the four built-in masking functions and one column type each would suit.
