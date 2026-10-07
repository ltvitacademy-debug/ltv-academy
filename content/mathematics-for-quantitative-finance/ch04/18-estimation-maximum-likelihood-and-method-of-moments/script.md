# Script — Estimation: Maximum Likelihood & Method of Moments

## Segment 1 (title)

Chapter three named distributions assuming you already knew their parameters. In reality you never do — you estimate them from data. This lesson opens chapter four with the two workhorse techniques every quant uses: maximum likelihood estimation, and the method of moments.

## Segment 2 (code)

The likelihood function is just the joint density of your data, viewed as a function of the unknown parameter instead of the data. Because products of small probabilities are awkward to work with directly, you take the log and work with the log-likelihood instead, then find the parameter value that maximizes it. That's the parameter making your observed data most probable.

## Segment 3 (code)

Work this out for the normal distribution and something satisfying happens: the maximum likelihood estimate of the mean is exactly the sample mean, and the maximum likelihood estimate of the variance is the average squared deviation, dividing by n. That's slightly biased downward, which is exactly why the textbook sample variance formula divides by n minus one instead — a small correction on top of the raw maximum likelihood answer.

## Segment 4 (steps)

The method of moments takes a more direct route. Instead of maximizing anything, you just set the sample mean, and the sample variance if you need a second parameter, equal to their theoretical formulas in terms of theta, and solve. It's usually easier to compute, but less efficient — it throws away information beyond those few moments, so its estimates bounce around more from sample to sample than maximum likelihood's do.

## Segment 5 (code)

Try method of moments on a Gamma distribution, which has two parameters, shape and scale. Its mean is shape times scale, and its variance is shape times scale squared. Two equations, two unknowns, solved with nothing more than algebra on the sample mean and sample variance — no optimizer required, and the estimates land close to the true values.

## Segment 6 (outro)

Maximum likelihood maximizes the probability of your data; method of moments matches moments directly. Both give you a parameter estimate, but maximum likelihood is the field's default because of how efficient it becomes with more data. Up next, lesson nineteen: Bayesian inference, where instead of a single point estimate you build a whole distribution over your belief.
