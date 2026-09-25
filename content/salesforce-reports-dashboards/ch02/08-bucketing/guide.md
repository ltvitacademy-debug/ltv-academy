# Bucketing

Suppose you want to see pipeline by deal size. The Amount field has thousands of distinct values, so grouping by it gives one group per exact number, which tells you nothing. What you want is *bands*: Small, Medium, Large. **Bucketing** lets you create those bands directly inside a report, with no admin, no custom field, and no deployment.

## What you'll learn

- What a bucket column is and when to use one
- How to create a bucket for numbers, picklists, and text
- How bucketing relates to `CASE` in T-SQL
- The limits, and when to ask for a formula field instead

## The idea

A **bucket column** is a report-only field whose value is computed by grouping the values of another field into categories you define. Typical uses:

- **Deal size.** Amount under 25,000 is *Small*, under 100,000 is *Medium*, everything else is *Large*.
- **Stage roll-up.** Many opportunity stages become *Open*, *Won*, or *Lost*.
- **Industry groups.** Fifteen picklist values collapse into *Tech*, *Finance*, and *Other*.
- **Regions.** A set of billing states becomes *East*, *West*, and so on.

Once created, a bucket column behaves like any other column. You can display it, filter on it, and, most usefully, **group by it** in a summary or matrix report, then chart it.

## The SQL equivalent

```sql
SELECT
  CASE
    WHEN Amount < 25000  THEN 'Small'
    WHEN Amount < 100000 THEN 'Medium'
    ELSE 'Large'
  END AS DealSize,
  SUM(Amount)
FROM Opportunity
GROUP BY
  CASE
    WHEN Amount < 25000  THEN 'Small'
    WHEN Amount < 100000 THEN 'Medium'
    ELSE 'Large'
  END
```

SOQL has no `CASE` expression, so bucketing is one place where a report can do something a plain SOQL query cannot. That is a genuine strength of the native report builder.

## Creating a bucket column

In Lightning Experience, the steps are roughly:

1. **Open the source column's menu.** In the Report Builder, click the dropdown arrow on the column header (or find the bucket option in the Fields pane) and choose **Bucket this Column**.
2. **Name the field and the buckets.** Give the bucket field a clear name such as *Deal Size*, and add a name for each bucket.
3. **Assign values.** For a **numeric** field you define ranges (less than 25,000; 25,000 to 100,000; and so on). For a **picklist** or **text** field you select which values belong in each bucket.
4. **Apply and use it.** The new column appears in the report. Add it as a grouping to summarize by it.

Menu labels and layout vary a little between releases, so if you cannot find an option, look at the column dropdown and the Fields pane before assuming the feature is missing.

Values you have not assigned to any bucket usually appear as blank or **Other**, depending on how you configure it. Always run the report and scan for an unexpected group, which signals a value you forgot.

## Limits and trade-offs

- **Report-only.** A bucket field lives in the report where you built it. It is not a field on the object, cannot be reused by another report, and cannot be queried with SOQL.
- **Caps.** In most orgs a report supports roughly five bucket fields, with about twenty buckets in each. Check current documentation for your release.
- **Maintenance.** If your definition of "Large" changes, you must edit every report that has its own copy of the bucket.
- **Not every field type qualifies.** Bucketing is offered for numeric, picklist, and text-type columns.

## Bucket or formula field?

If only one report needs the categories, use a bucket. If the same categories are needed across many reports, dashboards, or list views, ask an admin for a **formula field** on the object. It is defined once and works everywhere. In Chapter 3 you will also meet *row-level formulas*, which compute a value per record inside a report.

## Recap

- A bucket column groups values of a field into categories you define, inside one report.
- It is the click-built equivalent of a `CASE` expression.
- Use it to make grouping and charting meaningful.
- It does not persist beyond the report, so use a formula field for org-wide categories.

## Check yourself

You need "Small / Medium / Large" deal sizes on five different dashboards, all built from different reports. Would you build a bucket in each report, or ask for something else? Explain your reasoning.
