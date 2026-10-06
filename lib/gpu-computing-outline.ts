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
      L(1, "why-gpus-suit-ml-workloads", "Why GPUs Suit ML Workloads"),
      L(2, "streaming-multiprocessors-and-cuda-cores", "Streaming Multiprocessors & CUDA Cores"),
      L(3, "the-gpu-memory-hierarchy", "The GPU Memory Hierarchy"),
      L(4, "tensor-cores-and-mixed-precision-hardware", "Tensor Cores & Mixed-Precision Hardware"),
      L(5, "cpu-vs-gpu-workload-characteristics", "CPU vs. GPU Workload Characteristics"),
    ],
  },
  {
    n: 2,
    title: "CUDA Programming Basics",
    lessons: [
      L(6, "the-cuda-programming-model", "The CUDA Programming Model"),
      L(7, "kernels-threads-blocks-and-grids", "Kernels, Threads, Blocks & Grids"),
      L(8, "global-shared-and-local-memory", "Global, Shared & Local Memory"),
      L(9, "writing-a-simple-cuda-kernel", "Writing a Simple CUDA Kernel"),
      L(10, "when-you-do-and-dont-write-raw-cuda", "When You Do (and Don't) Write Raw CUDA"),
      L(11, "cuda-toolkit-and-driver-versions", "CUDA Toolkit & Driver Versions"),
    ],
  },
  {
    n: 3,
    title: "GPU Memory & Performance",
    lessons: [
      L(12, "compute-bound-vs-memory-bound-operations", "Compute-Bound vs. Memory-Bound Operations"),
      L(13, "memory-coalescing", "Memory Coalescing"),
      L(14, "occupancy-and-utilization", "Occupancy & Utilization"),
      L(15, "profiling-with-nvidia-smi", "Profiling With nvidia-smi"),
      L(16, "profiling-with-nsight-systems-and-compute", "Profiling With Nsight Systems & Compute"),
      L(17, "finding-and-fixing-a-gpu-bottleneck", "Finding & Fixing a GPU Bottleneck"),
    ],
  },
  {
    n: 4,
    title: "Working With GPUs in PyTorch",
    lessons: [
      L(18, "device-placement-in-practice", "Device Placement in Practice"),
      L(19, "pinned-memory-and-data-transfer", "Pinned Memory & Data Transfer"),
      L(20, "automatic-mixed-precision-revisited", "Automatic Mixed Precision, Revisited"),
      L(21, "cuda-graphs", "CUDA Graphs"),
      L(22, "torch-compile-under-the-hood", "torch.compile Under the Hood"),
      L(23, "common-out-of-memory-failures-and-fixes", "Common Out-of-Memory Failures & Fixes"),
    ],
  },
  {
    n: 5,
    title: "Multi-GPU Node Basics",
    lessons: [
      L(24, "nvlink-and-pcie-topology", "NVLink & PCIe Topology"),
      L(25, "single-node-multi-gpu-setups", "Single-Node Multi-GPU Setups"),
      L(26, "gpu-to-gpu-communication-basics", "GPU-to-GPU Communication Basics"),
      L(27, "checking-topology-with-nvidia-smi-topo", "Checking Topology With nvidia-smi topo"),
      L(28, "when-one-node-isnt-enough", "When One Node Isn't Enough"),
    ],
  },
  {
    n: 6,
    title: "GPU Resource Management in Clusters",
    lessons: [
      L(29, "gpu-scheduling-in-kubernetes", "GPU Scheduling in Kubernetes"),
      L(30, "mig-and-time-slicing", "MIG & Time-Slicing"),
      L(31, "the-real-cost-of-gpu-idle-time", "The Real Cost of GPU Idle Time"),
      L(32, "capstone-diagnosing-a-slow-training-job", "Capstone: Diagnosing a Slow Training Job"),
    ],
  },
];
