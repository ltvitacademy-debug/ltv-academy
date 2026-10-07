# Script — The CUDA Programming Model

## Segment 1 (title)

Chapter one covered the hardware. This chapter is about the software model NVIDIA built to program it: CUDA. We start with the mental model everything else builds on — host and device, and kernels.

## Segment 2 (steps)

The host is the CPU and its RAM. The device is the GPU and its own separate memory. A CUDA program is ordinary C plus plus running on the host, with specific functions called kernels launched to run on the device instead, and data has to be explicitly moved between the two across PCIe.

## Segment 3 (code)

A kernel is a function marked global, callable from host code but executing on the device across many threads at once. Every thread runs the identical code, but blockIdx and threadIdx give each one a different value, so each thread works on a different array element.

## Segment 4 (steps)

Every CUDA program follows the same five steps: allocate memory on both host and device, copy input data to the device, launch the kernel with the triple-angle-bracket syntax, copy the result back, then free both allocations.

## Segment 5 (outro)

When PyTorch moves a tensor to cuda or calls matmul on GPU tensors, it's doing exactly these cudaMalloc, cudaMemcpy, and kernel-launch steps for you. Next up, lesson seven: kernels, threads, blocks, and grids — unpacking that launch syntax in full.
