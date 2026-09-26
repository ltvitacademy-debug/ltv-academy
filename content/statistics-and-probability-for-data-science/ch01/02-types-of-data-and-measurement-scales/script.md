# Script — Types of Data & Measurement Scales

## Segment 1 (title)

Before you compute a single statistic, you need to know what kind of variable you have. Averaging a column of customer ID numbers will happily return a number, but that number means nothing. This lesson gives you the vocabulary to avoid that trap.

## Segment 2 (steps: families)

There are two big families. Categorical variables put each row into a group, like region or product category. Numerical variables are measured or counted quantities. Numerical data splits again: discrete values are countable, like orders placed, while continuous values can fall anywhere in a range, like an order amount in dollars. A quick test: does a value between two neighbors make sense? Two and a half orders doesn't. A thirty-five dollar, twenty-five cent order does.

## Segment 3 (steps: scales)

Statisticians also describe four measurement scales. Nominal is labels with no order, like region. Ordinal has a meaningful order but unknown gaps, like low, medium, high. Interval has equal gaps but no true zero, like temperature in Celsius. Ratio has equal gaps and a true zero, like order value, so twice as much really means twice as much. Each step allows more math. Treat it as a guide to what's defensible, not a strict law.

## Segment 4 (code: dtypes trap)

pandas only knows storage types, not meaning. Customer ID is stored as an integer, so taking its mean cheerfully returns one hundred three, which is meaningless because an ID is a label. For a nominal column, counts are the honest summary, so value counts on region is the right tool.

## Segment 5 (code: ordered categorical)

Ordinal columns need help. Satisfaction arrives as plain text, so pandas doesn't know that low comes before medium before high. Declare an ordered categorical, and max, min, and sorting now respect the ranking instead of sorting alphabetically.

## Segment 6 (outro)

Classify every variable before you summarize it. In lesson 3, we compute our first real statistics: measures of center.
