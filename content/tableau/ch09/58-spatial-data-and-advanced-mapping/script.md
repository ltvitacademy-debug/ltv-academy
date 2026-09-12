# Script — Spatial Data & Advanced Mapping

## Segment 1 (title)

Every map so far relied on Tableau geocoding a field. Spatial files work differently — they store the actual shape as data.

## Segment 2 (screenshot: connecting to a shapefile)

Connect directly to a shapefile, and you get a real Geometry column — the actual polygon or point data, not a name Tableau has to look up.

## Segment 3 (screenshot: mapped directly)

Drag that Geometry field onto a view, and a map builds directly from the real shapes in the file — no geocoding step involved. This matters for custom regions with no official name, or precise scientific boundaries a City or State field could never capture.

## Segment 4 (screenshot: spatial join)

A spatial join matches rows by their actual geometric relationship instead of a shared key. Here, Intersects finds which river basin polygon each waterfowl site point physically falls inside — a question a normal key-based join has no way to answer.

## Segment 5 (outro)

Chapter 9 is done. Next chapter: Groups & Hierarchies, organizing dimensions beyond geography.
