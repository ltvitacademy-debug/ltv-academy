# Script — Vectorization Thinking

## Segment 1 (title)

You already know what a NumPy array is and that pandas sits on top of one. This lesson is about a habit, not a new function: when you go to process a column, ask "what's the vectorized way to say this" before you reach for a loop. It's the single biggest performance lever in quant Python code.

## Segment 2 (code)

`iterrows` looks like plain English, but it rebuilds a Series for every row, boxing each value along the way. On two hundred thousand rows, that overhead swamps the actual math. Multiply two columns and sum them with iterrows and you're looking at seconds. Write it as `df.price times df.qty, dot sum`, and it's milliseconds, because the whole thing stays in compiled code instead of the Python interpreter.

## Segment 3 (code)

Conditional logic vectorizes too. `np.select` takes a list of condition arrays and a list of choices, and evaluates every condition once, across the whole column, instead of branching row by row. Give it a two-way branch instead of multi-way, and `np.where` does the same job with less ceremony. Either one replaces an if, elif, elif, else chain written inside `.apply`.

## Segment 4 (code)

Strings vectorize through the `.str` accessor. `tickers.str.strip().str.upper().str.replace` chains just like regular string methods, but it runs across the entire Series at once rather than in a list comprehension. Same result, same readability, none of the per-element Python overhead.

## Segment 5 (steps)

Combine boolean masks with the array versions of and, or, and not: the ampersand, the pipe, and the tilde — never Python's own `and` and `or`, which only work on single values. Wrap each comparison in parentheses, because of operator precedence, and the result reads exactly like a SQL where clause built out of column comparisons.

## Segment 6 (outro)

Vectorization isn't a religion — a real loop still wins when each step depends on the previous computed result and nothing built-in covers it. But that's the exception. Next up, lesson two: the broadcasting rules and memory layout underneath why vectorized operations are actually fast.
