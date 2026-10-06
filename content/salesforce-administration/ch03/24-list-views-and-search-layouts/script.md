# Script — List Views and Search Layouts

## Segment 1 (title)

A page layout shapes what a user sees on one record. Most of the day isn't spent on one record, though — it's spent scanning lists and searching. List views and search layouts shape that other, more common experience.

## Segment 2 (screenshot: list view filters panel)

Every list view can carry its own filters — field, operator, value, combined with Match All or Match Any logic. The Filters panel is where an admin or user adds and edits them, and it's what makes a list view a saved, reusable slice of the data.

## Segment 3 (screenshot: list view filter config)

Adding a filter means picking a Field, an Operator, and a Value — and that value can be relative, like THIS MONTH, so a saved filter stays useful every month instead of pointing at one fixed date forever.

## Segment 4 (screenshot: list view search tooltip)

List views also have their own in-list search box — but not every visible column is searchable that way. When a field isn't indexed for it, Salesforce says so directly in a tooltip and points the user at filters or sort instead, rather than silently returning nothing.

## Segment 5 (steps: filter vs. search vs. layout)

Three different things, easy to blur together: a filter narrows a list view down and saves with it. In-list search is a one-off typed lookup within whatever's already filtered. And Search Layouts, configured per object in Object Manager, is the org-wide default for what columns show up in search results and lookups — not per-view, but set once for everyone.

## Segment 6 (outro)

Next up: Related Lists and Related List Filters, for shaping what a record shows about everything connected to it.
