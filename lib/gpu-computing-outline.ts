// The GPU Computing course outline — FRAMEWORK ONLY (chapter and lesson titles, no
// lesson content yet). Lessons without a contentDir render as "in production". First
// course of the AI Infrastructure / ML Systems Engineer destination. Assumes Linux
// Administration and Deep Learning & PyTorch. How GPUs actually work, CUDA basics, and
// operating them in PyTorch and in a cluster — the hardware layer underneath every
// other course in this destination.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/gpu-computing/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const GPU_COMPUTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "GPU Architecture Fundamentals",
    lessons: [
      L(1, "why-gpus-suit-ml-workloads", "Why GPUs Suit ML Workloads", { contentDir: "ch01/01-why-gpus-suit-ml-workloads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535097/ltv-gpu-computing/why-gpus-suit-ml-workloads.mp4", durationLabel: "1 min 48 s" }),
      L(2, "streaming-multiprocessors-and-cuda-cores", "Streaming Multiprocessors & CUDA Cores", { contentDir: "ch01/02-streaming-multiprocessors-and-cuda-cores", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535195/ltv-gpu-computing/streaming-multiprocessors-and-cuda-cores.mp4", durationLabel: "1 min 47 s" }),
      L(3, "the-gpu-memory-hierarchy", "The GPU Memory Hierarchy", { contentDir: "ch01/03-the-gpu-memory-hierarchy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535284/ltv-gpu-computing/the-gpu-memory-hierarchy.mp4", durationLabel: "1 min 36 s" }),
      L(4, "tensor-cores-and-mixed-precision-hardware", "Tensor Cores & Mixed-Precision Hardware", { contentDir: "ch01/04-tensor-cores-and-mixed-precision-hardware", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535375/ltv-gpu-computing/tensor-cores-and-mixed-precision-hardware.mp4", durationLabel: "1 min 43 s" }),
      L(5, "cpu-vs-gpu-workload-characteristics", "CPU vs. GPU Workload Characteristics", { contentDir: "ch01/05-cpu-vs-gpu-workload-characteristics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535455/ltv-gpu-computing/cpu-vs-gpu-workload-characteristics.mp4", durationLabel: "1 min 28 s" }),
    ],
  },
  {
    n: 2,
    title: "CUDA Programming Basics",
    lessons: [
      L(6, "the-cuda-programming-model", "The CUDA Programming Model", { contentDir: "ch02/06-the-cuda-programming-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535531/ltv-gpu-computing/the-cuda-programming-model.mp4", durationLabel: "1 min 27 s" }),
      L(7, "kernels-threads-blocks-and-grids", "Kernels, Threads, Blocks & Grids", { contentDir: "ch02/07-kernels-threads-blocks-and-grids", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535609/ltv-gpu-computing/kernels-threads-blocks-and-grids.mp4", durationLabel: "1 min 27 s" }),
      L(8, "global-shared-and-local-memory", "Global, Shared & Local Memory", { contentDir: "ch02/08-global-shared-and-local-memory", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535690/ltv-gpu-computing/global-shared-and-local-memory.mp4", durationLabel: "1 min 20 s" }),
      L(9, "writing-a-simple-cuda-kernel", "Writing a Simple CUDA Kernel", { contentDir: "ch02/09-writing-a-simple-cuda-kernel", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535761/ltv-gpu-computing/writing-a-simple-cuda-kernel.mp4", durationLabel: "1 min 14 s" }),
      L(10, "when-you-do-and-dont-write-raw-cuda", "When You Do (and Don't) Write Raw CUDA", { contentDir: "ch02/10-when-you-do-and-dont-write-raw-cuda", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535836/ltv-gpu-computing/when-you-do-and-dont-write-raw-cuda.mp4", durationLabel: "1 min 21 s" }),
      L(11, "cuda-toolkit-and-driver-versions", "CUDA Toolkit & Driver Versions", { contentDir: "ch02/11-cuda-toolkit-and-driver-versions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535910/ltv-gpu-computing/cuda-toolkit-and-driver-versions.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 3,
    title: "GPU Memory & Performance",
    lessons: [
      L(12, "compute-bound-vs-memory-bound-operations", "Compute-Bound vs. Memory-Bound Operations", { contentDir: "ch03/12-compute-bound-vs-memory-bound-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535995/ltv-gpu-computing/compute-bound-vs-memory-bound-operations.mp4", durationLabel: "1 min 48 s" }),
      L(13, "memory-coalescing", "Memory Coalescing", { contentDir: "ch03/13-memory-coalescing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536076/ltv-gpu-computing/memory-coalescing.mp4", durationLabel: "1 min 55 s" }),
      L(14, "occupancy-and-utilization", "Occupancy & Utilization", { contentDir: "ch03/14-occupancy-and-utilization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536147/ltv-gpu-computing/occupancy-and-utilization.mp4", durationLabel: "1 min 46 s" }),
      L(15, "profiling-with-nvidia-smi", "Profiling With nvidia-smi", { contentDir: "ch03/15-profiling-with-nvidia-smi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536227/ltv-gpu-computing/profiling-with-nvidia-smi.mp4", durationLabel: "1 min 57 s" }),
      L(16, "profiling-with-nsight-systems-and-compute", "Profiling With Nsight Systems & Compute", { contentDir: "ch03/16-profiling-with-nsight-systems-and-compute", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536296/ltv-gpu-computing/profiling-with-nsight-systems-and-compute.mp4", durationLabel: "1 min 50 s" }),
      L(17, "finding-and-fixing-a-gpu-bottleneck", "Finding & Fixing a GPU Bottleneck", { contentDir: "ch03/17-finding-and-fixing-a-gpu-bottleneck", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536371/ltv-gpu-computing/finding-and-fixing-a-gpu-bottleneck.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 4,
    title: "Working With GPUs in PyTorch",
    lessons: [
      L(18, "device-placement-in-practice", "Device Placement in Practice", { contentDir: "ch04/18-device-placement-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536441/ltv-gpu-computing/device-placement-in-practice.mp4", durationLabel: "1 min 44 s" }),
      L(19, "pinned-memory-and-data-transfer", "Pinned Memory & Data Transfer", { contentDir: "ch04/19-pinned-memory-and-data-transfer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536510/ltv-gpu-computing/pinned-memory-and-data-transfer.mp4", durationLabel: "1 min 44 s" }),
      L(20, "automatic-mixed-precision-revisited", "Automatic Mixed Precision, Revisited", { contentDir: "ch04/20-automatic-mixed-precision-revisited", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536576/ltv-gpu-computing/automatic-mixed-precision-revisited.mp4", durationLabel: "1 min 43 s" }),
      L(21, "cuda-graphs", "CUDA Graphs", { contentDir: "ch04/21-cuda-graphs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536642/ltv-gpu-computing/cuda-graphs.mp4", durationLabel: "1 min 39 s" }),
      L(22, "torch-compile-under-the-hood", "torch.compile Under the Hood", { contentDir: "ch04/22-torch-compile-under-the-hood", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536702/ltv-gpu-computing/torch-compile-under-the-hood.mp4", durationLabel: "1 min 39 s" }),
      L(23, "common-out-of-memory-failures-and-fixes", "Common Out-of-Memory Failures & Fixes", { contentDir: "ch04/23-common-out-of-memory-failures-and-fixes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536789/ltv-gpu-computing/common-out-of-memory-failures-and-fixes.mp4", durationLabel: "2 min 10 s" }),
    ],
  },
  {
    n: 5,
    title: "Multi-GPU Node Basics",
    lessons: [
      L(24, "nvlink-and-pcie-topology", "NVLink & PCIe Topology", { contentDir: "ch05/24-nvlink-and-pcie-topology", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536847/ltv-gpu-computing/nvlink-and-pcie-topology.mp4", durationLabel: "1 min 37 s" }),
      L(25, "single-node-multi-gpu-setups", "Single-Node Multi-GPU Setups", { contentDir: "ch05/25-single-node-multi-gpu-setups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536901/ltv-gpu-computing/single-node-multi-gpu-setups.mp4", durationLabel: "1 min 34 s" }),
      L(26, "gpu-to-gpu-communication-basics", "GPU-to-GPU Communication Basics", { contentDir: "ch05/26-gpu-to-gpu-communication-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536949/ltv-gpu-computing/gpu-to-gpu-communication-basics.mp4", durationLabel: "1 min 29 s" }),
      L(27, "checking-topology-with-nvidia-smi-topo", "Checking Topology With nvidia-smi topo", { contentDir: "ch05/27-checking-topology-with-nvidia-smi-topo", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792536997/ltv-gpu-computing/checking-topology-with-nvidia-smi-topo.mp4", durationLabel: "1 min 26 s" }),
      L(28, "when-one-node-isnt-enough", "When One Node Isn't Enough", { contentDir: "ch05/28-when-one-node-isnt-enough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537046/ltv-gpu-computing/when-one-node-isnt-enough.mp4", durationLabel: "1 min 30 s" }),
    ],
  },
  {
    n: 6,
    title: "GPU Resource Management in Clusters",
    lessons: [
      L(29, "gpu-scheduling-in-kubernetes", "GPU Scheduling in Kubernetes", { contentDir: "ch06/29-gpu-scheduling-in-kubernetes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537090/ltv-gpu-computing/gpu-scheduling-in-kubernetes.mp4", durationLabel: "1 min 21 s" }),
      L(30, "mig-and-time-slicing", "MIG & Time-Slicing", { contentDir: "ch06/30-mig-and-time-slicing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537140/ltv-gpu-computing/mig-and-time-slicing.mp4", durationLabel: "1 min 34 s" }),
      L(31, "the-real-cost-of-gpu-idle-time", "The Real Cost of GPU Idle Time", { contentDir: "ch06/31-the-real-cost-of-gpu-idle-time", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537182/ltv-gpu-computing/the-real-cost-of-gpu-idle-time.mp4", durationLabel: "1 min 34 s" }),
      L(32, "capstone-diagnosing-a-slow-training-job", "Capstone: Diagnosing a Slow Training Job", { contentDir: "ch06/32-capstone-diagnosing-a-slow-training-job", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792537222/ltv-gpu-computing/capstone-diagnosing-a-slow-training-job.mp4", durationLabel: "1 min 31 s" }),
    ],
  },
];
