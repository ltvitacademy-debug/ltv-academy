# Script — External IDs and Relationships During Loads

## Segment 1 (title)

Upsert's real power comes from matching on an External ID rather than a Salesforce record ID. Let's cover what that field actually is, and the trickier problem it solves: loading records that need to point at each other.

## Segment 2 (code: Account upsert on External ID)

An External ID is a custom field with the External ID attribute checked, typically holding an identifier from the system you migrated from — here, a legacy customer number. Run Upsert and choose that field as the match key instead of Id. Found an existing record with that value, Upsert updates it; not found, it inserts a new one and populates that field for next time.

## Segment 3 (steps: idempotent, repeatable)

Run the same file twice, and the second run updates instead of duplicating — that's what makes an External-ID upsert idempotent, and it's exactly why repeated loads from the same legacy source stay clean.

## Segment 4 (code: Contact-to-Account dot notation)

Here's the harder problem External IDs solve. Say your Contacts need to link to the right Account, but your file only has the Account's legacy number, not its Salesforce ID. Data Loader lets you map a column directly to a relationship field using dot notation — Account dot Legacy Customer Number — and it resolves each value against the Account's External ID behind the scenes, no manual lookup required.

## Segment 5 (steps: mark it Unique)

One rule is non-negotiable: mark the field Unique. If two Accounts somehow share the same legacy number, an Upsert matching on it has two candidates and fails the row rather than guessing. A non-unique External ID is the most common cause of an Upsert job that silently skips or duplicates rows.

## Segment 6 (outro)

With records going in correctly, the next question is getting data safely back out. Up next: data exports and backups.
