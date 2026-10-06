# Script — Hybrid Search: Vector + Keyword

## Segment 1 (title)

Dense vector search is excellent at matching meaning, but it can under-rank an exact product code or rare term if nothing nearby reads as semantically close. Hybrid search fixes that by running a keyword search alongside it.

## Segment 2 (steps: what each search misses)

Dense search embeds the query and finds the closest meaning — it connects "cancel my subscription" to "ending your plan" with no shared words at all. Sparse, keyword search does the opposite — it reliably catches an exact string like a product code, but misses that same paraphrase entirely if there's no word overlap.

## Segment 3 (screenshot: Qdrant's real fusion diagram)

Here's the idea, straight from Qdrant's own documentation. A dense results list and a sparse results list, each ranked independently, both feed into a fusion step that merges them into one combined list — benefiting from both rankings at once.

## Segment 4 (code: RRF worked example)

The most common fusion method is Reciprocal Rank Fusion. It doesn't compare a cosine similarity score to a keyword score directly — those are on completely different scales. Instead it scores each document by one over a constant plus its rank, summed across every list it appears in. Watch what happens: a document ranked third in dense search but first in keyword search can actually outscore the single best dense match, because it did well in both lists.

## Segment 5 (steps: the other approach)

Some databases instead normalize both scores onto the same scale and blend them with a weight — alpha equals one for pure vector search, alpha equals zero for pure keyword. Either way, the job is the same: give credit for showing up high in both the semantic and the keyword ranking.

## Segment 6 (outro)

Hybrid search is exactly why a query with both a plain-language question and a specific exact term still gets the right chunk. Next lesson: scaling a vector database as your collection grows from a demo into production.
