# Script — Outliers

An outlier is a value far from the rest. It might be a typo, a broken sensor, or a genuine record-breaking customer. The technique for finding outliers is mechanical. The hard part is deciding what to do with them, and this lesson covers both.

Start with describe. Our twelve illustrative order amounts have a mean of about one hundred thirty, but a median of fifty-eight and a half. That gap is a warning sign. One order of nine hundred and forty is dragging the average up, while the median barely notices it.

The most common rule is the interquartile range. Compute the twenty-fifth and seventy-fifth percentiles with quantile, subtract to get the IQR, then set fences at one and a half IQRs below the first quartile and above the third. Here the upper fence is eighty-two and a quarter, and only the nine hundred and forty order falls outside.

The other common rule is the z-score: how many standard deviations a value sits from the mean. Values beyond three are often flagged. Be careful, though. The extreme value inflates the standard deviation used to judge it, so in small samples like this one, it barely passes at three point one seven.

Flagging is not fixing. Ask what the value is. If it's an error, like a misplaced decimal, correct it or treat it as missing. If it's real but extreme, keep it, and consider a robust statistic like the median. If a model will be sensitive to it, you might cap it. Never delete data just because it's inconvenient.

If you do cap, use clip with the fences, and keep the original column. Add an is outlier flag so the treatment is visible. Excluding the outlier changes our mean from one hundred thirty to fifty-six, so the choice you make changes the story your data tells.

Next up, Lesson 26: data validation checks.
