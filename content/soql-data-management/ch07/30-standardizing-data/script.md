# Script — Standardizing Data

## Segment 1 (title)

Lesson 28 showed that a Lead Source field can quietly split one real category into many spellings. This lesson is about fixing it: how to find the variants with SOQL, and how to stop them coming back.

## Segment 2 (steps: two ways to store a category)

A picklist gives users a fixed list of values to choose from. A restricted picklist goes further and rejects any value not on the list, including values sent through the API. A free-text field accepts anything, and over time that means every spelling anyone can think of. If a field should hold a small set of categories, it should be a picklist.

## Segment 3 (code: spot the variants)

To find the variants, group by the field and count. This query groups Contact records by Title, and orders the biggest groups first. Each distinct string becomes its own row, so the messy spellings show up right at the top.

## Segment 4 (code: what the result looks like)

Here's what you might see. VP Sales, Vice President of Sales, VP comma Sales, and lowercase vp sales. That's one job title split into four groups. Any report grouped by this field undercounts every one of them.

## Segment 5 (steps: a repeatable cleanup)

The cleanup is repeatable. Group to list every variant. Map each variant to one standard value in a spreadsheet. Fix the records by updating them by Id with Data Loader. Then lock it in by converting the field to a picklist, so the mess can't return. If the field is already a picklist, admins can also replace a value across records from the picklist setup.

## Segment 6 (outro)

Next up: Salesforce Ids, Explained, and why an Id can look different in an export than in a URL.
