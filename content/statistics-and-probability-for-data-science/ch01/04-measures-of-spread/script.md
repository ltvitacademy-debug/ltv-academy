# Script — Measures of Spread

## Segment 1 (title)

Two delivery services both average fifty minutes. One is almost always between forty-eight and fifty-two. The other ranges from twenty to eighty. Same center, completely different experience. That's why we need measures of spread.

## Segment 2 (steps: three measures)

The range is the maximum minus the minimum. It's easy to explain, but it depends only on the two most extreme values. The standard deviation measures the typical distance from the mean, and it stays in the original units, like minutes or dollars. The interquartile range, or IQR, is the spread of the middle half of the data, and like the median it resists outliers.

## Segment 3 (code: two datasets)

Here are two illustrative sets of six delivery times. Both have a mean of exactly fifty. We compute the standard deviation and the IQR of each.

## Segment 4 (code: output)

Set A has a range of four, a standard deviation of one point four one, and an IQR of one point five. Set B has a range of sixty, a standard deviation of twenty-one point two one, and an IQR of twenty-two point five. Same mean, wildly different spread.

## Segment 5 (code: ddof)

One trap to know. Sample variance divides by n minus one, not n, because a sample sits closer to its own mean than to the true population mean, so dividing by n underestimates the spread. numpy defaults to dividing by n. pandas defaults to n minus one. Pass ddof equals one to numpy when you're working with a sample. A quick simulation confirms it: dividing by n lands near eighty, while n minus one lands near the true value of one hundred.

## Segment 6 (steps: choosing)

To choose: with symmetric data and a mean, report the standard deviation. With skewed data or outliers and a median, report the IQR. And the coefficient of variation, standard deviation divided by the mean, helps compare spread across different scales.

## Segment 7 (outro)

In lesson 5, we look at the overall shape of a distribution: skew, tails, and peaks.
