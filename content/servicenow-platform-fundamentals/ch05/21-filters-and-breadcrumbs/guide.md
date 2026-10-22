# Lesson 21 — Filters & Breadcrumbs

**Chapter 5 · Forms & Lists · Lesson 21 of 34**

## What you'll learn

- How the condition builder narrows a list using field, operator, value conditions
- How AND/OR combine multiple conditions into one filter
- How breadcrumbs show the active filter as a readable, clickable trail
- What an encoded query is, at a conceptual level, and what it looks like

## The condition builder — field, operator, value

Above every list is a filter icon that opens the **condition builder**: a row with three parts —
a field (say, Priority), an operator (is, is not, contains, is empty, and many more depending on
the field's type), and a value (1 - Critical). Click Run and the list narrows to only the records
matching that one condition. Click the plus icon to add a second condition row, and a small
AND/OR toggle lets you combine them: AND narrows further (only records matching both), OR widens
(records matching either). Stack several conditions and you've built a real, specific query
without writing a line of code — this is the same condition-builder interface the Navigation Lab
used back in Chapter 2 to filter the Incident list to one assignment group.

## Breadcrumbs — the filter made readable

Once a filter runs, the area above the column headers replaces the plain "Incident > All" label
with a row of **breadcrumbs** — small pills reading something like "Priority is 1 - Critical" and
"Assignment group is Network," chained together with the AND/OR you chose. Breadcrumbs exist so
nobody has to reopen the condition builder just to remember what's currently filtering the list —
the active conditions are always visible, in plain English, right above the data. Click any single
breadcrumb pill and it reopens the condition builder scoped to *that* condition specifically,
letting you edit just that one piece of the filter without touching the others.

## Saving a filter as a view

A filter you expect to reuse doesn't have to be rebuilt from scratch every time. From the list's
options, you can save the current filter as a **Personal** list view (visible only to you) or
share it more broadly so a whole team sees the same pre-filtered view by default. This is exactly
how a "Service Desk view" from Lesson 20 often comes to exist in the first place — someone built
a useful filter once, with breadcrumbs they were happy with, and saved it instead of rebuilding it
by hand every morning.

## Encoded queries — what's happening underneath

Every filter you build through breadcrumbs and the condition builder is, underneath, translated
into a compact text string called an **encoded query** — the same syntax ServiceNow uses as the
`sysparm_query` URL parameter. A filter for "active incidents, Priority 1" might encode as
`active=true^priority=1`, where `^` means AND and `^OR` means OR. You don't need to write these by
hand to use filters day to day, but recognizing the pattern matters: that string is exactly what a
bookmarked list's URL contains, and it's the same querying concept later courses in this path
build on for scripted, server-side queries.

## Key terms

| Term | Meaning |
|---|---|
| Condition builder | The field/operator/value interface for building a list filter |
| Breadcrumb | A pill showing one active filter condition in plain English, clickable to edit |
| AND / OR | Toggles that narrow (AND) or widen (OR) a filter across multiple conditions |
| Encoded query | The compact `sysparm_query` text string a filter translates into, e.g. `active=true^priority=1` |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: what does the `^` character mean
inside an encoded query, and where would you see that same logic represented visually above a
list?
