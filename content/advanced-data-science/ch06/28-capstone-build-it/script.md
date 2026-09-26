In the kickoff we framed the problem, sealed the last thirteen weeks, and found that the naive baseline scores ninety-five point seven units of error per week. Now we build the models, compare them fairly, and explain what drives demand. The sealed test stays sealed.

We compare three contenders on the same four backtest origins. The naive baseline. A regression from statsmodels on the log of demand. And a hybrid: remove the trend with a straight line, then let gradient boosting learn what is left, since trees cannot extrapolate a trend.

Model A works on the log of demand, because a promotion raises demand by a percentage, not a fixed number of units. Features are all known at forecast time: a time index, the week of the year as a sine and cosine, and the planned promotion and holiday flags. No lags, because next week's sales are unknown for most of the horizon.

Regression scores thirty point five, sixty-eight percent better than naive. Detrend plus boosting scores forty-three point one, fifty-five percent better. Both clear our twenty percent goal. And a calendar-only model, with no promotion or holiday flags, is no better than naive.

Here is the last window. Regression and boosting track the actual weekly spikes. Naive draws a flat line. Notice the fit is good because we told the model when the promotions are.

Now the drivers. The regression estimates a promotion lift of thirty-one percent, with an interval from twenty-eight to thirty-four. We built in thirty. SHAP on the boosting model agrees: promotion has the largest contribution, and it implies a lift of about thirty and a half percent. Two methods, one story.

Read the result honestly. The simplest model won here. The gain comes from the promotion plan, since a calendar-only model equals naive. And the data is synthetic, so real demand will be messier.

Next lesson: open the sealed test once, present the results, and package the portfolio.
