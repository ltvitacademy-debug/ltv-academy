// The Docker course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 7 of the DevOps Engineer path. General-purpose Docker; distinct from Docker & Deployment for AI Applications, which applies containers specifically to AI workloads.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/docker-and-containers/
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

export const DOCKER_AND_CONTAINERS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Container Fundamentals",
    lessons: [
      L(1, "why-containers", "Why Containers", { contentDir: "ch01/01-why-containers" }),
      L(2, "containers-vs-virtual-machines", "Containers vs. Virtual Machines", { contentDir: "ch01/02-containers-vs-virtual-machines" }),
      L(3, "how-containers-work-namespaces-and-cgroups", "How Containers Work: Namespaces & cgroups", { contentDir: "ch01/03-how-containers-work-namespaces-and-cgroups" }),
      L(4, "installing-docker", "Installing Docker", { contentDir: "ch01/04-installing-docker" }),
      L(5, "your-first-container", "Your First Container", { contentDir: "ch01/05-your-first-container" }),
    ],
  },
  {
    n: 2,
    title: "Working With Images & Containers",
    lessons: [
      L(6, "pulling-and-running-images", "Pulling & Running Images", { contentDir: "ch02/06-pulling-and-running-images" }),
      L(7, "the-container-lifecycle", "The Container Lifecycle", { contentDir: "ch02/07-the-container-lifecycle" }),
      L(8, "ports-environment-and-logs", "Ports, Environment & Logs", { contentDir: "ch02/08-ports-environment-and-logs" }),
      L(9, "exec-and-debugging", "Exec & Debugging", { contentDir: "ch02/09-exec-and-debugging" }),
      L(10, "cleaning-up-resources", "Cleaning Up Resources", { contentDir: "ch02/10-cleaning-up-resources" }),
    ],
  },
  {
    n: 3,
    title: "Building Images",
    lessons: [
      L(11, "dockerfile-basics", "Dockerfile Basics", { contentDir: "ch03/11-dockerfile-basics" }),
      L(12, "layers-and-caching", "Layers & Caching", { contentDir: "ch03/12-layers-and-caching" }),
      L(13, "cmd-vs-entrypoint", "CMD vs. ENTRYPOINT", { contentDir: "ch03/13-cmd-vs-entrypoint" }),
      L(14, "multi-stage-builds", "Multi-Stage Builds", { contentDir: "ch03/14-multi-stage-builds" }),
      L(15, "image-size-optimization", "Image Size Optimization", { contentDir: "ch03/15-image-size-optimization" }),
    ],
  },
  {
    n: 4,
    title: "Registries",
    lessons: [
      L(16, "docker-hub-and-private-registries", "Docker Hub & Private Registries", { contentDir: "ch04/16-docker-hub-and-private-registries" }),
      L(17, "image-tagging-and-versioning", "Image Tagging & Versioning", { contentDir: "ch04/17-image-tagging-and-versioning" }),
      L(18, "azure-container-registry-and-amazon-ecr", "Azure Container Registry & Amazon ECR", { contentDir: "ch04/18-azure-container-registry-and-amazon-ecr" }),
    ],
  },
  {
    n: 5,
    title: "Volumes & Networking",
    lessons: [
      L(19, "volumes-and-bind-mounts", "Volumes & Bind Mounts", { contentDir: "ch05/19-volumes-and-bind-mounts" }),
      L(20, "container-networking", "Container Networking", { contentDir: "ch05/20-container-networking" }),
      L(21, "user-defined-networks", "User-Defined Networks", { contentDir: "ch05/21-user-defined-networks" }),
      L(22, "service-discovery", "Service Discovery", { contentDir: "ch05/22-service-discovery" }),
    ],
  },
  {
    n: 6,
    title: "Docker Compose",
    lessons: [
      L(23, "compose-basics", "Compose Basics", { contentDir: "ch06/23-compose-basics" }),
      L(24, "multi-container-applications", "Multi-Container Applications", { contentDir: "ch06/24-multi-container-applications" }),
      L(25, "health-checks-and-restart-policies", "Health Checks & Restart Policies", { contentDir: "ch06/25-health-checks-and-restart-policies" }),
      L(26, "environment-configuration-and-secrets", "Environment Configuration & Secrets", { contentDir: "ch06/26-environment-configuration-and-secrets" }),
    ],
  },
  {
    n: 7,
    title: "Containers in Production",
    lessons: [
      L(27, "resource-limits", "Resource Limits", { contentDir: "ch07/27-resource-limits" }),
      L(28, "logging-and-monitoring-containers", "Logging & Monitoring Containers", { contentDir: "ch07/28-logging-and-monitoring-containers" }),
      L(29, "running-as-non-root-and-basic-hardening", "Running as Non-Root & Basic Hardening", { contentDir: "ch07/29-running-as-non-root-and-basic-hardening" }),
      L(30, "orchestration-preview", "Orchestration Preview", { contentDir: "ch07/30-orchestration-preview" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-containerize-a-multi-service-application", "Capstone Kickoff: Containerize a Multi-Service Application", { contentDir: "ch08/31-capstone-kickoff-containerize-a-multi-service-application" }),
      L(32, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/32-capstone-build-it" }),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/33-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
