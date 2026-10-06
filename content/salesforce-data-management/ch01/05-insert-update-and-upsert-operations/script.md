# Script — Insert, Update, and Upsert Operations

## Segment 1 (title)

Insert, Update, and Upsert are the three buttons on Data Loader's main screen for getting data in, and picking the wrong one is one of the easiest ways to turn a routine load into a mess.

## Segment 2 (screenshot: Data Loader main window)

They look similar — point at a CSV, map some fields, click go — but they behave very differently once records start matching, or failing to match, what's already in the org.

## Segment 3 (steps: three behaviors)

Insert creates new records, full stop — it never looks for a match, so running it on a file you've already loaded gives you duplicates. Update modifies existing records, but it matches purely on record ID, and a row without one fails outright. Upsert does both: if its match field finds an existing record, it updates it; if not, it inserts a new one.

## Segment 4 (code: Update CSV needs Id)

For Update, that means your CSV needs an Id column with each row's real, existing eighteen-character Salesforce ID. No Id column means every single row fails — there's no name-matching fallback to fall back on.

## Segment 5 (screenshot: Settings, Insert null values)

One setting changes what a blank cell means. By default, a blank cell during Update or Upsert is simply skipped, and the existing value stays untouched. Check Insert null values, and a blank cell instead overwrites that value with null — know which behavior you want before you run a job against real records.

## Segment 6 (steps: choosing the right operation)

So: if you already have the Salesforce ID for every row, use Update. If you're not sure whether a row exists yet, use Upsert — never guess with Insert. And for a recurring sync, Upsert matched on a reliable External ID is usually the safest default.

## Segment 7 (outro)

Upsert's real flexibility comes from matching on External ID fields instead of just record ID. Next, we look at exactly what those are, and how they connect records across objects during a load.
