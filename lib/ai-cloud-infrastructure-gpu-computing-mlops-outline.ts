// AI Cloud Infrastructure, GPU Computing & MLOps course outline. Lessons without a contentDir
// render as "in production". Course 14 of the Cloud Engineer → Cloud Architect path — the third
// of four Expert Specialization courses (any order), building on the whole path's Terraform,
// Kubernetes, and observability/FinOps foundation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-cloud-infrastructure-gpu-computing-mlops/
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

export const AI_CLOUD_INFRASTRUCTURE_GPU_COMPUTING_MLOPS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "GPU Computing Fundamentals for Cloud Architects",
    lessons: [
      L(1, "why-gpus-and-what-actually-makes-them-fast-for-ai", "Why GPUs, and What Actually Makes Them Fast for AI", { contentDir: "ch01/01-why-gpus-and-what-actually-makes-them-fast-for-ai", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/why-gpus-and-what-actually-makes-them-fast-for-ai.mp4", durationLabel: "3 min 19 s" }),
      L(2, "gpu-memory-and-why-it-becomes-the-real-bottleneck", "GPU Memory, and Why It Becomes the Real Bottleneck", { contentDir: "ch01/02-gpu-memory-and-why-it-becomes-the-real-bottleneck", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/gpu-memory-and-why-it-becomes-the-real-bottleneck.mp4", durationLabel: "2 min 53 s" }),
      L(3, "the-real-gpu-instance-families-on-azure-and-aws", "The Real GPU Instance Families on Azure and AWS", { contentDir: "ch01/03-the-real-gpu-instance-families-on-azure-and-aws", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/the-real-gpu-instance-families-on-azure-and-aws.mp4", durationLabel: "2 min 51 s" }),
      L(4, "when-a-workload-actually-needs-a-gpu-and-when-it-doesnt", "When a Workload Actually Needs a GPU, and When It Doesn't", { contentDir: "ch01/04-when-a-workload-actually-needs-a-gpu-and-when-it-doesnt", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/when-a-workload-actually-needs-a-gpu-and-when-it-doesnt.mp4", durationLabel: "2 min 45 s" }),
    ],
  },
  {
    n: 2,
    title: "Provisioning GPU Infrastructure",
    lessons: [
      L(5, "provisioning-gpu-vms-with-terraform-on-azure-and-aws", "Provisioning GPU VMs with Terraform on Azure and AWS", { contentDir: "ch02/05-provisioning-gpu-vms-with-terraform-on-azure-and-aws", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/provisioning-gpu-vms-with-terraform-on-azure-and-aws.mp4", durationLabel: "2 min 44 s" }),
      L(6, "gpu-drivers-cuda-and-the-container-toolkit", "GPU Drivers, CUDA, and the Container Toolkit", { contentDir: "ch02/06-gpu-drivers-cuda-and-the-container-toolkit", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/gpu-drivers-cuda-and-the-container-toolkit.mp4", durationLabel: "2 min 13 s" }),
      L(7, "running-gpu-workloads-on-kubernetes", "Running GPU Workloads on Kubernetes", { contentDir: "ch02/07-running-gpu-workloads-on-kubernetes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/running-gpu-workloads-on-kubernetes.mp4", durationLabel: "2 min 22 s" }),
      L(8, "gpu-scheduling-and-sharing-a-single-gpu-across-workloads", "GPU Scheduling and Sharing a Single GPU Across Workloads", { contentDir: "ch02/08-gpu-scheduling-and-sharing-a-single-gpu-across-workloads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/gpu-scheduling-and-sharing-a-single-gpu-across-workloads.mp4", durationLabel: "2 min 40 s" }),
    ],
  },
  {
    n: 3,
    title: "Distributed Training Infrastructure",
    lessons: [
      L(9, "why-training-a-large-model-needs-more-than-one-gpu", "Why Training a Large Model Needs More Than One GPU", { contentDir: "ch03/09-why-training-a-large-model-needs-more-than-one-gpu", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/why-training-a-large-model-needs-more-than-one-gpu.mp4", durationLabel: "2 min 25 s" }),
      L(10, "data-parallelism-vs-model-parallelism-the-real-difference", "Data Parallelism vs. Model Parallelism: The Real Difference", { contentDir: "ch03/10-data-parallelism-vs-model-parallelism-the-real-difference", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/data-parallelism-vs-model-parallelism-the-real-difference.mp4", durationLabel: "2 min 36 s" }),
      L(11, "high-speed-interconnects-and-why-network-topology-matters", "High-Speed Interconnects, and Why Network Topology Matters", { contentDir: "ch03/11-high-speed-interconnects-and-why-network-topology-matters", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/high-speed-interconnects-and-why-network-topology-matters.mp4", durationLabel: "2 min 56 s" }),
      L(12, "checkpointing-and-fault-tolerance-for-long-training-runs", "Checkpointing and Fault Tolerance for Long Training Runs", { contentDir: "ch03/12-checkpointing-and-fault-tolerance-for-long-training-runs", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/checkpointing-and-fault-tolerance-for-long-training-runs.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 4,
    title: "Model Serving and Inference Infrastructure",
    lessons: [
      L(13, "batch-inference-vs-real-time-inference-infrastructure", "Batch Inference vs. Real-Time Inference Infrastructure", { contentDir: "ch04/13-batch-inference-vs-real-time-inference-infrastructure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/batch-inference-vs-real-time-inference-infrastructure.mp4", durationLabel: "2 min 32 s" }),
      L(14, "model-serving-frameworks-and-what-they-actually-solve", "Model Serving Frameworks and What They Actually Solve", { contentDir: "ch04/14-model-serving-frameworks-and-what-they-actually-solve", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/model-serving-frameworks-and-what-they-actually-solve.mp4", durationLabel: "2 min 42 s" }),
      L(15, "autoscaling-inference-workloads-without-wasting-gpu-spend", "Autoscaling Inference Workloads Without Wasting GPU Spend", { contentDir: "ch04/15-autoscaling-inference-workloads-without-wasting-gpu-spend", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/autoscaling-inference-workloads-without-wasting-gpu-spend.mp4", durationLabel: "2 min 29 s" }),
      L(16, "a-real-inference-architecture-on-kubernetes", "A Real Inference Architecture on Kubernetes", { contentDir: "ch04/16-a-real-inference-architecture-on-kubernetes", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/a-real-inference-architecture-on-kubernetes.mp4", durationLabel: "2 min 40 s" }),
    ],
  },
  {
    n: 5,
    title: "MLOps Pipelines for Model Lifecycle Management",
    lessons: [
      L(17, "the-real-ml-lifecycle-data-train-evaluate-deploy-monitor", "The Real ML Lifecycle: Data, Train, Evaluate, Deploy, Monitor", { contentDir: "ch05/17-the-real-ml-lifecycle-data-train-evaluate-deploy-monitor", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/the-real-ml-lifecycle-data-train-evaluate-deploy-monitor.mp4", durationLabel: "2 min 38 s" }),
      L(18, "experiment-tracking-and-model-registries", "Experiment Tracking and Model Registries", { contentDir: "ch05/18-experiment-tracking-and-model-registries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/experiment-tracking-and-model-registries.mp4", durationLabel: "2 min 28 s" }),
      L(19, "cicd-for-models-not-just-application-code", "CI/CD for Models, Not Just Application Code", { contentDir: "ch05/19-cicd-for-models-not-just-application-code", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/cicd-for-models-not-just-application-code.mp4", durationLabel: "2 min 29 s" }),
      L(20, "model-monitoring-and-detecting-drift-in-production", "Model Monitoring and Detecting Drift in Production", { contentDir: "ch05/20-model-monitoring-and-detecting-drift-in-production", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/model-monitoring-and-detecting-drift-in-production.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 6,
    title: "Cost Optimization for AI and GPU Workloads",
    lessons: [
      L(21, "why-gpu-spend-runs-away-faster-than-any-other-cloud-cost", "Why GPU Spend Runs Away Faster Than Any Other Cloud Cost", { contentDir: "ch06/21-why-gpu-spend-runs-away-faster-than-any-other-cloud-cost", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/why-gpu-spend-runs-away-faster-than-any-other-cloud-cost.mp4", durationLabel: "2 min 31 s" }),
      L(22, "spot-gpus-and-the-real-interruption-tradeoffs-for-training", "Spot GPUs, and the Real Interruption Tradeoffs for Training", { contentDir: "ch06/22-spot-gpus-and-the-real-interruption-tradeoffs-for-training", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/spot-gpus-and-the-real-interruption-tradeoffs-for-training.mp4", durationLabel: "2 min 27 s" }),
      L(23, "right-sizing-gpu-instances-for-training-vs-inference", "Right-Sizing GPU Instances for Training vs. Inference", { contentDir: "ch06/23-right-sizing-gpu-instances-for-training-vs-inference", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/right-sizing-gpu-instances-for-training-vs-inference.mp4", durationLabel: "2 min 14 s" }),
      L(24, "a-real-finops-practice-for-ai-infrastructure", "A Real FinOps Practice for AI Infrastructure", { contentDir: "ch06/24-a-real-finops-practice-for-ai-infrastructure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/a-real-finops-practice-for-ai-infrastructure.mp4", durationLabel: "2 min 36 s" }),
    ],
  },
  {
    n: 7,
    title: "Scaling and Reliability for AI Infrastructure",
    lessons: [
      L(25, "capacity-planning-when-gpus-are-genuinely-scarce", "Capacity Planning When GPUs Are Genuinely Scarce", { contentDir: "ch07/25-capacity-planning-when-gpus-are-genuinely-scarce", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/capacity-planning-when-gpus-are-genuinely-scarce.mp4", durationLabel: "2 min 47 s" }),
      L(26, "multi-region-strategy-for-ai-workloads", "Multi-Region Strategy for AI Workloads", { contentDir: "ch07/26-multi-region-strategy-for-ai-workloads", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/multi-region-strategy-for-ai-workloads.mp4", durationLabel: "2 min 37 s" }),
      L(27, "slos-for-inference-latency-throughput-and-availability", "SLOs for Inference: Latency, Throughput, and Availability", { contentDir: "ch07/27-slos-for-inference-latency-throughput-and-availability", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/slos-for-inference-latency-throughput-and-availability.mp4", durationLabel: "2 min 41 s" }),
      L(28, "disaster-recovery-for-models-and-training-infrastructure", "Disaster Recovery for Models and Training Infrastructure", { contentDir: "ch07/28-disaster-recovery-for-models-and-training-infrastructure", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/disaster-recovery-for-models-and-training-infrastructure.mp4", durationLabel: "2 min 46 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building Production AI Infrastructure",
    lessons: [
      L(29, "lab-provisioning-a-gpu-training-cluster-with-terraform", "Lab: Provisioning a GPU Training Cluster with Terraform", { contentDir: "ch08/29-lab-provisioning-a-gpu-training-cluster-with-terraform", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/lab-provisioning-a-gpu-training-cluster-with-terraform.mp4", durationLabel: "2 min 32 s" }),
      L(30, "lab-deploying-an-autoscaling-model-serving-endpoint", "Lab: Deploying an Autoscaling Model-Serving Endpoint", { contentDir: "ch08/30-lab-deploying-an-autoscaling-model-serving-endpoint", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/lab-deploying-an-autoscaling-model-serving-endpoint.mp4", durationLabel: "2 min 35 s" }),
      L(31, "case-study-a-training-run-that-silently-wasted-a-weeks-worth-of-gpu-spend", "Case Study: A Training Run That Silently Wasted a Week's Worth of GPU Spend", { contentDir: "ch08/31-case-study-a-training-run-that-silently-wasted-a-weeks-worth-of-gpu-spend", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/case-study-a-training-run-that-silently-wasted-a-weeks-worth-of-gpu-spend.mp4", durationLabel: "2 min 34 s" }),
      L(32, "chapter-capstone-ai-infrastructure-and-mlops-review", "Chapter Capstone: AI Infrastructure and MLOps Review", { contentDir: "ch08/32-chapter-capstone-ai-infrastructure-and-mlops-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-ai-cloud-infrastructure-gpu-computing-mlops/chapter-capstone-ai-infrastructure-and-mlops-review.mp4", durationLabel: "2 min 33 s" }),
    ],
  },
];
