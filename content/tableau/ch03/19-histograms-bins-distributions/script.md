# Script — Histograms, Bins & Distributions

## Segment 1 (title)

Every measure so far has been aggregated — summed, averaged, counted. A bin does something different: it groups a continuous measure's raw values into equal-sized ranges, turning that measure into a brand new dimension.

## Segment 2 (screenshot: Create Bins menu)

Right-click any measure in the Data pane and choose Create, then Bins. Set a bin size yourself, or let Tableau calculate one for you — a bin size of two for Quantity groups every order into ranges like zero to two, two to four, and so on. Each range becomes one bar in the eventual histogram.

## Segment 3 (screenshot: histogram)

Drag that measure to Columns and use Show Me to build the histogram, and three things happen at once: the measure is replaced by a continuous bin dimension, the original measure moves to Rows, and its aggregation switches from Sum to Count. A histogram never plots the sum of your measure — it plots how many rows fall into each range.

## Segment 4 (outro)

Next lesson, you'll build box-and-whisker plots — another way of showing a distribution, this time built around quartiles instead of bars.
