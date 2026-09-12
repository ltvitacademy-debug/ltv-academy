# Script — Duplicate Records, Granularity & Join Problems

## Segment 1 (title)

A join can quietly multiply your rows without any error message. This lesson is about granularity mismatches — the classic fan-out problem — and how to catch it before it wrecks a total.

## Segment 2 (steps: the fan-out in row counts)

Say Customers has 100 rows, one per customer. Orders has 340 rows, one per order. Join them on CustomerID, and each customer row repeats once for every order they placed — the result lands at 340 rows. That's correct if you're asking an order-level question. It's wrong if you're asking a customer-level question.

## Segment 3 (code: the number that's quietly wrong)

Here's the danger: if Signup Bonus lives on the Customers side, and you sum it after this join, you've just added that bonus once per order, not once per customer. Every individual row still looks perfectly correct — the mistake only shows up in the total.

## Segment 4 (outro)

Next lesson moves away from joining columns together and into unions — stacking rows from multiple tables vertically instead.
