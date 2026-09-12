# Script — Rank & Other Quick Table Calculations

## Segment 1 (title)

Rank and Percentile both answer "how does this value compare to the others in view" — one as a whole-number position, the other as a percentage.

## Segment 2 (screenshot: rank dialog)

Rank, Descending, with Competition (1,2,2,4) selected — the same tie-handling rule as SQL's RANK() function. Two tied values both get rank 2, and the next value jumps straight to 4. Tableau also offers Dense ranking, which doesn't skip after a tie — that's the equivalent of SQL's DENSE_RANK().

## Segment 3 (screenshot: percentile dialog)

Percentile takes the same underlying comparison and expresses it differently: instead of "this was the third-best month," it tells you this month outperformed a certain percentage of all the others. The lowest value scores zero percent, the highest scores one hundred.

## Segment 4 (steps: the rest of the menu)

Two more quick calculations round out the menu. Year over Year Growth is really just Percent Difference From, pre-configured to compare each year to the last. YTD Total is really just Running Total, pre-configured to restart every year. Nothing new is happening underneath — they're shortcuts built from calculations you already know.

## Segment 5 (outro)

Next lesson goes underneath every table calculation you've learned so far: Compute Using, addressing, and partitioning.
