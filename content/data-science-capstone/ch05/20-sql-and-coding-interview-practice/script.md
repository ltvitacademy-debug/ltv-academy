# Script — SQL & Coding Interview Practice

## Segment 1 (title)

SQL is the most commonly tested technical skill in entry-level data science interviews. The questions repeat a small set of patterns: top-N per group, deduplication, cohort retention, and comparing a row to the previous one. I ran every query here against a small SQLite database, so the outputs you see are real.

## Segment 2 (code: top-N per group)

First, top two customers by spend in each region. Sum spend per customer, then number the rows within each region with ROW_NUMBER, partitioned by region and ordered by total descending, and keep the first two. The result is East customers three and four, and West customers one and five. Ask about ties: RANK and DENSE_RANK treat them differently.

## Segment 3 (code: dedupe)

Second, deduplicate. Partition by email, order by updated date descending, and keep row number one. The newer name survives, and an exact duplicate collapses to one row. In real data, count the duplicates before deleting anything.

## Segment 4 (code: cohort retention)

Third, cohort retention. Of customers who signed up in each month, what share ordered the following month? Use a LEFT JOIN so customers who didn't return still count. January and February each came out at two thirds. March showed zero, but that's a trap: the data ends in March, so April hasn't happened. Say that out loud.

## Segment 5 (code: pandas)

The same problems work in pandas. Merge, group and sum, sort, and take the head of each group. Deduplicate with drop duplicates, keeping the last row after sorting. And the gap between orders is a group by, then diff. They matched the SQL results exactly.

## Segment 6 (steps: talking it through)

While you solve, narrate. Restate the question and ask about ties, nulls and duplicates. State the grain of the result. Build in small steps on tiny data. Check against a hand calculation. And name what you'd validate in real data.

## Segment 7 (outro)

Next, we look at case studies and take-home assignments.
