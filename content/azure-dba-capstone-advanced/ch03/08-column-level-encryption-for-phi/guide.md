# Lesson 8 — Column-Level Encryption for Patient Data

**Chapter 3 · Security & Compliance · Lesson 8 of 26**

## What you'll learn

- The specific gap TDE leaves open for Overlook's most sensitive columns
- Dynamic Data Masking vs. Always Encrypted — what each one actually is, and which this chapter uses
- Why masking, not Always Encrypted, is the right fit for Overlook's reporting needs
- The real `ALTER TABLE ... ADD MASKED WITH` syntax, applied to Overlook's own columns

## The gap Lesson 7 left open, stated precisely

Lesson 7 was explicit: TDE protects storage and backups, not a query an authorized account is
allowed to run. Overlook has columns — a patient's date of birth, a billing contact's phone number
— where an authorized scheduling-app account or a customer-service rep needs to work with the row,
but doesn't need to see every sensitive value in plaintext to do their job. That's a different
control than encryption at rest, and Azure SQL offers two real options for it.

## Two real options, and why this chapter picks one

| | Dynamic Data Masking (DDM) | Always Encrypted |
|---|---|---|
| What changes | The query **result set**, in real time | The data itself, encrypted client-side before it ever reaches the server |
| Who sees real values | Anyone with the `UNMASK` permission | Only a client application holding the actual encryption key |
| Performance/complexity cost | Low — a column-level setting | Higher — requires client driver support and key management |
| Fits Overlook's need for | Reporting staff seeing *most* data, with a few fields hidden from casual view | A column no one but a specific application should ever decrypt, even the DBA |

Overlook's real need here is the first one: reporting and front-desk staff who legitimately work
with patient records all day, but shouldn't see a full date of birth or phone number on casual
screen-share or report export. That's exactly **Dynamic Data Masking's** job — DDM masks specific
columns in the query result, based on who's asking, without changing a single byte of the actual
stored data.

```
Stored data (unchanged):     1985-03-14
Privileged user's query:     1985-03-14          (sees real value)
Masked user's same query:    1900-01-01           (sees masked value)
```

## Applying DDM to Overlook's actual columns

```sql
ALTER TABLE dbo.Patients
ALTER COLUMN DateOfBirth ADD MASKED WITH (FUNCTION = 'default()');

ALTER TABLE dbo.Patients
ALTER COLUMN Phone ADD MASKED WITH (FUNCTION = 'partial(0, "XXX-XXX-", 4)');

ALTER TABLE dbo.Billing
ALTER COLUMN BillingEmail ADD MASKED WITH (FUNCTION = 'email()');
```

`default()` masks a date-type column with a fixed placeholder date; `partial()` shows a defined
number of real characters at the start/end and masks the middle, appropriate for a phone number;
`email()` keeps the pattern of an email address readable while masking the account name.

## Who still sees real values — and why that's a permission, not a loophole

```sql
GRANT UNMASK TO ReportingServiceAccount;
-- Everyone else querying a masked column sees the masked output, full stop
```

Only accounts explicitly granted `UNMASK` — Overlook's actual clinical reporting account, not every
front-desk login — see real values. This is deliberately a least-exposure control, not a security
boundary against a determined attacker: a user with legitimate query access could still filter on
the real value in a `WHERE` clause. DDM's job is reducing casual, incidental exposure of sensitive
columns, not replacing TDE, auditing, or least-privilege access — each of which does a different
real job in this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic Data Masking (DDM) | Masks column values in query results in real time; stored data is unchanged |
| `UNMASK` permission | Grants a principal the ability to see real, unmasked values |
| Always Encrypted | The alternative where data is encrypted client-side; not used here, since Overlook needs selective masking, not a key only one app holds |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why does Overlook's reporting need
point to Dynamic Data Masking instead of Always Encrypted, and what's the one thing DDM explicitly
does not protect against?
