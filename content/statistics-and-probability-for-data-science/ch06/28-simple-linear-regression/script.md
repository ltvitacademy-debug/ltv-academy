Correlation told us that two variables move together. Simple linear regression goes further. It draws the best straight line through the data, so we can describe the relationship in real units and make predictions.

The model says y equals an intercept plus a slope times x, plus some error. Least squares picks the line that makes the squared vertical gaps, called residuals, as small as possible. Four things matter when you read a fit: the slope, the intercept, R squared, and the residuals.

Here are sixty illustrative homes, with square footage and price in thousands of dollars. The scipy function linregress returns the slope and intercept. The slope is about 0.149, so each extra square foot goes with roughly a hundred and forty-nine dollars of price. The intercept is about forty-five thousand, which is just an anchor for the line.

You can also compute it by hand. The slope is how x and y vary together, divided by how much x varies alone. The intercept makes the line pass through the two means. We get exactly the same numbers, so there is no magic in the library.

R squared is 0.944, meaning size accounts for about ninety-four percent of the variation in price. Residuals average zero by construction, and their spread, about twenty-three thousand, is the typical miss. Always look at them. A curve or a funnel means a straight line is the wrong model.

Now we can predict. A two thousand square foot home comes out near three hundred forty-four thousand. The ninety-five percent interval for the slope runs from about 0.140 to 0.159. But never predict far outside the range of your data, and remember that a slope describes association, not cause. Designing experiments, which is next, is how we get at cause.

Next up, A/B test design.
