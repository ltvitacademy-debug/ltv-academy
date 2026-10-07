# Script — Writing a Simple CUDA Kernel

## Segment 1 (title)

Every piece has been introduced separately so far. This lesson puts them together into one complete, working CUDA program — vector addition, the hello world of CUDA, written and explained end to end.

## Segment 2 (code)

This kernel takes two input arrays and writes their sum into a third, using the global index and bounds check from lesson seven. Every concept from this chapter shows up here in one place.

## Segment 3 (code)

CUDA C++ is compiled with nvcc, NVIDIA's compiler, which handles both the host code and the device kernel in the same file, producing a normal executable you run directly.

## Segment 4 (code)

CUDA calls don't throw exceptions — they return an error code you have to check explicitly, since a kernel launch itself doesn't give you anything to inspect directly. cudaGetLastError and cudaGetErrorString are how you catch a silent failure.

## Segment 5 (outro)

Vector addition is deliberately simple: genuinely parallel, but with almost no algorithmic complexity to distract from the pattern itself. Next up, lesson ten: when you do, and don't, write raw CUDA — because production ML code almost never writes a kernel like this by hand.
