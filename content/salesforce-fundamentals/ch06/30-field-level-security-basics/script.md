# Script — Field-Level Security, Basics

## Segment 1 (title)

Every security layer so far worked at the object or record level. This lesson covers the layer one step smaller: Field-Level Security, access controlled per individual field, independent of everything above it.

## Segment 2 (code: one field, independent)

A user can have full access to an Opportunity record — see it, open it, edit most fields — while one specific field, like a sensitive commission-rate field, is hidden from them specifically. The record isn't hidden. The object isn't hidden. Only that one field is.

## Segment 3 (steps: the real implication)

FLS is set the same place Profiles and Permission Sets already live, just at a finer grain. The real consequence: a hidden field produces no error. It just doesn't appear, or shows blank. If a report seems to be missing data in a field you know is populated, FLS is one of the first things worth checking — not a data quality problem.

## Segment 4 (outro)

That's every layer of Salesforce data security this course covers. The final lesson ties the whole course together — what an analyst actually needs, end to end.
