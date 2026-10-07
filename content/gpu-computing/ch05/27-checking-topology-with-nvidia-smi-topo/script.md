# Script — Checking Topology With nvidia-smi topo

## Segment 1 (title)

Earlier lessons showed fragments of the nvidia-smi topo table. This lesson reads the full thing properly — every connection type you'll actually see, and a second bottleneck that's easy to miss.

## Segment 2 (code)

This fuller table adds CPU Affinity and NUMA columns. GPU0 and GPU1 have a fast NVLink path, as do GPU2 and GPU3, but crossing between those two pairs only shows SYS — meaning those GPUs sit on different NUMA nodes entirely.

## Segment 3 (steps)

The codes run fastest to slowest: NV for a direct NVLink connection, PIX or PXB for one or more PCIe switches, PHB for the PCIe host bridge, and SYS for a path that crosses a NUMA or CPU socket boundary — the slowest of all.

## Segment 4 (steps)

CPU Affinity lists which CPU cores sit physically closest to a given GPU, and NUMA Affinity gives the node number directly. Pinning a data loader's worker processes to the wrong cores creates a second, separate slowdown layered on top of GPU-to-GPU topology.

## Segment 5 (outro)

This table explains why an eight-GPU server with a slow link to half its GPUs may not scale much better than a four-GPU server. Next up, lesson twenty-eight: when one node isn't enough — closing out multi-GPU basics.
