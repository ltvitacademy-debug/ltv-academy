# Script — CUDA Toolkit & Driver Versions

## Segment 1 (title)

This closes out the CUDA programming chapter with the version question that trips up almost everyone. nvidia-smi reports one CUDA version, nvcc reports another, and torch.version.cuda reports a third. None of that is a bug.

## Segment 2 (steps)

Three different things carry three different version numbers. The NVIDIA driver is system-wide kernel software that lets the OS talk to the GPU. The CUDA Toolkit is the full development kit — nvcc, headers, libraries, profiling tools. The CUDA runtime is often bundled directly inside the PyTorch wheel, so you may not need the full Toolkit installed at all.

## Segment 3 (code)

The CUDA Version field in nvidia-smi is the maximum version that driver supports, not what's actually installed. A driver reporting 12.4 can run software built against 12.0 or earlier — compatibility runs backward.

## Segment 4 (code)

nvcc --version reports the installed Toolkit's version, if one exists at all. torch.version.cuda reports the runtime version that specific PyTorch build was compiled against, completely independent of the system Toolkit.

## Segment 5 (outro)

As long as the driver's maximum supported version is at or above what PyTorch needs, everything works. Next up, chapter three, lesson twelve: compute-bound versus memory-bound operations — learning to tell what's actually limiting a kernel's speed.
