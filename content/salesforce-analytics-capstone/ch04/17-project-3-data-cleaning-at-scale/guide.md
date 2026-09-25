# Data Cleaning at Scale

The VP said the numbers have to be right. Before your dashboard can be trusted, you need to know how dirty the underlying data is. This lesson applies skills you already have, SOQL for profiling and Data Loader for bulk fixes, to Alder & Vale Systems' lead data. All counts are illustrative, and the exact behavior of your org's fields and duplicate tools will differ, so check before you change anything.

## What you'll learn

- How to profile a dataset with SOQL before changing it
- How to find and handle duplicates, nulls, and inconsistent values
- How to run a safe bulk-fix loop with Data Loader
- How to measure the effect of cleaning on your headline numbers

## Rule one: profile, then decide

Never start fixing. Start measuring. These queries, run in the Developer Console or Workbench, describe the mess:

`SELECT COUNT(Id) total, COUNT(Email) hasEmail FROM Lead`

COUNT of a specific field counts only rows where it isn't null, so the gap between the two is your null count. Illustrative: 3,600 leads, 216 without an email.

`SELECT Email, COUNT(Id) FROM Lead WHERE Email != null GROUP BY Email HAVING COUNT(Id) > 1`

This finds duplicated emails. Illustrative: **214 duplicate groups** containing 468 leads, which means 254 surplus records.

`SELECT Country, COUNT(Id) FROM Lead GROUP BY Country`

This exposes inconsistent values. Illustrative: "United States" 1,180, "USA" 412, "US" 96, "U.S." 33. Four spellings, one country. (If your org uses standard country and state picklists, this problem may be smaller; check.)

## Nulls: decide, don't fill blindly

Blanks appear in reports as dashes. A blank Lead Source, 432 of 3,600 leads or 12 percent in our example, is a real finding, not just a nuisance. Ask why: an integration that doesn't populate the field, a web form missing a mapping, or a rep skipping it. Options: leave it and report it as "Unknown", backfill from a reliable source, or fix the process. Never guess values to make a chart look complete.

## Standardization

Group your variants, choose one canonical value, and write down the mapping. In a report, a bucket field can group variants for display without touching the data. To fix at the source, export, correct, and update in bulk. Excel functions such as TRIM and a lookup table make this repeatable, and Power Query is an option if you know it.

## Duplicates

Decide your match key first: email, or company name plus domain, or something fuzzy. Then decide the action: merge, or flag and exclude. Salesforce provides merge for records such as leads, with limits on how many can be merged at once, and Duplicate Management, matching and duplicate rules, can help prevent new duplicates if it's enabled. Merging is usually safer than deleting because it preserves history. Whatever you choose, get sign-off before changing production data.

## The safe bulk-fix loop with Data Loader

1. **Export** the affected records with Data Loader, including Id, to a CSV. Save an untouched copy as your backup.
2. **Correct** a working copy in Excel. Keep the Id column intact.
3. **Test** the update on a small sample, ideally in a sandbox.
4. **Update** with Data Loader, mapping Id and only the columns you're changing.
5. **Review** the success and error files that Data Loader writes. Investigate every error row.
6. **Re-run your profiling queries** and confirm the counts moved as expected.

Data Loader can also delete records, but deletion is rarely the right cleanup step, and you should treat it as irreversible for practical purposes.

## Measure what cleaning changed

Cleaning should change your headline numbers, so quantify it. With 254 duplicates removed, 3,600 leads become 3,346. Assuming the 540 conversions aren't affected, the conversion rate moves from 15.0 percent to about 16.1 percent. That difference is worth telling the VP, because it shows why the cleaning mattered.

## Document everything

Keep a cleaning log: what you found, your rule, how many rows changed, and what you left alone. It goes in your definitions sheet and into your portfolio README.

## Your turn

Profile Leads, Opportunities, and Cases for nulls, duplicates, and inconsistent values. Choose which issues affect the dashboard and fix only those. Note the rest as known limitations.

## Recap

Profile with SOQL, decide with the business, fix in a loop with backups and verification, and quantify the effect. Clean data is part of the answer.

## Check yourself

If 214 duplicate groups contain 468 leads, how many surplus records are there, and how would you verify the count after merging?
