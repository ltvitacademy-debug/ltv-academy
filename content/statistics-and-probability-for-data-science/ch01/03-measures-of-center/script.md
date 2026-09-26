# Script — Measures of Center

## Segment 1 (title)

What is a typical value? That's the first question anyone asks about a column of numbers, and a measure of center answers it with a single number. There are three classic choices, and on real business data they can disagree dramatically.

## Segment 2 (steps: three measures)

The mean adds up all the values and divides by the count. It's the balance point of the data. The median sorts the values and takes the middle one, so half the data sits below it and half above. The mode is the most frequent value, and it's the only one that works on category data.

## Segment 3 (code: the data)

Here are nine illustrative order values in dollars. Eight are thirty dollars or less, and one is a large four hundred dollar enterprise order. We compute the mean, the median, and the mode in pandas.

## Segment 4 (code: output)

The mean is sixty-one point eight nine. The median is twenty. The mode is fifteen. The mean says a typical order is about sixty-two dollars, but eight of the nine orders are thirty or less. One big order dragged the mean up to a number that describes almost nobody. The median is much closer to what a typical customer actually spends.

## Segment 5 (code: outlier removed)

Watch what happens when we drop the four hundred. The mean collapses from sixty-one point eight nine to nineteen point six two five, while the median only moves from twenty to nineteen. That makes the median robust. A trimmed mean, from scipy, is a compromise: it discards a share of the lowest and highest values before averaging.

## Segment 6 (steps: which to report)

So which one should you report? Roughly symmetric data with no wild outliers: the mean. Skewed data, like order values or incomes: the median, or both. Categories: the mode. And whenever the mean and median are far apart, that's a warning to look at a chart before trusting either number.

## Segment 7 (outro)

In lesson 4, we measure how spread out data is, because two datasets can share a center and still be completely different.
