# Import Troubleshooting

**Chapter 4 · Applied Data Management · Lesson 19 of 20**

Every import eventually produces an error file. The good news: Salesforce's error messages are more specific than they first look, and most of them map to one of a handful of recurring causes. This lesson is the error-file reading guide — what each message actually means, and the fix that goes with it.

## What you'll learn

- The error codes you'll see most often, decoded
- Why "DUPLICATE_VALUE" doesn't always mean what you think it means
- A repeatable method for working an error file down to zero
- Why you re-run only the failed rows, never the whole file

## The errors you'll actually see

```
REQUIRED_FIELD_MISSING
  -- A field marked required (or required-on-layout) was blank.
  -- Fix: populate the field, or check if it should be optional.

DUPLICATE_VALUE
  -- A field marked Unique already has that value on another record.
  -- This is NOT the duplicate rule from Chapter 3 — it's a hard
  -- field-level constraint (often on an External ID field itself).
  -- Fix: the value already exists; this row is probably a re-run
  -- that should have matched instead of inserted.

INVALID_CROSS_REFERENCE_KEY
  -- A lookup/relationship column (AccountId, OwnerId, a custom
  -- lookup) pointed at an Id or External ID that doesn't exist.
  -- Fix: the parent record wasn't loaded yet, or the key is wrong.

FIELD_CUSTOM_VALIDATION_EXCEPTION
  -- A validation rule (Lesson 14) blocked the save. The rest of
  -- the message is literally your rule's Error Message text.
  -- Fix: read the rest of the line — it tells you exactly what to change.

STRING_TOO_LONG
  -- A text value exceeds the field's defined length.
  -- Fix: shorten the value, or widen the field if the data is legitimate.
```

## "DUPLICATE_VALUE" is not a duplicate rule

This is the mix-up that costs people the most time. `DUPLICATE_VALUE` comes from a field marked **Unique** at the field-definition level — it's a hard database constraint, separate from the Duplicate Rules in Chapter 3. Seeing it on an External ID field almost always means the same logical record is already in your target file, or already in the org, and this row should have been an *update* (via upsert) rather than an *insert*. A Duplicate Rule, by contrast, would show up as `DUPLICATE_DETECTED` with your rule's own Alert Text, and only appears when Block is the configured action.

## Working an error file down to zero

```
1. Sort the error file by the Error column
     -- groups identical problems together instead of row by row
2. Fix the most common error type first
     -- one root cause (a missing parent record) often explains
        dozens of rows at once
3. Re-import ONLY the previously-failed rows
     -- never re-run the whole file; successful rows would
        either duplicate or needlessly re-match
4. Repeat until the error file is empty
```

Sorting first matters more than it sounds like it should: 200 failed rows that all say `INVALID_CROSS_REFERENCE_KEY` on the same missing Account usually means one fix (load that Account, or correct one External ID) clears most of the file in a single pass.

## Recap

- Most import errors map to a short list of recurring codes: missing required fields, unique-constraint conflicts, broken lookups, validation rule blocks, and length limits.
- `DUPLICATE_VALUE` is a field-level unique constraint, not the Duplicate Rules from Chapter 3 — those show up as `DUPLICATE_DETECTED` instead.
- `FIELD_CUSTOM_VALIDATION_EXCEPTION` always includes your own rule's Error Message text — read past the code itself.
- Sort the error file, fix the dominant cause, and re-import only the failed rows, repeating until it's empty.

## Check yourself

An error file shows 150 rows all failing with `INVALID_CROSS_REFERENCE_KEY` on the same AccountId value. What's the most efficient next step, in one sentence?
