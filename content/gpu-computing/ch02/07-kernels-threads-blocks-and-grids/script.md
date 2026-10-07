# Script — Kernels, Threads, Blocks & Grids

## Segment 1 (title)

Last lesson showed a kernel launch with two numbers inside angle brackets, without fully explaining them. This lesson unpacks exactly that: the thread, block, and grid hierarchy CUDA uses to organize parallel work.

## Segment 2 (steps)

A kernel launch creates a grid made of blocks, and each block is made of threads. A thread is the smallest unit, running one instance of the kernel. A block is a group of threads that always runs entirely on one SM and can cooperate through shared memory. The grid is the full set of blocks for one launch.

## Segment 3 (code)

Inside the kernel, three built-in variables let each thread find its own data: threadIdx is the thread's position within its block, blockIdx is the block's position within the grid, and blockDim is the threads per block. Multiplying blockIdx by blockDim and adding threadIdx flattens all of that into one global index.

## Segment 4 (code)

Image and matrix data is naturally two-dimensional, and CUDA supports 2D blocks and grids directly, so each thread can map straight to one pixel's x and y coordinate instead of a flattened 1D index.

## Segment 5 (outro)

Grid, block, thread — and the index math that ties them together. Next up, lesson eight: global, shared, and local memory — now that threads are organized, where exactly do they read and write data?
