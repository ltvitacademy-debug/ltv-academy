# Script — Regression Metrics

## Segment 1 (title)

How wrong are your predictions? There's no single answer. Different metrics measure different kinds of wrong. This lesson covers the four you'll use most, and why a good score can still hide a bad model.

## Segment 2 (steps)

M A E is the average absolute error, in the target's own units. R M S E squares errors first, so big misses count far more. R squared is the share of variation explained; zero means no better than predicting the mean. And M A P E is the average percentage miss.

## Segment 3 (code)

Each is one scikit-learn function. Here are five house prices, each predicted ten thousand dollars off. M A E and R M S E are both ten thousand, R squared is point nine eight, and M A P E is three and a half percent.

## Segment 4 (code)

Now make just one prediction wrong, by a hundred fifty thousand. M A E rises to thirty-eight thousand. R M S E jumps to sixty-seven thousand, because squaring makes the big miss dominate. And R squared collapses to point zero eight four. Same single error, seen very differently.

## Segment 5 (steps)

So choose by cost. Use R M S E when large errors are disproportionately bad, M A E when every dollar counts the same. Use M A P E only when the target stays well above zero. And always score held-out data.

## Segment 6 (code)

A number can still hide a problem, so plot the residuals against predictions. Here the true relationship is curved, but we fit a straight line.

## Segment 7 (screenshot)

This is the output of the code above. R squared is a healthy point nine six eight, yet the residuals form a clear U shape: under-predicting at both ends, over-predicting in the middle. The score looked good; the plot told the truth.

## Segment 8 (outro)

Next, we move from predicting numbers to predicting categories. Next up: logistic regression.
