# Script — FIXED LOD

## Segment 1 (title)

FIXED is the LOD keyword you'll use most. It computes at exactly the dimension you name, ignoring everything else on the view — a number that stays stable no matter how you slice the worksheet around it.

## Segment 2 (code: fixed customer sales)

Here's the classic example: total sales per customer. Drop this into a view grained by Order ID, Region, anything — every row for a given customer still shows that customer's full lifetime total, because FIXED doesn't care what's on the shelves.

## Segment 3 (code: multiple dimensions and empty scope)

You can fix to more than one dimension at once — Region and Category together — or fix to nothing at all. An empty FIXED scope means the whole table: one number, repeated on every row, like a grand total that never moves.

## Segment 4 (steps: filters and FIXED)

Here's the part that trips everyone up at least once: a regular dimension filter does not affect a FIXED calculation, because that filter runs after FIXED already computed. Context filters and data source filters do apply first. If you need a normal filter to affect a FIXED result, you promote it to context.

## Segment 5 (outro)

Next lesson covers the other two keywords — INCLUDE and EXCLUDE — which change the view's grain instead of ignoring it entirely.
