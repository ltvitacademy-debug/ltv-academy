# Script — Bucketing

## Segment 1 (title)

Sometimes you don't need a formula or a new field, you just need to lump existing values into a few named categories, right inside the report. That's bucketing, and it's the last tool on the Columns menu for this chapter.

## Segment 2 (steps: how a bucket is built)

From the Columns dropdown, choose Add Bucket Column. Pick the field to bucket, name the new column, then build each bucket by assigning the source values that belong in it. Anything you don't assign falls under Unbucketed Values automatically.

## Segment 3 (screenshot: the entry point, Opportunity report)

Here's where it starts: the same Columns dropdown as Add Summary Formula and Add Row-Level Formula, with Add Bucket Column sitting right above them. One menu, three ways to add a calculated or categorized column without touching the data model.

## Segment 4 (screenshot: the same entry point, Case report)

And it's not special to one object. This is the identical dropdown on a Cases report. Add Bucket Column shows up on any report type, because bucketing works on the report's columns, not the underlying object.

## Segment 5 (screenshot: Edit Bucket Column dialog)

This is the dialog itself: Billing Country as the source field, Region as the new bucket column name. USA is assigned to a bucket called NA, France to one called Europe, and China sits in Unbucketed Values because nobody assigned it yet.

## Segment 6 (outro)

A bucket column lives entirely inside one report, with no new field and no impact anywhere else — the right tool for a one-off categorization. Up to five bucket columns per report, twenty buckets each. That closes out Chapter 1: Reports. Chapter 2 covers managing them once they exist.
