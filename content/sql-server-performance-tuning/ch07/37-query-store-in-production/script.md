# Script — Query Store in Production

## Segment 1 (title)

This chapter has treated Query Store as a data source. Now treat it as a thing you operate — it has its own storage overhead, can fill up, and can silently stop capturing new data if you don't watch it.

## Segment 2 (code: watching the footprint)

sys.database_query_store_options shows the actual current storage size against the configured max, plus the readonly reason if there is one. Storage climbing steadily toward the cap is the early warning sign to watch for.

## Segment 3 (steps: what happens at the cap)

What happens when it hits the cap depends on SIZE_BASED_CLEANUP_MODE. AUTO proactively cleans up the oldest, least useful data and keeps capturing. OFF means Query Store flips to read-only right at the cap — it keeps serving historical data but silently stops capturing anything new.

## Segment 4 (code: tuning retention)

Rather than reacting to a full Query Store, tune the cleanup policy and storage cap on purpose — how many days of history you actually need against how much overhead you're willing to carry.

## Segment 5 (outro)

A production checklist: confirm AUTO cleanup mode, monitor storage against the cap, use AUTO capture mode, and periodically check for a silent flip to read-only. Chapter Eight starts next: MAXDOP and cost threshold for parallelism.
