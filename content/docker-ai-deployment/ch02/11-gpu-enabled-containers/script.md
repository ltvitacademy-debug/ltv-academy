# Script — GPU-Enabled Containers

## Segment 1 (title)

A container shares the host's kernel, but has its own isolated view of everything else — and a GPU is exactly the kind of hardware that isolation hides by default. Installing CUDA inside the image isn't enough on its own.

## Segment 2 (code: matching base image)

A GPU-enabled image starts from an NVIDIA CUDA base instead of a plain slim image — it needs the CUDA runtime libraries your framework's GPU build was actually compiled against. A mismatch here is one of the most common works-on-my-machine failures in GPU workloads.

## Segment 3 (code: --gpus flag)

Asking for the GPU at runtime is one flag: dash-dash-gpus all, or device=0 for just the first one. Without it, the container starts fine — it just can't see any GPU at all, and your framework silently falls back to CPU.

## Segment 4 (code: confirming it works)

Don't assume — check. nvidia-smi run inside the container is the same diagnostic you'd run on the host directly, and it's proof the passthrough actually worked, not just that the flag was accepted. For your own app, the equivalent is confirming torch.cuda.is_available returns True, not silently running on CPU.

## Segment 5 (outro)

Match the CUDA base image, ask for the GPU explicitly, and verify it's actually there. That closes out Chapter Two. Chapter Three starts getting this image into production.
