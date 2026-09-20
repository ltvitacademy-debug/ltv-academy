# Script — Text Search & Geospatial Queries in MongoDB

## Segment 1 (title)

Compound and multikey indexes cover most filtering, but two query shapes need their own dedicated index type: searching free text for relevant words, and finding documents by location. Both are real, built-in MongoDB features, and both have a direct SQL Server analog.

## Segment 2 (code: text indexes & $text search)

A text index is built for word-level matching, not exact-value matching. Create one with createIndex and a "text" spec, then query it with the dollar-text operator. A collection can only have one text index, though it can cover multiple weighted fields, and results can be sorted by relevance score — genuinely comparable to a SQL Server FULLTEXT index and CONTAINS.

## Segment 3 (code: 2dsphere index & $near)

Locations are stored as GeoJSON, and the real gotcha every relational DBA hits at least once: coordinates are longitude first, then latitude — backwards from how you'd say it out loud. A 2dsphere index enables near, which returns documents sorted by distance from a point, nearest first.

## Segment 4 (steps: three geospatial operators)

Near sorts by distance. GeoWithin finds documents fully inside a shape with no distance sorting, cheaper when you just need "inside this region." GeoIntersects finds documents whose geometry overlaps a shape at all, used when the stored data is itself a line or polygon.

## Segment 5 (outro)

Text and geospatial indexes solve real, narrow problems a regular index can't touch. Next up: explain() — how to read a MongoDB query plan the same way you'd read a SQL Server execution plan.
