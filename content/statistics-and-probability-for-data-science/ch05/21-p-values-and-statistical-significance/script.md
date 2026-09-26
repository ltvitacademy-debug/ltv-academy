The p-value is the most reported and most misunderstood number in statistics. You'll be handed p-values constantly and asked what they mean, so let's be precise.

Here is the definition. The p-value is the probability of seeing a result at least as extreme as yours, assuming the null hypothesis is true. Every word matters. It describes the data, given the null. It is not the probability of the null, given the data. So a p-value of zero point zero three five does not mean there's a three point five percent chance the null is true. It doesn't mean there's a ninety-six percent chance the effect is real. And it says nothing about how large or important the effect is.

On the email data from last lesson, a classical Welch t-test gives a t statistic of two point one five and a p-value of zero point zero three four six, nearly identical to the permutation test.

Before testing, you choose a significance level called alpha, most often zero point zero five. If p falls below alpha, you call the result statistically significant and reject the null. That threshold is a convention, not a law of nature. Report the actual p-value, not just less than point oh five.

What do p-values look like when nothing is going on? Run five thousand A slash A tests, where both groups come from the same population. About five percent land below point oh five, half below point five, and five percent above point nine five. When the null is true, p-values are spread evenly. That's what alpha promises: a five percent false-alarm rate.

Now the opposite. A real but tiny difference, thirty cents on a fifty-five dollar order, with two hundred thousand customers per group. The p-value is astronomically small, about ten to the minus fifteen, yet the effect is only about zero point zero two five standard deviations. With enough data, anything becomes significant. Always report an effect size, and ask whether it matters to the business.

Next up: the two ways a decision can go wrong, and how sample size buys you power.
