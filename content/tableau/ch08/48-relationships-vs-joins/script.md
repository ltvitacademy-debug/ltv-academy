# Script — Relationships vs. Joins

## Segment 1 (title)

You already know SQL joins from T-SQL Development. Tableau has that exact same join, plus something SQL doesn't: a relationship. This lesson is about telling them apart.

## Segment 2 (screenshot: relationship canvas)

This is the relationship canvas — drag a second table onto the logical layer, and Tableau links it with a relationship line. Notice there's no join-type picker. You just tell Tableau which fields match; it decides how to combine the data per worksheet, automatically, without duplicating rows you don't need yet.

## Segment 3 (screenshot: join canvas)

Double-click into a logical table and you land in the physical layer — the join canvas. This is where Tableau behaves exactly like SQL: pick inner, left, right, or full outer, pick your matching fields, and the rows combine immediately, just like an ON clause.

## Segment 4 (outro)

Next lesson, you'll actually build joins yourself, including joining on more than one field at a time.
