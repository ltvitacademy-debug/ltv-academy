# Upserting Records

Insert only creates and Update only changes. In a real data job you often don't know which rows are new and which already exist. **Upsert**, a blend of *update* and *insert*, handles both in one operation, and it is the key to loads you can safely run again and again.

## What you'll learn

- How upsert decides between updating and inserting
- What an **External ID** field is and why upsert relies on it
- Why upsert suits repeatable loads

## How upsert decides

You choose an **ID field to match on**. For every row in the CSV, Salesforce looks for an existing record with the same value in that field:

| Result of the match | What happens |
|---|---|
| One record matches | That record is **updated** |
| No record matches | A new record is **inserted** |
| More than one record matches | The row **errors** |

That last line is why the field you match on has to be unique and reliable.

## The External ID field

Most of the time the matching field is an **External ID**. This is a custom field that an administrator marks as an External ID, and it stores the identifier your **other system** uses for the same thing, such as a customer number from an ERP or billing system.

```text
ERP_Customer_Id__c,Name,Industry
C-1001,Northwind Traders,Retail
C-1002,Contoso Ltd,Technology
```

In the Data Loader **Upsert** wizard you pick the field to match on, and the wizard offers the Salesforce **Id** and the object's External ID fields. Salesforce's own Id can be used too, but then the file must contain Ids, which brings you back to plain Update.

## Why it suits repeatable loads

- **No Salesforce Ids required.** The key from your source system is enough, which is what you have on hand when data comes from elsewhere.
- **Safe to re-run.** Loading the same file a second time updates the rows already loaded instead of creating duplicates.
- **A natural fit for syncs.** A nightly or weekly refresh from another system can use the same job each time.

As always, a **small test** and a look at the **error file** come first.

## Key terms

| Term | Meaning |
|---|---|
| Upsert | Updates a record if it matches, inserts it if it doesn't |
| External ID | A custom field marked as an identifier from another system |
| Match field | The field used to find existing records during an upsert |
| Idempotent | Safe to run repeatedly with the same result |

## Check yourself

Your billing system sends a customer file every night with a customer number and current details. Explain how you would set up the Salesforce side so the same load can run every night without creating duplicate Accounts.
