# Script — Dynamic Array Functions

## Segment 1 (title)

Chapter 5 is where Excel stops feeling like 2015. Dynamic array functions return multiple values that spill automatically into neighboring cells — a genuine behavioral shift from how array formulas used to work.

## Segment 2 (screenshot: the blue spill border)

Enter a dynamic array function into one cell and Excel spills the rest of the result into the cells below and to the right, outlining the whole range in a light blue border. Only the top-left cell holds the formula — every other cell in that border is a live, read-only result of it.

## Segment 3 (code: legacy vs. dynamic)

Before this, an array formula needed Ctrl+Shift+Enter and locked in a fixed result size the moment you entered it — grow the source data, and you had to re-enter the whole thing. A modern dynamic array function like UNIQUE just spills, and resizes itself automatically as the source range changes.

## Segment 4 (outro)

Next lesson: FILTER, SORT, and UNIQUE themselves — the three dynamic array functions you'll actually use every day, including how to nest them inside each other.
