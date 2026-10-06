# Script — Import Troubleshooting

## Segment 1 (title)

Every import eventually produces an error file. The good news is that Salesforce's error messages are more specific than they first look, and most of them map to one of a handful of recurring causes.

## Segment 2 (code: errors part 1)

REQUIRED_FIELD_MISSING is the simplest one — a field marked required was blank in your file. DUPLICATE_VALUE means a field marked Unique already has that value on another record. That one trips people up, because it looks like the duplicate rules from Chapter 3, but it isn't — it's a hard field-level constraint, and seeing it usually means this row should have been an update, not an insert.

## Segment 3 (code: errors part 2)

INVALID_CROSS_REFERENCE_KEY means a lookup column pointed at an Id or External ID that doesn't exist yet — often because the parent record, like the Account, hasn't been loaded in this batch. And FIELD_CUSTOM_VALIDATION_EXCEPTION means a validation rule blocked the save. Read past the error code on that one — the rest of the message is literally your own rule's Error Message text, telling you exactly what to fix.

## Segment 4 (code: duplicate value vs duplicate detected)

Worth separating clearly: DUPLICATE_VALUE is a hard constraint on a Unique field, and it fires on every insert regardless of any rule configuration. DUPLICATE_DETECTED is different — that's a Duplicate Rule from Chapter 3, set to Block, and it shows your own rule's Alert Text. Same general idea, two completely different mechanisms under the hood.

## Segment 5 (steps: working a file to zero)

Working an error file down to zero has a reliable method. Sort by the Error column so identical problems group together. Fix the most common cause first — two hundred rows failing on the same missing Account usually means one fix clears most of the file. Then re-import only the rows that actually failed, never the whole file again, and repeat until the error file is empty.

## Segment 6 (outro)

You now have every tool from this chapter and the reading skills to fix what goes wrong. Last lesson of the course: a full case study putting all of it together.
