# Lesson 33 — Dynamic Data Masking

**Chapter 6 · Data Security & Compliance · Lesson 33 of 95**

## What you'll learn

- What Dynamic Data Masking actually changes — query results, not stored data
- The four built-in masking function types and when each fits
- Why privileged users see real data while everyone else sees masked output
- Configuring a masking rule from the Azure Portal and with T-SQL

## The problem this solves — and doesn't

Everything in Lessons 31-32 was about protecting data from someone who shouldn't have any access at
all — storage theft (TDE) or a compromised server that never gets the key (Always Encrypted).
**Dynamic Data Masking (DDM)** solves a different, much more common problem: a user with **legitimate
query access** to a table, who doesn't need to see the *real* value of every sensitive column to do
their job. A customer service rep looking up an account needs to confirm *an* email address matches,
not necessarily read the whole thing character-by-character. DDM masks specific columns in the
**query result set**, in real time, based on who's asking — without changing a single byte of the
actual stored data.

```
Stored data (unchanged):     ssmith@company.com
Privileged user's query:     ssmith@company.com          (sees real value)
Masked user's same query:    sXXX@XXXX.com                (sees masked value)
```

This is the opposite of TDE and Always Encrypted in one important sense: DDM assumes the query is
legitimate and the data is already decrypted and flowing normally — it just rewrites what a specific
class of user is allowed to *see* in the result.

## The four masking function types

| Function | Effect | Example |
|---|---|---|
| **Default** | Full masking based on data type (`XXXX` for strings, `0` for numbers, a fixed date for date types) | `XXXX` |
| **Email** | Shows the first letter, masks the rest of the account, keeps a fixed domain suffix | `sXXX@XXXX.com` |
| **Random** | Replaces a numeric value with a random number within a defined range | A masked salary showing a plausible but fake number |
| **Custom string (partial)** | Shows a defined number of characters at the start/end, masks the middle | `999-XX-XXXX` for an SSN |

Configuring the Random masking function in the Portal looks like this — a numeric range defining the
random substitute values:

![Azure Portal dynamic data masking rule configuration showing the Random number masking function with a defined range](/courses/azure-dba/ch06/33-dynamic-data-masking/random-number.png)
*Configuring a Random masking rule: any value in this column is replaced with a number in this range for masked users.*

## Configuring DDM with T-SQL

```sql
ALTER TABLE dbo.Customers
ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()');

ALTER TABLE dbo.Employees
ALTER COLUMN Salary ADD MASKED WITH (FUNCTION = 'random(30000, 120000)');

ALTER TABLE dbo.Customers
ALTER COLUMN SSN ADD MASKED WITH (FUNCTION = 'partial(0, "XXX-XX-", 4)');
```

## Who sees real data, and why that's a permission, not a magic exemption

Masking is controlled by the `UNMASK` permission — anyone without it sees masked output for masked
columns, regardless of any other permission they hold on the table (including `db_owner`, unless
`UNMASK` is separately denied or granted correctly). Anyone *with* `UNMASK` sees the real values.

```sql
GRANT UNMASK TO ReportingServiceAccount;   -- this account now sees real values
-- Everyone else querying a masked column sees the masked output, full stop
```

## The real limitation: DDM is not a security boundary against a determined attacker

DDM is explicitly a convenience/least-exposure control, not encryption. A user with enough
permission to run ad-hoc queries can often infer or extract real values through workarounds —
filtering on the actual value in a `WHERE` clause (which still works against the real data, even
though the *returned* column is masked), brute-forcing small ranges, or exporting via a tool that
bypasses masking behavior in edge cases. Microsoft's own guidance is explicit that DDM should be
combined with proper permissions and auditing (Lesson 36), not relied on as the only control for
truly sensitive data — that's exactly why Always Encrypted exists for data that needs a real
security guarantee instead of a display convenience.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic Data Masking (DDM) | Masks column values in query results in real time; stored data is unchanged |
| `UNMASK` permission | Grants a principal the ability to see real, unmasked values |
| Default/Email/Random/Partial | The four built-in masking function types |

## Lab

1. Apply the `email()` masking function to a test table's email column, then query it as a user
   without `UNMASK` and confirm the output is masked.
2. Grant `UNMASK` to that same user and re-run the query, confirming real values now appear.
3. Write a `WHERE` clause filtering on the real (unmasked) value of a masked column, and confirm it
   still matches rows correctly — demonstrating why DDM isn't a substitute for real access control.

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: why is Dynamic Data Masking
described as a "least-exposure" control rather than a real security boundary against a determined,
permitted user?
