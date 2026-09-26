Phase one starts where most real projects start: in the database. A data scientist who can push filtering, joining, and aggregation into SQL builds features faster and produces a query a colleague can rerun. You know T-SQL. Here we run SQLite, and a few things differ. Dates use the date function and julian day instead of date add and date diff. You limit rows with LIMIT, not TOP. Parameters use a colon. And types are dynamic, which matters in a moment.

First, duplicates. The audit found forty duplicate customer rows. Confirm they are exact copies with select distinct star, which still gives four thousand rows. Then keep one row per customer with the window function row number, partitioned by customer id. Four thousand forty rows become four thousand.

Now the trap. The amount column is stored as text, and fourteen hundred six values start with a dollar sign. SQLite does not complain. It reads a dollar sign value as zero. The naive average is sixty four ninety two; the fixed average, after stripping the dollar sign and casting, is sixty five fifty seven. No error, no warning, just a wrong number.

The extract is one query built from common table expressions: a ranked customers step, the population and label from lesson two, a cleaned orders step filtered to the snapshot, then order features and ticket features grouped by customer, joined on the end.

Notice the rules. Every feature filters on the snapshot parameter. The last thirty days means days ago under thirty. Missing discounts become zero. Left joins keep customers with no history, and counts turn into zeros.

Then check it. Thirty six hundred ninety rows, five hundred sixty eight churners, one row per customer, and a minimum recency of zero. Without the filter that minimum is minus two, orders from the future. And the missing values carry meaning: twenty seven customers have never ordered.

Next, in lesson five, you clean the remaining messy columns in Python.
