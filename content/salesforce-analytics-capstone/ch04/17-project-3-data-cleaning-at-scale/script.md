# Script — Data Cleaning at Scale

## Segment 1 (title)

The VP said the numbers have to be right. Before your dashboard can be trusted, you need to know how dirty the data is. Today you apply SOQL and Data Loader to Alder and Vale's lead data.

## Segment 2 (code)

Profile before you fix. Count leads with COUNT of Id, and again with COUNT of Email. Counting a field skips nulls, so the gap is your null count: 216 missing emails out of 3,600, illustrative. Then group by email with HAVING count above one. That finds 214 duplicate groups, 468 leads, so 254 surplus records.

## Segment 3 (screenshot)

Here's a real Salesforce report from Trailhead sample data. See the dashes in the rating and state columns? Those are blanks. In a report they look harmless. In a dashboard they silently shrink your groups, so count them and decide what to do.

## Segment 4 (code)

Standardize inconsistent values. Grouping leads by country shows United States, USA, US, and U.S., four spellings for one country. Pick one canonical value and write down the mapping. A bucket field can regroup for display without touching data. Fixing the source takes a bulk update.

## Segment 5 (steps)

For blanks, ask why before filling. An integration may skip the field, or a web form may lack a mapping. Leave it and report it as unknown, backfill from a reliable source, or fix the process. For duplicates, pick a match key, then merge rather than delete, and get sign-off before touching production.

## Segment 6 (steps)

Use the safe Data Loader loop. Export with Id and keep an untouched backup. Correct a working copy in Excel. Test on a small sample, ideally in a sandbox. Update mapping only Id and changed columns. Then read the success and error files line by line.

## Segment 7 (code)

Measure what changed. Remove 254 duplicates and 3,600 leads become 3,346. With 540 conversions, the rate moves from 15.0 to about 16.1 percent. Tell the VP why. Re-run your profiling queries to verify, and keep a cleaning log of what you found, changed, and left alone.

## Segment 8 (outro)

Up next, lesson eighteen: building the executive dashboard.
