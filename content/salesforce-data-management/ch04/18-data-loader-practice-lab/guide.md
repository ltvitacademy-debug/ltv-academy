# Data Loader Practice Lab

**Chapter 4 · Applied Data Management · Lesson 18 of 20**

Chapter 3 built the tools that keep data clean. This chapter puts them to work. This lab walks a single, realistic Data Loader job end to end — an **upsert** of Contact records using an External ID — the operation you'll actually run most often once you're managing data for a living. No screenshot substitutes for doing it, so build this along with your own Developer Edition org.

## What you'll learn

- Why upsert is the operation you reach for most, and what External ID does for it
- The exact sequence of screens Data Loader walks you through
- Where the two output files land, and why you always open both
- A realistic lab scenario to run yourself, start to finish

## Why upsert, and why an External ID

Insert only adds. Update only changes existing records, and fails if the row doesn't exist yet. **Upsert** does both: if a record matching your key already exists, it updates it; if not, it inserts a new one. That makes it the safe default for a recurring import — a weekly refresh from an external system won't create 500 duplicate Contacts just because you ran it twice.

Upsert needs a reliable key to match on. The Salesforce `Id` works, but your source system almost never has it. That's what an **External ID field** is for — a custom field (often `Legacy_System_ID__c`), marked External ID in its field definition, that holds the identifier your source of truth already uses. Upsert matches on that field instead of the Salesforce `Id`.

## The lab scenario

You're loading 40 Contacts exported from an old CRM. Each row has a `Legacy_Contact_ID` the old system assigned, which you'll map to a custom field `Legacy_Contact_ID__c` on Contact (already created and marked External ID).

```
FirstName,LastName,Email,Legacy_Contact_ID
Maria,Chen,maria.chen@northwind.example,LC-1001
David,Alvarez,d.alvarez@northwind.example,LC-1002
...(38 more rows)
```

## The sequence, screen by screen

```
1. Log in           -- Data Loader authenticates to your org
2. Choose Upsert     -- not Insert, not Update
3. Choose object      -- Contact
4. Select CSV file     -- the 40-row file above
5. Choose matching field -- Legacy_Contact_ID__c (the External ID)
6. Map columns          -- FirstName -> FirstName, Email -> Email, etc.
7. Review and Start      -- confirm, then the batch runs
```

Step 5 is the one that trips people up the first time: the dropdown only lists fields actually marked as External ID on the object. If your field doesn't appear, the field definition is the problem, not the CSV.

## Two output files, every time

Every job produces a **success file** and an **error file**, both CSVs, saved to the folder you configured (default: Data Loader's own `log` folder unless you changed it):

```
upsert_contact_success_<timestamp>.csv
upsert_contact_error_<timestamp>.csv
```

The success file adds an `Id` column (and `Created` true/false, telling you insert vs. update) to every row that worked. The error file keeps only the rows that failed, with an `Error` column stating why. **Always open the error file**, even when the job reports "39 of 40 succeeded" — that one row is real data that didn't make it in, and the error message tells you exactly what to fix before re-running just that row.

## Run it yourself

1. In a sandbox or Developer org, create a custom text field on Contact, `Legacy_Contact_ID__c`, and mark it External ID.
2. Build a 10-row CSV with FirstName, LastName, Email, and a made-up Legacy_Contact_ID for each.
3. Run the upsert sequence above.
4. Open both output files. Confirm 10 successes and `Created = true` for all of them (they're new).
5. Change two rows' Email values in the same CSV and run the upsert again. Confirm those two now show `Created = false` — they were matched and updated, not re-inserted.

## Recap

- Upsert inserts new records and updates existing ones in a single operation, matched on a key field — usually an External ID, not the Salesforce Id.
- Data Loader's sequence is consistent: operation, object, file, matching field, column mapping, review and run.
- Every job produces a success file and an error file. Always open the error file, regardless of the pass rate shown on screen.
- Re-running the same upsert with the same External ID values updates records instead of duplicating them — that's the whole point.

## Check yourself

You ran an upsert and the matching-field dropdown in step 5 didn't list the field you expected. What's the most likely cause, in one sentence?
