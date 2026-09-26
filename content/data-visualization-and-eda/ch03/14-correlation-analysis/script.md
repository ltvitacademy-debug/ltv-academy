# Script — Correlation Analysis

## Segment 1 (title)

You already know what a correlation coefficient is. This lesson is about using it as an EDA tool: scanning a whole table of numeric columns for relationships, choosing the right kind of correlation, and knowing when the number is lying to you.

## Segment 2 (code)

The corr method computes every pairwise correlation at once. Draw the matrix as a heatmap with a diverging color scale centered on zero, and fix the scale from minus one to one, so colors mean the same thing every time. Here we draw two versions side by side: Pearson, the default, and Spearman.

## Segment 3 (screenshot)

In the Pearson panel, tenure and orders have a correlation of zero point five five, the strongest pair. Tenure and churned sit at about minus zero point one eight: a weak negative link, meaning longer tenure goes with somewhat less churn. Age is near zero against everything, so it carries little linear signal here.

## Segment 4 (steps)

Pearson measures linear association and is sensitive to extreme values. Spearman correlates the ranks of the values, so it catches any consistently rising or falling relationship and shrugs off outliers. When the two disagree sharply, something is going on: an outlier, or a curved relationship.

## Segment 5 (code)

Look at orders against total spend. More orders obviously means more spending, yet Pearson says only zero point two. Spearman says zero point eight five. The culprit is the two extreme spend values. Drop them and Pearson jumps back to about zero point eight one. Two rows out of five hundred dragged the coefficient down. So plot the pair before you trust the number. And remember, correlation is association, never proof of cause, and it can miss non-linear shapes.

## Segment 6 (outro)

Scan with corr and a heatmap, compare Pearson and Spearman, and investigate any big gap. Up next, outliers and anomalies.
