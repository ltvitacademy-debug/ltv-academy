# Script — CUDA Graphs

## Segment 1 (title)

Every kernel launch has CPU-side overhead — the driver has to set up and dispatch each one, even if the kernel itself finishes in microseconds. CUDA graphs let you capture a whole sequence of launches once and replay it as a single operation, amortizing that overhead away.

## Segment 2 (steps)

Launching a kernel isn't free. The CPU has to prepare the launch configuration and hand it to the GPU's command queue, and that round trip takes real, fixed time regardless of how small the kernel's actual work is. A model with many small ops can spend a surprising fraction of a step just launching kernels rather than running them.

## Segment 3 (code)

A CUDA graph records an entire sequence of kernel launches and their dependencies as one structure. After a required warm-up in a side stream, capturing the forward pass, backward pass, and optimizer step inside a torch.cuda.graph context builds that structure once.

## Segment 4 (code)

From then on, each replay call re-runs the exact same sequence against the same static tensors, with one CPU-side dispatch instead of one per kernel inside it — which is why new data gets copied into the static input tensor rather than reassigned to a new one; shape, dtype, and memory address have to stay fixed across every replay.

## Segment 5 (outro)

CUDA graphs help most when launch overhead is a real fraction of step time — many small kernels, or a tight fixed-shape inference loop. Up next, lesson twenty-two: torch.compile under the hood, which automates much of this capture-and-replay pattern for you.
