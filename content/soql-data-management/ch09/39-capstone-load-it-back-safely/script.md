# Script — Capstone: Load It Back Safely

## Segment 1 (title)

You have the staged files and a prediction for each. Now the load. This is where a careless run does real damage, so the safety habits matter as much as the tool.

## Segment 2 (steps: load order)

Backups first, then the order. Accounts before Contacts, because Contacts point at Accounts. Then update the Lead Source values. And delete the surplus Leads last, because delete is the least reversible step, so everything else gets verified before it runs. All of it in the sandbox first.

## Segment 3 (code: account upsert)

Upsert means: match on the External ID, update if found, insert if not. Choose Upsert in Data Loader, pick Account, and match on Legacy Id. All sixty-one rows insert. And running the file twice can't create duplicates, because the second run finds the first run's records and updates them.

## Segment 4 (code: contact mapping)

For Contacts, the file carries the Contact's own Legacy Id as the match key, plus the parent's Legacy Id. In the mapping step, map that parent column to the Account relationship's Legacy Id, not to AccountId. Salesforce looks up the parent for you, and you never need a Salesforce record Id in the file.

## Segment 5 (steps: read the results)

After every run, Data Loader writes a success file and an error file. Confirm success plus errors equals input rows. Read the error column. Fix the cause and re-run only the failed rows. Keep the success file as your audit trail. And if something unexpected happens, stop before the next file.

## Segment 6 (code: validation queries)

Then validate. Count Leads: expect thirty-eight thousand ninety. Group by Lead Source: only Trade Show, no variants. Contacts with a null AccountId: zero. The duplicate query: zero rows. Every number should land on its prediction.

## Segment 7 (steps: production)

If the sandbox run passes, production is the same steps, but not the same files. The data has changed since the sandbox refresh, so re-run the extracts, rebuild the files, and repeat the ordered steps with the same checks.

## Segment 8 (outro)

The dataset is clean and proven. Next up: the capstone wrap-up and portfolio presentation.
