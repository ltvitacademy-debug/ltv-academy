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
      L(1, "why-containers", "Why Containers"),
      L(2, "containers-vs-virtual-machines", "Containers vs. Virtual Machines"),
      L(3, "how-containers-work-namespaces-and-cgroups", "How Containers Work: Namespaces & cgroups"),
      L(4, "installing-docker", "Installing Docker"),
      L(5, "your-first-container", "Your First Container"),
    ],
  },
  {
    n: 2,
    title: "Working With Images & Containers",
    lessons: [
      L(6, "pulling-and-running-images", "Pulling & Running Images"),
      L(7, "the-container-lifecycle", "The Container Lifecycle"),
      L(8, "ports-environment-and-logs", "Ports, Environment & Logs"),
      L(9, "exec-and-debugging", "Exec & Debugging"),
      L(10, "cleaning-up-resources", "Cleaning Up Resources"),
    ],
  },
  {
    n: 3,
    title: "Building Images",
    lessons: [
      L(11, "dockerfile-basics", "Dockerfile Basics"),
      L(12, "layers-and-caching", "Layers & Caching"),
      L(13, "cmd-vs-entrypoint", "CMD vs. ENTRYPOINT"),
      L(14, "multi-stage-builds", "Multi-Stage Builds"),
      L(15, "image-size-optimization", "Image Size Optimization"),
    ],
  },
  {
    n: 4,
    title: "Registries",
    lessons: [
      L(16, "docker-hub-and-private-registries", "Docker Hub & Private Registries"),
      L(17, "image-tagging-and-versioning", "Image Tagging & Versioning"),
      L(18, "azure-container-registry-and-amazon-ecr", "Azure Container Registry & Amazon ECR"),
    ],
  },
  {
    n: 5,
    title: "Volumes & Networking",
    lessons: [
      L(19, "volumes-and-bind-mounts", "Volumes & Bind Mounts"),
      L(20, "container-networking", "Container Networking"),
      L(21, "user-defined-networks", "User-Defined Networks"),
      L(22, "service-discovery", "Service Discovery"),
    ],
  },
  {
    n: 6,
    title: "Docker Compose",
    lessons: [
      L(23, "compose-basics", "Compose Basics"),
      L(24, "multi-container-applications", "Multi-Container Applications"),
      L(25, "health-checks-and-restart-policies", "Health Checks & Restart Policies"),
      L(26, "environment-configuration-and-secrets", "Environment Configuration & Secrets"),
    ],
  },
  {
    n: 7,
    title: "Containers in Production",
    lessons: [
      L(27, "resource-limits", "Resource Limits"),
      L(28, "logging-and-monitoring-containers", "Logging & Monitoring Containers"),
      L(29, "running-as-non-root-and-basic-hardening", "Running as Non-Root & Basic Hardening"),
      L(30, "orchestration-preview", "Orchestration Preview"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-containerize-a-multi-service-application", "Capstone Kickoff: Containerize a Multi-Service Application"),
      L(32, "capstone-build-it", "Capstone: Build It"),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
