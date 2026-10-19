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
      L(1, "why-containers", "Why Containers", { contentDir: "ch01/01-why-containers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450495/ltv-docker-and-containers/why-containers.mp4", durationLabel: "1 min 53 s" }),
      L(2, "containers-vs-virtual-machines", "Containers vs. Virtual Machines", { contentDir: "ch01/02-containers-vs-virtual-machines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450646/ltv-docker-and-containers/containers-vs-virtual-machines.mp4", durationLabel: "2 min 4 s" }),
      L(3, "how-containers-work-namespaces-and-cgroups", "How Containers Work: Namespaces & cgroups", { contentDir: "ch01/03-how-containers-work-namespaces-and-cgroups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450867/ltv-docker-and-containers/how-containers-work-namespaces-and-cgroups.mp4", durationLabel: "1 min 52 s" }),
      L(4, "installing-docker", "Installing Docker", { contentDir: "ch01/04-installing-docker", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450960/ltv-docker-and-containers/installing-docker.mp4", durationLabel: "1 min 36 s" }),
      L(5, "your-first-container", "Your First Container", { contentDir: "ch01/05-your-first-container", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451079/ltv-docker-and-containers/your-first-container.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 2,
    title: "Working With Images & Containers",
    lessons: [
      L(6, "pulling-and-running-images", "Pulling & Running Images", { contentDir: "ch02/06-pulling-and-running-images", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451181/ltv-docker-and-containers/pulling-and-running-images.mp4", durationLabel: "1 min 46 s" }),
      L(7, "the-container-lifecycle", "The Container Lifecycle", { contentDir: "ch02/07-the-container-lifecycle", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451290/ltv-docker-and-containers/the-container-lifecycle.mp4", durationLabel: "1 min 50 s" }),
      L(8, "ports-environment-and-logs", "Ports, Environment & Logs", { contentDir: "ch02/08-ports-environment-and-logs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451391/ltv-docker-and-containers/ports-environment-and-logs.mp4", durationLabel: "1 min 46 s" }),
      L(9, "exec-and-debugging", "Exec & Debugging", { contentDir: "ch02/09-exec-and-debugging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451495/ltv-docker-and-containers/exec-and-debugging.mp4", durationLabel: "1 min 41 s" }),
      L(10, "cleaning-up-resources", "Cleaning Up Resources", { contentDir: "ch02/10-cleaning-up-resources", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451601/ltv-docker-and-containers/cleaning-up-resources.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 3,
    title: "Building Images",
    lessons: [
      L(11, "dockerfile-basics", "Dockerfile Basics", { contentDir: "ch03/11-dockerfile-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451695/ltv-docker-and-containers/dockerfile-basics.mp4", durationLabel: "1 min 40 s" }),
      L(12, "layers-and-caching", "Layers & Caching", { contentDir: "ch03/12-layers-and-caching", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451795/ltv-docker-and-containers/layers-and-caching.mp4", durationLabel: "1 min 52 s" }),
      L(13, "cmd-vs-entrypoint", "CMD vs. ENTRYPOINT", { contentDir: "ch03/13-cmd-vs-entrypoint", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792451904/ltv-docker-and-containers/cmd-vs-entrypoint.mp4", durationLabel: "1 min 50 s" }),
      L(14, "multi-stage-builds", "Multi-Stage Builds", { contentDir: "ch03/14-multi-stage-builds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452005/ltv-docker-and-containers/multi-stage-builds.mp4", durationLabel: "1 min 43 s" }),
      L(15, "image-size-optimization", "Image Size Optimization", { contentDir: "ch03/15-image-size-optimization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452109/ltv-docker-and-containers/image-size-optimization.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 4,
    title: "Registries",
    lessons: [
      L(16, "docker-hub-and-private-registries", "Docker Hub & Private Registries", { contentDir: "ch04/16-docker-hub-and-private-registries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452226/ltv-docker-and-containers/docker-hub-and-private-registries.mp4", durationLabel: "1 min 53 s" }),
      L(17, "image-tagging-and-versioning", "Image Tagging & Versioning", { contentDir: "ch04/17-image-tagging-and-versioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452344/ltv-docker-and-containers/image-tagging-and-versioning.mp4", durationLabel: "1 min 49 s" }),
      L(18, "azure-container-registry-and-amazon-ecr", "Azure Container Registry & Amazon ECR", { contentDir: "ch04/18-azure-container-registry-and-amazon-ecr", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452457/ltv-docker-and-containers/azure-container-registry-and-amazon-ecr.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 5,
    title: "Volumes & Networking",
    lessons: [
      L(19, "volumes-and-bind-mounts", "Volumes & Bind Mounts", { contentDir: "ch05/19-volumes-and-bind-mounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452565/ltv-docker-and-containers/volumes-and-bind-mounts.mp4", durationLabel: "1 min 50 s" }),
      L(20, "container-networking", "Container Networking", { contentDir: "ch05/20-container-networking", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452666/ltv-docker-and-containers/container-networking.mp4", durationLabel: "1 min 44 s" }),
      L(21, "user-defined-networks", "User-Defined Networks", { contentDir: "ch05/21-user-defined-networks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452778/ltv-docker-and-containers/user-defined-networks.mp4", durationLabel: "1 min 41 s" }),
      L(22, "service-discovery", "Service Discovery", { contentDir: "ch05/22-service-discovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452880/ltv-docker-and-containers/service-discovery.mp4", durationLabel: "1 min 45 s" }),
    ],
  },
  {
    n: 6,
    title: "Docker Compose",
    lessons: [
      L(23, "compose-basics", "Compose Basics", { contentDir: "ch06/23-compose-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792452983/ltv-docker-and-containers/compose-basics.mp4", durationLabel: "1 min 41 s" }),
      L(24, "multi-container-applications", "Multi-Container Applications", { contentDir: "ch06/24-multi-container-applications", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453067/ltv-docker-and-containers/multi-container-applications.mp4", durationLabel: "1 min 21 s" }),
      L(25, "health-checks-and-restart-policies", "Health Checks & Restart Policies", { contentDir: "ch06/25-health-checks-and-restart-policies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453156/ltv-docker-and-containers/health-checks-and-restart-policies.mp4", durationLabel: "1 min 24 s" }),
      L(26, "environment-configuration-and-secrets", "Environment Configuration & Secrets", { contentDir: "ch06/26-environment-configuration-and-secrets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453231/ltv-docker-and-containers/environment-configuration-and-secrets.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 7,
    title: "Containers in Production",
    lessons: [
      L(27, "resource-limits", "Resource Limits", { contentDir: "ch07/27-resource-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453314/ltv-docker-and-containers/resource-limits.mp4", durationLabel: "1 min 18 s" }),
      L(28, "logging-and-monitoring-containers", "Logging & Monitoring Containers", { contentDir: "ch07/28-logging-and-monitoring-containers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453398/ltv-docker-and-containers/logging-and-monitoring-containers.mp4", durationLabel: "1 min 24 s" }),
      L(29, "running-as-non-root-and-basic-hardening", "Running as Non-Root & Basic Hardening", { contentDir: "ch07/29-running-as-non-root-and-basic-hardening", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453491/ltv-docker-and-containers/running-as-non-root-and-basic-hardening.mp4", durationLabel: "1 min 29 s" }),
      L(30, "orchestration-preview", "Orchestration Preview", { contentDir: "ch07/30-orchestration-preview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453571/ltv-docker-and-containers/orchestration-preview.mp4", durationLabel: "1 min 31 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-containerize-a-multi-service-application", "Capstone Kickoff: Containerize a Multi-Service Application", { contentDir: "ch08/31-capstone-kickoff-containerize-a-multi-service-application", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453672/ltv-docker-and-containers/capstone-kickoff-containerize-a-multi-service-application.mp4", durationLabel: "2 min 13 s" }),
      L(32, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/32-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453771/ltv-docker-and-containers/capstone-build-it.mp4", durationLabel: "2 min 11 s" }),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/33-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792453865/ltv-docker-and-containers/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
];
