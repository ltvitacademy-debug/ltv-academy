# Script — Prophet

## Segment 1 (title)

Prophet is an open-source forecasting library from Meta, built for business series with strong seasonal patterns and holidays. Instead of picking ARIMA orders, you describe the series in business terms, and it fits that description for you.

## Segment 2 (steps)

Prophet models a series as a sum of parts. A trend that is allowed to bend. Repeating weekly and yearly seasonality. Optional holidays. And leftover noise. Each part can be inspected on its own, which is a big reason people like it.

## Segment 3 (code)

The workflow is short. Give it a data frame with a date column called d s and a value column called y. Fit, extend the frame into the future, and predict. The forecast lands in y hat, with lower and upper bounds. But our first result is disappointing: an error of twenty-four, worse than the seasonal naive baseline.

## Segment 4 (code)

The first printed line explains it. Only weekly seasonality was fitted. By default, Prophet switches on yearly seasonality only when the history spans at least two years, and ours is just under. Set yearly seasonality to true, and the error falls from twenty-four to six point seven. Always check which seasonalities your model actually contains.

## Segment 5 (code)

Holidays are one line: add country holidays. Our synthetic data has no holiday effects, so the tiny change is just noise, but real retail data can show large ones. Prophet also has built-in cross-validation, with an initial window, a period between cutoffs, and a horizon. Averaged over four cutoffs, the error is about seven point three.

## Segment 6 (code)

Finally, plot the components. One call draws the trend, the weekly shape, and the yearly wave that the model learned.

## Segment 7 (screenshot)

The trend rises about point three a day, exactly what we built into this illustrative data, and the weekly and yearly patterns match too. The next lesson turns to machine learning for forecasting.

## Segment 8 (outro)

In lesson eleven, we borrow gradient boosting and friends: forecasting with machine learning.
