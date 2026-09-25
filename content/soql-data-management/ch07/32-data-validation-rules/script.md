# Script — Data Validation Rules

## Segment 1 (title)

The last four lessons were about finding and fixing bad data. This one is about stopping it at the door. Validation rules block a save when the data doesn't meet your standards, and they finish this chapter on data quality.

## Segment 2 (steps: prevention beats cleanup)

A validation rule is a formula that evaluates to true when the data is invalid. When someone creates or updates a record, Salesforce runs the formula. If it returns true, the save is blocked and an error message is shown. You build them in Setup, under the object's Validation Rules.

## Segment 3 (code: a real rule on opportunity)

Here's a real example on Opportunity. AND ISPICKVAL StageName equals Closed Won, ISBLANK Amount. If the stage is Closed Won and the amount is empty, the formula is true, so the save is blocked with a message asking for an amount. Notice the logic is inverted from what you might expect: true means bad.

## Segment 4 (steps: the same rule runs everywhere)

Here's what matters most for a data analyst. Validation rules run on every save, not just edits in the browser. A Data Loader load can hit them too: rows that fail are rejected and land in your error file with the message, while other rows in the load can still succeed. So test a load in a sandbox first, and read the error file. Many orgs also build a bypass with a custom permission for trusted integration users, which should be a deliberate decision, not a habit.

## Segment 5 (code: rules do not check old data)

One more limit. A validation rule only fires when a record is saved. It doesn't clean up existing records, and editing an old record that already breaks the rule can fail even if you didn't touch that field. Use SOQL to audit the existing data, like this query for Closed Won opportunities with no amount.

## Segment 6 (outro)

That completes Chapter Seven. Next up in Chapter Eight: Planning a Data Migration.
