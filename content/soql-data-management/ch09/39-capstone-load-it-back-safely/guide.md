# Capstone: Load It Back Safely

You have four staged files from the last lesson and a written prediction for each. This is
steps three through five of the plan: **stage** the order of operations, **load** with
Data Loader, and **validate** the result against your baseline. It's the part where a
careless run does real damage, so the safety habits matter as much as the tool.

## What you'll learn

- The order to load Summit Ridge's four files, and why
- How to upsert on `Legacy_Id__c`, including linking Contacts to parents by External ID
- How to read Data Loader's success and error files
- How to prove the result with post-load validation queries

## Before anything loads

Two safety rules apply to every run in this lesson:

- **Backups exist.** From the last lesson you have `leads_backup.csv`. Also export the
  current Accounts and Contacts you're about to touch, so you can restore old values if
  you must.
- **Everything runs in the sandbox first.** In Data Loader you choose the sandbox when
  you log in. Production comes only after a clean sandbox run.

One more prerequisite: the manual-review duplicate groups (groups with two or more
converted Leads) were resolved by Summit Ridge's sales operations lead before staging, so
all 2,760 groups now have exactly one survivor.

## The load order: parents before children

Contacts point to Accounts. If a Contact is loaded before its Account exists, the load
can't link them. So the order is:

1. **Upsert 61 new Accounts** on `Legacy_Id__c`
2. **Upsert 1,240 Contacts** on `Legacy_Id__c`, linking each to its Account through the
   Account's `Legacy_Id__c`
3. **Update 3,540 Leads** with corrected `LeadSource`
4. **Delete 3,770 surplus Leads**, last, because it is the least reversible step

Leads don't depend on Accounts or Contacts here, so steps 3 and 4 could go anywhere
after the backup. Delete goes last on purpose: everything else is verified first.

## Upserting Accounts and Contacts

**Upsert** means: for each row, look for an existing record whose External ID matches;
update it if found, insert a new record if not. In the Data Loader wizard you choose the
Upsert operation, pick the object, select the file, and then select
`Legacy_Id__c` as the field to match on.

For the 61 Accounts, none exist yet, so all 61 rows insert. Because it's an upsert on the
key, re-running the same file by mistake can't create 61 more copies: the second run
finds the first run's records and updates them instead.

For the Contacts, the CSV has two key columns: the Contact's own `Legacy_Id__c` (the
match key) and `Parent_Legacy_Id__c`, the Account's key from the ERP export. In the
mapping step, map `Parent_Legacy_Id__c` to the **Account relationship's `Legacy_Id__c`**
rather than to `AccountId`. This lets Salesforce look up the parent for you. You never need
Salesforce record IDs in the file, which is why the legacy key was worth so much. All 1,240
orphans carry a `Legacy_Id__c`, so every row matches an existing Contact and only its
parent changes.

## The Lead changes

`leads_source_fix.csv` uses the Update operation, because you're carrying the Salesforce
`Id` from your extract and only `LeadSource` changes. `leads_to_delete.csv` uses Delete.
Deleted records go to the Recycle Bin rather than vanishing, and don't use Hard Delete
here: keeping the safety net is the point. A deleted Lead also takes its activity history
with it, which is one more reason the survivor rule preferred the most recently modified
record.

## Read the result files

After every run, Data Loader writes a success file and an error file. Before moving to
the next step:

- Confirm success rows plus error rows equals input rows.
- Open the error file and read the error column. Fix the cause and re-run only the failed
  rows. Don't re-run the whole file.
- Keep the success file: it lists the Ids Salesforce created or updated, and is your
  audit trail.

If a step produces unexpected errors, stop. Don't push on to the next file.

## Post-load validation

Re-run the baseline queries and compare against your predictions:

```sql
SELECT COUNT() FROM Lead
-- expect 38,090 (41,860 minus 3,770)

SELECT LeadSource, COUNT(Id) n FROM Lead GROUP BY LeadSource
-- expect no Trade Show variants, only "Trade Show"

SELECT COUNT() FROM Contact WHERE AccountId = null
-- expect 0

SELECT Email, COUNT(Id) n FROM Lead
WHERE Email != null GROUP BY Email HAVING COUNT(Id) > 1
-- expect 0 rows
```

Then spot-check a few parents and children with a parent-to-child subquery:

```sql
SELECT Name, Legacy_Id__c, (SELECT LastName FROM Contacts)
FROM Account
WHERE Legacy_Id__c IN ('C-10482', 'C-10517')
```

If every number lands on its prediction, the sandbox run passes. For production, don't
reuse the staged files blindly: the data has changed since the sandbox refresh, so re-run
the extract queries there, rebuild the files, and repeat the same ordered steps.

## Key terms

| Term | Meaning |
|---|---|
| Upsert | Update the record whose External ID matches, or insert a new one if none does |
| Parent reference | Mapping a CSV column to the parent's External ID instead of its Salesforce Id |
| Success file / error file | The two CSVs Data Loader writes after each run, listing what worked and what failed |
| Recycle Bin | Where deleted records go, so a normal delete can be recovered |
| Post-load validation | Re-running your baseline queries and comparing the results to your predictions |

## Check yourself

Why do the 61 Accounts load before the 1,240 Contacts, and why is the Lead delete the
last step rather than the first?
