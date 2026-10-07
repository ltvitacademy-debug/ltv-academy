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
      L(1, "what-the-cluster-has-to-do", "What the Cluster Has to Do", { contentDir: "ch01/01-what-the-cluster-has-to-do" }),
      L(2, "failure-modes-in-distributed-training", "Failure Modes in Distributed Training", { contentDir: "ch01/02-failure-modes-in-distributed-training" }),
      L(3, "the-infrastructure-vs-algorithms-split", "The Infrastructure vs. Algorithms Split", { contentDir: "ch01/03-the-infrastructure-vs-algorithms-split" }),
      L(4, "reading-a-cluster-topology-diagram", "Reading a Cluster Topology Diagram", { contentDir: "ch01/04-reading-a-cluster-topology-diagram" }),
      L(5, "capacity-planning-for-a-training-job", "Capacity Planning for a Training Job", { contentDir: "ch01/05-capacity-planning-for-a-training-job" }),
    ],
  },
  {
    n: 2,
    title: "Networking for Distributed Training",
    lessons: [
      L(6, "why-network-bandwidth-dominates-at-scale", "Why Network Bandwidth Dominates at Scale", { contentDir: "ch02/06-why-network-bandwidth-dominates-at-scale" }),
      L(7, "nccl-and-collective-communication", "NCCL & Collective Communication", { contentDir: "ch02/07-nccl-and-collective-communication" }),
      L(8, "allreduce-and-allgather-conceptually", "AllReduce & AllGather, Conceptually", { contentDir: "ch02/08-allreduce-and-allgather-conceptually" }),
      L(9, "infiniband-vs-ethernet", "InfiniBand vs. Ethernet", { contentDir: "ch02/09-infiniband-vs-ethernet" }),
      L(10, "network-topology-for-training-clusters", "Network Topology for Training Clusters", { contentDir: "ch02/10-network-topology-for-training-clusters" }),
      L(11, "diagnosing-a-network-bottleneck", "Diagnosing a Network Bottleneck", { contentDir: "ch02/11-diagnosing-a-network-bottleneck" }),
    ],
  },
  {
    n: 3,
    title: "Orchestrating Training Jobs",
    lessons: [
      L(12, "kubernetes-job-scheduling-for-ml", "Kubernetes Job Scheduling for ML", { contentDir: "ch03/12-kubernetes-job-scheduling-for-ml" }),
      L(13, "slurm-basics-for-training-clusters", "Slurm Basics for Training Clusters", { contentDir: "ch03/13-slurm-basics-for-training-clusters" }),
      L(14, "job-queues-and-priorities", "Job Queues & Priorities", { contentDir: "ch03/14-job-queues-and-priorities" }),
      L(15, "gang-scheduling", "Gang Scheduling", { contentDir: "ch03/15-gang-scheduling" }),
      L(16, "kubernetes-vs-slurm-when-to-use-which", "Kubernetes vs. Slurm: When to Use Which", { contentDir: "ch03/16-kubernetes-vs-slurm-when-to-use-which" }),
      L(17, "autoscaling-a-training-cluster", "Autoscaling a Training Cluster", { contentDir: "ch03/17-autoscaling-a-training-cluster" }),
    ],
  },
  {
    n: 4,
    title: "Fault Tolerance & Checkpointing at Scale",
    lessons: [
      L(18, "why-long-training-runs-need-fault-tolerance", "Why Long Training Runs Need Fault Tolerance", { contentDir: "ch04/18-why-long-training-runs-need-fault-tolerance" }),
      L(19, "checkpoint-storage-strategies", "Checkpoint Storage Strategies", { contentDir: "ch04/19-checkpoint-storage-strategies" }),
      L(20, "resuming-a-large-training-job", "Resuming a Large Training Job", { contentDir: "ch04/20-resuming-a-large-training-job" }),
      L(21, "spot-and-preemptible-instances", "Spot & Preemptible Instances", { contentDir: "ch04/21-spot-and-preemptible-instances" }),
      L(22, "elastic-training", "Elastic Training", { contentDir: "ch04/22-elastic-training" }),
      L(23, "designing-for-node-failure", "Designing for Node Failure", { contentDir: "ch04/23-designing-for-node-failure" }),
    ],
  },
  {
    n: 5,
    title: "Storage & Data Loading at Scale",
    lessons: [
      L(24, "high-throughput-data-loading", "High-Throughput Data Loading", { contentDir: "ch05/24-high-throughput-data-loading" }),
      L(25, "sharded-datasets", "Sharded Datasets", { contentDir: "ch05/25-sharded-datasets" }),
      L(26, "storage-backends-for-ml-object-vs-block-vs-parallel-filesystems", "Storage Backends for ML: Object, Block & Parallel Filesystems", { contentDir: "ch05/26-storage-backends-for-ml-object-vs-block-vs-parallel-filesystems" }),
      L(27, "data-loader-bottlenecks", "Data Loader Bottlenecks", { contentDir: "ch05/27-data-loader-bottlenecks" }),
      L(28, "caching-strategies-for-training-data", "Caching Strategies for Training Data", { contentDir: "ch05/28-caching-strategies-for-training-data" }),
    ],
  },
  {
    n: 6,
    title: "Monitoring & Cost Management for Training Clusters",
    lessons: [
      L(29, "gpu-utilization-monitoring", "GPU Utilization Monitoring", { contentDir: "ch06/29-gpu-utilization-monitoring" }),
      L(30, "cost-attribution-across-teams-and-jobs", "Cost Attribution Across Teams & Jobs", { contentDir: "ch06/30-cost-attribution-across-teams-and-jobs" }),
      L(31, "training-job-observability", "Training Job Observability", { contentDir: "ch06/31-training-job-observability" }),
      L(32, "alerting-on-a-stalled-training-run", "Alerting on a Stalled Training Run", { contentDir: "ch06/32-alerting-on-a-stalled-training-run" }),
      L(33, "capstone-standing-up-a-small-training-cluster", "Capstone: Standing Up a Small Training Cluster", { contentDir: "ch06/33-capstone-standing-up-a-small-training-cluster" }),
      L(34, "capstone-writeup", "Capstone Write-Up", { contentDir: "ch06/34-capstone-writeup" }),
    ],
  },
];
