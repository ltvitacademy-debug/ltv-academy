Last lesson showed that sample means have their own distribution. Its spread has a name: the standard error. It answers the most practical question in estimation. If I repeated this study, how far would my estimate typically move?

Standard deviation and standard error are constantly confused. The standard deviation describes how spread out individual values are. The standard error describes how spread out an estimate, like the sample mean, would be across repeated samples. For a mean, it is the sample standard deviation divided by the square root of n.

We draw fifty simulated orders. The sample standard deviation is twenty-six sixty-seven, so the standard error is that divided by root fifty, three point seven seven. The sample mean of thirty-seven forty-five sits about two units below the true forty. Scipy's sem function gives the same answer. Note ddof equals one in numpy, which gives an unbiased spread; numpy's default does not.

The standard error shrinks with sample size. From twenty-five to sixteen hundred observations, it falls from about three point nine to point six. Quadrupling the sample roughly halves it. Precision is expensive. The estimates themselves bounce around, because the standard error is also computed from a single sample.

Is the formula honest? Draw five thousand samples of fifty and take the standard deviation of their means. We get three point seven one, against the theoretical three point seven zero. The standard error really is the standard deviation of the sampling distribution.

One warning. The standard error measures only random sampling error. A badly collected sample can have a tiny standard error and still be wrong. It also assumes independent observations. The idea extends to proportions, where the formula is the square root of p times one minus p over n, and to differences between groups.

Up next, confidence intervals, which turn a standard error into a range you can report.
