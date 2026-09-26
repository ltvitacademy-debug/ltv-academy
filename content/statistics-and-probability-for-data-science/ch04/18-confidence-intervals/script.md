A single number like average delivery time is thirty-nine point six minutes hides how uncertain it is. A confidence interval turns the standard error into a range of plausible values for the true parameter. Reporting the estimate together with its interval is one of the most honest habits in data work.

The recipe has three parts. Take the estimate, the sample mean. Take a critical value from the t distribution with n minus one degrees of freedom. And take the standard error, s over root n. The interval is the estimate plus and minus the critical value times the standard error.

With forty deliveries, the mean is thirty-nine sixty-two and the standard error point eight six three. The t critical value for ninety-five percent is two point zero two three. So the interval runs from thirty-seven eighty-seven to forty-one thirty-seven minutes. The true mean, forty, is inside. Scipy's t dot interval returns the same range directly.

Now the most misunderstood idea. Ninety-five percent does not mean there is a ninety-five percent chance the truth is inside this one interval. The truth is fixed. The ninety-five percent describes the method: repeat the sampling two thousand times, and about ninety-five percent of the intervals capture the truth. We got ninety-four point seven five. Any single interval is simply a hit or a miss.

Width is a trade-off. A ninety percent interval is about two point nine wide, ninety-five is three point five, and ninety-nine is four point seven. Demanding more certainty buys you a wider range. A larger sample narrows it: each fourfold increase in n roughly halves the width.

Read intervals with care. They are not probabilities about the parameter. With strongly skewed data and only fifteen observations, our nominal ninety-five percent intervals caught the truth just eighty-six percent of the time. And intervals cover random error only. A biased sample gives a confidently wrong interval.

Up next, bootstrapping, a way to build intervals by resampling, with fewer assumptions.
