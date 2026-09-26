The t-test is the everyday tool for comparing averages. Is our delivery time different from the promise? Do desktop shoppers spend more than mobile shoppers? Did a loyalty program change what the same customers spend? Those three questions map onto three flavors of t-test.

A t statistic is a signal-to-noise ratio: the observed difference divided by its standard error. Under the null, it follows the t distribution, a bell shape with slightly heavier tails, to account for estimating spread from a small sample. One-sample compares a mean to a fixed value. Two-sample compares independent groups. Paired compares matched measurements, like the same customers before and after.

First, delivery. We promise three days and observe twenty-five simulated deliveries. The average is three point three eight days, and the p-value is point zero five oh nine, just above point oh five. That does not mean delivery matches the promise. The line is arbitrary, so report the estimate and its uncertainty, not just a verdict.

Now desktop versus mobile. Setting equal var to False gives Welch's version, which doesn't assume equal variances, a safe default. Desktop orders average seven ninety-one more, with a p-value of point zero two four six. The classic Student version gives point zero one five five on this data, so the choice matters. Cohen's d is about point four nine, a medium effect.

For paired data, use the paired test. Here it finds a clear effect, p equal to point zero zero one one. Treat the same data as two independent groups, and p is point two five: the effect vanishes, because customer-to-customer differences drown the change. Match the test to how the data were collected.

Check the assumptions. Observations should be independent, except in a deliberate paired design. The data should be roughly normal, or the sample decent-sized, thanks to the central limit theorem. No test fixes a biased sample. And use one-sided tests only if you chose the direction beforehand.

Next up: when the outcome is a category instead of a number, the chi-square test.
