Now that you can create arrays, you need to select parts of them and combine arrays of different shapes. Those are indexing, slicing, and broadcasting.

In one dimension, indexing works like lists. Position zero is the first element, and negative positions count from the end. A slice takes a start, a stop, and a step, and stops just before the stop. You can also index with a list of positions to pick exactly those elements.

Here is the surprise. A basic slice is a view, not a copy. If you change an element through the slice, the original array changes too. When you need a separate array, call dot copy. Selecting with a list of positions or a boolean mask always gives you a copy.

In two dimensions, you give rows first, then columns, separated by a comma. A colon on its own means everything along that dimension. So m of one comma two is a single value, m colon comma one is a whole column, and zero to two comma one to three is a block. Boolean masks work here too, and you can assign through them, for example setting every negative value to zero.

Now broadcasting. Multiply a two by three array of order quantities by a one-dimensional array of three unit prices, and NumPy stretches the prices across each row without copying them. The rule is simple: compare the shapes from the rightmost dimension backward. Each pair of sizes must be equal, or one of them must be one. A missing dimension counts as one. Subtracting a column mean from a dataset is a classic use.

If the shapes do not fit, NumPy raises a ValueError instead of guessing. To combine one value per row, reshape it into a column with none inside brackets.

Next lesson: math and statistics with NumPy.
