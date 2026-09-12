# Script — Understanding Level of Detail Expressions

## Segment 1 (title)

Every worksheet in Tableau computes at the level of detail of the view — whatever dimensions are on Rows, Columns, and the Marks card. Level of Detail expressions let a calculation break out of that and compute at a grain you choose yourself.

## Segment 2 (code: the syntax)

Every LOD expression has the same shape: curly braces, a scope keyword with a dimension, a colon, then an aggregation. This one computes total sales per customer, full stop — regardless of what else is on the view.

## Segment 3 (steps: three keywords)

There are three scope keywords. FIXED computes at exactly the dimension you name, ignoring the view and most filters. INCLUDE adds finer detail on top of the view's own grain. EXCLUDE removes detail the view would otherwise have. The next lessons take each one in turn.

## Segment 4 (code: three examples)

Here's all three side by side on the same Sample Superstore data: FIXED customer sales, INCLUDE distinct products per order, EXCLUDE sales with sub-category removed. Same syntax shape, three different relationships to the view.

## Segment 5 (outro)

Next lesson digs into FIXED specifically — the keyword you'll reach for most often, and the one every other LOD keyword gets compared against.
