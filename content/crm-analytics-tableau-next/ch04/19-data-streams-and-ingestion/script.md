# Script — Data Streams & Ingestion

## Segment 1 (title)

The last lesson explained the problem Data Cloud solves. This lesson is the first half of the solution: getting data in. Data Cloud is now branded Data 360, and you'll see both names in the product.

## Segment 2 (screenshot: New Data Stream wizard)

A data stream is the configured connection between a source and Data 360. This is the New Data Stream wizard, where the choices are hard to undo. You pick a category, Profile, Engagement, or Other, and a primary key. The wizard warns that the category and field data types can't be changed after the stream is created.

## Segment 3 (screenshot: refresh history)

Once it's running, the stream's page shows its health: status, last run, and records processed. The Refresh History tab lists every run and its mode, such as a total replace or an upsert. When a dashboard looks stale, start here.

## Segment 4 (screenshot: mapping)

Ingested data lands in a data lake object, roughly as it arrived. To be useful, its fields must be mapped to the standard data model. This canvas draws lines from source fields on the left to data model attributes on the right.

## Segment 5 (steps: the flow)

So the flow is: a stream ingests, a data lake object stores, mapping connects, and a data model object gives every source the same shape. Only mapped fields can be used for segments and insights, so an unmapped field is invisible downstream.

## Segment 6 (outro)

Next up: identity resolution, which decides which of those records describe the same person.
