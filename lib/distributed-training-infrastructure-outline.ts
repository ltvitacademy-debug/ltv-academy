// The Distributed Training Infrastructure course outline — FRAMEWORK ONLY (chapter and
// lesson titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Second course of the AI Infrastructure / ML Systems Engineer
// destination. Assumes GPU Computing and Kubernetes Orchestration. The infrastructure
// view of distributed training — networking, scheduling, fault tolerance and storage —
// distinct from Advanced LLM Training & ML Systems, which covers the training
// algorithms this infrastructure runs.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/distributed-training-infrastructure/
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

export const DISTRIBUTED_TRAINING_INFRASTRUCTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Distributed Training, the Infrastructure View",
    lessons: [
      L(1, "what-the-cluster-has-to-do", "What the Cluster Has to Do"),
      L(2, "failure-modes-in-distributed-training", "Failure Modes in Distributed Training"),
      L(3, "the-infrastructure-vs-algorithms-split", "The Infrastructure vs. Algorithms Split"),
      L(4, "reading-a-cluster-topology-diagram", "Reading a Cluster Topology Diagram"),
      L(5, "capacity-planning-for-a-training-job", "Capacity Planning for a Training Job"),
    ],
  },
  {
    n: 2,
    title: "Networking for Distributed Training",
    lessons: [
      L(6, "why-network-bandwidth-dominates-at-scale", "Why Network Bandwidth Dominates at Scale"),
      L(7, "nccl-and-collective-communication", "NCCL & Collective Communication"),
      L(8, "allreduce-and-allgather-conceptually", "AllReduce & AllGather, Conceptually"),
      L(9, "infiniband-vs-ethernet", "InfiniBand vs. Ethernet"),
      L(10, "network-topology-for-training-clusters", "Network Topology for Training Clusters"),
      L(11, "diagnosing-a-network-bottleneck", "Diagnosing a Network Bottleneck"),
    ],
  },
  {
    n: 3,
    title: "Orchestrating Training Jobs",
    lessons: [
      L(12, "kubernetes-job-scheduling-for-ml", "Kubernetes Job Scheduling for ML"),
      L(13, "slurm-basics-for-training-clusters", "Slurm Basics for Training Clusters"),
      L(14, "job-queues-and-priorities", "Job Queues & Priorities"),
      L(15, "gang-scheduling", "Gang Scheduling"),
      L(16, "kubernetes-vs-slurm-when-to-use-which", "Kubernetes vs. Slurm: When to Use Which"),
      L(17, "autoscaling-a-training-cluster", "Autoscaling a Training Cluster"),
    ],
  },
  {
    n: 4,
    title: "Fault Tolerance & Checkpointing at Scale",
    lessons: [
      L(18, "why-long-training-runs-need-fault-tolerance", "Why Long Training Runs Need Fault Tolerance"),
      L(19, "checkpoint-storage-strategies", "Checkpoint Storage Strategies"),
      L(20, "resuming-a-large-training-job", "Resuming a Large Training Job"),
      L(21, "spot-and-preemptible-instances", "Spot & Preemptible Instances"),
      L(22, "elastic-training", "Elastic Training"),
      L(23, "designing-for-node-failure", "Designing for Node Failure"),
    ],
  },
  {
    n: 5,
    title: "Storage & Data Loading at Scale",
    lessons: [
      L(24, "high-throughput-data-loading", "High-Throughput Data Loading"),
      L(25, "sharded-datasets", "Sharded Datasets"),
      L(26, "storage-backends-for-ml-object-vs-block-vs-parallel-filesystems", "Storage Backends for ML: Object, Block & Parallel Filesystems"),
      L(27, "data-loader-bottlenecks", "Data Loader Bottlenecks"),
      L(28, "caching-strategies-for-training-data", "Caching Strategies for Training Data"),
    ],
  },
  {
    n: 6,
    title: "Monitoring & Cost Management for Training Clusters",
    lessons: [
      L(29, "gpu-utilization-monitoring", "GPU Utilization Monitoring"),
      L(30, "cost-attribution-across-teams-and-jobs", "Cost Attribution Across Teams & Jobs"),
      L(31, "training-job-observability", "Training Job Observability"),
      L(32, "alerting-on-a-stalled-training-run", "Alerting on a Stalled Training Run"),
      L(33, "capstone-standing-up-a-small-training-cluster", "Capstone: Standing Up a Small Training Cluster"),
      L(34, "capstone-writeup", "Capstone Write-Up"),
    ],
  },
];
