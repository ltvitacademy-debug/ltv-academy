# Picklists and Dependent Picklists

**Chapter 3 · Objects and Layouts · Lesson 21 of 36**

A picklist is one of the simplest field types in Salesforce — a defined list of values a user
picks from instead of typing free text. Most of the time that's the whole story. But when two
picklists are related — a Country and a State, an Issue Type and an Issue Detail — Salesforce
offers a specific mechanism to keep the second one honest: **dependent picklists**.

## What you'll learn

- How to manage a picklist's values directly
- What a controlling field and a dependent field actually are
- How to build a field dependency and set its filter rules
- Why dependent picklists prevent a category of bad data outright

## Managing a picklist's values

From Object Manager, a picklist field's detail page shows a **Values** related list: every value
currently defined, with **Edit**, **Del**, and **Deactivate** actions, plus **New**, **Reorder**,
and **Replace** buttons above the list. **Replace** is worth knowing specifically — it lets you
swap every record currently holding one value over to a different value in bulk, which is how
you clean up a picklist without hand-editing every record.

![A picklist's Values related list showing seven values (Monthly Newsletter, Event Invites, Fundraising Appeals, Volunteer Opportunities, New Program Announcements, Emergency Updates, Survey Participation) with Edit/Del/Deactivate links, and New/Reorder/Replace/Printable View buttons above.](/courses/salesforce-administration/ch03/21-picklists-and-dependent-picklists/picklist-values-list.png)
*Ordinary picklist value management — no dependency involved yet.*

## Controlling and dependent fields

A **field dependency** links two fields: the **controlling field** (what the user picks first)
and the **dependent field** (whose available values get filtered based on that first pick).
Standard and custom checkboxes and picklists with at least one and fewer than 300 values can be
controlling fields; custom picklists and multi-select picklists can be dependent fields.

From Object Manager's **Field Dependencies** page, **New Field Dependency** asks you to pick
which field controls and which field depends — for example, **Issue Type** controlling **Issue
Detail**.

![A "New Field Dependency" setup screen explaining controlling and dependent fields, with Controlling Field set to "Issue Type" and Dependent Field set to "Issue Detail."](/courses/salesforce-administration/ch03/21-picklists-and-dependent-picklists/new-field-dependency.png)
*Step 1 is just picking the two fields — the real configuration happens on the next screen.*

## Setting the filter rules

The second step is a grid: every controlling-field value as a column, every dependent-field
value as a row, and checkboxes at each intersection. Click **Include Values** with a column and
the relevant rows selected, and that dependent value becomes available whenever that controlling
value is chosen — nothing else.

![A field dependency's filter-rules grid: "Issue Type" columns for Technical and Billing, with rows of Issue Detail values (Software Bug, Network Connectivity, Invoice Query, Payment Failure, etc.) and Include Values / Exclude Values buttons above.](/courses/salesforce-administration/ch03/21-picklists-and-dependent-picklists/dependent-values-grid.png)
*"Software Bug" only makes sense under "Technical" — this grid is where that rule actually gets enforced.*

## Why this matters more than it looks

Without a dependency, a user picking Issue Type = "Billing" could still select Issue Detail =
"Hardware Malfunction" — a combination that's simply wrong. A dependent picklist makes the
wrong combination unselectable in the UI, rather than relying on training or a validation rule
to catch it after the fact. It's a data-quality guardrail built directly into the field, before
a record is ever saved.

## Key terms

| Term | Meaning |
|---|---|
| Controlling field | The field a user picks first, which filters another field's available values |
| Dependent field | The field whose available values are filtered based on the controlling field |
| Field dependency | The configured relationship between a controlling and a dependent field |
| Include Values / Exclude Values | The grid actions that set which dependent values are valid for a given controlling value |

## Check yourself

Why does a dependent picklist prevent bad data more reliably than simply training users on which
combinations are valid?
