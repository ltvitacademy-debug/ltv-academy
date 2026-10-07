# Script — NVLink & PCIe Topology

## Segment 1 (title)

Everything so far has treated the GPU as a single device. Real training servers often have four or eight GPUs in one box, and how those GPUs connect to each other has a direct impact on how fast multi-GPU training actually runs.

## Segment 2 (steps)

PCIe is the general-purpose bus every GPU uses to connect to the system, offering around 32 gigabytes per second on a Gen4 x16 link, shared and often routed through the CPU. NVLink is NVIDIA's proprietary direct GPU-to-GPU interconnect, bypassing the CPU entirely, at around 900 gigabytes per second per GPU on the latest generation — more than twenty times faster.

## Segment 3 (steps)

On NVLink-equipped servers, GPUs are often also connected through an NVSwitch, a dedicated switch chip giving every GPU a direct, full-bandwidth path to every other GPU, instead of an uneven point-to-point mesh.

## Segment 4 (code)

nvidia-smi topo minus m prints exactly this layout. NV12 in a cell means that pair of GPUs is connected by NVLink; a path that instead says PHB means it routes through the PCIe host bridge — slower, and something you'll learn to read fully in lesson twenty-seven.

## Segment 5 (outro)

The interconnect, not just the GPU count, is often the real product being sold in a multi-GPU server. Next up, lesson twenty-five: single-node multi-GPU setups — actually using more than one GPU in a job.
