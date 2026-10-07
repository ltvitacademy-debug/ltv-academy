# Script — Advanced pandas: MultiIndex & Time Series

## Segment 1 (title)

Quant data is rarely one flat table — more often it's a panel of date and ticker observations. pandas handles that with a MultiIndex, a hierarchical row label made of two or more levels. This lesson covers building and slicing one, plus the time-series tools quant workflows lean on constantly: resample, rolling, timezones, and business-day arithmetic.

## Segment 2 (code)

Build a panel index with MultiIndex.from_product when you already know every combination — every date crossed with every ticker — naming the levels date and ticker so later code can refer to them by name instead of position. Starting from real observations, set_index on both columns of a long DataFrame gets you the same shape.

## Segment 3 (code)

A full tuple in dot-loc selects one exact row. xs, short for cross-section, selects on an inner level — every date for AAPL — without needing a tuple, and it can drop that level from the result entirely. swaplevel reorders the levels when you built date-then-ticker but need ticker-then-date for a clean per-ticker time series; sort index afterward keeps lookups fast.

## Segment 4 (code)

resample and rolling both operate over time but answer different questions. resample changes the frequency — daily prices collapsed down to a weekly close, fewer rows out the other end. rolling keeps every row at the same frequency and computes a statistic over a trailing window, like twenty-day rolling volatility at every single daily point.

## Segment 5 (code)

A naive timestamp has no timezone; tz_localize attaches one, tz_convert reinterprets an already-aware timestamp in a different zone. Mixing naive and aware timestamps raises an error instead of silently guessing, because nine-thirty means something different in New York than in London. BusinessDay does calendar-aware arithmetic that a plain timedelta can't — adding one business day to a Friday lands on Monday, skipping the weekend entirely.

## Segment 6 (outro)

A MultiIndex lets you slice and aggregate a panel without ever flattening it into plain columns, and the time-series tools keep calendar arithmetic honest. Next up, lesson four: what to do when that panel is too big to comfortably fit in memory at all.
