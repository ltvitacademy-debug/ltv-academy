# Script — Working With Large Datasets

## Segment 1 (title)

At some point a dataset is simply too big to comfortably sit in memory as one DataFrame. Before reaching for a different tool entirely, there are three nearly-free things worth trying: chunked reading, dtype downcasting, and honest memory measurement. This lesson covers all three, plus where the out-of-core line actually sits.

## Segment 2 (code)

df dot info and the default memory_usage both understate a DataFrame's real size whenever there are object columns, because they report the size of the pointers, not the strings themselves. Passing deep equals True walks the actual string contents, and that's the only number worth trusting before you decide something is too big.

## Segment 3 (code)

read_csv with a chunksize argument returns an iterator of smaller DataFrames instead of loading the whole file at once. Group and sum each chunk, merge the partial results into a running total, and you never hold the full file in memory. That pattern works for sums and counts; it doesn't work directly for things that need the whole dataset at once, like an exact median.

## Segment 4 (code)

pandas defaults to int64 and float64 even when values fit in far fewer bytes. to_numeric with downcast equals integer or float picks the smallest dtype that still holds every value — often cutting a column's footprint in half or more, for free.

## Segment 5 (code)

A column with a handful of repeated string values, like tickers, wastes enormous memory as plain object dtype, because pandas stores a full Python string per row. Casting it to category stores each unique value once and represents every row as a small integer code instead — typically a ninety percent or bigger reduction, and faster to group by too.

## Segment 6 (outro)

Chunking, downcasting, and category together often cut memory use by three to ten times for free. Only once that's not enough should you reach for an out-of-core engine. Next up, lesson five: Parquet and Arrow, the storage formats that make loading large datasets fast from the start.
