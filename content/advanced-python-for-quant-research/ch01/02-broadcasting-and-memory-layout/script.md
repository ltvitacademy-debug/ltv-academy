# Script — Broadcasting & Memory Layout

## Segment 1 (title)

Vectorized operations feel like magic until you see what NumPy actually does underneath: it stretches mismatched shapes to fit without copying data, and it lays values out in memory so the CPU can stream through them. This lesson covers both halves — broadcasting, and the memory layout that makes it fast.

## Segment 2 (code)

NumPy compares two shapes starting from the rightmost dimension. They're compatible if they're equal, or if one of them is one. Add a shape four array to a shape three-by-four array, and the shape-four array stretches across every row — nothing is physically duplicated, NumPy just reuses that one row for each row it needs.

## Segment 3 (code)

That's exactly the tool for standardizing a returns matrix before a covariance calculation. Take the mean and standard deviation of each of five asset columns — shape five — and subtract and divide against a two-hundred-fifty by five matrix. The shape-five statistics broadcast across all two hundred fifty rows with no loop over assets at all.

## Segment 4 (code)

Underneath every array sits a flat memory block plus strides: the number of bytes to skip to move one step along an axis. A two-by-three array of eight-byte integers needs twenty-four bytes to the next row, but only eight to the next column, because rows are stored contiguously by default. Transpose it, and strides just swap — the data never moves, which is why dot-T is instant even on huge arrays.

## Segment 5 (code)

Slicing normally gives you a view: a new array object sharing the same memory, so mutating the slice mutates the original too. np.shares_memory confirms it. Fancy indexing — a list or boolean mask instead of a slice — always copies instead, which is a common source of "why didn't my mutation show up" bugs.

## Segment 6 (outro)

Broadcasting avoids duplicating data, and layout explains why some access patterns are cache-friendly and others aren't. Next up, lesson three: putting this foundation to work in pandas, with MultiIndex and time series operations.
