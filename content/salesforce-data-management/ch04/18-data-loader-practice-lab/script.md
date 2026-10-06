# Script — Data Loader Practice Lab

## Segment 1 (title)

The last chapter built the tools that keep data clean. This chapter puts them to work. We're going to walk one realistic Data Loader job end to end — an upsert, the operation you'll actually run most once you're managing data for a living.

## Segment 2 (code: why upsert)

Insert only adds, and fails if the record already exists. Update only changes, and fails if it doesn't. Upsert does both, matched on a key field — which makes it the safe default for anything you might run more than once. A weekly refresh won't create five hundred duplicate Contacts just because someone ran it twice.

## Segment 3 (code: the lab file)

Here's the lab file — forty Contacts exported from an old CRM, each with a Legacy Contact ID the old system assigned. That column maps to a custom field on Contact, marked as an External ID, which is what upsert will actually match on instead of the Salesforce record Id.

## Segment 4 (code: the sequence)

Data Loader's sequence is the same every time: log in, choose the operation, choose the object, select your file, choose the matching field, map your columns, then review and start. Step five is the one that trips people up — that dropdown only lists fields actually marked External ID on the object. If your field isn't there, the field definition is the problem, not the CSV.

## Segment 5 (code: two output files)

Every job produces two files: a success file, which adds the new Salesforce Id and tells you insert versus update, and an error file, which keeps only the rows that failed with a column explaining why. Open the error file every time, even when the summary says thirty-nine of forty succeeded. That one row is real data that didn't make it in.

## Segment 6 (steps: run it yourself)

Run this yourself. Create the External ID field, upsert ten rows and confirm they're all marked as newly created, then edit two of the email addresses in that same file and run it again. Those two rows should now show as updated, not created — proof the matching actually worked.

## Segment 7 (outro)

The error file is where most real troubleshooting happens. Next lesson, we go through the error messages you'll actually see and what each one means.
