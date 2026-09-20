# Script — Page Layouts

## Segment 1 (title)

Lesson 18 showed how a Record Type can change which fields show up on a record's page. This lesson covers the mechanism that actually controls that: the Page Layout.

## Segment 2 (code: what it controls)

A Page Layout determines which fields, related lists, and buttons appear on a record's page, and in what order. Different layouts can be assigned to different Profiles or Record Types — which is exactly how the Record Type example got its different-fields-per-process behavior.

## Segment 3 (steps: the critical point)

The Page Layout only controls what a user sees — it has no effect on the underlying data. A field can hold real data and simply be left off a particular layout. That field still exists, still holds its value, and still shows up in reports and queries either way.

## Segment 4 (outro)

That's exactly why a user might insist a field "doesn't exist" when it's really just not on their layout — the report isn't wrong. Next up: custom fields, from an analyst's perspective — recognizing them and why they vary org to org.
