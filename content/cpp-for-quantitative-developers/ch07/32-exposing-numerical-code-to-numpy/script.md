# Script — Exposing Numerical Code to NumPy

## Segment 1 (title)

A single double crosses the Python-C++ boundary for free, but quant code rarely works one number at a time — it works on whole arrays of prices and strikes. This lesson covers how pybind11 hands C++ direct access to a NumPy array's own memory, with no copying.

## Segment 2 (steps)

pybind11 can convert a NumPy array to a std::vector automatically, but that conversion copies every element in, and copies the result back out again. For ten numbers that's nothing. For a ten-million-row simulation matrix, that's two full copies of data you already had sitting in memory. The buffer protocol skips both copies entirely.

## Segment 3 (code)

Here's a vectorized payoff function. It takes a py array_t of doubles, calls request to get a buffer_info describing the array's raw pointer and shape, allocates one new output array of the same shape, and then loops over the input pointer directly, writing the call payoff into the output pointer. No element is ever copied into an intermediate container.

## Segment 4 (steps)

That buffer_info object is the whole mechanism. Its ptr field is a raw pointer straight into the array's memory. Its shape and ndim fields tell you the dimensions, which you should check before indexing. And its strides field tells you the byte offset between elements, which matters once you move beyond simple contiguous one-dimensional arrays.

## Segment 5 (code)

From the Python side, none of this complexity is visible. You import NumPy and the compiled module, build an array the normal way, and call the function — it returns a normal-looking NumPy array. The caller has no idea the computation happened in compiled C++ operating directly on raw memory.

## Segment 6 (outro)

That's the whole point of writing the extension in the first place — number crunching at native speed with zero marshaling overhead. Next, lesson thirty-three: building and distributing extensions, so this source file becomes something a teammate can actually install.
