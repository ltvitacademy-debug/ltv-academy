# Script — Project 2: Customer Segmentation Dashboard

## Segment 1 (title)

Marketing wants to stop treating every customer the same way. This project segments Sample Superstore customers by purchase behavior using RFM analysis — Recency, Frequency, and Monetary value — and it leans directly on the LOD expressions and parameters you built earlier in this course.

## Segment 2 (steps: the RFM fields and segmentation)

You'll build three FIXED LOD expressions — Recency as days since each customer's last order, Frequency as their distinct order count, and Monetary as their total sales — all computed at the customer level regardless of what else is on the view. Then a segmentation calculated field buckets each customer into a business-readable label like Champions, At Risk, or Lost, using IF or CASE logic against those three values.

## Segment 3 (steps: the scatter plot and parameter)

The scatter plot puts one dot per customer, two RFM metrics on the axes, segment as color, and the third metric as size — encoding three dimensions of information without turning into a wall of overlapping dots. A parameter lets the viewer swap which two metrics drive those axes, and a filter action connects the scatter plot to a customer detail table so clicking a segment shows exactly who's in it.

## Segment 4 (outro)

Project 3 is the hardest of the three: a multi-sheet enterprise dashboard combining everything — parameters, LOD expressions, table calculations, and navigation between views.
