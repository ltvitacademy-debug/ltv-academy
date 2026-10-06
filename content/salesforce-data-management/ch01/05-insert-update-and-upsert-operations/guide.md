# Insert, Update, and Upsert Operations

**Chapter 1 · Getting Data In · Lesson 5 of 20**

Insert, Update, and Upsert are the three buttons on Data Loader's main screen for getting data into Salesforce, and picking the wrong one is one of the easiest ways to turn a routine load into a mess. They look similar — point at a CSV, map some fields, click go — but they behave very differently once records start matching (or failing to match) what's already in the org.

## What you'll learn

- What each of the three operations actually does
- How matching works for Update and Upsert, and why it's the whole ballgame
- A setting that changes what "leave it blank" means during an update
- How to choose the right operation for a given job

## Three operations, three behaviors

![Data Loader's main window with Insert, Update, and Upsert highlighted among its six operation buttons.](/courses/salesforce-data-management/ch01/05-insert-update-and-upsert-operations/data-loader-main-window.png)

- **Insert** creates new records. It never looks for existing matches — every row in your CSV becomes a new record, full stop. Run Insert on a file you've already loaded once, and you get duplicates, not updates.
- **Update** modifies existing records. It matches purely on **record ID** — your CSV must include an `Id` column with each row's existing 18-character Salesforce ID, or the row fails outright. There's no name-matching fallback.
- **Upsert** ("update or insert") does both: if a row's match field finds an existing record, Upsert updates it; if not, Upsert inserts a new one. This is what makes Upsert the right choice for recurring loads where you don't know in advance which rows are new.

## Matching is the whole story

Update's match field is always the Salesforce record ID. Upsert is more flexible — it can match on the record ID too, but its real power is matching on an **External ID** field: a custom field, flagged with the External ID attribute, that holds an identifier from the system your data originally came from (a legacy CRM's customer number, an ERP's SKU, and so on). Lesson 6 covers External IDs and relationship fields in depth; for this lesson, the key point is that Upsert's match field is configurable, and getting it wrong — matching on the wrong field, or a field that isn't actually unique — is how Upsert quietly overwrites the wrong records.

## A setting that changes "blank"

![Data Loader's Settings dialog showing Batch size, Insert null values, Assignment rule, and other general options.](/courses/salesforce-data-management/ch01/05-insert-update-and-upsert-operations/data-loader-settings-general.png)

By default, a blank cell in your CSV is simply skipped during Update and Upsert — the existing value in that field stays untouched. Check **Insert null values** in Settings, and a blank cell instead overwrites the existing value with null. This distinction matters more than it looks: if your export-then-reimport workflow accidentally drops a column, the default behavior quietly protects existing data, while Insert null values would erase it. Know which behavior you want before you run a job that touches real records.

## Choosing the right operation

| Situation | Operation |
|---|---|
| Brand-new records, first time in the org | Insert |
| You have the Salesforce ID for every row already | Update |
| A recurring sync where some rows are new and some already exist | Upsert, matched on an External ID |
| You're not sure whether a row already exists | Upsert — never guess with Insert |

When in doubt, Upsert with a reliable External ID is usually the safer default: it never creates a true duplicate the way a mistaken Insert does, and it never fails outright the way Update does when an ID is missing.

## Try it yourself

In a sandbox, export ten Account records and note their 18-character IDs. Build a CSV that updates one field (say, Industry) for five of those records using the real IDs, then run Update and confirm only those five changed. Next, add two completely new rows with blank ID cells and run Upsert instead, matching on Id — confirm the five existing rows update again while the two new ones insert.

## Recap

- Insert always creates; Update always matches on ID and fails without one; Upsert does either, based on a match field you choose.
- Matching is the core difference between the three — get the match field wrong and Upsert can update the wrong record.
- Insert null values controls whether a blank CSV cell clears an existing value or leaves it alone.
- For recurring or uncertain loads, Upsert on a reliable External ID is usually the safest default.

## Check yourself

A weekly sync loads 2,000 rows where some Accounts already exist and some don't, matched by a legacy system's Account Number. In one sentence, which operation fits, and what field does it match on?
