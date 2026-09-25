# Filter Logic

Lessons 6 through 8 gave you three ways to narrow a report: standard filters, cross filters, and bucketing. This lesson is about what happens when you stack several field filters together. By default the Report Builder combines them all with `AND`. The moment a business question sounds like "this OR that," you need **filter logic**, which is the report builder's version of parentheses in a T-SQL `WHERE` clause.

## What you'll learn

- How the Report Builder numbers your field filters and combines them by default
- How to write filter logic with `AND`, `OR`, `NOT`, and parentheses
- Which conditions filter logic does and does not control
- How locked filters and multi-value filters fit in
- How to translate a filter-logic expression into the `WHERE` clause you already know

## Default behavior: everything is AND

Open the **Filters** panel in a Lightning report and add a few field filters, for example `Amount greater than 100000` and `Probability greater than 50%`. Each filter is quietly numbered 1, 2, 3, and so on. With no filter logic set, the report behaves as if you wrote `1 AND 2 AND 3`: a record must satisfy every filter to appear.

That is exactly a T-SQL `WHERE a AND b AND c`. It is also why "my report is missing records" is so often a filter-logic problem: every extra filter can only shrink the result.

## Writing filter logic

From the menu next to the **Filters** heading, choose the option to add filter logic (in most orgs it reads **Add Filter Logic**). A text box appears where you type an expression using the filter numbers:

```
1 AND (2 OR 3)
```

The operators are `AND`, `OR`, and `NOT`, and parentheses control the grouping. Without parentheses, treat the precedence carefully: `1 OR 2 AND 3` may not mean what you hoped, so always add parentheses when mixing operators. This is the same habit you built in T-SQL.

A realistic example: "large opportunities that are either from a partner or from the web." If filter 1 is `Amount > 100000`, filter 2 is `Lead Source equals Partner`, and filter 3 is `Lead Source equals Web`, the logic is `1 AND (2 OR 3)`.

## Rules worth knowing

- **Standard filters stand apart.** Show Me and the date-range filter are separate from your numbered field filters, and they generally act as additional `AND` conditions on top.
- **Cross filters are not numbered.** In most orgs they are combined with the rest of the report with `AND`, and cannot be dropped inside your `OR` expression.
- **Every number must appear.** If you have four filters, your logic has to reference 1, 2, 3, and 4, or the builder will complain.
- **Deleting a filter renumbers the rest.** Re-check your expression after you add or remove a filter.
- **There is a cap on filters.** Salesforce limits how many field filters a report can hold; check the current documentation for your edition rather than assuming.

## Shortcuts that avoid logic entirely

When the `OR` is on a single field, you often do not need filter logic at all. Picklist filters accept multiple values, so `Stage equals Prospecting, Qualification` behaves like `Stage IN (...)`. Conversely, `not equal to` with several values behaves like `AND`: the record must be none of them.

## Locked filters

The filter dialog has a **Locked** checkbox. A locked filter shows a padlock and cannot be changed by people who run the report, though they can still add their own filters on top. Use it to protect the definition of a report, for example "only Partner-sourced deals," so a viewer cannot quietly widen it.

## Mapping to SQL

```sql
WHERE Amount > 100000
  AND (LeadSource = 'Partner' OR LeadSource = 'Web')
```

Same logic, different clothing. If you can write the `WHERE` clause on paper first, the filter-logic string is just its numbered skeleton.

## Recap

Field filters are numbered and joined with `AND` by default. Filter logic lets you introduce `OR`, `NOT`, and grouping with parentheses. Standard and cross filters sit outside that expression, multi-value picklist filters can replace simple `OR`s, and locked filters keep a report's core definition safe. Next you will look at how grouping and subtotals organize the rows that survive your filters.

## Check yourself

You have three field filters and want records matching filter 1, and either filter 2 or filter 3. What filter logic do you enter, and why are the parentheses important?
