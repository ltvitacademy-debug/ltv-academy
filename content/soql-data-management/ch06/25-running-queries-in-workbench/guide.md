# Running Queries in Workbench

Everything you learned about SOQL in Chapters 1 to 3 carries straight over. Workbench simply gives you a place to run it from any browser, with a handy way to look up field names first.

## What you'll learn

- How to open and use the Workbench SOQL Query page
- How to build a query with dropdowns or write it by hand
- How to look up real API field names before you query

## The SOQL Query page

Choose **Queries**, then **SOQL Query**. The page gives you two ways to work:

1. **Guided.** Pick the **object** and the **fields** to return, then optionally add a **filter** and a **sort**. Workbench assembles the SOQL for you.
2. **Raw SOQL.** Type or paste the query directly in the query box.

Run the query and Workbench displays the results in a table in the browser. You can also send results out as a **CSV** file, which is handy when a quick check turns into something you want to keep.

## The SOQL is the same SOQL

Nothing about the language changes here:

```sql
SELECT Id, Name, StageName, Amount, Account.Name
FROM Opportunity
WHERE StageName = 'Closed Won'
  AND CloseDate = THIS_YEAR
ORDER BY Amount DESC
LIMIT 100
```

The same rules apply: no `SELECT *`, explicit field lists, parent fields through dot notation, date literals such as `THIS_YEAR`. If a query fails in Workbench it would fail anywhere, and the error message usually names the exact field or clause.

## Look up field names first

A great habit: before you write the query, open **Info** and choose **Standard & Custom Objects**. Select an object and Workbench shows each **field**, its **API name** and its **data type**. This removes the most common cause of failed queries, which is a field name that is close but wrong, such as a label instead of an API name, or a custom field missing its `__c` ending.

## When to reach for the Workbench query page

- Quick, ad hoc questions: "how many open Cases does this Account have?"
- Testing a query before you use it in an export or a report.
- Checking real field values before writing a WHERE clause, which ties back to Lesson 1.

For big, repeatable extracts, Data Loader's export is still the better choice.

## Key terms

| Term | Meaning |
|---|---|
| SOQL Query page | Workbench's query screen, under the Queries menu |
| API name | The exact field name SOQL requires, for example StageName or Region__c |
| Describe | A view of an object's fields, names and types (Info menu) |
| Ad hoc query | A one-off query written to answer a single question |

## Check yourself

Your query fails with an "invalid field" error. Describe the steps you would take in Workbench, using the Info menu, to find and fix the problem.
