# Lesson 24 — Data Cleansing and Standardization

**Chapter 5 · Remediation and Monitoring · Lesson 24 of 30**

## What you'll learn

- The difference between cleansing (fixing bad values) and standardization
  (making good-but-inconsistent values uniform)
- The core cleansing operations: parsing, correcting, deduplicating, and
  enriching
- Standardization patterns for addresses, names, phone numbers, and
  categorical codes
- How to write cleansing logic that is safe to re-run
- Why every cleansing step needs an audit trail

## Cleansing vs. standardization — two different jobs

These two terms get used interchangeably, but they solve different
problems, and a mature remediation process does both:

- **Cleansing** fixes values that are *wrong*: a null that should have
  a value, a typo'd state code, an email address missing the `@`, a
  negative quantity that should be positive.
- **Standardization** fixes values that are *right but inconsistent*:
  "NY", "N.Y.", and "New York" all correctly mean the same state, but a
  `GROUP BY state` or a join against a reference table breaks until
  they're written the same way. Lesson 13's consistency dimension is
  exactly this problem.

A dataset can pass every cleansing check and still be unusable for
reporting if standardization was skipped — ten regional spellings of
the same customer name won't deduplicate (Lesson 15) no matter how
"accurate" each individual spelling is.

## The core cleansing operations

1. **Parsing** — splitting one messy field into its real structure, for
   example pulling area code, prefix, and line number out of a free-text
   phone field, or splitting `"Smith, John"` into first and last name
   columns
2. **Correcting** — fixing a value against a known-good reference: a
   misspelled country name matched against an ISO country list, a ZIP
   code corrected to match its stated city
3. **Deduplicating** — collapsing records that represent the same
   real-world entity (Lesson 15) into one, usually by picking a survivor
   record and merging or discarding the rest
4. **Enriching** — filling a gap using a trustworthy second source, such
   as looking up a missing city/state from a valid ZIP code, rather than
   leaving the field null

## Standardization patterns worth knowing

| Field type | Standardization pattern |
|---|---|
| Addresses | Normalize abbreviations (St./Street, Ave./Avenue), validate against a postal reference |
| Names | Consistent casing, trim whitespace, separate name parts into structured columns |
| Phone numbers | One consistent format (e.g., `+1-555-123-4567`), strip punctuation variance |
| Categorical codes | Map every known variant to one canonical code (e.g., "CA", "Calif.", "California" → `CA`) |

A standardization step is usually a lookup against a small reference
table you build once and reuse everywhere — the same reference table a
validity check (Lesson 14) would use to flag violations in the first
place. Profiling and cleansing share infrastructure.

## Writing cleansing logic that's safe to re-run

Cleansing scripts get run more than once — against a new data load, a
backfill, or after a bug fix. A script that isn't **idempotent** (safe
to run twice without changing the result the second time) silently
corrupts data the second time it runs. A deliberately simple,
idempotent standardization example:

```sql
-- Idempotent: running this again changes nothing further,
-- because it only touches rows that still need the fix
UPDATE customers
SET state_code = 'CA'
WHERE state_code IN ('Calif.', 'California', 'CALIF')
  AND state_code <> 'CA';
```

Compare that to logic that *appends* a correction rather than
*replacing* a value in place — appending is a common way cleansing
scripts accidentally become non-idempotent and double-correct a row on
a second run.

## Every cleansing step needs an audit trail

A cleansing job that silently overwrites the original value destroys
the evidence a later root cause investigation (Lesson 23) or an
auditor would need. Mature cleansing processes keep:

- The original (pre-cleansing) value, in a history table or an
  `_original` column
- Which rule or script made the change
- When the change happened

This is what makes a cleansing operation defensible later — "the state
code changed from 'Calif.' to 'CA' on this date, by this standardization
rule" — instead of an unexplained, un-auditable change to the data.

## Key terms

| Term | Meaning |
|---|---|
| Cleansing | Correcting values that are factually wrong |
| Standardization | Making correct-but-inconsistent values uniform |
| Idempotent | Safe to run more than once without changing the result further |
| Audit trail | A record of the original value, the rule, and the timestamp of a change |

## Lab

1. Pick a messy field you can imagine in a customer table — state,
   country, or phone number — and list three real-world variants a
   person might enter for the same correct value.
2. Write a single `UPDATE` statement (like the example above) that
   standardizes all three variants to one canonical value, written so
   that running it a second time changes nothing further.
3. Add one sentence describing what you would store as the audit trail
   for that change.

## Check yourself

Can you explain, in your own words, why a dataset that passes every
cleansing check can still fail reporting if standardization was
skipped? Can you describe what makes a cleansing script idempotent, and
why that matters operationally?
