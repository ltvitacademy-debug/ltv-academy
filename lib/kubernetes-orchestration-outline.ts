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
      L(1, "why-kubernetes", "Why Kubernetes", { contentDir: "ch01/01-why-kubernetes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447038/ltv-kubernetes-orchestration/why-kubernetes.mp4", durationLabel: "1 min 47 s" }),
      L(2, "architecture-control-plane-and-nodes", "Architecture: Control Plane & Nodes", { contentDir: "ch01/02-architecture-control-plane-and-nodes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447206/ltv-kubernetes-orchestration/architecture-control-plane-and-nodes.mp4", durationLabel: "1 min 49 s" }),
      L(3, "setting-up-a-local-cluster", "Setting Up a Local Cluster", { contentDir: "ch01/03-setting-up-a-local-cluster", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447298/ltv-kubernetes-orchestration/setting-up-a-local-cluster.mp4", durationLabel: "1 min 49 s" }),
      L(4, "kubectl-essentials", "kubectl Essentials", { contentDir: "ch01/04-kubectl-essentials", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447396/ltv-kubernetes-orchestration/kubectl-essentials.mp4", durationLabel: "1 min 33 s" }),
      L(5, "objects-yaml-and-the-declarative-model", "Objects, YAML & the Declarative Model", { contentDir: "ch01/05-objects-yaml-and-the-declarative-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447491/ltv-kubernetes-orchestration/objects-yaml-and-the-declarative-model.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 2,
    title: "Workloads",
    lessons: [
      L(6, "pods", "Pods", { contentDir: "ch02/06-pods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447601/ltv-kubernetes-orchestration/pods.mp4", durationLabel: "1 min 35 s" }),
      L(7, "replicasets-and-deployments", "ReplicaSets & Deployments", { contentDir: "ch02/07-replicasets-and-deployments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447697/ltv-kubernetes-orchestration/replicasets-and-deployments.mp4", durationLabel: "1 min 40 s" }),
      L(8, "rolling-updates-and-rollbacks", "Rolling Updates & Rollbacks", { contentDir: "ch02/08-rolling-updates-and-rollbacks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447807/ltv-kubernetes-orchestration/rolling-updates-and-rollbacks.mp4", durationLabel: "1 min 43 s" }),
      L(9, "statefulsets", "StatefulSets", { contentDir: "ch02/09-statefulsets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447926/ltv-kubernetes-orchestration/statefulsets.mp4", durationLabel: "1 min 53 s" }),
      L(10, "daemonsets-jobs-and-cronjobs", "DaemonSets, Jobs & CronJobs", { contentDir: "ch02/10-daemonsets-jobs-and-cronjobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448042/ltv-kubernetes-orchestration/daemonsets-jobs-and-cronjobs.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 3,
    title: "Networking & Services",
    lessons: [
      L(11, "services-and-service-types", "Services & Service Types", { contentDir: "ch03/11-services-and-service-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448145/ltv-kubernetes-orchestration/services-and-service-types.mp4", durationLabel: "1 min 33 s" }),
      L(12, "dns-and-service-discovery", "DNS & Service Discovery", { contentDir: "ch03/12-dns-and-service-discovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448236/ltv-kubernetes-orchestration/dns-and-service-discovery.mp4", durationLabel: "1 min 30 s" }),
      L(13, "ingress-and-ingress-controllers", "Ingress & Ingress Controllers", { contentDir: "ch03/13-ingress-and-ingress-controllers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448341/ltv-kubernetes-orchestration/ingress-and-ingress-controllers.mp4", durationLabel: "1 min 36 s" }),
      L(14, "network-policies", "Network Policies", { contentDir: "ch03/14-network-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448452/ltv-kubernetes-orchestration/network-policies.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 4,
    title: "Configuration & Storage",
    lessons: [
      L(15, "configmaps", "ConfigMaps", { contentDir: "ch04/15-configmaps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448536/ltv-kubernetes-orchestration/configmaps.mp4", durationLabel: "1 min 18 s" }),
      L(16, "secrets", "Secrets", { contentDir: "ch04/16-secrets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448623/ltv-kubernetes-orchestration/secrets.mp4", durationLabel: "1 min 29 s" }),
      L(17, "volumes-and-persistentvolumes", "Volumes & PersistentVolumes", { contentDir: "ch04/17-volumes-and-persistentvolumes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448710/ltv-kubernetes-orchestration/volumes-and-persistentvolumes.mp4", durationLabel: "1 min 32 s" }),
      L(18, "storageclasses-and-dynamic-provisioning", "StorageClasses & Dynamic Provisioning", { contentDir: "ch04/18-storageclasses-and-dynamic-provisioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448802/ltv-kubernetes-orchestration/storageclasses-and-dynamic-provisioning.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 5,
    title: "Scaling & Reliability",
    lessons: [
      L(19, "resource-requests-and-limits", "Resource Requests & Limits", { contentDir: "ch05/19-resource-requests-and-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448888/ltv-kubernetes-orchestration/resource-requests-and-limits.mp4", durationLabel: "1 min 32 s" }),
      L(20, "health-probes", "Health Probes", { contentDir: "ch05/20-health-probes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448979/ltv-kubernetes-orchestration/health-probes.mp4", durationLabel: "1 min 27 s" }),
      L(21, "horizontal-pod-autoscaling", "Horizontal Pod Autoscaling", { contentDir: "ch05/21-horizontal-pod-autoscaling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449069/ltv-kubernetes-orchestration/horizontal-pod-autoscaling.mp4", durationLabel: "1 min 33 s" }),
      L(22, "cluster-autoscaling", "Cluster Autoscaling", { contentDir: "ch05/22-cluster-autoscaling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449160/ltv-kubernetes-orchestration/cluster-autoscaling.mp4", durationLabel: "1 min 37 s" }),
      L(23, "scheduling-taints-and-affinity", "Scheduling, Taints & Affinity", { contentDir: "ch05/23-scheduling-taints-and-affinity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449247/ltv-kubernetes-orchestration/scheduling-taints-and-affinity.mp4", durationLabel: "1 min 33 s" }),
    ],
  },
  {
    n: 6,
    title: "Security & Access",
    lessons: [
      L(24, "namespaces", "Namespaces", { contentDir: "ch06/24-namespaces", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449340/ltv-kubernetes-orchestration/namespaces.mp4", durationLabel: "1 min 37 s" }),
      L(25, "rbac", "RBAC", { contentDir: "ch06/25-rbac", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449436/ltv-kubernetes-orchestration/rbac.mp4", durationLabel: "1 min 45 s" }),
      L(26, "service-accounts", "Service Accounts", { contentDir: "ch06/26-service-accounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449533/ltv-kubernetes-orchestration/service-accounts.mp4", durationLabel: "1 min 49 s" }),
      L(27, "pod-security", "Pod Security", { contentDir: "ch06/27-pod-security", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449644/ltv-kubernetes-orchestration/pod-security.mp4", durationLabel: "2 min 1 s" }),
    ],
  },
  {
    n: 7,
    title: "Managed Kubernetes: AKS & EKS",
    lessons: [
      L(28, "azure-kubernetes-service-aks", "Azure Kubernetes Service (AKS)", { contentDir: "ch07/28-azure-kubernetes-service-aks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449738/ltv-kubernetes-orchestration/azure-kubernetes-service-aks.mp4", durationLabel: "1 min 39 s" }),
      L(29, "amazon-eks", "Amazon EKS", { contentDir: "ch07/29-amazon-eks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449844/ltv-kubernetes-orchestration/amazon-eks.mp4", durationLabel: "1 min 57 s" }),
      L(30, "connecting-clusters-to-cloud-identity-and-registries", "Connecting Clusters to Cloud Identity & Registries", { contentDir: "ch07/30-connecting-clusters-to-cloud-identity-and-registries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449948/ltv-kubernetes-orchestration/connecting-clusters-to-cloud-identity-and-registries.mp4", durationLabel: "1 min 56 s" }),
      L(31, "upgrades-and-maintenance", "Upgrades & Maintenance", { contentDir: "ch07/31-upgrades-and-maintenance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450854/ltv-kubernetes-orchestration/upgrades-and-maintenance.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 8,
    title: "Packaging & Operating",
    lessons: [
      L(32, "helm-basics", "Helm Basics", { contentDir: "ch08/32-helm-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450960/ltv-kubernetes-orchestration/helm-basics.mp4", durationLabel: "1 min 45 s" }),
      L(33, "writing-helm-charts", "Writing Helm Charts", { contentDir: "ch08/33-writing-helm-charts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450037/ltv-kubernetes-orchestration/writing-helm-charts.mp4", durationLabel: "1 min 34 s" }),
      L(34, "troubleshooting-pods-and-nodes", "Troubleshooting Pods & Nodes", { contentDir: "ch08/34-troubleshooting-pods-and-nodes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450145/ltv-kubernetes-orchestration/troubleshooting-pods-and-nodes.mp4", durationLabel: "1 min 45 s" }),
      L(35, "gitops-introduction", "GitOps Introduction", { contentDir: "ch08/35-gitops-introduction", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450252/ltv-kubernetes-orchestration/gitops-introduction.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(36, "capstone-kickoff-run-an-application-on-kubernetes", "Capstone Kickoff: Run an Application on Kubernetes", { contentDir: "ch09/36-capstone-kickoff-run-an-application-on-kubernetes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451056/ltv-kubernetes-orchestration/capstone-kickoff-run-an-application-on-kubernetes.mp4", durationLabel: "1 min 39 s" }),
      L(37, "capstone-build-it", "Capstone: Build It", { contentDir: "ch09/37-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450363/ltv-kubernetes-orchestration/capstone-build-it.mp4", durationLabel: "1 min 42 s" }),
      L(38, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/38-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450460/ltv-kubernetes-orchestration/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
];
