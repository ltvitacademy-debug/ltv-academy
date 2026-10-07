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
      L(1, "why-gpus-suit-ml-workloads", "Why GPUs Suit ML Workloads", { contentDir: "ch01/01-why-gpus-suit-ml-workloads" }),
      L(2, "streaming-multiprocessors-and-cuda-cores", "Streaming Multiprocessors & CUDA Cores", { contentDir: "ch01/02-streaming-multiprocessors-and-cuda-cores" }),
      L(3, "the-gpu-memory-hierarchy", "The GPU Memory Hierarchy", { contentDir: "ch01/03-the-gpu-memory-hierarchy" }),
      L(4, "tensor-cores-and-mixed-precision-hardware", "Tensor Cores & Mixed-Precision Hardware", { contentDir: "ch01/04-tensor-cores-and-mixed-precision-hardware" }),
      L(5, "cpu-vs-gpu-workload-characteristics", "CPU vs. GPU Workload Characteristics", { contentDir: "ch01/05-cpu-vs-gpu-workload-characteristics" }),
    ],
  },
  {
    n: 2,
    title: "CUDA Programming Basics",
    lessons: [
      L(6, "the-cuda-programming-model", "The CUDA Programming Model", { contentDir: "ch02/06-the-cuda-programming-model" }),
      L(7, "kernels-threads-blocks-and-grids", "Kernels, Threads, Blocks & Grids", { contentDir: "ch02/07-kernels-threads-blocks-and-grids" }),
      L(8, "global-shared-and-local-memory", "Global, Shared & Local Memory", { contentDir: "ch02/08-global-shared-and-local-memory" }),
      L(9, "writing-a-simple-cuda-kernel", "Writing a Simple CUDA Kernel", { contentDir: "ch02/09-writing-a-simple-cuda-kernel" }),
      L(10, "when-you-do-and-dont-write-raw-cuda", "When You Do (and Don't) Write Raw CUDA", { contentDir: "ch02/10-when-you-do-and-dont-write-raw-cuda" }),
      L(11, "cuda-toolkit-and-driver-versions", "CUDA Toolkit & Driver Versions", { contentDir: "ch02/11-cuda-toolkit-and-driver-versions" }),
    ],
  },
  {
    n: 3,
    title: "GPU Memory & Performance",
    lessons: [
      L(12, "compute-bound-vs-memory-bound-operations", "Compute-Bound vs. Memory-Bound Operations", { contentDir: "ch03/12-compute-bound-vs-memory-bound-operations" }),
      L(13, "memory-coalescing", "Memory Coalescing", { contentDir: "ch03/13-memory-coalescing" }),
      L(14, "occupancy-and-utilization", "Occupancy & Utilization", { contentDir: "ch03/14-occupancy-and-utilization" }),
      L(15, "profiling-with-nvidia-smi", "Profiling With nvidia-smi", { contentDir: "ch03/15-profiling-with-nvidia-smi" }),
      L(16, "profiling-with-nsight-systems-and-compute", "Profiling With Nsight Systems & Compute", { contentDir: "ch03/16-profiling-with-nsight-systems-and-compute" }),
      L(17, "finding-and-fixing-a-gpu-bottleneck", "Finding & Fixing a GPU Bottleneck", { contentDir: "ch03/17-finding-and-fixing-a-gpu-bottleneck" }),
    ],
  },
  {
    n: 4,
    title: "Working With GPUs in PyTorch",
    lessons: [
      L(18, "device-placement-in-practice", "Device Placement in Practice", { contentDir: "ch04/18-device-placement-in-practice" }),
      L(19, "pinned-memory-and-data-transfer", "Pinned Memory & Data Transfer", { contentDir: "ch04/19-pinned-memory-and-data-transfer" }),
      L(20, "automatic-mixed-precision-revisited", "Automatic Mixed Precision, Revisited", { contentDir: "ch04/20-automatic-mixed-precision-revisited" }),
      L(21, "cuda-graphs", "CUDA Graphs", { contentDir: "ch04/21-cuda-graphs" }),
      L(22, "torch-compile-under-the-hood", "torch.compile Under the Hood", { contentDir: "ch04/22-torch-compile-under-the-hood" }),
      L(23, "common-out-of-memory-failures-and-fixes", "Common Out-of-Memory Failures & Fixes", { contentDir: "ch04/23-common-out-of-memory-failures-and-fixes" }),
    ],
  },
  {
    n: 5,
    title: "Multi-GPU Node Basics",
    lessons: [
      L(24, "nvlink-and-pcie-topology", "NVLink & PCIe Topology", { contentDir: "ch05/24-nvlink-and-pcie-topology" }),
      L(25, "single-node-multi-gpu-setups", "Single-Node Multi-GPU Setups", { contentDir: "ch05/25-single-node-multi-gpu-setups" }),
      L(26, "gpu-to-gpu-communication-basics", "GPU-to-GPU Communication Basics", { contentDir: "ch05/26-gpu-to-gpu-communication-basics" }),
      L(27, "checking-topology-with-nvidia-smi-topo", "Checking Topology With nvidia-smi topo", { contentDir: "ch05/27-checking-topology-with-nvidia-smi-topo" }),
      L(28, "when-one-node-isnt-enough", "When One Node Isn't Enough", { contentDir: "ch05/28-when-one-node-isnt-enough" }),
    ],
  },
  {
    n: 6,
    title: "GPU Resource Management in Clusters",
    lessons: [
      L(29, "gpu-scheduling-in-kubernetes", "GPU Scheduling in Kubernetes", { contentDir: "ch06/29-gpu-scheduling-in-kubernetes" }),
      L(30, "mig-and-time-slicing", "MIG & Time-Slicing", { contentDir: "ch06/30-mig-and-time-slicing" }),
      L(31, "the-real-cost-of-gpu-idle-time", "The Real Cost of GPU Idle Time", { contentDir: "ch06/31-the-real-cost-of-gpu-idle-time" }),
      L(32, "capstone-diagnosing-a-slow-training-job", "Capstone: Diagnosing a Slow Training Job", { contentDir: "ch06/32-capstone-diagnosing-a-slow-training-job" }),
    ],
  },
];
