# Script — Data Cleaning for ML

## Segment 1 (title)

Real data never arrives training-ready. It comes from spreadsheets with typos, inconsistent formats, and humans who sometimes leave fields blank. Cleaning it routinely matters more to final model quality than which algorithm you pick.

## Segment 2 (code)

Here's a small, honest slice of a customer export exactly as it might arrive. A duplicate row. Mixed date formats. Inconsistent capitalization on the plan name. A stray space. An age of 200. A negative spend. And the literal string "N/A" sitting in a numeric column.

## Segment 3 (code)

And here's the same data after one cleaning pass. The duplicate is gone. Dates and capitalization are consistent. The impossible age and negative spend became proper missing values instead of being silently kept as real numbers — a model has no way to know 200 is biologically implausible, it'll just treat it as data.

## Segment 4 (steps)

So a cleaning pass checks for a specific list of problems: duplicates, inconsistent formatting, impossible or out-of-range values, and disguised missing values like "N/A" or "unknown" that aren't recognized as missing by default.

## Segment 5 (code)

One more thing matters: order. Structural fixes like dropping duplicates are fine before you split the data. But anything learned as a statistic, like the average used to fill a missing value, has to be learned from the training set only, and then applied to test — never the reverse. Otherwise test information leaks into training.

## Segment 6 (outro)

Next, we look at the step that often matters even more than cleaning: building new features from the ones you already have.
