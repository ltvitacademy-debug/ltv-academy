# Script — Real-World LOD Analysis

## Segment 1 (title)

Which customers are worth the most over their entire relationship, and are new customers still coming in each month? Answering that takes two FIXED LOD expressions working together — the payoff for everything this chapter has covered.

## Segment 2 (code: lifetime sales and first order date)

Two building blocks. Customer Lifetime Sales, fixed to Customer Name, gives every order from that customer the same full-relationship total. Customer First Order Date, fixed the same way, gives every order from that customer the same earliest purchase date — both stable no matter what's on the view.

## Segment 3 (code: new vs returning)

From the first-order-date field, one IF statement flags every order as New or Returning: if this order's date matches the customer's very first order date, it's New, otherwise Returning. This only works because the first-order-date field is locked per customer, not just per whatever's currently on screen.

## Segment 4 (code: cohort month)

Wrap that same first-order-date field in DATETRUNC at the month level, and every customer acquired in the same month lands in the same cohort — letting you compare average lifetime value across acquisition periods, built entirely from two FIXED expressions and one date function.

## Segment 5 (outro)

That closes out Level of Detail expressions. Next chapter moves into advanced visualizations — dual-axis charts, KPI cards, bullet graphs, waterfall and Pareto charts, and dynamic reference lines.
