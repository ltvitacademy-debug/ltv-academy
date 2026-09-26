Customers who open our emails spend more. Weeks with higher ad spend have higher sales. Each is a statement about correlation, and each tempts us to act as if one thing causes the other. Sometimes it does. Often it doesn't. Let's learn to tell the difference.

The Pearson correlation coefficient, r, summarizes how closely two numeric variables follow a straight line. Minus one is a perfect downward line, zero is no linear pattern, plus one is a perfect upward line. It says nothing about which variable drives the other, or whether either does.

Imagine a year of daily data. The holiday season pushes up both ad spend and sales. In this simulation, the ads have no effect at all on sales; only the season matters. Yet the correlation between ads and sales is point eight one nine. A dashboard would say ads strongly predict sales. The culprit is a confounder: a variable that influences both.

If you've measured the confounder, you can remove its influence from both variables and correlate what's left. Regress each on season, correlate the residuals, and the correlation collapses to point zero zero nine. But this only works for confounders you thought of and measured.

Randomization handles the rest. If ad spend is set by lottery, independent of the season, the correlation with sales drops to point zero two six. Random assignment can't be tied to anything else. That's why A/B tests are the gold standard for cause.

Correlation can also miss real relationships. Here, y is almost entirely determined by x squared, yet r is only minus point one six five, because the pattern is U-shaped, not a straight line. Always plot your data.

So when two variables move together, consider four explanations. X causes Y. Y causes X, which is reverse causation. A third variable causes both. Or coincidence, especially after searching many pairs. Randomized experiments are strongest; otherwise, hedge. Associated with is honest; causes needs more evidence.

Next up: simple linear regression, a tool to describe and predict relationships between variables.
