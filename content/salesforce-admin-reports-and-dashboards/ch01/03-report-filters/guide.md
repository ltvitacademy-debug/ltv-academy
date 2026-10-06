# Report Filters

**Chapter 1 · Reports · Lesson 3 of 22**

A report type decides what a report *could* show. Filters decide what it *actually* shows. This lesson covers the standard filter types in the Report Builder's Filters tab, plus two more advanced filter tools — field-to-field filters and cross filters — that solve problems a basic filter can't.

## What you'll learn

- The standard filters every report starts with
- How to add a custom field filter
- Field-to-field filters: comparing one field to another
- Cross filters: filtering based on whether related records exist

## The Filters tab

Every report has a **Filters** tab next to Outline. A few filters are built in by default and depend on the report type — typically **Show Me** (which records, such as "My opportunities" vs. "All opportunities"), a date range filter like **Close Date**, and a couple of type-specific defaults like **Opportunity Status** or **Probability**. Click any of these to change its value, or **Add filter...** to search for and add any other field as a new filter row.

A filter badge (the blue circle next to "Filters") shows how many filters are currently active, so you can tell at a glance whether a report's results are already narrowed down before you've even looked at the data.

## Field-to-field filters

A standard filter compares a field to a **value you type in** — "Stage equals Closed Won." A **field-to-field filter** instead compares one field to *another field on the same record* — "Actual Cost in Campaign greater than Budgeted Cost in Campaign." You build one the same way as a normal filter, except you set the filter's **Type** to **Field** instead of **Value**, then pick the second field to compare against. This is how you catch things like campaigns running over budget or opportunities closing later than their original estimate, without creating a formula field first.

## Cross filters

A cross filter answers a different kind of question: not "which records match a value," but "which records **do or don't have** a related record." A classic example is **Accounts without Contacts** — accounts that have zero related contact records. You build a cross filter by choosing a secondary object and a **with** / **without** operator in the Filters panel, the same relationship logic that defines custom report types in Lesson 1. You can even add sub-filters on the secondary object, like "Accounts without Contacts where Contact Title contains Manager."

## Key terms

| Term | Meaning |
|---|---|
| Standard filter | A filter row already present when the report type defines it |
| Show Me | A filter controlling which subset of records to include (mine, all, etc.) |
| Field-to-field filter | Compares one field on a record to another field on the same record |
| Cross filter | Filters based on whether related records exist, using with/without |
