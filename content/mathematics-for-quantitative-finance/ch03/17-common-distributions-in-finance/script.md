# Script — Common Distributions in Finance

## Segment 1 (title)

You now have the machinery to describe any distribution rigorously. This closing lesson of chapter three puts names and exact formulas to the handful of distributions that show up constantly in quantitative finance, and is honest about where each one fits and where it fails.

## Segment 2 (steps)

Log-returns are usually modeled normal, and that choice has a direct consequence: if log-returns are normal, the price itself follows a lognormal distribution, which is exactly why lognormal is the standard model for prices. Prices can't go negative, and lognormal never does either, by construction.

## Segment 3 (code)

The normal distribution has kurtosis exactly three, but real returns usually show more than that. Student's t gives you a slider for exactly this: a degrees-of-freedom parameter that controls how heavy the tails are, with the normal recovered only in the limit as that parameter goes to infinity. Lower degrees of freedom means fatter tails, which fits real return data far better.

## Segment 4 (code)

Rare discrete events get counted with a Poisson distribution, where the mean and variance are forced to be exactly equal — a useful check on whether Poisson is even the right model. The time between those events follows an exponential distribution instead, with a strange but useful property: it's memoryless. However long you've already waited tells you nothing about how much longer you'll wait.

## Segment 5 (steps)

Some losses are heavier-tailed than even a fat-tailed normal model can capture. The Pareto distribution has a tail index that controls exactly how heavy: above two, variance is still finite; at or below two, variance is actually infinite, which is precisely the regime where the central limit theorem from lesson fifteen stops applying.

## Segment 6 (outro)

Normal for CLT-driven averages, lognormal for prices, Student's t for fat tails, Poisson and exponential for counting and timing, Pareto for genuine extremes — six tools, six jobs. Up next, chapter four opens with lesson eighteen: estimation via maximum likelihood and the method of moments, how to fit these distributions to real data.
