# Script — Picklists and Multi-Select Picklists

## Segment 1 (title)

A Text field accepts anything a user types. A Picklist accepts only what the admin put on its list — and that restriction is what makes picklists the backbone of clean, reportable data.

## Segment 2 (screenshot: picklist type)

Picklist and Picklist Multi-Select sit in the same group on Step 1. Picklist lets a user choose exactly one value; Multi-Select lets them choose several at once, shown separated by semicolons. Multi-select is the right call only when more than one answer at a time is genuinely expected.

## Segment 3 (screenshot: values and restrict)

Step 2 asks for the value list, one per line, plus a checkbox worth knowing: Restrict picklist to the values defined in the value set. Checked, it blocks the API and integrations from writing a value that isn't on the list — not just the UI.

## Segment 4 (screenshot: standard picklist)

Not every picklist is custom. Lead Source on the Lead object is a standard picklist Salesforce ships out of the box — same mechanics, just built in instead of admin-created.

## Segment 5 (screenshot: field created)

Once saved, a new picklist field lands in its object's Fields and Relationships list exactly like any other field — same table, same columns.

## Segment 6 (outro)

Next up: formula fields — fields that don't store a value at all, but calculate one every time a record is viewed.
