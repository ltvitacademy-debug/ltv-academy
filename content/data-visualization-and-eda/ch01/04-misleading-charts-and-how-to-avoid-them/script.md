Charts don't lie by themselves, but they can be made to mislead, sometimes on purpose and often by accident. Learn to spot the tricks, and never commit them yourself.

The most common is the truncated axis. In our illustrative data, West customers spend about three hundred twenty-five dollars and South about two eighty-three, a fifteen percent difference. On the left, the axis starts at two eighty. South's bar nearly vanishes and West looks fifteen times taller. On the right, the axis starts at zero, and the difference looks like what it is: real, but modest. Bars encode value by length, so a bar chart must start at zero. Line charts are different. They encode position and slope, so they can zoom in, as long as the axis is clearly labeled.

Second, dual axes. Put two series on separate y-axes and you can make them look tightly linked, or completely unrelated, just by choosing the axis ranges. If you must show two measures, use two stacked charts instead.

Third, cherry-picked windows. Monthly revenue in our illustrative data rose about forty-six percent over the year, but zoom in on August to September and you'd see a four percent drop. Show enough history for the reader to judge the trend.

Fourth, distorted shapes. Three-D effects and exploded pie slices distort proportions. And if you scale a circle's radius by the value, its area grows with the square, so a value twice as big looks four times as big.

Before you publish, run a quick honesty check: bars start at zero, one y-axis per chart, the full time range, and clear labels, units and sources.

Next up: we move into Python with matplotlib fundamentals.
