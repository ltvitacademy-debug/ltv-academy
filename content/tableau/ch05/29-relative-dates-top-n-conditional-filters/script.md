# Script — Relative Dates, Top N & Conditional Filters

## Segment 1 (title)

Last lesson previewed three dynamic filter types. This lesson builds each one for real, starting with Relative Dates.

## Segment 2 (screenshot: relative dates dialog)

Here's the full Relative Dates dialog: pick a granularity — years, quarters, months, weeks, or days — then a specific window like "this week" or "last 3 weeks." The Anchor Relative To option pins "today" to a fixed date instead of the real calendar date, which is useful for a consistent demo.

## Segment 3 (screenshot: top n set dialog)

A hardcoded Top 10 filter means editing the filter every time someone wants Top 5 instead. The better pattern drives Top N from a parameter — here, "Top Customers 2" plugs in as the N value on a Set's Top tab, so a viewer-facing control can change how many rows show up.

## Segment 4 (code: condition filter)

A Condition filter formula like SUM of Sales greater than 10,000, applied to Sub-Category, dynamically keeps only sub-categories whose total sales clear that bar — and re-evaluates if the underlying data changes.

## Segment 5 (outro)

Next lesson: Context Filters — how to make one filter apply before all the others.
