# Script — Sets & Dynamic Sets

## Segment 1 (title)

A set answers one yes-or-no question for every member of a dimension: is this member in the set, or not? Unlike a group, a set never renames anything — it just flags membership. And a set can be either fixed, or dynamic.

## Segment 2 (screenshot: fixed set, General tab)

This is a fixed set, built on the General tab of the real Create Set dialog. You manually check the members you want — here, specific products. Whatever you check stays in the set exactly as checked, even if the underlying data changes later. A new product added tomorrow will never join this set on its own.

## Segment 3 (screenshot: dynamic set, Condition tab)

This is a dynamic set, built on the Condition tab of that same dialog: "Sum of Sales greater than or equal to 100,000." Instead of a frozen list, this is a rule Tableau re-checks every time the view refreshes. If a product crosses that sales threshold next quarter, it joins the set automatically. The one limit to remember: a dynamic set can only be based on a single dimension.

## Segment 4 (steps: fixed vs. dynamic)

Fixed sets are a manually checked list that never updates itself. Dynamic sets are a condition or Top-N rule, re-evaluated live. And dynamic sets are limited to one dimension — for anything that needs to span more than one, a calculated field or an LOD expression is usually the better tool.

## Segment 5 (outro)

Next lesson, you'll combine two sets together to compare their members, and use Set Actions to let a click or hover on your dashboard update a set's membership in real time.
