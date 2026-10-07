# Profiling With nvidia-smi

Before reaching for a full profiler, `nvidia-smi` is almost always the first command you run on a GPU box — it ships with the NVIDIA driver, needs no instrumentation, and answers the most common question in one shot: is the GPU actually busy, and what's using its memory? This lesson covers reading its output and the handful of flags that turn it from a one-shot snapshot into a live monitor.

## What you'll learn

- How to read the default `nvidia-smi` summary table: utilization, memory, power, and processes
- How to watch utilization live with `-l` and with `nvidia-smi dmon`
- How to pull specific metrics as clean CSV with `--query-gpu`
- What `nvidia-smi` can't tell you, and why that's what Nsight tools are for

## The default summary table

Running `nvidia-smi` with no arguments prints a snapshot table:

```
$ nvidia-smi
+-----------------------------------------------------------------------------------+
| NVIDIA-SMI 535.129.03             Driver Version: 535.129.03   CUDA Version: 12.2 |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |          Memory-Usage | GPU-Util  Compute M. |
|=========================================+======================+======================|
|   0  NVIDIA A100-SXM4-40GB          On  | 00000000:07:00.0 Off |                    0 |
| N/A   52C    P0             164W / 400W |  22104MiB / 40960MiB |     97%      Default |
+-----------------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------------+
| Processes:                                                                         |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory Usage |
|=====================================================================================|
|    0   N/A  N/A      8842      C   python train.py                      21980MiB  |
+-----------------------------------------------------------------------------------+
```

The two numbers to check first: **GPU-Util** (the percentage of the last sampling period the GPU had at least one kernel running — not the same as "how efficiently" it's being used) and **Memory-Usage** (how much of the GPU's total memory is currently allocated, against the total). The **Processes** section below maps memory usage back to a specific PID, which is the fastest way to confirm which job actually owns the memory on a shared box.

## Watching utilization live

A single snapshot often isn't enough — you want to see whether utilization is sustained or spiking. `-l` (loop) reprints the table on an interval:

```
$ nvidia-smi -l 1
```

For a more compact live view across multiple metrics at once, `dmon` streams one line per sample instead of redrawing the whole table:

```
$ nvidia-smi dmon -s mu
# gpu    pwr   temp    sm   mem   enc   dec
# Idx      W     C     %     %     %     %
    0    163    52    96    41     0     0
    0    166    53    94    38     0     0
```

Here `sm` is streaming-multiprocessor (compute) utilization and `mem` is memory-controller utilization — watching both together is a cheap, informal way to get a first guess at whether a workload is leaning compute-bound or memory-bound, before confirming it properly with Nsight Compute.

## Pulling clean metrics with --query-gpu

For scripting or logging, `--query-gpu` with `--format=csv` avoids parsing the boxed table entirely:

```
$ nvidia-smi --query-gpu=timestamp,utilization.gpu,utilization.memory,memory.used,memory.total --format=csv -l 1
timestamp, utilization.gpu [%], utilization.memory [%], memory.used [MiB], memory.total [MiB]
2026/10/07 14:02:11.001, 97 %, 41 %, 22104 MiB, 40960 MiB
2026/10/07 14:02:12.003, 95 %, 39 %, 22104 MiB, 40960 MiB
```

This is the form most logging and alerting scripts use, since the output is already structured and doesn't depend on parsing box-drawing characters that can change between driver versions.

## What nvidia-smi can't tell you

`nvidia-smi` reports device-wide, time-sampled utilization — it cannot tell you which specific kernel is running, how long each kernel took, what its achieved occupancy was, or whether it was compute-bound or memory-bound at the instruction level. A GPU can show 97% "utilization" while running a badly memory-bound kernel the entire time — the number just means "something was running," not "something was running efficiently." For that level of detail, you need a real profiler: Nsight Systems for the timeline across CPU and GPU, and Nsight Compute for per-kernel analysis, both covered in the next lesson.

## Key terms

- **GPU-Util** — the fraction of the last sampling period during which at least one kernel was executing
- **Memory-Usage** — currently allocated GPU memory versus total device memory
- **`nvidia-smi dmon`** — a compact, streaming multi-metric monitor, one line per sample
- **`--query-gpu`** — flag that outputs selected metrics as structured CSV instead of the boxed table
- **Processes section** — maps GPU memory usage back to the owning host process PID
- **Device-wide sampling** — nvidia-smi's granularity; it cannot isolate a single kernel's behavior
