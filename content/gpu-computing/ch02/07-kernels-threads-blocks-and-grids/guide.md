# Kernels, Threads, Blocks & Grids

The last lesson showed a kernel launch like `addOne<<<(n + 255) / 256, 256>>>(d_data, n)` without fully explaining those two numbers inside the angle brackets. This lesson unpacks exactly that: the thread/block/grid hierarchy CUDA uses to organize however many parallel units of work you launch.

## What you'll learn

- The three levels of the launch hierarchy: grid, block, thread
- How `threadIdx`, `blockIdx`, and `blockDim` combine into a global index
- Why block size is chosen in multiples of 32, and common sizes used in practice
- How to launch a 2D grid for image-shaped data

## Grid, block, thread

A kernel launch `kernel<<<gridDim, blockDim>>>()` creates a **grid** made of **blocks**, and each block is made of **threads**:

- **Thread** — the smallest unit; runs one instance of the kernel
- **Block** — a group of threads (commonly 128, 256, or 512) that can cooperate via shared memory and `__syncthreads()`; a block always runs entirely on one SM
- **Grid** — the full set of blocks launched for one kernel call

```cpp
addOne<<<4, 256>>>(d_data, n);
// grid of 4 blocks, 256 threads each = 1024 threads total
```

## Computing a global index

Inside the kernel, three built-in variables let each thread figure out which piece of data is "theirs":

```cpp
__global__ void addOne(int *data, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        data[i] += 1;
    }
}
```

- `threadIdx.x` — this thread's index within its own block (0 to blockDim.x - 1)
- `blockIdx.x` — this block's index within the grid
- `blockDim.x` — the number of threads per block (set at launch)

`blockIdx.x * blockDim.x + threadIdx.x` converts "block 2, thread 5 of a 256-thread block" into the single global index 517 — the same pattern you'd use to flatten a 2D array index, just applied to thread position instead.

## Why 256, not 1000, and the bounds check

Block sizes are almost always multiples of 32 (the warp size from Chapter 1) — 128, 256, and 512 are the most common choices, chosen experimentally for a given kernel's resource usage. Because the total work `n` rarely divides evenly into the block size, the launch computes just enough blocks to cover `n` (`(n + 255) / 256` rounds up), and the `if (i < n)` bounds check inside the kernel prevents the extra threads in that last block from writing out of bounds.

## Launching a 2D grid

Image and matrix data is naturally 2D, and CUDA supports 2D (and 3D) blocks and grids directly:

```cpp
dim3 threads(16, 16);                           // 256 threads per block, 16x16
dim3 blocks((width + 15) / 16, (height + 15) / 16);
scaleImage<<<blocks, threads>>>(d_img, width, height);

// inside the kernel:
int x = blockIdx.x * blockDim.x + threadIdx.x;
int y = blockIdx.y * blockDim.y + threadIdx.y;
```

Each thread now maps directly to one pixel's (x, y) coordinate, which is far more natural for image-shaped work than flattening everything into a 1D index.

## Key terms

- **Thread** — the smallest unit of execution in a kernel launch
- **Block** — a group of threads that run on one SM and can share memory
- **Grid** — the full set of blocks launched by one kernel call
- **`threadIdx` / `blockIdx` / `blockDim`** — built-in variables used to compute a thread's global index
- **Bounds check** — the `if (i < n)` guard preventing out-of-range threads from writing invalid memory
