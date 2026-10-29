// Docker, Kubernetes & Container Platforms course outline. Lessons without a contentDir render
// as "in production". Course 9 of the Cloud Engineer → Cloud Architect path — the second course
// of the Advanced Specialization stage: containers and orchestration at a production level,
// building on the Terraform/Bicep IaC course rather than re-explaining what a container is.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/docker-kubernetes-container-platforms/
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

export const DOCKER_KUBERNETES_CONTAINER_PLATFORMS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Docker for Platform Engineers",
    lessons: [
      L(1, "the-container-model-images-layers-and-the-union-filesystem", "The Container Model: Images, Layers, and the Union Filesystem", { contentDir: "ch01/01-the-container-model-images-layers-and-the-union-filesystem" }),
      L(2, "writing-a-dockerfile-that-builds-fast-and-stays-small", "Writing a Dockerfile That Builds Fast and Stays Small", { contentDir: "ch01/02-writing-a-dockerfile-that-builds-fast-and-stays-small" }),
      L(3, "multi-stage-builds-separating-build-tools-from-the-runtime-image", "Multi-Stage Builds: Separating Build Tools from the Runtime Image", { contentDir: "ch01/03-multi-stage-builds-separating-build-tools-from-the-runtime-image" }),
      L(4, "docker-networking-and-volumes-for-a-local-multi-container-app", "Docker Networking and Volumes for a Local Multi-Container App", { contentDir: "ch01/04-docker-networking-and-volumes-for-a-local-multi-container-app" }),
    ],
  },
  {
    n: 2,
    title: "Production-Grade Container Images",
    lessons: [
      L(5, "choosing-a-base-image-distro-slim-or-distroless", "Choosing a Base Image: Distro, Slim, or Distroless", { contentDir: "ch02/05-choosing-a-base-image-distro-slim-or-distroless" }),
      L(6, "scanning-images-for-vulnerabilities-before-they-ship", "Scanning Images for Vulnerabilities Before They Ship", { contentDir: "ch02/06-scanning-images-for-vulnerabilities-before-they-ship" }),
      L(7, "running-as-a-non-root-user-and-other-container-hardening-basics", "Running as a Non-Root User, and Other Container Hardening Basics", { contentDir: "ch02/07-running-as-a-non-root-user-and-other-container-hardening-basics" }),
      L(8, "tagging-versioning-and-pushing-to-a-container-registry", "Tagging, Versioning, and Pushing to a Container Registry", { contentDir: "ch02/08-tagging-versioning-and-pushing-to-a-container-registry" }),
    ],
  },
  {
    n: 3,
    title: "Kubernetes Architecture & Core Objects",
    lessons: [
      L(9, "the-control-plane-and-worker-nodes-what-actually-runs-where", "The Control Plane and Worker Nodes: What Actually Runs Where", { contentDir: "ch03/09-the-control-plane-and-worker-nodes-what-actually-runs-where" }),
      L(10, "pods-replicasets-and-deployments-the-real-relationship", "Pods, ReplicaSets, and Deployments: The Real Relationship", { contentDir: "ch03/10-pods-replicasets-and-deployments-the-real-relationship" }),
      L(11, "configmaps-and-secrets-getting-configuration-out-of-the-image", "ConfigMaps and Secrets: Getting Configuration Out of the Image", { contentDir: "ch03/11-configmaps-and-secrets-getting-configuration-out-of-the-image" }),
      L(12, "a-rolling-update-and-a-rollback-with-kubectl", "A Rolling Update and a Rollback with kubectl", { contentDir: "ch03/12-a-rolling-update-and-a-rollback-with-kubectl" }),
    ],
  },
  {
    n: 4,
    title: "Kubernetes Networking",
    lessons: [
      L(13, "services-clusterip-nodeport-and-loadbalancer-explained", "Services: ClusterIP, NodePort, and LoadBalancer Explained", { contentDir: "ch04/13-services-clusterip-nodeport-and-loadbalancer-explained" }),
      L(14, "ingress-and-routing-external-traffic-into-the-cluster", "Ingress and Routing External Traffic into the Cluster", { contentDir: "ch04/14-ingress-and-routing-external-traffic-into-the-cluster" }),
      L(15, "dns-and-service-discovery-inside-a-cluster", "DNS and Service Discovery Inside a Cluster", { contentDir: "ch04/15-dns-and-service-discovery-inside-a-cluster" }),
      L(16, "network-policies-restricting-which-pods-can-talk-to-which", "Network Policies: Restricting Which Pods Can Talk to Which", { contentDir: "ch04/16-network-policies-restricting-which-pods-can-talk-to-which" }),
    ],
  },
  {
    n: 5,
    title: "Kubernetes Storage & Stateful Workloads",
    lessons: [
      L(17, "persistentvolumes-and-persistentvolumeclaims-in-plain-terms", "PersistentVolumes and PersistentVolumeClaims in Plain Terms", { contentDir: "ch05/17-persistentvolumes-and-persistentvolumeclaims-in-plain-terms" }),
      L(18, "storageclasses-and-dynamic-provisioning-in-the-cloud", "StorageClasses and Dynamic Provisioning in the Cloud", { contentDir: "ch05/18-storageclasses-and-dynamic-provisioning-in-the-cloud" }),
      L(19, "statefulsets-when-a-deployment-isnt-the-right-object", "StatefulSets: When a Deployment Isn't the Right Object", { contentDir: "ch05/19-statefulsets-when-a-deployment-isnt-the-right-object" }),
      L(20, "running-a-database-in-kubernetes-and-when-not-to", "Running a Database in Kubernetes, and When Not To", { contentDir: "ch05/20-running-a-database-in-kubernetes-and-when-not-to" }),
    ],
  },
  {
    n: 6,
    title: "Deploying with Helm",
    lessons: [
      L(21, "why-helm-exists-templating-a-deployment-instead-of-copy-pasting-yaml", "Why Helm Exists: Templating a Deployment Instead of Copy-Pasting YAML", { contentDir: "ch06/21-why-helm-exists-templating-a-deployment-instead-of-copy-pasting-yaml" }),
      L(22, "writing-a-helm-chart-for-a-real-application", "Writing a Helm Chart for a Real Application", { contentDir: "ch06/22-writing-a-helm-chart-for-a-real-application" }),
      L(23, "values-files-per-environment-the-same-pattern-as-terraform-workspaces", "Values Files Per Environment: The Same Pattern as Terraform Workspaces", { contentDir: "ch06/23-values-files-per-environment-the-same-pattern-as-terraform-workspaces" }),
      L(24, "upgrading-rolling-back-and-managing-chart-releases", "Upgrading, Rolling Back, and Managing Chart Releases", { contentDir: "ch06/24-upgrading-rolling-back-and-managing-chart-releases" }),
    ],
  },
  {
    n: 7,
    title: "Kubernetes Security & RBAC",
    lessons: [
      L(25, "kubernetes-rbac-roles-rolebindings-and-service-accounts", "Kubernetes RBAC: Roles, RoleBindings, and Service Accounts", { contentDir: "ch07/25-kubernetes-rbac-roles-rolebindings-and-service-accounts" }),
      L(26, "pod-security-standards-replacing-podsecuritypolicy", "Pod Security Standards: Replacing PodSecurityPolicy", { contentDir: "ch07/26-pod-security-standards-replacing-podsecuritypolicy" }),
      L(27, "securing-the-kubernetes-api-server-and-etcd", "Securing the Kubernetes API Server and etcd", { contentDir: "ch07/27-securing-the-kubernetes-api-server-and-etcd" }),
      L(28, "a-security-checklist-for-a-cluster-before-it-goes-to-production", "A Security Checklist for a Cluster Before It Goes to Production", { contentDir: "ch07/28-a-security-checklist-for-a-cluster-before-it-goes-to-production" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Running a Real Application on Kubernetes",
    lessons: [
      L(29, "lab-containerizing-and-deploying-a-multi-service-app", "Lab: Containerizing and Deploying a Multi-Service App", { contentDir: "ch08/29-lab-containerizing-and-deploying-a-multi-service-app" }),
      L(30, "lab-adding-ingress-storage-and-a-helm-chart", "Lab: Adding Ingress, Storage, and a Helm Chart", { contentDir: "ch08/30-lab-adding-ingress-storage-and-a-helm-chart" }),
      L(31, "case-study-a-cluster-outage-caused-by-a-missing-resource-limit", "Case Study: A Cluster Outage Caused by a Missing Resource Limit", { contentDir: "ch08/31-case-study-a-cluster-outage-caused-by-a-missing-resource-limit" }),
      L(32, "chapter-capstone-container-platforms-review", "Chapter Capstone: Container Platforms Review", { contentDir: "ch08/32-chapter-capstone-container-platforms-review" }),
    ],
  },
];
