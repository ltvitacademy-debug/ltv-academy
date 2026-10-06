# Script — Feature Engineering, Basics

## Segment 1 (title)

A model can only learn from the columns you give it. If the real driver of churn is support contacts relative to how long someone's been a customer, and your table only has those as separate raw columns, the model has to work much harder to find that relationship — if it ever does.

## Segment 2 (code)

Here are three raw columns a billing system might actually hand you: signup date, last login, and total support tickets. On their own, they barely hint at churn risk.

## Segment 3 (code)

Engineer them, and you get tenure in days, days since last login, tickets per year, a recently-active flag, even signup month for seasonality. Tickets per year didn't exist in the raw data at all, and it's often a far stronger signal than the raw ticket count, because it accounts for how long the customer even had the chance to file tickets.

## Segment 4 (steps)

A handful of patterns cover most of what you'll do: ratios and rates that normalize a count by exposure, pulling day or month or days-since out of a timestamp, turning a continuous value into a meaningful flag, and aggregating many rows down to one per entity.

## Segment 5 (steps)

Here's the thing that keeps proving true: a simple model with well-engineered features frequently beats a sophisticated model fed raw columns. No algorithm can recover information that was never exposed in the input in the first place.

## Segment 6 (outro)

Next, we look at a problem feature engineering runs into directly: what to do when a column has missing data.
