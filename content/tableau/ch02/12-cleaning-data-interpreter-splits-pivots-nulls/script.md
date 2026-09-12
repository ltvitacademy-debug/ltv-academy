# Script — Cleaning Data: Data Interpreter, Splits, Pivots & NULLs

## Segment 1 (title)

Real-world data is rarely clean. This lesson covers the four most common cleanup tools you'll reach for: Data Interpreter, Split, Pivot, and handling NULLs.

## Segment 2 (screenshot: Data Interpreter)

Spreadsheets built for humans often break naive parsing — merged title cells, multiple small tables stacked on one sheet. When Tableau detects this, it offers Data Interpreter right on the Data Source page, which attempts to isolate the real data and flags what it excluded so you can check its work.

## Segment 3 (screenshot: Split)

Sometimes one column actually holds multiple pieces of information — a full "Customer Name" field that's really first and last name. Split breaks it into separate fields automatically, detecting the delimiter for you, or Custom Split if you need more control.

## Segment 4 (screenshot: Pivot)

Other times, values that should be in one column are spread across several — one column per brand, for example. Pivot turns those columns into rows: a Pivot Field Names column holding the brand, and a Pivot Field Values column holding the number. That's the long format Tableau generally prefers.

## Segment 5 (steps: handling NULLs)

NULL means genuinely no value — not zero, not blank text. On an axis, a small indicator flags hidden NULL marks. As a Dimension, it shows as its own "Null" header. Inside a calculation, it can silently propagate unless you wrap it with IFNULL or ZN, which Chapter 6 covers.

## Segment 6 (outro)

Next lesson finishes Chapter 2 with the concept underneath Pivot — wide versus long data, and why Tableau strongly prefers one over the other.
