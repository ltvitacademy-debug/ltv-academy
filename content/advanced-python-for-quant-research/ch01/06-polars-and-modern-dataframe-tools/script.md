# Script — Polars & Modern DataFrame Tools

## Segment 1 (title)

Polars is a DataFrame library built in Rust on Arrow, designed from the start around multi-threading and query optimization, rather than growing out of a single-threaded design the way pandas did. It's not a drop-in pandas replacement, but for large, filter-and-aggregate workloads it's often dramatically faster.

## Segment 2 (code)

pl.DataFrame runs every operation immediately, like pandas. pl.LazyFrame instead builds a query plan and does nothing until you call collect. Call explain on the lazy version and you see the optimized plan with nothing actually executed yet; collect is what finally runs it.

## Segment 3 (code)

Expressions describe a computation without running it immediately — pl.col of price just means "the price column." Four verbs cover almost everything: select, filter, with_columns, and group_by dot agg. Note it's group_by with an underscore, not groupby — Polars uses snake_case throughout, and the old groupby spelling still works but is deprecated.

## Segment 4 (code)

Because a LazyFrame builds the whole plan before running anything, the optimizer can push a filter and a column selection down into the file scan itself — projection pushdown — so Parquet only reads the columns and row groups the entire query actually needs. That's the same pushdown idea from the Parquet lesson, just applied automatically across a full chained query instead of something you request column by column.

## Segment 5 (steps)

Polars tends to win on large, multi-gigabyte, filter-or-join-heavy work, and when reading Parquet where pushdown avoids reading what you don't need. pandas is still the better fit for small data, for deep integration with scikit-learn and plotting libraries that expect pandas directly, and for hierarchical MultiIndex-style work. Neither tool is strictly better — a realistic pipeline often crunches a large Parquet file in Polars, then hands a smaller aggregated result to pandas for the rest.

## Segment 6 (outro)

That closes chapter one on high-performance NumPy and pandas. Up next, lesson seven opens chapter two, numerical computing, starting with floating-point arithmetic and numerical stability.
