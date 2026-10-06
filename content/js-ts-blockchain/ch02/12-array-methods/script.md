# Script — Array Methods: map, filter & reduce

## Segment 1 (title)

map, filter, and reduce replace most hand-written for loops over arrays in modern code. Today covers what each one does on its own, and how naturally they chain together.

## Segment 2 (code: map)

map runs a function on every element and returns a new array of the results, the same length as the original — the original array is never changed. Use it whenever you want the same list, but each item transformed, which is exactly what formatting a list of balances for display looks like.

## Segment 3 (code: filter)

filter runs a test function on every element and returns a new array containing only the elements where that test returned true. The result can be shorter than the original, or even empty, if nothing passes.

## Segment 4 (code: reduce)

reduce is the one that trips people up first. It walks the array carrying an accumulator forward from one element to the next, and returns a single final value. The second argument is the accumulator's starting point, and on each step the function returns the new accumulator for the next step.

## Segment 5 (code: chaining)

These three chain naturally: filter down to what matters, map to pull out just the field you need, reduce to a single total. Filter, then map, then reduce over a list of transactions is close to what real blockchain code does constantly when summarizing on-chain data.

## Segment 6 (outro)

map transforms, filter selects, reduce collapses to one value, and all three chain together cleanly. Next up: spread and rest operators — two more pieces of syntax you'll see on almost every page of real code.
