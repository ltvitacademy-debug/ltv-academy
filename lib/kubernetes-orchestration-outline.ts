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
      L(1, "why-kubernetes", "Why Kubernetes", { contentDir: "ch01/01-why-kubernetes" }),
      L(2, "architecture-control-plane-and-nodes", "Architecture: Control Plane & Nodes", { contentDir: "ch01/02-architecture-control-plane-and-nodes" }),
      L(3, "setting-up-a-local-cluster", "Setting Up a Local Cluster", { contentDir: "ch01/03-setting-up-a-local-cluster" }),
      L(4, "kubectl-essentials", "kubectl Essentials", { contentDir: "ch01/04-kubectl-essentials" }),
      L(5, "objects-yaml-and-the-declarative-model", "Objects, YAML & the Declarative Model", { contentDir: "ch01/05-objects-yaml-and-the-declarative-model" }),
    ],
  },
  {
    n: 2,
    title: "Workloads",
    lessons: [
      L(6, "pods", "Pods", { contentDir: "ch02/06-pods" }),
      L(7, "replicasets-and-deployments", "ReplicaSets & Deployments", { contentDir: "ch02/07-replicasets-and-deployments" }),
      L(8, "rolling-updates-and-rollbacks", "Rolling Updates & Rollbacks", { contentDir: "ch02/08-rolling-updates-and-rollbacks" }),
      L(9, "statefulsets", "StatefulSets", { contentDir: "ch02/09-statefulsets" }),
      L(10, "daemonsets-jobs-and-cronjobs", "DaemonSets, Jobs & CronJobs", { contentDir: "ch02/10-daemonsets-jobs-and-cronjobs" }),
    ],
  },
  {
    n: 3,
    title: "Networking & Services",
    lessons: [
      L(11, "services-and-service-types", "Services & Service Types", { contentDir: "ch03/11-services-and-service-types" }),
      L(12, "dns-and-service-discovery", "DNS & Service Discovery", { contentDir: "ch03/12-dns-and-service-discovery" }),
      L(13, "ingress-and-ingress-controllers", "Ingress & Ingress Controllers", { contentDir: "ch03/13-ingress-and-ingress-controllers" }),
      L(14, "network-policies", "Network Policies", { contentDir: "ch03/14-network-policies" }),
    ],
  },
  {
    n: 4,
    title: "Configuration & Storage",
    lessons: [
      L(15, "configmaps", "ConfigMaps", { contentDir: "ch04/15-configmaps" }),
      L(16, "secrets", "Secrets", { contentDir: "ch04/16-secrets" }),
      L(17, "volumes-and-persistentvolumes", "Volumes & PersistentVolumes", { contentDir: "ch04/17-volumes-and-persistentvolumes" }),
      L(18, "storageclasses-and-dynamic-provisioning", "StorageClasses & Dynamic Provisioning", { contentDir: "ch04/18-storageclasses-and-dynamic-provisioning" }),
    ],
  },
  {
    n: 5,
    title: "Scaling & Reliability",
    lessons: [
      L(19, "resource-requests-and-limits", "Resource Requests & Limits", { contentDir: "ch05/19-resource-requests-and-limits" }),
      L(20, "health-probes", "Health Probes", { contentDir: "ch05/20-health-probes" }),
      L(21, "horizontal-pod-autoscaling", "Horizontal Pod Autoscaling", { contentDir: "ch05/21-horizontal-pod-autoscaling" }),
      L(22, "cluster-autoscaling", "Cluster Autoscaling", { contentDir: "ch05/22-cluster-autoscaling" }),
      L(23, "scheduling-taints-and-affinity", "Scheduling, Taints & Affinity", { contentDir: "ch05/23-scheduling-taints-and-affinity" }),
    ],
  },
  {
    n: 6,
    title: "Security & Access",
    lessons: [
      L(24, "namespaces", "Namespaces", { contentDir: "ch06/24-namespaces" }),
      L(25, "rbac", "RBAC", { contentDir: "ch06/25-rbac" }),
      L(26, "service-accounts", "Service Accounts", { contentDir: "ch06/26-service-accounts" }),
      L(27, "pod-security", "Pod Security", { contentDir: "ch06/27-pod-security" }),
    ],
  },
  {
    n: 7,
    title: "Managed Kubernetes: AKS & EKS",
    lessons: [
      L(28, "azure-kubernetes-service-aks", "Azure Kubernetes Service (AKS)", { contentDir: "ch07/28-azure-kubernetes-service-aks" }),
      L(29, "amazon-eks", "Amazon EKS", { contentDir: "ch07/29-amazon-eks" }),
      L(30, "connecting-clusters-to-cloud-identity-and-registries", "Connecting Clusters to Cloud Identity & Registries", { contentDir: "ch07/30-connecting-clusters-to-cloud-identity-and-registries" }),
      L(31, "upgrades-and-maintenance", "Upgrades & Maintenance", { contentDir: "ch07/31-upgrades-and-maintenance" }),
    ],
  },
  {
    n: 8,
    title: "Packaging & Operating",
    lessons: [
      L(32, "helm-basics", "Helm Basics", { contentDir: "ch08/32-helm-basics" }),
      L(33, "writing-helm-charts", "Writing Helm Charts", { contentDir: "ch08/33-writing-helm-charts" }),
      L(34, "troubleshooting-pods-and-nodes", "Troubleshooting Pods & Nodes", { contentDir: "ch08/34-troubleshooting-pods-and-nodes" }),
      L(35, "gitops-introduction", "GitOps Introduction", { contentDir: "ch08/35-gitops-introduction" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(36, "capstone-kickoff-run-an-application-on-kubernetes", "Capstone Kickoff: Run an Application on Kubernetes", { contentDir: "ch09/36-capstone-kickoff-run-an-application-on-kubernetes" }),
      L(37, "capstone-build-it", "Capstone: Build It", { contentDir: "ch09/37-capstone-build-it" }),
      L(38, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/38-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
