# Exporting Data

You already know how to write SOQL. Data Loader's **Export** operation is where that skill pays off outside a query editor: you write a query, and Salesforce hands you the results as a **CSV file** you can open in Excel, load into a database, or keep as a backup.

## What you'll learn

- The steps of the Data Loader export wizard
- How the export query relates to the SOQL you've already learned
- The difference between Export and Export All

## The export wizard

1. Choose **Export** in Data Loader and log in (see the previous lesson).
2. Choose the **object** to query. If your object isn't listed, tick the option to show all objects. Then choose a **CSV file** location and name.
3. Build the query: pick the **fields** you want, and optionally add **conditions** to filter the rows.
4. Click **Finish**. Data Loader runs the query and writes the results to your CSV file.

## It's real SOQL under the hood

The field picker and the conditions are just a friendly way to build a SOQL query, and the query text is shown and editable. So you can write exactly what you would in any query tool:

```sql
SELECT Id, Name, Industry, AnnualRevenue
FROM Account
WHERE Industry = 'Technology'
  AND AnnualRevenue > 1000000
ORDER BY Name
LIMIT 5000
```

Everything from Chapter One works: `SELECT`, `WHERE`, `ORDER BY` and `LIMIT`. Parent fields with dot notation, such as `Owner.Name`, are a good way to include related data. Remember that the output is a **flat CSV**, one row per record, so plain fields and parent fields fit naturally.

## Export versus Export All

| Operation | What it returns |
|---|---|
| **Export** | Current records only |
| **Export All** | Current records plus records in the **Recycle Bin** and archived records |

Use Export All when you need to see what was deleted, for example to check what was removed. For everyday reporting, plain Export is what you want.

## Export first, always

The export is more than a reporting tool. Before you update or delete records in the next lessons, export the affected records first. That CSV holds the original values, which turns a risky change into one you can walk back.

## Key terms

| Term | Meaning |
|---|---|
| Export | Data Loader operation that runs a SOQL query and writes the results to CSV |
| Export All | Export that also includes Recycle Bin and archived records |
| Flat CSV | One row per record, one column per field |
| Recycle Bin | Where deleted records wait before permanent removal |

## Check yourself

You need every Contact at accounts in the Technology industry, with the account name in the same file. Write the SOQL you would use in the export wizard's query box, and explain what the CSV will look like.
