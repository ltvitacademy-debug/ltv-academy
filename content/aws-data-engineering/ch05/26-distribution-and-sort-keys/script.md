# Script — Distribution & Sort Keys

## Segment 1 (title)

Distribution and sort keys decide how your data is physically arranged inside Redshift — which node each row lands on, and what order rows sit in. Get them wrong and you get data skew.

## Segment 2 (code: three distribution styles)

Every table has a distribution style. EVEN spreads rows round-robin, simple and skew-proof but with no join locality. KEY hashes rows by a chosen DISTKEY column so matching rows from two tables land on the same slice, which is the biggest lever for join performance. ALL copies the whole table onto every node — reserved for small dimension tables.

## Segment 3 (steps: a bad DISTKEY choice)

Pick a low-cardinality DISTKEY, like a status column with only three values, and most rows pile onto just a few slices while others sit nearly empty. Because an MPP query only finishes when its slowest slice finishes, that skew drags the whole cluster's query time down to match the most overloaded node.

## Segment 4 (code: SORTKEY and zone maps)

SORTKEY controls the physical order rows are stored in on disk. Redshift keeps a zone map — a min and max value — for each block. A query filtering on a date range can skip any block whose zone map proves it can't contain a match, without reading it at all.

## Segment 5 (outro)

Distribution and sort keys down. Next up: Redshift Spectrum — querying data that's still sitting in S3, straight from Redshift SQL, without loading it in first.
