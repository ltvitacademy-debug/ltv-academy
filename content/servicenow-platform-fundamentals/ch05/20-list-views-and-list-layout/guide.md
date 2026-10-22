# Lesson 20 — List Views & List Layout

**Chapter 5 · Forms & Lists · Lesson 20 of 34**

## What you'll learn

- How "Configure > List Layout" controls which columns a list shows, and in what order
- Why one table can have multiple named list views, selectable per user or role
- How column sorting and Group By reorganize a list without changing what records it contains
- What the list's right-click context menu offers for quick, no-form actions

## Configure > List Layout — choosing columns, not records

A list view — the table of rows you see when you open Incident's "All" module — has its own
Configure option, separate from Form Layout: **List Layout**. It uses the same two-column picker
idea as forms, but instead of picking fields for one record's form, you're picking which columns
appear across every row in the list, and in what left-to-right order. Add "Caller" as a column and
every row shows that incident's caller; remove "Category" and the column disappears for everyone
using that view. Like Form Layout, this only changes what's displayed — it never changes which
records satisfy the list's filter or what data those records actually hold.

## One table, multiple named list views

A table isn't limited to one list layout. ServiceNow lets you define several named views on the
same table — for example, a "Default view" with general-purpose columns and a "Service Desk
view" with columns tuned for frontline triage (Caller, Short description, Priority, Assigned to).
Each view is its own saved column configuration, and which one a given user sees can depend on
their role or their own selection from the list's view picker. This is exactly why two people
looking at "the same" Incident list can see completely different columns — they're not looking
at different data, they're looking at different named views of the identical underlying records.

## Sorting and grouping — reorganizing without filtering

Click any column header and the list sorts by that column, ascending, then descending on a second
click — the records don't change, only their order. Right-click a column header and choose
**Group By** to cluster rows that share a value — grouping the Incident list by Priority, for
instance, clusters all Priority 1 records together, then all Priority 2, and so on, with a
collapsible header above each cluster. Neither sorting nor grouping removes a single record from
the list; they're purely about how the same result set is presented on screen.

## The right-click context menu — quick actions without opening a form

Right-clicking a cell (not just a header) opens a context menu with quick actions scoped to that
specific value or row — options like copying the URL to that record, emailing a link, or, on
certain fields, updating the value for every selected row at once without opening each record's
form individually. For a Service Desk lead who needs to reassign fifty incidents from one group
to another, this context menu is often faster than opening fifty forms one at a time — it's the
list view doing real work, not just displaying records.

## Key terms

| Term | Meaning |
|---|---|
| List Layout | The Configure option that controls which columns a list shows and in what order |
| Named list view | A saved column configuration for a table, selectable per user or role |
| Group By | A right-click column-header action that clusters rows sharing a value |
| Context menu | The right-click menu on a list cell offering quick actions without opening a form |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: if a colleague says their
Incident list "looks different" from yours, what's the first thing you'd check — the data, or the
view?
