# Script — Data Management Best Practices

## Segment 1 (title)

Five lessons, five separate tools. None of them works as a one-time setup — data quality decays unless someone keeps it up. This closing lesson is the checklist that ties the tools together into an actual practice.

## Segment 2 (code: layered defense)

The five tools stack rather than compete. Picklists prevent bad values at entry. Validation rules block incomplete or malformed saves. Matching and duplicate rules catch records that already look alike. A before-save flow normalizes whatever free text remains. And periodic review catches whatever slipped through all four. No single layer is sufficient by itself — picklists don't catch a duplicate, and duplicate rules don't catch a state typed two different ways on a field they don't even compare.

## Segment 3 (code: import checklist)

Before every bulk import, run the same five checks. Confirm the field mapping. Confirm required fields are actually populated. Confirm picklist values match exactly, case-sensitive. Import a small test batch, ten or twenty rows, before the full file. And confirm what the duplicate rule will actually do — Block for a clean first load, Alert or Report if you expect legitimate near-matches.

## Segment 4 (steps: quality needs an owner)

Rules and picklists are necessary but not sufficient — somebody has to own this ongoing. Reviewing Duplicate Record Sets on an actual schedule, not eventually. Tuning matching criteria when false positives get reported instead of letting a rule stay wrong for months. And auditing picklist values periodically, because picklists drift too, as different admins add options over time.

## Segment 5 (outro)

That closes out data quality. Chapter four is where you put every tool from this chapter to work — starting with a hands-on Data Loader practice lab.
