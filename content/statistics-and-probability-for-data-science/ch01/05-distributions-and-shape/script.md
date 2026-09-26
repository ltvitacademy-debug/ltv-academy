# Script — Distributions & Shape

## Segment 1 (title)

A distribution describes which values a variable takes and how often. Center and spread are two numbers that summarize it. Shape is the rest of the story, and two variables with the same mean and spread can look completely different.

## Segment 2 (steps: shapes)

Ask four questions about shape. Is it symmetric? Does it have a long tail on one side? A long right tail is right-skewed, like order values or incomes, where most are small and a few are huge. A long left tail is left-skewed. How many peaks does it have: one, or two? And are extreme values rare, or surprisingly common?

## Segment 3 (code: skew)

Here's the mean-median rule in code. We generate an illustrative right-skewed dataset, then print the mean, the median, and the skewness, a single number for the direction and strength of asymmetry.

## Segment 4 (code: output)

For symmetric data, mean and median almost match, and skewness is near zero. For right-skewed data, the mean is thirty point three, well above the median of twenty-one point three, and skewness is one point nine seven. Left-skewed data flips both. As a rough convention, skewness beyond about one in either direction counts as strong.

## Segment 5 (code: bimodal)

Sometimes the mean lies outright. Here we mix two groups, one centered near twenty and one near sixty. The mean is forty and the median is forty point one. But in our run, only seven of five thousand values fell between thirty-two and forty-eight. A bimodal shape is a clue that you may be looking at two subgroups.

## Segment 6 (steps: what to do)

What should you do about strong skew? Report the median and IQR. Try a transformation: taking a log compresses a long right tail, and in our run it brought skewness from one point nine seven down to about negative point four seven. And choose methods that fit the shape, which later lessons cover.

## Segment 7 (outro)

In lesson 6, we draw all of this with histograms, box plots, and other charts for distributions.
