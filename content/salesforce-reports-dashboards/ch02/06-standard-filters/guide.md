# Standard Filters

A report with no filters returns every record the report type and your sharing rules allow, which is rarely what anyone wants. **Filters** narrow a report to the records that answer your question. You already know `WHERE` from T-SQL and SOQL; here is how it appears in the Report Builder's **Filters** tab.

## What you'll learn

- The three kinds of standard filter: Show Me, date, and field filters
- How operators and values work, including relative dates
- What locking a filter does
- How filters map to WHERE conditions

## The three kinds of filter

**1. Show Me.** This is the record scope. Depending on the object it offers choices such as *All opportunities*, *My opportunities*, or *My team's opportunities*. Scope is applied together with the sharing rules you learned in Salesforce Fundamentals, so you can only ever see records you have access to. Choosing "All" does not bypass security.

**2. Date filter.** You pick a date field (Close Date for opportunities, Created Date for accounts, and so on) and a range. Ranges include *All Time*, *Current FQ* (fiscal quarter), *Last 30 Days*, and *Custom*. Many are **relative**, meaning they move with today's date, so a report saved as "Current FQ" stays correct next quarter.

**3. Field filters.** You choose any available field, an **operator**, and a **value**. Common operators are *equals*, *not equal to*, *less than*, *greater than*, *contains*, *does not contain*, and *starts with*. Multi-select picklists offer *includes* and *excludes*. Value choices vary with the field type: picklists show their values, dates offer a picker.

## Adding a field filter

In the Report Builder, open the **Filters** tab and use **Add filter...** to search for a field. A popover asks for the operator and value. In the example from Trailhead, a Lead Source filter is set to **contains Partner**, and after applying it the report returns only the five opportunities whose Lead Source contains that text.

Adding several field filters combines them with **AND** by default. Lesson 9 covers filter logic for OR conditions. In most orgs a report can carry up to about twenty field filters.

## Locked filters

The filter popover includes a **Locked** checkbox. A locked filter shows a padlock, and people who only run the report cannot change or remove it. Use locks for conditions that define the report, such as "Stage is Closed Won" on a wins report. Leave a filter unlocked when you want viewers to adjust it, for example a date range.

Changes a viewer makes to unlocked filters while running a report apply to their view. They are only saved if the person can edit the report and saves it, so a viewer cannot damage the original.

## The SQL equivalent

```sql
SELECT Name, Amount
FROM   Opportunity
WHERE  OwnerId = :currentUser              -- Show Me: My opportunities
  AND  CloseDate = THIS_FISCAL_QUARTER    -- date filter
  AND  LeadSource LIKE '%Partner%'         -- field filter
```

This is why SOQL date literals such as `THIS_FISCAL_QUARTER` look familiar: report date ranges are the same idea.

## Practical tips

- **Check Total Records after each filter.** A big drop means a filter is stricter than you intended.
- **Watch for the date filter.** New reports often default to a narrow range such as the current month or *All Time*. Confirm it is what you want. If a report shows "No records returned", the date range is a common cause.
- **Picklist values are exact.** Filtering on a value that your org renamed silently returns nothing. Choose from the picklist rather than typing.
- **Blank values need care.** A "not equal to" filter may not treat blank values the way you expect, so test it against a known record before trusting the counts.

## Recap

- Show Me sets whose records, the date filter sets a time window, and field filters set conditions on fields.
- Field filters combine with AND unless you change the filter logic.
- Locked filters protect a report's meaning from people who run it.
- Every filter is a WHERE condition, so verify the record count after each one.

## Check yourself

A viewer runs your "Won Deals" report, changes the close date range to Last Year, and closes it without saving. What happens to the saved report? And which filter would you lock to make sure "won" always means Closed Won?
