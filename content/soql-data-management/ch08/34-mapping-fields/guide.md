# Mapping Fields

Lesson 33 called for a field mapping document as part of every migration plan. This lesson is
about what goes into it and the two problems that cause most mapping failures: type
mismatches and picklist values that do not line up.

## What you'll learn

- How to structure a field mapping document
- The common type mismatches that make rows fail
- How to translate source picklist values into valid Salesforce values

## The mapping document

Build one row per field, with three columns: the **source** column, the **Salesforce**
object and field it maps to, and the **rule** that transforms the value.

| Source | Salesforce | Rule |
|---|---|---|
| `cust_name` | `Account.Name` | as is |
| `phone_no` | `Account.Phone` | digits only |
| `signup_dt` | a custom date field | convert to ISO date |
| `status` | a custom picklist field | translate using the crosswalk |

Review this with the people who own the data before loading. Discovering a wrong mapping
after 200,000 rows are in is much more expensive than discovering it in a review meeting.

## Type mismatches

Salesforce fields are typed, and a CSV file is all text. Common problems:

- **Numbers and currency**: a value like `$1,250.00` in a number or currency field fails.
  Clean it to `1250.00` first.
- **Dates**: `03/04/2025` is ambiguous between March 4 and April 3. Use the unambiguous
  `yyyy-MM-dd` format, for example `2025-03-04`.
- **Text length**: a value longer than the field's maximum is rejected with a
  `STRING_TOO_LONG` error, so shorten it or reconsider the target field.
- **Leading zeros**: spreadsheets often strip leading zeros from values such as zip codes and
  product codes. Check these before you save the CSV, and format such columns as text.
- **Checkboxes**: use clear true/false values, and keep a rule for blanks.

## Picklist value translation

Source systems rarely use the same values as your Salesforce picklists. A source `status`
of `A`, `I`, `P` may need to become `Active`, `Inactive`, `Prospect`. Build a **crosswalk
table** with one row per source value, decide explicitly what happens to blanks and values you
did not expect, and apply it to the data before loading.

If the target field is a **restricted picklist**, any value not on the list is rejected with
an error. A **multi-select picklist** takes all its values in one cell, separated by
semicolons, for example `Red;Blue;Green`.

## Reading the results

Treat the Data Loader error file as feedback on your mapping. Fix the pattern in the source
data, then reload only the failed rows. Once a mapping is right, Data Loader can save it as an
`.sdl` file so you can reuse it in the next load.

## Key terms

| Term | Meaning |
|---|---|
| Field mapping | The agreed link between a source column and a Salesforce field, plus any transformation |
| Crosswalk table | A lookup table converting source values into valid Salesforce values |
| Type mismatch | A value whose format does not fit the target field's data type |
| Multi-select picklist | A picklist field that stores several values, separated by semicolons |

## Check yourself

Your load of 10,000 Accounts has 1,300 failed rows, all from the `Status__c` picklist. Where
would you look first to understand what happened, and what would you build to fix it?
