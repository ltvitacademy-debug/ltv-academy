# Script — Spilled Ranges

## Segment 1 (title)

Two ideas make spilled ranges practical instead of just a neat trick: a way to reference a whole spill from another formula, and knowing exactly what causes it to fail.

## Segment 2 (screenshot: the spill reference operator)

Type the top-left cell of a spill followed by a hash — A2 hash — and you're referencing the entire current spill, however big it gets. Sum that reference instead of a hardcoded range, and the total never falls out of sync when the source data changes size.

## Segment 3 (screenshot: a blocked spill)

A #SPILL! error means Excel calculated the result but couldn't place it — almost always because something is sitting in the cells where it needed to land. Excel shows you the intended spill area with a dashed border, so the blockage is visible immediately.

## Segment 4 (code: other causes and the fix)

Merged cells and Excel Tables block spilling structurally, not just by occupying a cell — dynamic arrays can't spill through either one. Click the error indicator's Select Obstructing Cells option, clear what's in the way, and the formula spills instantly with no need to re-enter it.

## Segment 5 (outro)

Next lesson: the LET function — naming an intermediate calculation inside a formula so you never repeat a long expression twice.
