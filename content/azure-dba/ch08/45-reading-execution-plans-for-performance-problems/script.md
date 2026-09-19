# Script — Reading Execution Plans for Performance Problems

## Segment 1 (title)

You saw scans versus seeks back in T-SQL Development. This lesson is the DBA version of that skill: reading a full graphical execution plan, fast, under pressure, for a query you didn't write and don't yet know what's wrong with.

## Segment 2 (screenshot: toolbar button)

One button turns this on -- Include Actual Execution Plan, or Ctrl+M. Actual, not estimated, because actual gives you real row counts, and estimated versus actual diverging sharply is itself one of the most common causes of a bad plan.

## Segment 3 (screenshot: real graphical plan)

Plans read right to left. This is a real multi-table join -- Hash Match joins, index scans, compute scalars, each one labeled with a cost percentage. The most expensive single operator here is the top Hash Match at eighteen percent, ahead of any of the scans feeding it.

## Segment 4 (steps: what to check)

Three things, in order of payoff. Cost percentage tells you where the optimizer thinks the time is going. Arrow thickness tells you row count -- a thick arrow into a small operator means rows got read and thrown away downstream. And the operator name itself -- scan, seek, hash match -- tells you how the data was actually retrieved.

## Segment 5 (outro)

Every other tool in this chapter eventually points you back to a plan like this one to confirm a fix worked. Next up: what Index Seek, Scan, and Lookup specifically mean, operator by operator.
