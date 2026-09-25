# Script — Upserting Records

## Segment 1 (title)

Insert creates. Update changes. Upsert does both, and it's the operation that makes repeatable data loads possible.

## Segment 2 (code: one operation, two outcomes)

An upsert matches each CSV row against existing records using an ID field you choose. If a match is found, that record is updated. If there's no match, a new record is inserted. If more than one record matches, that row errors, so the matching field must be reliable.

## Segment 3 (code: the external id field)

The field you match on is usually an External ID. That's a custom field you create and mark as External ID, and it holds the key from your other system, like a customer number from an ERP. Data Loader's upsert wizard asks which field to match on.

## Segment 4 (steps: why it suits repeatable loads)

This is why upsert suits repeatable loads. You don't need Salesforce Ids in your file, only your own source key. Running the same file twice updates the rows instead of creating duplicates. That makes it a natural fit for regular syncs from another system.

## Segment 5 (outro)

Upsert gives you insert and update in one pass. Next up: the operation that needs the most care, deleting records safely.
