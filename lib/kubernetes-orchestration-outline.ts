// The Kubernetes course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 8 of the DevOps Engineer path. Assumes Docker. Aligned with the skills CKA-style certification and real platform-engineering roles expect.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/kubernetes-orchestration/
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

export const KUBERNETES_ORCHESTRATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Kubernetes Foundations",
    lessons: [
      L(1, "why-kubernetes", "Why Kubernetes"),
      L(2, "architecture-control-plane-and-nodes", "Architecture: Control Plane & Nodes"),
      L(3, "setting-up-a-local-cluster", "Setting Up a Local Cluster"),
      L(4, "kubectl-essentials", "kubectl Essentials"),
      L(5, "objects-yaml-and-the-declarative-model", "Objects, YAML & the Declarative Model"),
    ],
  },
  {
    n: 2,
    title: "Workloads",
    lessons: [
      L(6, "pods", "Pods"),
      L(7, "replicasets-and-deployments", "ReplicaSets & Deployments"),
      L(8, "rolling-updates-and-rollbacks", "Rolling Updates & Rollbacks"),
      L(9, "statefulsets", "StatefulSets"),
      L(10, "daemonsets-jobs-and-cronjobs", "DaemonSets, Jobs & CronJobs"),
    ],
  },
  {
    n: 3,
    title: "Networking & Services",
    lessons: [
      L(11, "services-and-service-types", "Services & Service Types"),
      L(12, "dns-and-service-discovery", "DNS & Service Discovery"),
      L(13, "ingress-and-ingress-controllers", "Ingress & Ingress Controllers"),
      L(14, "network-policies", "Network Policies"),
    ],
  },
  {
    n: 4,
    title: "Configuration & Storage",
    lessons: [
      L(15, "configmaps", "ConfigMaps"),
      L(16, "secrets", "Secrets"),
      L(17, "volumes-and-persistentvolumes", "Volumes & PersistentVolumes"),
      L(18, "storageclasses-and-dynamic-provisioning", "StorageClasses & Dynamic Provisioning"),
    ],
  },
  {
    n: 5,
    title: "Scaling & Reliability",
    lessons: [
      L(19, "resource-requests-and-limits", "Resource Requests & Limits"),
      L(20, "health-probes", "Health Probes"),
      L(21, "horizontal-pod-autoscaling", "Horizontal Pod Autoscaling"),
      L(22, "cluster-autoscaling", "Cluster Autoscaling"),
      L(23, "scheduling-taints-and-affinity", "Scheduling, Taints & Affinity"),
    ],
  },
  {
    n: 6,
    title: "Security & Access",
    lessons: [
      L(24, "namespaces", "Namespaces"),
      L(25, "rbac", "RBAC"),
      L(26, "service-accounts", "Service Accounts"),
      L(27, "pod-security", "Pod Security"),
    ],
  },
  {
    n: 7,
    title: "Managed Kubernetes: AKS & EKS",
    lessons: [
      L(28, "azure-kubernetes-service-aks", "Azure Kubernetes Service (AKS)"),
      L(29, "amazon-eks", "Amazon EKS"),
      L(30, "connecting-clusters-to-cloud-identity-and-registries", "Connecting Clusters to Cloud Identity & Registries"),
      L(31, "upgrades-and-maintenance", "Upgrades & Maintenance"),
    ],
  },
  {
    n: 8,
    title: "Packaging & Operating",
    lessons: [
      L(32, "helm-basics", "Helm Basics"),
      L(33, "writing-helm-charts", "Writing Helm Charts"),
      L(34, "troubleshooting-pods-and-nodes", "Troubleshooting Pods & Nodes"),
      L(35, "gitops-introduction", "GitOps Introduction"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(36, "capstone-kickoff-run-an-application-on-kubernetes", "Capstone Kickoff: Run an Application on Kubernetes"),
      L(37, "capstone-build-it", "Capstone: Build It"),
      L(38, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
