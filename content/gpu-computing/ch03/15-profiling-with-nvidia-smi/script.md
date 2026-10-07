# Script — Profiling With nvidia-smi

## Segment 1 (title)

Before reaching for a full profiler, nvidia-smi is almost always the first command you run on a GPU box — it ships with the driver, needs no instrumentation, and answers the most common question in one shot: is the GPU actually busy, and what's using its memory?

## Segment 2 (code)

Running nvidia-smi with no arguments prints a snapshot: GPU-util, the percentage of the last sampling period with at least one kernel running, and memory-usage, how much of the device's memory is allocated. The processes table underneath maps that memory straight back to a PID, which is the fastest way to find out who owns the memory on a shared box.

## Segment 3 (code)

A single snapshot isn't always enough. The -l flag reprints the table on an interval so you can watch whether utilization is sustained or spiking, and dmon streams a compact line per sample across multiple metrics at once — sm for compute utilization and mem for memory-controller utilization, watched side by side as a cheap first guess at compute-bound versus memory-bound.

## Segment 4 (code)

For scripting or logging, query-gpu with format=csv skips the boxed table entirely and outputs clean, structured rows — timestamp, utilization, memory used and total — which is the format most monitoring and alerting scripts actually parse.

## Segment 5 (steps)

But nvidia-smi only reports device-wide, time-sampled utilization. A GPU can show ninety-seven percent utilization the entire time it's running a badly memory-bound kernel — the number just means something was running, not that it was running efficiently. For per-kernel detail, you need a real profiler.

## Segment 6 (outro)

Up next, lesson sixteen: profiling with Nsight Systems and Nsight Compute, which is how you go from "the GPU looks busy" to "this specific kernel is the bottleneck, and here's why."
