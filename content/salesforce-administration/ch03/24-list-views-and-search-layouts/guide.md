# List Views and Search Layouts

**Chapter 3 · Objects and Layouts · Lesson 24 of 36**

A page layout shapes what a user sees on *one* record. Most of a user's day isn't spent on one
record, though — it's spent scanning lists and searching for the right one. **List views** and
**search layouts** are the two settings that shape that other, much more common experience: which
columns show up in a list, which filters narrow it down, and which fields are even searchable in
the first place.

## What you'll learn

- How a list view's filters actually narrow down records
- Why some fields in a list view aren't searchable, and what Salesforce tells the user about it
- Where Search Layouts configure what search results and lookups display
- The practical difference between filtering a list and searching within it

## Filtering a list view

Every list view can carry its own set of filters — field, operator, value — layered with **Match
All Filters** or **Match Any Filters** logic. The **Filters** panel, opened from the list view
toolbar, shows the current filters and lets an admin or user add more.

![A Lightning list view titled "Accounts in New York," with a Filters panel open on the right showing "Filter by Owner: All accounts" and one filter "Billing City equals New York."](/courses/salesforce-administration/ch03/24-list-views-and-search-layouts/list-view-filters-panel.png)
*A list view's filters are exactly what makes it a saved, reusable slice of the data — not a fixed subset.*

Adding or editing a filter opens a small configuration popup: pick the **Field**, an **Operator**
(equals, contains, greater than, and so on), and a **Value** — which can itself be a relative
value like "THIS MONTH" rather than a fixed date.

![A list view filter configuration popup, with Field set to "Created Date," Operator set to "equals," and Value set to "THIS MONTH."](/courses/salesforce-administration/ch03/24-list-views-and-search-layouts/list-view-filter-config.png)
*Relative values like THIS MONTH keep a saved filter useful every month, instead of pointing at one fixed date forever.*

## Searching within a list — and what isn't searchable

List views also have their own **in-list search box**, separate from global search — but not
every column shown in a list view is necessarily searchable that way. Some fields, particularly
system fields like Created Date or certain lookup-derived columns, simply aren't indexed for
in-list search, and Salesforce tells the user so directly with a tooltip rather than silently
returning nothing.

![A "My Unread Leads" list view with a search box tooltip reading "Created Date, Unread By Owner, and Owner Alias aren't searchable. Use filters or sort on these fields instead."](/courses/salesforce-administration/ch03/24-list-views-and-search-layouts/list-view-search-tooltip.png)
*When in-list search can't reach a field, Salesforce says so explicitly and points the user at filters instead.*

This is the practical distinction worth teaching new admins: **filters** narrow a list view down
to a fixed set of criteria and save with the view; **in-list search** is a one-off, typed lookup
within whatever the current filters already returned.

## Search Layouts: configuring the bigger picture

List view filtering is per-view, but **Search Layouts** (Object Manager → an object → **Search
Layouts**) is org-wide configuration for a given object: which columns display in global search
results, in lookup dialogs, and in other search-related contexts. Where a list view's columns are
chosen per-view by whoever builds it, a Search Layout is the admin-controlled default every search
result for that object falls back to — the fields a user sees when they search for an Account and
scan the results, before ever opening a single record.

## Why this matters

A list view that filters correctly but can't be searched the way a user expects — or a search
layout that doesn't surface the one field a support team actually scans for — turns "pull up the
right record" into a multi-click chore. Getting both right is a small, unglamorous setting that
has an outsized effect on how fast users can actually find things.

## Key terms

| Term | Meaning |
|---|---|
| List view filter | A saved field/operator/value condition (or set of conditions) that narrows a list view |
| In-list search | The list view's own search box, scoped to whatever the view's filters already returned |
| Search Layout | Object Manager-level, admin-controlled configuration of columns shown in search results and lookups |
| Match All / Match Any Filters | The logic combining a list view's multiple filters |

## Check yourself

A user says a field they can see in a list view's columns doesn't return results when they type it
into the list's search box. What's the most likely explanation, and where would an admin point
them instead?
