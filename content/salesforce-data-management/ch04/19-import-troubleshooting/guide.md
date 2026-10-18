# Import Troubleshooting

**Chapter 4 · Applied Data Management · Lesson 19 of 20**

Every import eventually produces an error file. The good news: Salesforce's error messages are more specific than they first look, and most of them map to one of a handful of recurring causes. This lesson is the error-file reading guide — what each message actually means, and the fix that goes with it.

## What you'll learn

- The error codes you'll see most often, decoded
- Why "DUPLICATE_VALUE" doesn't always mean what you think it means
- A repeatable method for working an error file down to zero
- Why you re-run only the failed rows, never the whole file
- A full worked exercise: a real, messy error file for Meridian Outdoor Supply, worked down to zero using exactly this method

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

## Worked exercise: Meridian Outdoor Supply's 847-row error file

**Business context.** Meridian Outdoor Supply is migrating 12,000 historical Opportunities from a
legacy system via Data Loader upsert, keyed on `Legacy_Opp_ID__c` as the External ID. The batch
job finishes and reports 11,153 successes — and an 847-row error file.

**Available evidence.** Opening the error file and sorting by the Error column (Step 1 of the
method above) shows three clusters, not 847 unrelated problems:

```
612 rows — INVALID_CROSS_REFERENCE_KEY
  "Account ID: id value of incorrect type: A-20118"

198 rows — DUPLICATE_VALUE
  "duplicate value found: Legacy_Opp_ID__c duplicates value on record with id: 006..."

37 rows — FIELD_CUSTOM_VALIDATION_EXCEPTION
  "Close Date cannot be in the past for an open Opportunity: [CloseDate]"
```

**Diagnostic questions.**

- The 612-row cluster all reference the same malformed value shape (`A-20118`, not a real
  Salesforce Account Id). Is this 612 separate data problems, or one systemic cause repeated 612
  times?
- The 198 `DUPLICATE_VALUE` rows — per this lesson's own distinction, is this a sign the import
  is broken, or a sign something upstream already succeeded?
- Does fixing all three clusters require three different kinds of fixes, or could some be the
  same root cause wearing different symptoms?

**Expected investigation sequence.**

```
# Cluster 1 (612 rows): INVALID_CROSS_REFERENCE_KEY
# "A-20118" isn't a Salesforce Id at all -- it's the legacy system's
# own Account numbering format. The import file's AccountId column
# was never mapped through an External ID lookup -- it's passing the
# legacy system's native key directly into a field that expects a
# real Salesforce Id or a correctly-referenced External ID.
-> Root cause: a field-mapping error, not 612 missing Accounts.

# Cluster 2 (198 rows): DUPLICATE_VALUE on Legacy_Opp_ID__c
# Per this lesson's own "DUPLICATE_VALUE is not a duplicate rule"
# section -- check whether these 198 Legacy_Opp_ID__c values already
# exist in the org.
-> Confirmed: these are rows from an earlier, partial run of this
   same migration two days ago that already succeeded. This cluster
   isn't broken data -- it's rows that should never have been
   resubmitted as new inserts.

# Cluster 3 (37 rows): FIELD_CUSTOM_VALIDATION_EXCEPTION
# The rule's own error message already names the field and the rule.
-> These are genuinely open Opportunities with a past Close Date --
   real, pre-existing data quality issues in the legacy system, not
   an import mechanics problem.
```

**Resolution, cluster by cluster.**

```
Cluster 1 (612 rows): Fix the field mapping -- change the AccountId
  column to reference Meridian's own Legacy_Account_ID__c external
  ID field on Account, instead of passing the raw legacy key into a
  field Salesforce reads as a literal Id. Re-import only these 612
  rows after the mapping fix.

Cluster 2 (198 rows): Do not re-import. These already exist from the
  prior partial run -- resubmitting them as inserts would either
  fail again (correctly) or, worse, create true duplicates if the
  external ID matching were ever bypassed. Confirm all 198 are
  accounted for in the org, then remove them from the error file
  entirely rather than treating "still in the error file" as "still
  needs fixing."

Cluster 3 (37 rows): Not an import-process problem -- flag these 37
  specific legacy records for the sales ops team to correct the
  source data (or confirm the Opportunities should actually be
  marked Closed), then re-import only after the source values are
  fixed.
```

**Root cause, stated plainly.** Three clusters, three different root causes — a field-mapping
mistake, an accidental resubmission of already-successful rows, and genuine upstream data quality
issues — that happened to surface as one 847-row error file. Treating "847 errors" as one problem
to brute-force would have meant either incorrectly re-mapping fields that were actually fine
(Clusters 2 and 3), or re-running duplicates that would create real data integrity problems
(Cluster 2 specifically, if external ID matching were ever misconfigured).

**Prevention.** Sorting by error type first (this lesson's Step 1) is what turned an
undifferentiated 847-row problem into three distinct, correctly-diagnosed root causes in minutes
instead of hours — this is the entire reason the method insists on sorting before fixing anything.
For Cluster 2 specifically: confirming a batch's full success/failure count *before* re-running
any part of it would have caught that a prior partial run had already succeeded, avoiding the
wasted resubmission entirely.

## Recap

- Most import errors map to a short list of recurring codes: missing required fields, unique-constraint conflicts, broken lookups, validation rule blocks, and length limits.
- `DUPLICATE_VALUE` is a field-level unique constraint, not the Duplicate Rules from Chapter 3 — those show up as `DUPLICATE_DETECTED` instead.
- `FIELD_CUSTOM_VALIDATION_EXCEPTION` always includes your own rule's Error Message text — read past the code itself.
- Sort the error file, fix the dominant cause, and re-import only the failed rows, repeating until it's empty.

## Check yourself

An error file shows 150 rows all failing with `INVALID_CROSS_REFERENCE_KEY` on the same AccountId value. What's the most efficient next step, in one sentence?
