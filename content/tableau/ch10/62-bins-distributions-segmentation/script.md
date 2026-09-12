# Script — Bins, Distributions & Segmentation

## Segment 1 (title)

This lesson builds on the histogram chart from Chapter 3 and goes one level deeper: how to create the bin field yourself, how bin size controls what you see, and how to turn bins into real business segments.

## Segment 2 (screenshot: Create Bins menu)

This is the real context menu for creating a bin — right-click any measure in the Data pane, choose Create, then Bins. Tableau asks you for a bin size, the width of each range. That size is the single biggest lever on what a distribution shows you: too wide and you lose the shape entirely, too narrow and you get dozens of noisy, near-empty bars.

## Segment 3 (screenshot: resulting histogram)

Once created, the bin field shows up as a discrete dimension — Sales bin — even though it came from a continuous measure. Put it on Columns with a count of orders on Rows, and you get this: most orders cluster in the lowest sales bin, with a long tail stretching out toward the higher values.

## Segment 4 (steps: bin then group)

A histogram shows you the shape. Segmentation is turning that shape into action — group several adjacent bins together using the same grouping technique from two lessons ago, and label the result Low, Medium, or High. That's the whole mechanism behind a real RFM customer-segmentation model: bin, group, then combine.

## Segment 5 (outro)

That's the end of Chapter 10. Chapter 11 moves to parameters — a user-controlled input value that lets someone change what your analysis shows without touching a single filter.
