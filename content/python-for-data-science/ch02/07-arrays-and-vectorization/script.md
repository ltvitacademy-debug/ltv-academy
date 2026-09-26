# Script — Arrays & Vectorization

## Segment 1 (title)

Chapter 2 introduces NumPy, the numerical library underneath nearly all of Python's data science stack. Pandas is built on it. Learn the array, and everything after gets easier.

## Segment 2 (steps)

A NumPy array is a grid of values that all share one type. That single restriction is why it is fast. The values sit side by side in memory, in one format. You inspect an array with four attributes: dtype for the type, shape for the dimensions, ndim for how many dimensions, and size for the total count.

## Segment 3 (code)

Import numpy as np, then build an array from a list of prices. Its dtype is float sixty-four and its shape is four, one dimension. Now the key idea: prices times one point zero eight adds tax to every element at once. No loop. This is called vectorization. If you know SQL, it will feel familiar: you say what to do with a column, not how to walk the rows.

## Segment 4 (code)

Be careful, because lists behave differently. A list times two repeats the list. An array times two doubles every number. Comparisons are vectorized too. Prices greater than fifty gives an array of True and False, and using that array as an index picks out matching elements. That is the NumPy version of a WHERE clause.

## Segment 5 (code)

Every element shares one dtype, so NumPy chooses one that fits, and mixing integers and decimals gives floats. Convert with astype, but note that turning floats into integers truncates, it does not round. Build arrays quickly with zeros, arange, and linspace. Reshape rearranges the same values into a new shape.

## Segment 6 (code)

And it is fast. Doubling a million numbers with a list comprehension versus an array took about a tenth of a second versus a couple of milliseconds on one machine, roughly seventy-eight times faster. Your numbers will differ, but the gap is large, because the loop runs in compiled code.

## Segment 7 (outro)

You can now create arrays and do math on them without loops. Next lesson: indexing, slicing, and broadcasting.
