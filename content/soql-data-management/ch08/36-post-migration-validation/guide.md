# Post-Migration Validation

A load that finishes is not a load that is right. Rows can be rejected, truncated, mapped to
the wrong value, or linked to the wrong parent while every progress bar reads 100%. This last
lesson of Chapter 8 is about proving the migration is complete and correct, and SOQL is the
tool that does most of the proving.

## What you'll learn

- How to reconcile record counts and totals between the source and Salesforce
- How to run useful spot checks
- SOQL queries that check referential integrity

## Layer 1: Record-count reconciliation

Start with the simplest question: did everything arrive? Two checks:

1. **Data Loader's own files.** Every row you sent must land in either the success file or
   the error file, so `source rows = success rows + error rows`. If not, something is missing.
2. **SOQL counts against the source.**

```sql
SELECT COUNT(Id) FROM Account
```

Counts alone can hide problems, so compare aggregates too:

```sql
SELECT StageName, COUNT(Id), SUM(Amount)
FROM Opportunity
GROUP BY StageName
```

Run the equivalent query on the source and compare both the counts and the totals. If you
loaded with a source-key External Id (Lesson 35), you can restrict the count to migrated
records with `WHERE Legacy_Id__c != null`.

Run these as a user who can see all records, because SOQL respects sharing and would
otherwise show a smaller number than really exists.

## Layer 2: Spot checks

Pick a sample of real records: random ones, edge cases such as very long names or unusual
characters, and your most important customers. Compare **every field** with the source. You
are looking for:

- Truncated text
- Dates that shifted or landed in the wrong format
- Picklist values that were translated incorrectly (Lesson 34)
- Owners that defaulted to the loading user

## Layer 3: Referential-integrity checks

Use SOQL to test that relationships came through:

```sql
-- Contacts whose Account link did not resolve
SELECT Id, LastName
FROM Contact
WHERE AccountId = null

-- Accounts that have no Contacts
SELECT Id, Name
FROM Account
WHERE Id NOT IN (SELECT AccountId FROM Contact)
```

Neither result is automatically a problem. Some Accounts legitimately have no Contacts. Judge
each result against what the source says should be true, and investigate the difference.

## Documenting the result

Write down the checks you ran and the numbers you got, source versus Salesforce. That
record is what lets a business owner sign off on the migration, and it becomes your
starting point for the capstone in Chapter 9.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Comparing counts and totals between the source and the target |
| Spot check | Manually comparing a sample of records field by field against the source |
| Referential integrity | The property that every reference points to a record that really exists |
| Anti-join | A query (using NOT IN with a subquery) that finds parents with no matching children |

## Check yourself

A migration reports 100,000 source Accounts, 99,940 loaded, and 60 in the error file. Do the
counts reconcile? What would you still check before telling the business it is done?
