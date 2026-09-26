You now know the main distributions. This lesson shows how to draw random data from them with numpy, and why that skill matters. Simulation lets you build fake datasets, answer questions with no neat formula, and check your intuition.

Create a generator with default_rng and a seed. The same seed gives the same numbers every run, so your work is reproducible. Here two generators with seed twenty twenty-four both produce two, five, one, two, two. The integers method excludes its upper bound, so integers of one to seven simulates a six-sided die.

The generator has one method for each distribution family. Poisson for visits, lognormal for order values, binomial for returns, normal for delivery time. In ten thousand rows the returns average point three and delivery averages forty, matching our settings, and the largest order value is six hundred sixty-eight, the log-normal's long tail at work. A fake table like this is perfect for practicing pandas.

Monte Carlo means estimating a probability by repeating a random experiment many times and counting. Roll two dice a hundred thousand times, and the share summing to ten or more is point one six five three, against the exact answer of six thirty-sixths, point one six six seven.

Monte Carlo shines when no formula exists. Fifty orders a day, log-normal values, thirty percent returned. Simulating twenty thousand days gives average kept revenue near thirteen eighty-nine, a bad day near ten seventy-three, and under two percent of days below a thousand. The answer is only as good as the assumptions. If returns really cluster, this model understates the risk.

Simulation error shrinks as you draw more, but slowly. With ten draws we estimated point three, far from the exact point two six six eight. With a hundred thousand, we land within about a thousandth. Quadrupling the draws only halves the noise.

Up next, we move into sampling and ask why the data you hold is never the whole story.
