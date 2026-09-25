# Script — Inserting & Updating Records

## Segment 1 (title)

Now for the part that changes data. Insert adds new records from a CSV, and Update changes existing records. Both depend on getting the field mapping right.

## Segment 2 (code: insert: a csv of new records)

Insert takes a CSV where each row becomes a new record. Column headers name the fields, and you must include any field the object requires. You never supply an Id, because Salesforce generates one for every new record.

## Segment 3 (code: update: matched by id)

Update works differently. Every row must carry the record's Id, because that's how Data Loader finds the record to change. Only the columns you map are touched. A typical workflow is to export the records first, edit the CSV, and load it back.

## Segment 4 (steps: field mapping)

Field mapping connects your CSV columns to Salesforce fields. Data Loader reads your headers, Auto-Match handles the obvious ones, and you fix the rest by hand. When it finishes, you get a success file and an error file. Always read the error file.

## Segment 5 (outro)

Insert or update, run a small test first. Next up: upserting, which does both in one pass using External IDs.
