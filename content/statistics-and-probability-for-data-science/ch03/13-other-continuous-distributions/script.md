The normal distribution suits symmetric measurements, but a lot of real data is not symmetric. Waiting times pile up near zero. Order values have a few huge purchases. In this lesson we meet the other continuous distributions you will run into constantly.

A uniform distribution spreads probability evenly across an interval. The exponential describes the gap between random events. The log-normal describes positive, right-skewed quantities like prices. And Student's t, chi-square and F exist mainly to support hypothesis tests, which are coming in the next chapter.

If tickets arrive at four per hour, the gap between them is exponential with a mean of fifteen minutes. In scipy, scale is the mean gap, here point two five hours. About thirteen and a half percent of gaps exceed thirty minutes, and the median is well below the mean, a sign of right skew. It is also memoryless: having already waited, the chance of waiting longer is unchanged. Real customers rarely behave that perfectly, so question the assumption.

If the logarithm of a variable is normal, the variable is log-normal. We simulate ten thousand order values and see the mean about forty, above the median of thirty-four, and a skewness of two point two eight. Take the log, and the skewness falls to about zero. That is why analysts log-transform skewed variables. One trap: numpy's lognormal takes the mean and sd of the underlying normal, not of the result.

The t distribution resembles the normal but with heavier tails, reflecting extra uncertainty when you estimate spread from a small sample. With five degrees of freedom the ninety-five percent cutoff is two point five seven one. With a thousand it is one point nine six two, almost exactly the normal value. You will use this directly in confidence intervals.

So match the shape to the story. Waiting times suggest exponential, prices and incomes suggest log-normal, and small-sample inference uses the t distribution. Always check parameterization in the docs, since scale means different things in different libraries.

Up next, we learn to generate random data in Python and use it to test our intuition.
