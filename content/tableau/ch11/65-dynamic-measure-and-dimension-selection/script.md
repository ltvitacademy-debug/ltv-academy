# Script — Dynamic Measure & Dimension Selection

## Segment 1 (title)

This is the single most common real-world use of parameters: letting a viewer pick which measure — or dimension — an entire view is built on, using one control instead of a separate worksheet for every combination.

## Segment 2 (screenshot: selector parameter)

This is a real selector parameter — a String, List parameter whose values are the names of measures: Discount, Profit, Quantity, Sales. Notice the parameter holds the measure's name as text, not its actual numeric value. That distinction matters for what comes next.

## Segment 3 (screenshot: finished result)

Here's the finished pattern in Tableau's own documentation: two selector controls sitting above a scatter plot, letting a viewer choose any pair of measures for the two axes — one worksheet, covering every combination anyone could ask for.

## Segment 4 (code: the CASE calculation)

The bridge between the parameter's string and an actual number is a CASE calculation: it matches the parameter's current value against each measure name and returns that measure's sum. Repeat this pattern with a second parameter and CASE field for the other axis, and you get full control over both.

## Segment 5 (outro)

Next lesson takes this same parameter-plus-calculation pattern and turns it toward what-if analysis: comparing your actual results against a target value someone can adjust live.
