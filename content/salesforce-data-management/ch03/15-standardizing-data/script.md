# Script — Standardizing Data

## Segment 1 (title)

A duplicate rule, a grouped report, a dashboard filter — all three quietly assume the same real value is always typed the same way. Standardizing data is the discipline of making that assumption actually true.

## Segment 2 (code: four strings one state)

Texas, TX, texas with a trailing space, and Tx look obviously related to a person, but to a report's group-by or an exact match, they're four unrelated strings. A grouped report on a free-text state field doesn't show one Texas total — it shows four small ones, and every individual record is technically accurate.

## Segment 3 (code: picklist removes variance)

The most reliable fix isn't correcting bad data after the fact — it's removing the chance to type it wrong in the first place. If a field has a known, finite set of valid values, make it a picklist. A picklist can't be typed inconsistently, because it was never typed. It was selected.

## Segment 4 (steps: state and country picklists)

Address fields get their own dedicated fix. Turn on State and Country Picklists in Setup, and every state and country field across standard addresses becomes a controlled picklist instead of free text. New records get standardized values automatically, and Salesforce includes a one-time cleanup pass for whatever free text is already there.

## Segment 5 (code: cleaning free text with flow)

Some fields genuinely have to stay free text — a description, a notes field. For those, a before-save Flow can clean input automatically on every save, using functions like TRIM to strip whitespace, UPPER or LOWER to force consistent case, and SUBSTITUTE to swap one substring for another. It runs on manual saves and Data Loader imports alike, so the standard doesn't depend on any one person remembering it.

## Segment 6 (outro)

Concepts are one thing — next, we clean an actual messy export, start to finish, so you can see these fixes applied to real rows.
