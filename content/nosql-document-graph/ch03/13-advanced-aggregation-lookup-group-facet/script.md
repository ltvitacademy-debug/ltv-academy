# Script — Advanced Aggregation: $lookup, $group & $facet

## Segment 1 (title)

Match, project, sort, and limit handle filtering and reshaping. The stages that give MongoDB a genuine answer to JOIN and GROUP BY are $lookup, $group, and $facet — real relational-style analysis on top of a document database.

## Segment 2 (code: $lookup)

$lookup performs a left outer join against another collection — you give it the foreign collection, the local field, the foreign field, and a name for the attached array. It always comes back as an array, even for exactly one match, because $lookup is fundamentally a one-to-many join under the hood.

## Segment 3 (code: $group)

$group aggregates documents by a key, exactly like GROUP BY with aggregate functions in the SELECT list. _id is the grouping key — it doesn't have to be the document's original _id. $sum, $avg, $count, $min, and $max are the accumulators, directly equivalent to their SQL counterparts.

## Segment 4 (code: $facet)

$facet runs several independent sub-pipelines against the same input and returns all their results together under separate keys. That's a status breakdown and a top-five list from one pass over the data, instead of multiple round trips.

## Segment 5 (outro)

Lookup, group, and facet let you ask real analytical questions of a MongoDB collection. Making those pipelines fast at scale is a separate concern — indexing. That's next.
